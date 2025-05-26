"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sync_1 = require("csv-parse/sync");
const sanity_client_1 = __importDefault(require("../sanity/sanity.client"));
const slugify_1 = __importDefault(require("slugify"));
// --- Configuration ---
const CSV_FILE_PATH = path_1.default.join(process.cwd(), "prodotticsv", "prodotti.csv");
const IMAGE_BASE_DIR = path_1.default.join(process.cwd(), "immagini");
const DELETE_EXISTING_DATA = true; // !!! SET TO true TO DELETE EXISTING PRODUCTS/CATEGORIES !!!
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
const capitalizeWords = (text) => {
    if (!text)
        return "";
    return text
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
};
// Function to create a Sanity slug
const createSlug = (text) => {
    return (0, slugify_1.default)(text, { lower: true, strict: true });
};
// --- Functions for generating match keys ---
const generateProductMatchKey = (productName) => {
    let key = productName.trim();
    for (const prefix of PRODUCT_PREFIXES_TO_REMOVE) {
        if (key.toLowerCase().startsWith(prefix.toLowerCase())) {
            key = key.substring(prefix.length);
            break; // Remove only the first matching prefix
        }
    }
    return key.toLowerCase().replace(/\s+/g, "");
};
const generateImageMatchKey = (fileNameWithoutExt) => {
    return fileNameWithoutExt
        .toLowerCase()
        .replace(/\s+/g, "") // Remove spaces
        .replace(/\d+$/, ""); // Remove trailing numbers
};
// Function to safely read directory contents
const readImageDirectory = (dirPath) => {
    try {
        if (fs_1.default.existsSync(dirPath)) {
            return fs_1.default.readdirSync(dirPath);
        }
    }
    catch (err) {
        console.warn(`Warning: Could not read image directory ${dirPath}:`, err);
    }
    return [];
};
// Function to upload an image asset to Sanity
const uploadImageAsset = async (filePath) => {
    try {
        console.log(`Uploading image: ${path_1.default.basename(filePath)}`);
        const imageAsset = await sanity_client_1.default.assets.upload("image", fs_1.default.createReadStream(filePath), {
            filename: path_1.default.basename(filePath),
        });
        console.log(`Uploaded image asset: ${imageAsset._id}`);
        return imageAsset._id;
    }
    catch (err) {
        console.error(`Error uploading image ${filePath}:`, err);
        return null;
    }
};
// Main function to import data
async function importData() {
    try {
        console.log("Starting import process...");
        // !!! DANGER ZONE: Optionally delete existing data !!!
        if (DELETE_EXISTING_DATA) {
            console.warn("DELETING ALL EXISTING PRODUCTS AND CATEGORIES...");
            try {
                await sanity_client_1.default.delete({ query: '*[_type == "prodotto"]' });
                console.log("Deleted existing products.");
                await sanity_client_1.default.delete({ query: '*[_type == "categoria"]' });
                console.log("Deleted existing categories.");
            }
            catch (delErr) {
                console.error("Error deleting existing data:", delErr);
                return; // Stop import if deletion fails
            }
            console.warn("Deletion complete.");
        }
        else {
            console.log("Skipping deletion of existing data (DELETE_EXISTING_DATA is false).");
        }
        // Read and Parse CSV
        console.log(`Reading CSV from: ${CSV_FILE_PATH}`);
        if (!fs_1.default.existsSync(CSV_FILE_PATH)) {
            console.error(`CSV file not found at ${CSV_FILE_PATH}`);
            return;
        }
        const fileContent = fs_1.default.readFileSync(CSV_FILE_PATH, { encoding: "utf-8" });
        const records = (0, sync_1.parse)(fileContent, {
            columns: true,
            skip_empty_lines: true,
            ltrim: true,
            rtrim: true,
        });
        console.log(`Parsed ${records.length} records from CSV.`);
        // --- Step 1: Create Categories ---
        console.log("Processing categories...");
        const categoriesFromCSV = new Set();
        records.forEach((record) => {
            if (record.Categoria) {
                categoriesFromCSV.add(record.Categoria.trim());
            }
        });
        const categoryMap = new Map(); // Store ID and slug
        const categoryImageMap = new Map(); // Store categoryId -> first image asset ID
        console.log(`Found ${categoriesFromCSV.size} unique categories in CSV`);
        for (const categoryName of Array.from(categoriesFromCSV)) {
            const capitalizedName = capitalizeWords(categoryName);
            const categorySlug = createSlug(capitalizedName);
            // Check if category already exists (in case deletion was skipped)
            const existingCategory = await sanity_client_1.default.fetch(`*[_type == "categoria" && slug.current == $slug][0]{_id}`, { slug: categorySlug });
            if (existingCategory) {
                console.log(`Category already exists: ${capitalizedName} (${existingCategory._id})`);
                categoryMap.set(categoryName, {
                    id: existingCategory._id,
                    slug: categorySlug,
                });
                continue;
            }
            try {
                const newCategory = await sanity_client_1.default.create({
                    _type: "categoria",
                    nome: capitalizedName,
                    descrizione: `Categoria per i prodotti di tipo ${capitalizedName}`,
                    slug: { _type: "slug", current: categorySlug },
                    // immagine field will be added later
                });
                console.log(`Created category: ${capitalizedName} (${newCategory._id})`);
                categoryMap.set(categoryName, {
                    id: newCategory._id,
                    slug: categorySlug,
                });
            }
            catch (error) {
                console.error(`Error creating category ${capitalizedName}:`, error);
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
            const productMatchKey = generateProductMatchKey(capitalizedName);
            // Skip if product already exists (in case deletion was skipped)
            const existingProduct = await sanity_client_1.default.fetch(`*[_type == "prodotto" && slug.current == $slug][0]{_id}`, { slug: productSlug });
            if (existingProduct) {
                console.log(`Product already exists (skipped deletion?): ${capitalizedName}`);
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
                .map((m) => m.trim())
                .filter(Boolean);
            const marchi = {
                prodotto_di_montagna: marchiArray.includes("Prodotto di Montagna"),
                senza_ammollo: marchiArray.includes("Senza Ammollo"),
                senza_cereali: marchiArray.includes("Senza Cereali"),
                riso_italiano: marchiArray.includes("100% Riso Italiano"), // Match exact text from CSV example
                varieta_antica: marchiArray.includes("Varietà Antica"),
                macinato_a_pietra: marchiArray.includes("Macinata a Pietra"),
                decorticato_a_pietra: marchiArray.includes("Decorticato a Pietra") ||
                    marchiArray.includes("Perlato a Pietra"), // Handle variation
                pianificabile_superiore: marchiArray.includes("Panificabile Superiore"),
            };
            // Parse Formats
            const formati = record.Formati
                ? record.Formati.split("/")
                    .map((f) => f.trim())
                    .filter(Boolean)
                : [];
            // --- Find and Upload Images (using new matching logic) ---
            const productImages = [];
            if (categorySlugForPath) {
                const imageDir = path_1.default.join(IMAGE_BASE_DIR, categorySlugForPath);
                const filesInDir = readImageDirectory(imageDir);
                console.log(`Searching for images for '${capitalizedName}' (key: ${productMatchKey}) in ${imageDir}`);
                for (const fileName of filesInDir) {
                    const fileBaseName = path_1.default.parse(fileName).name;
                    const imageMatchKey = generateImageMatchKey(fileBaseName);
                    // console.log(`  Checking image: ${fileName} (key: ${imageMatchKey})`); // Verbose logging for debugging
                    if (imageMatchKey === productMatchKey) {
                        console.log(`  MATCH FOUND: ${fileName}`);
                        const imagePath = path_1.default.join(imageDir, fileName);
                        const assetId = await uploadImageAsset(imagePath);
                        if (assetId) {
                            // --- Correct structure: Use named type from schema 'of' array ---
                            productImages.push({
                                _type: "immagine", // Use the name from the schema 'of' array
                                _key: assetId, // Unique key for the array item
                                asset: { _type: "reference", _ref: assetId }, // Asset reference
                                alt: capitalizedName, // Add default alt text directly
                            });
                            // --- End structure correction ---
                            // Store the first image for the category
                            if (categoryId && !categoryImageMap.has(categoryId)) {
                                categoryImageMap.set(categoryId, assetId);
                            }
                        }
                    }
                }
            }
            if (productImages.length === 0) {
                console.warn(`WARN: No images found for product: ${capitalizedName} (slug: ${productSlug}, key: ${productMatchKey}) in category folder: ${categorySlugForPath}`);
            }
            // --- End Image Handling ---
            // Create Product Document
            try {
                const productDocument = {
                    _type: "prodotto",
                    nome: capitalizedName,
                    descrizione: record.Descrizione || "",
                    slug: { _type: "slug", current: productSlug },
                    codice_ean: record["codice EAN"] || "",
                    scadenza: record.Scadenza || "",
                    pezzi: parseInt(record["Pezzi per cartone"]) || null, // Use null if NaN
                    formati: formati,
                    categoria: categoryId
                        ? { _type: "reference", _ref: categoryId }
                        : undefined,
                    umidita: record.umidità
                        ? parseInt(record.umidità.replace(/[^0-9]/g, "")) || null
                        : null,
                    marchi: marchi,
                    valori_nutrizionali: record["VALORI NUTRIZIONALI MEDI \nper 100 g di prodotto:"] || "",
                    immagini: productImages.length > 0 ? productImages : undefined, // Add images array
                };
                const newProduct = await sanity_client_1.default.create(productDocument);
                console.log(`SUCCESS: Created product: ${capitalizedName} (${newProduct._id}) with ${productImages.length} images.`);
                successCount++;
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                console.error(`Error creating product ${capitalizedName}:`, errorMessage.substring(0, 500)); // Log truncated error
                console.error(`Data for failed product (${capitalizedName}):`, JSON.stringify({
                    name: capitalizedName,
                    slug: productSlug,
                    category: record.Categoria,
                    categoryId: categoryId,
                }));
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
                    await sanity_client_1.default
                        .patch(catInfo.id)
                        .set({
                        immagine: {
                            _type: "image",
                            asset: { _type: "reference", _ref: imageAssetId },
                        },
                    })
                        .commit();
                    console.log(`Updated image for category: ${capitalizeWords(catName)}`);
                }
                catch (patchError) {
                    console.error(`Error updating image for category ${capitalizeWords(catName)} (${catInfo.id}):`, patchError);
                }
            }
            else {
                console.warn(`No image found to assign to category: ${capitalizeWords(catName)}`);
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
----------------------`);
    }
    catch (error) {
        console.error("Import failed:", error);
    }
}
// Run the import
importData();
