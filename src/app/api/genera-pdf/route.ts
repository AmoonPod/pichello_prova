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

    await page.goto(printUrl, {
      waitUntil: 'networkidle0',
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
