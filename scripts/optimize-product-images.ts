/**
 * Script per ottimizzare le immagini di un prodotto Sanity
 * 
 * Uso: npx tsx scripts/optimize-product-images.ts <slug-prodotto> [--dry-run]
 * 
 * Cosa fa:
 * 1. Recupera il prodotto da Sanity tramite slug
 * 2. Per ogni immagine, controlla se pesa > 700KB
 * 3. Se sì: scarica, comprimi in webp con sharp (resize 50%), uploada su Sanity
 * 4. Aggiorna il documento prodotto con la nuova immagine
 * 
 * Opzioni:
 * --dry-run: mostra cosa farebbe senza eseguire modifiche
 */

import { createClient } from '@sanity/client';
import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

// ============ CONFIGURAZIONE ============
const SANITY_PROJECT_ID = 'l173g37c';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2024-07-02';
const SANITY_TOKEN = 'skzjWWViQEhN6ofspHLqwXIckHktW1hfMx8BgzyFNI78eR7eMWOEguLusv1eonJqw09iOzHQIa2xNIXq9EhAXiCLSLfbn5tgSYD5ROdkQD9m7xnEjIq6TlKehM1063mRZ7IKM1QiDC1wi0BCG8vpuYF8ZiGPJBIXYfGOGh0CBgrhY8FkPO0S';

const SIZE_THRESHOLD_KB = 700;
const RESIZE_PERCENTAGE = 50;
const WEBP_QUALITY = 80;

// ============ CLIENT SANITY ============
const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  token: SANITY_TOKEN,
  useCdn: false,
});

// ============ UTILITY ============
function log(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') {
  const colors = {
    info: '\x1b[36m',    // cyan
    success: '\x1b[32m', // green
    warning: '\x1b[33m', // yellow
    error: '\x1b[31m',   // red
  };
  const reset = '\x1b[0m';
  const prefix = {
    info: '[INFO]',
    success: '[OK]',
    warning: '[WARN]',
    error: '[ERROR]',
  };
  console.log(`${colors[type]}${prefix[type]}${reset} ${message}`);
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

async function askConfirmation(question: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  return new Promise((resolve) => {
    rl.question(`${question} (y/n): `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

// ============ FUNZIONI PRINCIPALI ============

interface SanityImage {
  _key: string;
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

interface Product {
  _id: string;
  nome: string;
  slug: { current: string };
  immagini: SanityImage[];
}

interface AssetInfo {
  _id: string;
  url: string;
  originalFilename: string;
  size: number;
  width: number;
  height: number;
  format: string;
}

async function getProduct(slug: string): Promise<Product | null> {
  const query = `*[_type == "prodotto" && slug.current == $slug][0]{
    _id,
    nome,
    slug,
    immagini
  }`;
  return client.fetch(query, { slug });
}

/**
 * Costruisce le info dell'asset direttamente dal ref.
 * Il ref ha formato: image-<hash>-<width>x<height>-<format>
 * Esempio: image-201c4a57594be26e66a5446820a55e7083a337f2-4624x3472-jpg
 */
async function getAssetInfo(assetRef: string): Promise<AssetInfo | null> {
  // Parse del ref: image-<hash>-<width>x<height>-<format>
  const match = assetRef.match(/^image-([a-f0-9]+)-(\d+)x(\d+)-(\w+)$/);
  if (!match) {
    log(`Formato ref non riconosciuto: ${assetRef}`, 'error');
    return null;
  }
  
  const [, hash, widthStr, heightStr, format] = match;
  const width = parseInt(widthStr, 10);
  const height = parseInt(heightStr, 10);
  
  // Costruisci URL Sanity CDN
  const url = `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${hash}-${width}x${height}.${format}`;
  
  // Query Sanity per ottenere il nome originale del file
  const assetId = `image-${hash}-${width}x${height}-${format}`;
  let originalFilename = `${hash}.${format}`; // fallback
  
  try {
    const assetData = await client.fetch(
      `*[_type == "sanity.imageAsset" && _id == $assetId][0]{ originalFilename }`,
      { assetId }
    );
    if (assetData?.originalFilename) {
      originalFilename = assetData.originalFilename;
    }
  } catch {
    // Se la query fallisce, usiamo l'hash come nome
    log(`Impossibile recuperare nome originale, uso hash`, 'warning');
  }
  
  // Fai HEAD request per ottenere la dimensione del file
  try {
    const response = await fetch(url, { method: 'HEAD' });
    if (!response.ok) {
      log(`Impossibile raggiungere l'immagine: ${response.status} ${response.statusText}`, 'error');
      return null;
    }
    
    const contentLength = response.headers.get('content-length');
    const size = contentLength ? parseInt(contentLength, 10) : 0;
    
    return {
      _id: assetRef,
      url,
      originalFilename,
      size,
      width,
      height,
      format,
    };
  } catch (error) {
    log(`Errore nel recuperare info asset: ${error}`, 'error');
    return null;
  }
}

async function downloadImage(url: string): Promise<Buffer> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function optimizeImage(
  imageBuffer: Buffer,
  originalWidth: number,
  originalHeight: number
): Promise<Buffer> {
  const newWidth = Math.round(originalWidth * (RESIZE_PERCENTAGE / 100));
  const newHeight = Math.round(originalHeight * (RESIZE_PERCENTAGE / 100));
  
  log(`Ridimensionamento: ${originalWidth}x${originalHeight} -> ${newWidth}x${newHeight}`);
  
  return sharp(imageBuffer)
    .resize(newWidth, newHeight, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toBuffer();
}

async function uploadImage(
  imageBuffer: Buffer,
  filename: string
): Promise<{ _id: string; url: string }> {
  // Assicuriamoci che il filename abbia estensione .webp
  const webpFilename = filename.replace(/\.[^.]+$/, '.webp');
  
  const asset = await client.assets.upload('image', imageBuffer, {
    filename: webpFilename,
    contentType: 'image/webp',
  });
  
  return {
    _id: asset._id,
    url: asset.url,
  };
}

async function updateProductImage(
  productId: string,
  imageIndex: number,
  newAssetId: string
): Promise<void> {
  await client
    .patch(productId)
    .set({
      [`immagini[${imageIndex}].asset._ref`]: newAssetId.replace('image.', 'image-').replace(/\.(\w+)$/, '-$1'),
    })
    .commit();
}

// ============ MAIN ============

async function main() {
  console.log('\n========================================');
  console.log('   OTTIMIZZATORE IMMAGINI PRODOTTI');
  console.log('========================================\n');
  
  // Parsing argomenti
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const slug = args.find(arg => !arg.startsWith('--'));
  
  if (!slug) {
    log('Uso: npx tsx scripts/optimize-product-images.ts <slug-prodotto> [--dry-run]', 'error');
    log('Esempio: npx tsx scripts/optimize-product-images.ts farro-decorticato', 'info');
    process.exit(1);
  }
  
  if (dryRun) {
    log('MODALITA\' DRY-RUN: nessuna modifica verra\' applicata\n', 'warning');
  }
  
  // 1. Recupera il prodotto
  log(`Cerco prodotto con slug: "${slug}"...`);
  const product = await getProduct(slug);
  
  if (!product) {
    log(`Prodotto con slug "${slug}" non trovato!`, 'error');
    process.exit(1);
  }
  
  log(`Trovato: ${product.nome} (ID: ${product._id})`, 'success');
  
  if (!product.immagini || product.immagini.length === 0) {
    log('Il prodotto non ha immagini.', 'warning');
    process.exit(0);
  }
  
  log(`Numero immagini: ${product.immagini.length}\n`);
  
  // 2. Crea cartella backup temporanea
  const backupDir = path.join(process.cwd(), 'scripts', '.backup', slug);
  if (!dryRun) {
    fs.mkdirSync(backupDir, { recursive: true });
    log(`Cartella backup: ${backupDir}\n`, 'info');
  }
  
  // 3. Analizza e ottimizza ogni immagine
  let optimizedCount = 0;
  let skippedCount = 0;
  
  for (let i = 0; i < product.immagini.length; i++) {
    const image = product.immagini[i];
    console.log(`\n--- Immagine ${i + 1}/${product.immagini.length} ---`);
    
    if (!image.asset?._ref) {
      log('Immagine senza asset reference, skip.', 'warning');
      skippedCount++;
      continue;
    }
    
    // Ottieni info asset
    const assetInfo = await getAssetInfo(image.asset._ref);
    if (!assetInfo) {
      log(`Impossibile ottenere info per asset: ${image.asset._ref}`, 'error');
      skippedCount++;
      continue;
    }
    
    const sizeKB = assetInfo.size / 1024;
    log(`File: ${assetInfo.originalFilename || 'senza nome'}`);
    log(`URL: ${assetInfo.url}`);
    log(`Dimensione: ${formatBytes(assetInfo.size)} (${sizeKB.toFixed(2)} KB)`);
    log(`Risoluzione: ${assetInfo.width}x${assetInfo.height}`);
    
    if (sizeKB <= SIZE_THRESHOLD_KB) {
      log(`Sotto la soglia di ${SIZE_THRESHOLD_KB} KB, skip.`, 'success');
      skippedCount++;
      continue;
    }
    
    log(`SOPRA la soglia di ${SIZE_THRESHOLD_KB} KB - DA OTTIMIZZARE`, 'warning');
    
    if (dryRun) {
      log('[DRY-RUN] Questa immagine verrebbe ottimizzata', 'info');
      optimizedCount++;
      continue;
    }
    
    // Chiedi conferma
    const confirm = await askConfirmation(`Vuoi ottimizzare questa immagine?`);
    if (!confirm) {
      log('Saltata per scelta utente', 'warning');
      skippedCount++;
      continue;
    }
    
    try {
      // Download immagine originale
      log('Scaricando immagine originale...');
      const originalBuffer = await downloadImage(assetInfo.url);
      
      // Salva backup
      const backupFilename = `${i + 1}_${assetInfo.originalFilename || 'image'}`;
      fs.writeFileSync(path.join(backupDir, backupFilename), originalBuffer);
      log(`Backup salvato: ${backupFilename}`, 'success');
      
      // Ottimizza
      log('Ottimizzando immagine...');
      const optimizedBuffer = await optimizeImage(
        originalBuffer,
        assetInfo.width,
        assetInfo.height
      );
      
      log(`Dimensione originale: ${formatBytes(originalBuffer.length)}`);
      log(`Dimensione ottimizzata: ${formatBytes(optimizedBuffer.length)}`);
      log(`Riduzione: ${((1 - optimizedBuffer.length / originalBuffer.length) * 100).toFixed(1)}%`);
      
      // Chiedi conferma finale prima di sostituire
      const confirmReplace = await askConfirmation('Confermi la sostituzione su Sanity?');
      if (!confirmReplace) {
        log('Sostituzione annullata', 'warning');
        skippedCount++;
        continue;
      }
      
      // Upload nuova immagine
      log('Caricando immagine ottimizzata su Sanity...');
      const newAsset = await uploadImage(
        optimizedBuffer,
        assetInfo.originalFilename || `image_${i + 1}.webp`
      );
      log(`Nuovo asset creato: ${newAsset._id}`, 'success');
      
      // Aggiorna riferimento nel prodotto
      log('Aggiornando riferimento nel prodotto...');
      await updateProductImage(product._id, i, newAsset._id);
      log('Prodotto aggiornato!', 'success');
      
      optimizedCount++;
      
    } catch (error) {
      log(`Errore durante l'ottimizzazione: ${error}`, 'error');
      skippedCount++;
    }
  }
  
  // Riepilogo
  console.log('\n========================================');
  console.log('              RIEPILOGO');
  console.log('========================================');
  log(`Prodotto: ${product.nome}`);
  log(`Immagini totali: ${product.immagini.length}`);
  log(`Ottimizzate: ${optimizedCount}`, optimizedCount > 0 ? 'success' : 'info');
  log(`Saltate: ${skippedCount}`, skippedCount > 0 ? 'warning' : 'info');
  
  if (!dryRun && optimizedCount > 0) {
    log(`\nBackup salvati in: ${backupDir}`, 'info');
  }
  
  console.log('\n');
}

main().catch((error) => {
  log(`Errore fatale: ${error.message}`, 'error');
  console.error(error);
  process.exit(1);
});
