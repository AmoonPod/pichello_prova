import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import client from "../sanity/sanity.client";
import slugify from "slugify";

// --- Configuration ---
const CSV_FILE_PATH = path.join(process.cwd(), "prodotticsv", "prodotti.csv");
const IMAGE_BASE_DIR = path.join(process.cwd(), "immagini");
const ERROR_LOG_FILE = path.join(process.cwd(), "import-errors.txt");
const DELETE_EXISTING_DATA = true; // !!! SET TO true TO DELETE EXISTING PRODUCTS/CATEGORIES !!!

// Clear error log file at start
fs.writeFileSync(ERROR_LOG_FILE, "", "utf8");

// Function to log errors to file
const logError = (message: string) => {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(ERROR_LOG_FILE, logEntry, "utf8");
  console.error(message);
};

// --- Prefixes to remove for image matching ---
const PRODUCT_PREFIXES_TO_REMOVE = [
  "Zuppa ",
  "Fagioli ",
  "Fagiolo ",
  "Risotto ",
  "Risoltto ",
  "Farina ",
  "Infuso ",
  "Tisana ",
  "Caramelle ",
  "Miele ",
  "Orzo ",
  "Mais ",
  "Semola ",
  "Grano ",
  "Castagne ",
  "Avena ",
  "Farro ",
  "Ceci ",
  "Lenticchie ",
  "Cicerchie ",
  "Fave ",
  "Favetta ",
  "Piselli ",
];

// Function to capitalize the first letter of each word
const capitalizeWords = (text: string): string => {
  if (!text) return "";
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// Function to create a Sanity slug
const createSlug = (text: string): string => {
  return slugify(text, { lower: true, strict: true });
};

// Function to generate a unique key for array items
const generateUniqueKey = (text: string, index: number): string => {
  const baseKey = slugify(text, { lower: true, strict: true });
  return `${baseKey}-${index}-${Date.now()}`;
};

// --- Enhanced functions for generating match keys ---
const generateProductMatchKey = (productName: string): string => {
  let key = productName.trim();
  for (const prefix of PRODUCT_PREFIXES_TO_REMOVE) {
    if (key.toLowerCase().startsWith(prefix.toLowerCase())) {
      key = key.substring(prefix.length);
      break; // Remove only the first matching prefix
    }
  }
  return key.toLowerCase().replace(/\s+/g, "");
};

const generateImageMatchKey = (fileNameWithoutExt: string): string => {
  return fileNameWithoutExt
    .toLowerCase()
    .replace(/\s+/g, "") // Remove spaces
    .replace(/\d+$/, "") // Remove trailing numbers
    .replace(/\([^)]*\)$/, ""); // Remove content in parentheses at the end
};

// Enhanced image matching with comprehensive variations
const generateImageMatchVariations = (productName: string): string[] => {
  const variations = new Set<string>();

  // Base match key
  const baseKey = generateProductMatchKey(productName);
  variations.add(baseKey);

  // Handle specific product mappings - only very specific ones
  const productMappings = [
    // Farine variations
    { from: "antichicinquantagranifiore", to: "farinaquantagramifiore" },
    { from: "antichicinquantagraniintegrale", to: "farinaquantagramintegrale" },
    { from: "antichicinquantagranisemintegrale", to: "farinaquantagramsemintegrale" },
    { from: "tipo0", to: "farinquantatipo0" },
    { from: "tipo1", to: "farinquantatipo1" },
    { from: "tipo2", to: "farinquantatipo2" },
    { from: "manitoba", to: "farinquantamanitoba" },

    // Semola variations
    { from: "rimacinatadigranoduro", to: "semolarimacinatadigranoduro" },
    { from: "rimacinatadigranodurovarietàanticasenatorecappelli", to: "semolarimacinatasenatorappelli" },
    { from: "rimacinatadigranodurovarietàanticasaragolla", to: "semolarimacintasaragolla" },

    // Farro variations
    { from: "decorticatoinchicchivarietàanticadicocco", to: "farrodicocco" },
    { from: "difarro", to: "farinquantafarro" },
    { from: "decorticatovarietàanticamonococco", to: "farromonococco" },
    { from: "difarromonococco", to: "farinquantafarro monococco" },

    // Orzo variations
    { from: "perlatoinchicchivarietàanticamondo", to: "orzomondo" },
    { from: "perlatoinchicchiclassico", to: "orzoperlato" },
    { from: "perlatoneroinchicchivarietàantica", to: "orzonero" },
    { from: "d'orzo", to: "farinquantorzo" },

    // Other cereals
    { from: "decorticata", to: "avenadecorti" },
    { from: "diavena", to: "farinquantavena" },
    { from: "dimaisdapolentavarietàanticaottofile", to: "polenta" },
    { from: "dimaisfioretto", to: "farinquantafioretto" },
    { from: "perpopcorn", to: "mais" },
    { from: "risocarnaroli", to: "risocarnaroli" },
    { from: "risointegrale", to: "risointegrale" },
  ];

  // Apply product mappings
  for (const mapping of productMappings) {
    if (baseKey.includes(mapping.from)) {
      variations.add(baseKey.replace(mapping.from, mapping.to));
    }
    // Also try direct matches
    if (baseKey === mapping.from) {
      variations.add(mapping.to);
    }
  }

  // IMPORTANT: For specific varieties, prioritize the specific variety name
  // Don't add generic terms that would match too broadly
  const words = productName.toLowerCase().split(/\s+/);
  const specificVarieties = [
    "giallorino", "giallorini", "borlotti", "cannellini", "neri", "nero",
    "carnaroli", "integrale", "dicocco", "monococco", "mondo", "perlato",
    "manitoba", "senatorecappelli", "saragolla", "ottofile"
  ];

  // Only add specific variety names, not generic terms
  for (const word of words) {
    if (specificVarieties.includes(word.toLowerCase()) && word.length > 3) {
      variations.add(word.toLowerCase());
      // Add plural/singular variations only for specific varieties
      if (word === "giallorino") variations.add("giallorini");
      if (word === "giallorini") variations.add("giallorino");
      if (word === "borlotto") variations.add("borlotti");
      if (word === "borlotti") variations.add("borlotto");
      if (word === "cannellino") variations.add("cannellini");
      if (word === "cannellini") variations.add("cannellino");
    }
  }

  // Remove overly generic terms that would match too many images
  const genericTermsToRemove = ["fagiolo", "fagioli", "farina", "semola", "orzo", "farro", "mais", "riso"];
  const filteredVariations = new Set<string>();

  for (const variation of variations) {
    let isGeneric = false;
    for (const generic of genericTermsToRemove) {
      if (variation === generic) {
        isGeneric = true;
        break;
      }
    }
    if (!isGeneric) {
      filteredVariations.add(variation);
    }
  }

  return Array.from(filteredVariations);
};

// Function to parse formats and EAN codes
interface FormatEAN {
  formato: string;
  codice_ean?: string;
  _key: string;
}

const parseFormatsAndEAN = (formatsText: string, eanText: string): FormatEAN[] => {
  const formats: FormatEAN[] = [];

  if (!formatsText || formatsText.trim() === "") {
    return formats;
  }

  // Parse formats
  const formatList = formatsText
    .split(/[\/,]/)
    .map(f => f.trim())
    .filter(Boolean);

  // Check if EAN contains format-specific codes
  if (eanText && eanText.includes("Da ")) {
    // Parse format-specific EAN codes
    const eanLines = eanText.split('\n').map(line => line.trim()).filter(Boolean);
    const eanMap = new Map<string, string>();

    for (let i = 0; i < eanLines.length; i++) {
      const line = eanLines[i];
      if (line.startsWith("Da ")) {
        // Extract format from "Da 500:" format
        const formatMatch = line.match(/Da\s+(\d+[a-zA-Z]*)/);
        if (formatMatch && i + 1 < eanLines.length) {
          const format = formatMatch[1];
          const ean = eanLines[i + 1];
          if (ean && ean.match(/^\d+$/)) {
            eanMap.set(format, ean);
          }
        }
      }
    }

    // Match formats with their EAN codes
    for (let i = 0; i < formatList.length; i++) {
      const format = formatList[i];
      const formatKey = format.replace(/[^\d]/g, ''); // Extract numbers from format
      const ean = eanMap.get(formatKey);
      formats.push({
        formato: format,
        codice_ean: ean,
        _key: generateUniqueKey(format, i)
      });
    }
  } else {
    // Single EAN for all formats or no EAN
    const singleEAN = eanText && eanText.trim() !== "" && eanText !== "/" ? eanText.trim() : undefined;

    for (let i = 0; i < formatList.length; i++) {
      const format = formatList[i];
      formats.push({
        formato: format,
        codice_ean: singleEAN,
        _key: generateUniqueKey(format, i)
      });
    }
  }

  return formats;
};

// Function to safely read directory contents
const readImageDirectory = (dirPath: string): string[] => {
  try {
    if (fs.existsSync(dirPath)) {
      return fs.readdirSync(dirPath);
    }
  } catch (err) {
    console.warn(`Warning: Could not read image directory ${dirPath}:`, err);
  }
  return [];
};

// Function to upload an image asset to Sanity
const uploadImageAsset = async (filePath: string): Promise<string | null> => {
  try {
    console.log(`Uploading image: ${path.basename(filePath)}`);
    const imageAsset = await client.assets.upload(
      "image",
      fs.createReadStream(filePath),
      {
        filename: path.basename(filePath),
      }
    );
    console.log(`Uploaded image asset: ${imageAsset._id}`);
    return imageAsset._id;
  } catch (err) {
    logError(`Error uploading image ${filePath}: ${err}`);
    return null;
  }
};

// Function to check if a value should be ignored (empty or "/" or similar)
const shouldIgnoreValue = (value: string): boolean => {
  if (!value) return true;
  const cleanValue = value.trim();
  return cleanValue === "" || cleanValue === "/" || cleanValue === "N/A" || cleanValue === "n/a";
};

// Main function to import data
async function importData() {
  try {
    console.log("Starting import process...");

    // !!! DANGER ZONE: Optionally delete existing data !!!
    if (DELETE_EXISTING_DATA) {
      console.warn("DELETING ALL EXISTING PRODUCTS AND CATEGORIES...");
      try {
        await client.delete({ query: '*[_type == "prodotto"]' });
        console.log("Deleted existing products.");
        await client.delete({ query: '*[_type == "categoria"]' });
        console.log("Deleted existing categories.");
      } catch (delErr) {
        logError(`Error deleting existing data: ${delErr}`);
        return; // Stop import if deletion fails
      }
      console.warn("Deletion complete.");
    } else {
      console.log(
        "Skipping deletion of existing data (DELETE_EXISTING_DATA is false)."
      );
    }

    // Read and Parse CSV
    console.log(`Reading CSV from: ${CSV_FILE_PATH}`);
    if (!fs.existsSync(CSV_FILE_PATH)) {
      logError(`CSV file not found at ${CSV_FILE_PATH}`);
      return;
    }
    const fileContent = fs.readFileSync(CSV_FILE_PATH, { encoding: "utf-8" });
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      ltrim: true,
      rtrim: true,
    });
    console.log(`Parsed ${records.length} records from CSV.`);

    // --- Step 1: Create Categories ---
    console.log("Processing categories...");
    const categoriesFromCSV = new Set<string>();
    records.forEach((record: any) => {
      if (record.Categoria) {
        categoriesFromCSV.add(record.Categoria.trim());
      }
    });

    const categoryMap = new Map<string, { id: string; slug: string }>(); // Store ID and slug
    const categoryImageMap = new Map<string, string>(); // Store categoryId -> first image asset ID

    console.log(`Found ${categoriesFromCSV.size} unique categories in CSV`);
    for (const categoryName of Array.from(categoriesFromCSV)) {
      const capitalizedName = capitalizeWords(categoryName);
      const categorySlug = createSlug(capitalizedName);

      // Check if category already exists (in case deletion was skipped)
      const existingCategory = await client.fetch(
        `*[_type == "categoria" && slug.current == $slug][0]{_id}`,
        { slug: categorySlug }
      );

      if (existingCategory) {
        console.log(
          `Category already exists: ${capitalizedName} (${existingCategory._id})`
        );
        categoryMap.set(categoryName, {
          id: existingCategory._id,
          slug: categorySlug,
        });
        continue;
      }

      try {
        const newCategory = await client.create({
          _type: "categoria",
          nome: capitalizedName,
          descrizione: `Categoria per i prodotti di tipo ${capitalizedName}`,
          slug: { _type: "slug", current: categorySlug },
          // immagine field will be added later
        });
        console.log(
          `Created category: ${capitalizedName} (${newCategory._id})`
        );
        categoryMap.set(categoryName, {
          id: newCategory._id,
          slug: categorySlug,
        });
      } catch (error) {
        logError(`Error creating category ${capitalizedName}: ${error}`);
      }
    }
    console.log("Category processing finished.");

    // --- Step 2: Create Products ---
    console.log("Processing products...");
    let successCount = 0;
    let errorCount = 0;

    for (const record of records) {
      if (!record.Nome || !record.Nome.trim()) {
        console.warn("Skipping record without a valid name.");
        continue;
      }

      const capitalizedName = capitalizeWords(record.Nome.trim());
      const productSlug = createSlug(capitalizedName);

      // Skip if product already exists (in case deletion was skipped)
      const existingProduct = await client.fetch(
        `*[_type == "prodotto" && slug.current == $slug][0]{_id}`,
        { slug: productSlug }
      );
      if (existingProduct) {
        console.log(
          `Product already exists (skipped deletion?): ${capitalizedName}`
        );
        continue;
      }

      // Prepare Product Data
      const categoryInfo = record.Categoria
        ? categoryMap.get(record.Categoria.trim())
        : null;
      const categoryId = categoryInfo?.id;
      const categorySlugForPath = categoryInfo?.slug;

      // Parse Brands
      const marchiText = record.MARCHI || "";
      const marchiArray = marchiText
        .split("\n")
        .map((m: string) => m.trim())
        .filter(Boolean);
      const marchi = {
        prodotto_di_montagna: marchiArray.includes("Prodotto di Montagna") || marchiArray.includes("prodotto di montagna"),
        senza_ammollo: marchiArray.includes("Senza Ammollo"),
        senza_cereali: marchiArray.includes("Senza Cereali"),
        riso_italiano: marchiArray.includes("100% Riso Italiano"),
        varieta_antica: marchiArray.includes("Varietà Antica"),
        macinato_a_pietra: marchiArray.includes("Macinata a Pietra"),
        decorticato_a_pietra:
          marchiArray.includes("Decorticato a Pietra") ||
          marchiArray.includes("Perlato a Pietra"),
        pianificabile_superiore: marchiArray.includes("Panificabile Superiore"),
      };

      // Parse Formats and EAN codes
      const formatsWithEAN = parseFormatsAndEAN(record.Formati || "", record["codice EAN"] || "");

      // --- Find and Upload Images (using enhanced matching logic) ---
      const productImages = [];
      const imageVariations = generateImageMatchVariations(capitalizedName);

      console.log(
        `Searching for images for '${capitalizedName}' with variations: [${imageVariations.join(", ")}]`
      );

      // Search in the main images directory (flat structure)
      const filesInDir = readImageDirectory(IMAGE_BASE_DIR);
      let imagesFound = false;

      for (const fileName of filesInDir) {
        const fileBaseName = path.parse(fileName).name;
        const imageMatchKey = generateImageMatchKey(fileBaseName);

        // Check if any variation matches - be more strict about matching
        for (const variation of imageVariations) {
          let isMatch = false;

          // Exact match
          if (imageMatchKey === variation) {
            isMatch = true;
          }
          // For longer variations (>4 chars), allow contains matching
          else if (variation.length > 4 && imageMatchKey.includes(variation)) {
            isMatch = true;
          }
          // For shorter variations, be more strict - only if the image key starts with it
          else if (variation.length <= 4 && imageMatchKey.startsWith(variation)) {
            isMatch = true;
          }

          if (isMatch) {
            console.log(`  MATCH FOUND: ${fileName} (matched with variation: ${variation})`);
            const imagePath = path.join(IMAGE_BASE_DIR, fileName);
            const assetId = await uploadImageAsset(imagePath);
            if (assetId) {
              productImages.push({
                _type: "immagine",
                _key: generateUniqueKey(fileName, productImages.length),
                asset: { _type: "reference", _ref: assetId },
                alt: capitalizedName,
              });

              // Store the first image for the category
              if (categoryId && !categoryImageMap.has(categoryId)) {
                categoryImageMap.set(categoryId, assetId);
              }
              imagesFound = true;
            }
            break; // Found a match, no need to check other variations
          }
        }
      }

      if (!imagesFound) {
        const errorMsg = `WARN: No images found for product: ${capitalizedName} (slug: ${productSlug}, variations: [${imageVariations.join(", ")}])`;
        console.warn(errorMsg);
        logError(errorMsg);
      }

      // Create Product Document
      try {
        const productDocument = {
          _type: "prodotto",
          nome: capitalizedName,
          descrizione: record.Descrizione || "",
          slug: { _type: "slug", current: productSlug },
          scadenza: record.Scadenza || "",
          pezzi: parseInt(record["Pezzi per cartone"]) || null,
          formati: formatsWithEAN.length > 0 ? formatsWithEAN : undefined,
          categoria: categoryId
            ? { _type: "reference", _ref: categoryId }
            : undefined,
          umidita: shouldIgnoreValue(record.umidità)
            ? null
            : record.umidità
              ? parseInt(record.umidità.replace(/[^0-9]/g, "")) || null
              : null,
          marchi: marchi,
          valori_nutrizionali: shouldIgnoreValue(record["VALORI NUTRIZIONALI MEDI \nper 100 g di prodotto:"])
            ? ""
            : record["VALORI NUTRIZIONALI MEDI \nper 100 g di prodotto:"] || "",
          allergeni: shouldIgnoreValue(record.allergeni)
            ? ""
            : record.allergeni || "",
          immagini: productImages.length > 0 ? productImages : undefined,
        };

        const newProduct = await client.create(productDocument);
        console.log(
          `SUCCESS: Created product: ${capitalizedName} (${newProduct._id}) with ${productImages.length} images and ${formatsWithEAN.length} formats.`
        );
        successCount++;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        const errorMsg = `Error creating product ${capitalizedName}: ${errorMessage.substring(0, 500)}`;
        logError(errorMsg);
        logError(`Data for failed product (${capitalizedName}): ${JSON.stringify({
          name: capitalizedName,
          slug: productSlug,
          category: record.Categoria,
          categoryId: categoryId,
        })}`);
        errorCount++;
      }
    }
    console.log("Product processing finished.");

    // --- Step 3: Update Category Images ---
    console.log("Updating category images...");
    for (const [catName, catInfo] of Array.from(categoryMap.entries())) {
      const imageAssetId = categoryImageMap.get(catInfo.id);
      if (imageAssetId) {
        try {
          await client
            .patch(catInfo.id)
            .set({
              immagine: {
                _type: "image",
                asset: { _type: "reference", _ref: imageAssetId },
              },
            })
            .commit();
          console.log(
            `Updated image for category: ${capitalizeWords(catName)}`
          );
        } catch (patchError) {
          logError(`Error updating image for category ${capitalizeWords(catName)} (${catInfo.id}): ${patchError}`);
        }
      } else {
        console.warn(
          `No image found to assign to category: ${capitalizeWords(catName)}`
        );
      }
    }
    console.log("Category image update finished.");

    console.log(`
--- Import Summary --- 
Total Records in CSV: ${records.length}
Products Created: ${successCount}
Products Skipped/Failed: ${errorCount}
Categories Created: ${categoryMap.size}
Categories Updated with Image: ${categoryImageMap.size}
Error Log File: ${ERROR_LOG_FILE}
----------------------`);
  } catch (error) {
    logError(`Import failed: ${error}`);
  }
}

// Run the import
importData();

