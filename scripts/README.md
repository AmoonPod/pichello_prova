# Sanity Data Import Scripts

This directory contains scripts to import data into Sanity.

## CSV Product Import Script

The `import-products.ts` script reads product data from a CSV file and imports it into Sanity according to the defined schema.

### Features

- Imports categories first, then products
- Properly sets up references between products and categories
- Handles brand information (marchi) according to schema
- Capitalizes names appropriately
- Creates slugs automatically
- Skips existing entries to avoid duplicates

### Requirements

- Node.js 18 or higher
- CSV file with product data in the correct format

### Setup

1. Navigate to the scripts directory:

   ```
   cd scripts
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Make sure your Sanity project is properly configured in the parent directory.

### Running the Import

```
npm run import
```

### CSV Format

The script expects a CSV file with the following columns:

- Nome: Product name
- Descrizione: Product description
- Scadenza: Expiration information
- Pezzi per cartone: Number of pieces per box
- Formati: Available formats (separated by '/')
- codice EAN: EAN code
- VALORI NUTRIZIONALI MEDI per 100 g di prodotto: Nutritional values
- umidità: Humidity percentage
- MARCHI: List of brands (separated by newlines)
- Categoria: Product category

### Troubleshooting

If you encounter any issues:

1. Check that your CSV file is properly formatted and in UTF-8 encoding
2. Verify that your Sanity client is correctly configured
3. Make sure you have proper permissions to write to your Sanity dataset
