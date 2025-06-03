import { NextRequest, NextResponse } from 'next/server';
import { getProdotti, getCategorie } from '../../../../sanity/sanity.query';
import { ProdottoType, CategoriaType } from '../../../../types';
import puppeteer from 'puppeteer';

export async function GET(request: NextRequest) {
    try {
        // Fetch all data in parallel
        const [prodotti, categorie] = await Promise.all([
            getProdotti(),
            getCategorie()
        ]);

        console.log(`Found ${prodotti.length} products for PDF generation`);

        // Debug: Check if products have images
        const productsWithImages = prodotti.filter((p: ProdottoType) => p.immagini && p.immagini.length > 0);
        console.log(`${productsWithImages.length} products have images`);
        if (productsWithImages.length > 0) {
            const firstImageUrl = productsWithImages[0].immagini[0]?.image;
            const optimizedUrl = firstImageUrl + '?w=120&h=120&fit=crop&auto=format';
            console.log('First product with image:', productsWithImages[0].nome);
            console.log('Original Image URL:', firstImageUrl);
            console.log('Optimized Image URL:', optimizedUrl);
        }

        // Group products by category
        const prodottiPerCategoria = categorie.map((categoria: CategoriaType) => ({
            categoria,
            prodotti: prodotti.filter((p: ProdottoType) => p.categoria === categoria.nome)
        })).filter((group: { categoria: CategoriaType; prodotti: ProdottoType[] }) => group.prodotti.length > 0);

        // Generate HTML for PDF
        const htmlContent = generateCatalogHTML(prodottiPerCategoria);

        // Launch puppeteer and generate PDF
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--no-first-run'
            ]
        });

        const page = await browser.newPage();

        // Enable request interception to handle images better
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            // Allow images but with shorter timeout
            if (request.resourceType() === 'image') {
                // Continue but with optimized headers
                request.continue({
                    headers: {
                        ...request.headers(),
                        'Cache-Control': 'max-age=3600'
                    }
                });
            } else {
                request.continue();
            }
        });

        // Handle response errors
        page.on('response', (response) => {
            if (!response.ok() && response.url().includes('sanity.io')) {
                console.warn(`Failed to load image: ${response.url()} - Status: ${response.status()}`);
            }
        });

        // Set content with longer timeout for images
        await page.setContent(htmlContent, {
            waitUntil: 'networkidle2',
            timeout: 20000
        });

        // Give extra time for images to load
        await new Promise(resolve => setTimeout(resolve, 3000));

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20mm',
                right: '15mm',
                bottom: '20mm',
                left: '15mm'
            },
            timeout: 25000
        });

        await browser.close();

        // Return PDF as download
        return new NextResponse(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="catalogo-il-pichello-${new Date().toISOString().split('T')[0]}.pdf"`,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });

    } catch (error) {
        console.error('Error generating PDF:', error);
        return new NextResponse('Errore nella generazione del PDF', { status: 500 });
    }
}

function generateCatalogHTML(prodottiPerCategoria: { categoria: CategoriaType; prodotti: ProdottoType[] }[]) {
    return `<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; line-height: 1.4; color: #374151; font-size: 12px; }
        .container { max-width: 100%; margin: 0 auto; padding: 15px; }
        .header { background: hsl(19, 100%, 22%); color: white; padding: 20px; margin-bottom: 20px; }
        .header h1 { font-size: 24px; font-weight: bold; margin-bottom: 8px; }
        .header .subtitle { font-size: 14px; opacity: 0.9; margin-bottom: 15px; }
        .contact-info { display: flex; justify-content: space-between; align-items: center; margin-top: 15px; font-size: 11px; }
        .company-info { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; background: #f9fafb; padding: 15px; border: 1px solid #e5e7eb; margin-bottom: 20px; }
        .info-section h3 { font-weight: bold; color: #111827; margin-bottom: 6px; font-size: 13px; }
        .info-section p { color: #6b7280; font-size: 11px; line-height: 1.4; }
        .category-section { margin-bottom: 25px; page-break-inside: avoid; }
        .category-header { background: linear-gradient(135deg, hsl(19, 100%, 22%) 0%, hsl(19, 100%, 18%) 100%); color: white; padding: 12px; margin-bottom: 15px; border-radius: 6px; }
        .category-header h2 { font-size: 18px; font-weight: bold; margin-bottom: 4px; }
        .category-description { font-size: 11px; opacity: 0.9; line-height: 1.4; }
        .product-count { font-size: 10px; opacity: 0.8; margin-top: 4px; }
        .products-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .product { background: white; border: 1px solid #e5e7eb; border-radius: 6px; padding: 12px; page-break-inside: avoid; }
        .product-header { display: flex; gap: 12px; margin-bottom: 10px; }
        .product-image { width: 60px; height: 60px; background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #9ca3af; flex-shrink: 0; overflow: hidden; }
        .product-image img { width: 100%; height: 100%; object-fit: cover; border-radius: 6px; }
        .product-info { flex: 1; min-width: 0; }
        .product-name { font-size: 13px; font-weight: bold; color: #111827; margin-bottom: 4px; line-height: 1.2; }
        .quick-info { display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; margin-bottom: 8px; }
        .info-card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 4px; padding: 6px; }
        .info-label { font-size: 9px; color: #6b7280; margin-bottom: 2px; text-transform: uppercase; letter-spacing: 0.05em; }
        .info-value { font-weight: 600; color: #111827; font-size: 10px; }
        .formats-section { margin-bottom: 8px; }
        .section-title { font-size: 11px; font-weight: bold; color: #111827; margin-bottom: 6px; }
        .format-group { background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border: 1px solid #e5e7eb; border-radius: 4px; padding: 8px; margin-bottom: 4px; }
        .format-content { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
        .formats-list { display: flex; flex-wrap: wrap; gap: 4px; flex: 1; }
        .format-tag { background: hsl(19, 100%, 22%); color: white; padding: 2px 6px; border-radius: 10px; font-size: 9px; font-weight: 500; }
        .ean-section { background: white; border: 1px solid #e5e7eb; border-radius: 4px; padding: 4px; max-width: 80px; }
        .ean-label { font-size: 8px; font-weight: 500; color: #6b7280; margin-bottom: 2px; }
        .ean-code { font-family: 'Courier New', monospace; font-size: 8px; color: #111827; background: #f9fafb; padding: 1px 3px; border-radius: 2px; }
        .certifications { margin-bottom: 8px; }
        .cert-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3px; }
        .cert-item { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 3px; padding: 3px; text-align: center; font-size: 8px; color: #374151; }
        .nutritional-values { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 4px; padding: 8px; }
        .nutrition-row { display: flex; justify-content: space-between; padding: 2px 0; border-bottom: 1px solid #e5e7eb; font-size: 9px; }
        .nutrition-row:last-child { border-bottom: none; }
        .nutrition-label { font-weight: 600; color: #111827; }
        .nutrition-value { color: #6b7280; }
        .footer { margin-top: 30px; padding-top: 15px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 10px; }
        .footer-content { display: flex; justify-content: space-between; align-items: center; }
        .page-break { page-break-before: always; }
        .no-break { page-break-inside: avoid; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header no-break">
            <h1>Azienda Agricola Il Pichello</h1>
            <div class="subtitle">Catalogo Prodotti Biorazionali - Appennino Reggiano dal 1985</div>
            <div class="contact-info">
                <div>Tel: 340/8200080 | 339/7981644 | info@agricolailpichello.it</div>
                <div>Catalogo generato il ${new Date().toLocaleDateString('it-IT')}</div>
            </div>
        </div>

        <div class="company-info no-break">
            <div class="info-section">
                <h3>Indirizzo</h3>
                <p>Via Dante Alighieri 141<br>42033 Marola, Carpineti (RE)<br>Emilia-Romagna</p>
            </div>
            <div class="info-section">
                <h3>Tradizione</h3>
                <p>Dal 1985 - Tradizione e qualità<br>nell'Appennino Reggiano</p>
            </div>
            <div class="info-section">
                <h3>Qualità</h3>
                <p>Prodotti biorazionali<br>certificati e controllati</p>
            </div>
        </div>

        ${prodottiPerCategoria.map((group, categoryIndex) => `
            <div class="category-section ${categoryIndex > 0 ? 'page-break' : ''}">
                <div class="category-header no-break">
                    <h2>${group.categoria.nome}</h2>
                    ${group.categoria.descrizione ? `<div class="category-description">${group.categoria.descrizione}</div>` : ''}
                    <div class="product-count">${group.prodotti.length} prodotti disponibili</div>
                </div>

                <div class="products-grid">
                    ${group.prodotti.map((prodotto) => `
                        <div class="product no-break">
                            <div class="product-header">
                                <div class="product-image">
                                    ${prodotto.immagini && prodotto.immagini.length > 0 && prodotto.immagini[0]?.image
            ? `<img src="${prodotto.immagini[0].image}?w=120&h=120&fit=crop&auto=format" alt="${prodotto.nome}" onerror="this.parentNode.innerHTML='📦';" />`
            : '📦'
        }
                                </div>
                                <div class="product-info">
                                    <div class="product-name">${prodotto.nome}</div>
                                </div>
                            </div>

                            <div class="quick-info">
                                <div class="info-card">
                                    <div class="info-label">Scadenza</div>
                                    <div class="info-value">${prodotto.scadenza || 'N/D'}</div>
                                </div>
                                <div class="info-card">
                                    <div class="info-label">Pezzi</div>
                                    <div class="info-value">${prodotto.pezzi ?? 'N/D'}</div>
                                </div>
                                <div class="info-card">
                                    <div class="info-label">Umidità</div>
                                    <div class="info-value">${prodotto.umidita !== null && prodotto.umidita !== undefined ? `${prodotto.umidita}%` : 'N/D'}</div>
                                </div>
                                <div class="info-card">
                                    <div class="info-label">Categoria</div>
                                    <div class="info-value">${group.categoria.nome}</div>
                                </div>
                            </div>

                            ${prodotto.formati && prodotto.formati.length > 0 ? `
                                <div class="formats-section">
                                    <div class="section-title">Formati Disponibili</div>
                                    ${(() => {
                const groupedFormats = prodotto.formati.reduce((groups: Record<string, string[]>, item: any) => {
                    const ean = (item && item.codice_ean) ? item.codice_ean : 'no-ean';
                    if (!groups[ean]) groups[ean] = [];
                    if (item && item.formato) groups[ean].push(item.formato);
                    return groups;
                }, {} as Record<string, string[]>);

                return Object.entries(groupedFormats).map(([ean, formats]) => `
                                            <div class="format-group">
                                                <div class="format-content">
                                                    <div class="formats-list">
                                                        ${(formats as string[]).map((formato: string) => `<span class="format-tag">${formato}</span>`).join('')}
                                                    </div>
                                                    <div class="ean-section">
                                                        <div class="ean-label">EAN:</div>
                                                        <div class="ean-code">${ean !== 'no-ean' ? ean : 'N/D'}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        `).join('');
            })()}
                                </div>
                            ` : ''}

                            ${prodotto.marchi && Object.values(prodotto.marchi).some(Boolean) ? `
                                <div class="certifications">
                                    <div class="section-title">Certificazioni</div>
                                    <div class="cert-grid">
                                        ${prodotto.marchi?.prodotto_di_montagna ? '<div class="cert-item">Montagna</div>' : ''}
                                        ${prodotto.marchi?.senza_ammollo ? '<div class="cert-item">S.Ammollo</div>' : ''}
                                        ${prodotto.marchi?.senza_cereali ? '<div class="cert-item">S.Cereali</div>' : ''}
                                        ${prodotto.marchi?.riso_italiano ? '<div class="cert-item">Riso IT</div>' : ''}
                                        ${prodotto.marchi?.varieta_antica ? '<div class="cert-item">V.Antica</div>' : ''}
                                        ${prodotto.marchi?.macinato_a_pietra ? '<div class="cert-item">Macinato</div>' : ''}
                                        ${prodotto.marchi?.decorticato_a_pietra ? '<div class="cert-item">Decorticato</div>' : ''}
                                        ${prodotto.marchi?.pianificabile_superiore ? '<div class="cert-item">Panificabile</div>' : ''}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('')}

        <div class="footer">
            <div class="footer-content">
                <span>© ${new Date().getFullYear()} Azienda Agricola Il Pichello - Tutti i diritti riservati</span>
                <span>www.agricolailpichello.it</span>
            </div>
        </div>
    </div>
</body>
</html>`;
}