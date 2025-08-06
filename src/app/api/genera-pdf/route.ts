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
