import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const printUrl = `${url.protocol}//${url.host}/catalogo/print`;
    console.log(`Generating PDF from URL: ${printUrl}`);

    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--font-render-hinting=none',
      ],
    });

    const page = await browser.newPage();

    // Set viewport per assicurarsi che il layout sia corretto
    // deviceScaleFactor ridotto a 1 per ottimizzare le dimensioni del PDF
    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 1,
    });

    // Imposta timeout per la pagina
    page.setDefaultTimeout(120000); // 2 minuti

    await page.goto(printUrl, {
      waitUntil: 'networkidle0',
      timeout: 120000, // 2 minuti di timeout per il caricamento della pagina
    });

    // Funzione per attendere il caricamento di tutte le immagini
    await page.evaluate(async () => {
      // Trova tutte le immagini nella pagina
      const images = Array.from(document.querySelectorAll('img'));
      
      // Crea una promise per ogni immagine che deve caricarsi
      const imagePromises = images.map((img) => {
        return new Promise<void>((resolve) => {
          // Se l'immagine è già caricata, risolvi subito
          if (img.complete && img.naturalHeight !== 0) {
            resolve();
            return;
          }
          
          // Altrimenti attendi l'evento load o error
          const timeout = setTimeout(() => resolve(), 10000); // Timeout di 10 secondi per immagine
          
          img.addEventListener('load', () => {
            clearTimeout(timeout);
            resolve();
          });
          
          img.addEventListener('error', () => {
            clearTimeout(timeout);
            resolve();
          });
        });
      });
      
      // Attendi che tutte le immagini siano caricate
      await Promise.all(imagePromises);
    });

    // Scorrimento della pagina per assicurarsi che tutto il contenuto lazy-loaded sia caricato
    await page.evaluate(async () => {
      await new Promise<void>((resolve) => {
        let lastHeight = -1;
        const maxScrolls = 100;
        let scrolls = 0;

        const scrollInterval = setInterval(() => {
          const newHeight = document.body.scrollHeight;
          if (newHeight === lastHeight || scrolls >= maxScrolls) {
            clearInterval(scrollInterval);
            // Torna all'inizio della pagina
            window.scrollTo(0, 0);
            resolve();
          } else {
            window.scrollTo(0, newHeight);
            lastHeight = newHeight;
            scrolls++;
          }
        }, 300);
      });
    });

    // Attendi di nuovo il caricamento delle immagini dopo lo scroll
    await page.evaluate(async () => {
      const images = Array.from(document.querySelectorAll('img'));
      
      const imagePromises = images.map((img) => {
        return new Promise<void>((resolve) => {
          if (img.complete && img.naturalHeight !== 0) {
            resolve();
            return;
          }
          
          const timeout = setTimeout(() => resolve(), 10000);
          
          img.addEventListener('load', () => {
            clearTimeout(timeout);
            resolve();
          });
          
          img.addEventListener('error', () => {
            clearTimeout(timeout);
            resolve();
          });
        });
      });
      
      await Promise.all(imagePromises);
    });

    // Attesa finale per rendering dei barcode e stabilizzazione del layout
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0cm',
        right: '0cm',
        bottom: '0cm',
        left: '0cm',
      },
      timeout: 120000, // 2 minuti di timeout
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="catalogo-il-pichello.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return new NextResponse('Errore nella generazione del PDF', {
      status: 500,
    });
  }
}
