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
    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 2,
    });

    // Imposta timeout per la pagina
    page.setDefaultTimeout(120000); // 2 minuti

    await page.goto(printUrl, {
      waitUntil: 'networkidle0',
      timeout: 120000, // 2 minuti di timeout per il caricamento della pagina
    });

    // Funzione di scorrimento a prova di proiettile
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let lastHeight = -1;
        const maxScrolls = 100; // Sicurezza per evitare loop infiniti
        let scrolls = 0;

        const scrollInterval = setInterval(() => {
          const newHeight = document.body.scrollHeight;
          if (newHeight === lastHeight || scrolls >= maxScrolls) {
            clearInterval(scrollInterval);
            resolve(undefined);
          } else {
            window.scrollTo(0, newHeight);
            lastHeight = newHeight;
            scrolls++;
          }
        }, 300); // Intervallo più breve per una maggiore reattività
      });
    });

    // Aumentato il tempo di attesa finale per gestire il rendering dei barcode
    await new Promise((resolve) => setTimeout(resolve, 7000));

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
