import fs from 'fs/promises';
import path from 'path';
import { createClient, SanityClient } from '@sanity/client';
import { parse } from 'csv-parse/sync'; // Using sync version for simplicity in a script
import client from '../sanity/sanity.client';

// TODO: Replace with your actual Sanity project details or load from env variables

const CSV_FILE_PATH = path.join(__dirname, 'prodotticsv', 'prodotti.csv');

type CsvRow = {
  Nome: string;
  Descrizione: string;
  Scadenza: string;
  'Disponibile Da...A': string;
  'Pezzi per cartone': string;
  Formati: string;
  'codice EAN': string;
  'VALORI NUTRIZIONALI MEDI per 100 g di prodotto:': string; // Handle newline in header
  umidità: string;
  allergeni: string;
  MARCHI: string;
  Categoria: string;
};

type Formato = {
  _key: string; // Required for arrays of objects in Sanity
  formato: string;
  codice_ean?: string;
};

// --- Helper Functions (Placeholders removed) ---

// --- Main Script Logic ---

async function updateProductFormats() {
  console.log('Starting product format update script...');

  try {
    const csvData = await fs.readFile(CSV_FILE_PATH, 'utf-8');
    const records: CsvRow[] = parse(csvData, {
      skip_empty_lines: true,
      trim: true,
      relax_column_count: true, // Handle potential variations in column count
      columns: (header: string[]) => header.map((h) => h.replace(/\n/g, ' ')), // Process headers here
    });

    console.log(`Read ${records.length} records from CSV.`);

    for (const record of records) {
      const productName = record.Nome;
      if (!productName) {
        console.warn('Skipping row without a product name.');
        continue;
      }

      console.log(`Processing product: ${productName}`);

      const rawFormats = record.Formati || '';
      const rawEans = record['codice EAN'] || '';

      const parsedFormats = parseFormats(rawFormats);
      if (parsedFormats.length === 0 && rawFormats) {
        console.warn(
          `  - Could not parse formats for "${productName}": "${rawFormats}"`
        );
        continue; // Skip if formats are present but couldn't be parsed
      }

      const eanMap = parseEans(rawEans, parsedFormats);

      const finalFormati: Formato[] = parsedFormats.map((fmt, index) => ({
        _key: `${productName.replace(/\s+/g, '-')}-${index}-${Date.now()}`, // Generate a unique key
        formato: fmt,
        codice_ean: eanMap[fmt], // Lookup EAN, might be undefined
      }));

      if (finalFormati.length > 0) {
        console.log(
          `  - Formats found: ${finalFormati.map((f) => `${f.formato}${f.codice_ean ? ` (EAN: ${f.codice_ean})` : ''}`).join(', ')}`
        );

        // --- Find and Update Sanity Document ---
        try {
          console.log(`  - Querying Sanity for product name: "${productName}"`);
          const products = await client.fetch<{ _id: string }[]>(
            `*[_type == "prodotto" && nome == $productName] {_id}`,
            { productName }
          );

          if (products && products.length > 0) {
            const productId = products[0]._id;
            console.log(`  - Found product in Sanity with ID: ${productId}`);

            // Patch the document
            await client
              .patch(productId)
              .set({ formati: finalFormati })
              // Optional: Unset the old top-level EAN if it might exist
              // .unset(['codice_ean'])
              .commit();
            console.log(`  - Successfully updated formats for ${productName}`);
          } else {
            console.warn(`  - Product "${productName}" not found in Sanity.`);
          }
        } catch (err) {
          console.error(`  - Error updating Sanity for "${productName}":`, err);
        }
      } else {
        console.log(`  - No formats specified for "${productName}".`);
        // Optionally update Sanity to ensure formati is empty if needed
        // await client.patch(productId).set({ formati: [] }).commit();
      }
    }

    console.log('Product format update script finished.');
  } catch (error) {
    console.error('Error running the script:', error);
  }
}

// --- Implement Helper Functions ---

function normalizeFormat(format: string): string {
  let norm = format.trim().replace(/\s+/g, ' '); // Normalize whitespace
  // Handle specific cases like "Kg" -> "1Kg" (only if it's exactly "Kg")
  if (norm.toLowerCase() === 'kg') {
    norm = '1Kg';
  }
  // Handle "sfuso in secchi da 25 Kg" -> "sfuso in secchi da 25Kg"
  norm = norm.replace(/(\d+)\s+Kg/i, '$1Kg');

  // Capitalize first letter
  if (norm.length > 0) {
    norm = norm.charAt(0).toUpperCase() + norm.slice(1);
  }
  return norm;
}

function parseFormats(formatString: string): string[] {
  if (!formatString) return [];

  const finalFormats: string[] = [];
  formatString
    .replace(/\n/g, ' ') // Replace newlines with spaces first
    .split('/') // Split by slash
    .forEach((part) => {
      part
        .split(',') // Then split each part by comma
        .forEach((subPart) => {
          const normPart = normalizeFormat(subPart); // Normalize and capitalize each subPart
          if (normPart) {
            finalFormats.push(normPart);
          }
        });
    });

  return finalFormats;
}

function parseEans(
  eanString: string,
  formats: string[]
): { [format: string]: string | undefined } {
  const eanMap: { [format: string]: string | undefined } = {};
  const normalizedEanString = eanString.replace(/\r\n/g, '\n').trim(); // Normalize newlines

  // Case 1: Empty EAN string
  if (!normalizedEanString) {
    formats.forEach((fmt) => (eanMap[fmt] = undefined));
    return eanMap;
  }

  // Case 2: Single EAN for all formats
  const singleEanMatch = normalizedEanString.match(/^(\d+)$/);
  if (singleEanMatch) {
    const singleEan = singleEanMatch[1];
    formats.forEach((fmt) => (eanMap[fmt] = singleEan));
    return eanMap;
  }

  // Case 3: Specific EANs like "Da 500: 123..."
  const specificEanRegex = /Da\s+(\d+(?:g|Kg)?):\s*(\d+)/gi; // Matches "Da 500:", "Da 250:", "Da 1Kg:" etc.
  let match;
  const specificEans: { [formatSuffix: string]: string } = {};
  let foundSpecific = false;

  while ((match = specificEanRegex.exec(normalizedEanString)) !== null) {
    foundSpecific = true;
    // Normalize the format from the regex match (e.g., "500" -> "500g")
    let formatSuffix = match[1].toLowerCase();
    if (!formatSuffix.endsWith('g') && !formatSuffix.endsWith('kg')) {
      // Assume 'g' if just digits? This depends on CSV consistency. Let's require g or Kg.
      // Let's normalize Kg to uppercase K
      formatSuffix = formatSuffix.replace('kg', 'Kg');
      if (!formatSuffix.endsWith('Kg')) formatSuffix += 'g'; // Default to 'g' if no unit
    } else {
      formatSuffix = formatSuffix.replace('kg', 'Kg');
    }

    specificEans[formatSuffix] = match[2];
  }

  if (foundSpecific) {
    formats.forEach((fmt) => {
      // Find the matching suffix (e.g., "500g" in "Kg/500g/250g")
      const normalizedFmt = fmt.toLowerCase();
      let foundEan: string | undefined = undefined;
      for (const suffix in specificEans) {
        if (normalizedFmt.endsWith(suffix)) {
          // Check if the format *ends* with the key from the EAN map
          foundEan = specificEans[suffix];
          break;
        }
      }
      eanMap[fmt] = foundEan;
    });
    return eanMap;
  }

  // Fallback: If no patterns matched, assume it might be a single EAN missed by regex?
  // Or log a warning. Let's log a warning for unhandled cases.
  console.warn(
    `  - Unhandled EAN format for product: ${formats.join(', ')}, EAN string: "${eanString}"`
  ); // Added context
  formats.forEach((fmt) => (eanMap[fmt] = undefined)); // Assign undefined if unhandled
  return eanMap;
}

// --- Run the script ---
updateProductFormats();
