import { getProdotti } from "../../../../sanity/sanity.query";
import { ProdottoType } from "../../../../types";
import CatalogCard from "@/components/CatalogCard";
import "../../../app/globals.css";
/* eslint-disable @next/next/no-img-element */

// Configurazione categorie su due colonne (usando gli slug)
const TWO_COLUMN_SLUGS = [
    "tisane-e-infusi",
    "prodotti-freschi-e-stagionali"
];

type CatalogItem =
    | { type: 'header'; title: string }
    | { type: 'product'; data: ProdottoType }
    | { type: 'product-pair'; data: ProdottoType[] }; // Array di 1 o 2 prodotti

const PrintCatalogPage = async () => {
    const prodotti: ProdottoType[] = await getProdotti();

    // Rimosso il sort manuale per rispettare l'ordine della query (ordine asc)
    const sortedProducts = prodotti;

    // Costruisci la lista piatta con header e coppie
    const items: CatalogItem[] = [];
    let lastCategory = '';

    // Buffer per accumulare prodotti delle categorie a due colonne
    let pairBuffer: ProdottoType[] = [];

    const flushPairBuffer = () => {
        if (pairBuffer.length > 0) {
            // Se c'è qualcosa nel buffer, aggiungilo come product-pair
            // Nota: potrebbe essere una coppia o un singolo elemento rimasto orfano
            for (let i = 0; i < pairBuffer.length; i += 2) {
                const pair = pairBuffer.slice(i, i + 2);
                items.push({ type: 'product-pair', data: pair });
            }
            pairBuffer = [];
        }
    };

    sortedProducts.forEach(product => {
        const slug = product.categoria_slug?.current;
        const isTwoColumn = slug && TWO_COLUMN_SLUGS.includes(slug);

        // Se la categoria cambia
        if (product.categoria && product.categoria !== lastCategory) {
            // Prima svuota eventuali buffer pendenti della categoria precedente
            flushPairBuffer();

            items.push({ type: 'header', title: product.categoria });
            lastCategory = product.categoria;
        }

        if (isTwoColumn) {
            pairBuffer.push(product);
        } else {
            // Se non è a due colonne, svuota il buffer (non dovrebbe servire se l'ordine è corretto, ma per sicurezza)
            flushPairBuffer();
            items.push({ type: 'product', data: product });
        }
    });
    // Svuota buffer finale
    flushPairBuffer();

    const chunkItems = (items: CatalogItem[]) => {
        const pages: CatalogItem[][] = [];
        let currentPage: CatalogItem[] = [];
        let currentScore = 0;
        const MAX_SCORE = 5.3;
        const HEADER_SCORE = 0.25;
        const PRODUCT_SCORE = 1.0;
        const PAIR_SCORE = 1.0; // Una coppia occupa verticalmente lo stesso spazio di un prodotto singolo (o poco più per sicurezza)

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            let itemScore = PRODUCT_SCORE;

            if (item.type === 'header') itemScore = HEADER_SCORE;
            else if (item.type === 'product-pair') itemScore = PAIR_SCORE;

            // Se aggiungere l'item supera il limite
            if (currentScore + itemScore > MAX_SCORE + 0.05) {
                const lastItem = currentPage[currentPage.length - 1];

                // Evita header orfani a fine pagina
                if (lastItem && lastItem.type === 'header') {
                    currentPage.pop();
                    pages.push(currentPage);
                    currentPage = [lastItem, item];
                    currentScore = HEADER_SCORE + itemScore;
                } else {
                    pages.push(currentPage);
                    currentPage = [item];
                    currentScore = itemScore;
                }
            } else {
                currentPage.push(item);
                currentScore += itemScore;
            }
        }

        if (currentPage.length > 0) {
            pages.push(currentPage);
        }

        return pages;
    };

    const productPages = chunkItems(items);

    const certifications = [
        {
            name: "Prodotto di Montagna",
            description: "Certificazione della regione Emilia-Romagna che assicura una produzione e trasformazione esclusivamente in montagna.",
            icon: "/logo-Prodotto-di-Montagna.jpg"
        },
        {
            name: "Varietà Antica",
            description: "Cereali e legumi da varietà antiche, selezionati per preservare la biodiversità e garantire sapori autentici tramandati da generazioni.",
            icon: "/varieta.antica.jpg"
        },
        {
            name: "Panificabile Superiore",
            description: "Farine di alta qualità, ideali per la panificazione professionale, con proprietà tecniche superiori per risultati eccellenti.",
            icon: null
        },
        {
            name: "Senza Ammollo",
            description: "Prodotti selezionati che non necessitano di ammollo preliminare, per una preparazione più rapida e conveniente.",
            icon: "/senza ammollo.jpg"
        },
        {
            name: "Senza Cereali",
            description: "100% senza cereali.",
            icon: "/senza cereali.jpg"
        },
        {
            name: "Riso Italiano",
            description: "Riso coltivato esclusivamente in Italia, rispettando le tradizioni risicole nazionali e la qualità del territorio.",
            icon: "/riso italiano.jpg"
        },
        {
            name: "Macinato a Pietra",
            description: "Lavorazione tradizionale con macine di pietra che preserva le proprietà nutritive e il sapore autentico dei prodotti.",
            icon: "/macinata a pietra.jpg"
        },
        {
            name: "Decorticato a Pietra",
            description: "Processo di decorticazione delicato che mantiene integre le proprietà nutrizionali e il sapore del prodotto.",
            icon: "/decorticato a pietra.jpg"
        }
    ];

    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
                    
                    @page {
                        size: A4;
                        margin: 0;
                    }

                    body {
                        font-family: 'Inter', sans-serif;
                        background-color: #ffffff;
                        color: #111827;
                    }

                    .page {
                        position: relative;
                        page-break-after: always;
                        height: 297mm;
                        width: 210mm;
                        padding: 0.5cm;
                        box-sizing: border-box;
                        display: flex;
                        flex-direction: column;
                    }

                    .page:last-child {
                        page-break-after: auto;
                    }
                    
                    .watermark {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        opacity: 0.03;
                        z-index: -1;
                    }

                    .cover-page {
                       justify-content: center;
                       align-items: center;
                       text-align: center;
                       background: linear-gradient(135deg, #FEF3E2 0%, #FDEFD5 50%, #FDEAD7 100%);
                       position: relative;
                    }

                    .cover-content {
                        z-index: 1;
                        position: relative;
                    }

                    .logo-container {
                        margin-bottom: 1rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    
                    .logo-container img {
                        width: 350px;
                        height: 350px;
                        object-fit: contain;
                    }

                    .cover-title {
                        font-size: 48px;
                        font-weight: 700;
                        margin-bottom: 8px;
                        color: #8C1C06;
                        /* text-shadow removed for better printing */
                        line-height: 1.1;
                    }
                    
                    .cover-subtitle {
                       font-size: 32px;
                       font-weight: 600;
                       color: #8C1C06;
                       margin-bottom: 8px;
                    }

                    .cover-info {
                        background: rgba(255,255,255,0.9);
                        padding: 2rem;
                        border-radius: 12px;
                        /* box-shadow removed for better printing */
                        border: 1px solid #e5e7eb; /* Added light border as replacement for shadow */
                        max-width: 500px;
                        margin: 0 auto;
                    }

                    .cover-info h3 {
                        color: #8C1C06;
                        font-size: 18px;
                        font-weight: 700;
                        margin-bottom: 1rem;
                    }

                    .cover-info p {
                        color: #4B5563;
                        font-size: 14px;
                        line-height: 1.6;
                        margin-bottom: 1rem;
                    }

                    .contact-info {
                        background: #8C1C06;
                        color: white;
                        padding: 1rem;
                        border-radius: 8px;
                        font-size: 12px;
                        margin-top: 1rem;
                    }

                    .certifications-page {
                        padding: 2cm;
                        background: linear-gradient(135deg, #FEF3E2 0%, #FDEFD5 100%);
                    }

                    .certifications-title {
                        font-size: 36px;
                        font-weight: 700;
                        color: #8C1C06;
                        text-align: center;
                        margin-bottom: 2rem;
                    }

                    .certifications-grid {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 1.5rem;
                    }

                    .certification-card {
                        background: white;
                        padding: 1.5rem;
                        border-radius: 12px;
                        /* box-shadow removed for better printing */
                        border: 1px solid #e5e7eb; /* Added light border as replacement */
                        border-left: 4px solid #8C1C06;
                    }

                    .certification-header {
                        display: flex;
                        align-items: center;
                        margin-bottom: 1rem;
                    }

                    .certification-icon {
                        width: 40px;
                        height: 40px;
                        margin-right: 1rem;
                        border-radius: 8px;
                        background: #FEF3E2;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .certification-name {
                        font-size: 16px;
                        font-weight: 700;
                        color: #8C1C06;
                    }

                    .certification-description {
                        font-size: 12px;
                        color: #4B5563;
                        line-height: 1.5;
                    }

                    .product-grid {
                        display: flex;
                        flex-direction: column;
                        flex: 1; 
                        width: 100%;
                        padding-bottom: 1.2cm;
                        gap: 0.5mm;
                    }
                    
                    /* Modified selector to target only product cards */
                    .product-grid > .product-card-wrapper,
                    .product-grid > .product-pair-wrapper {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        min-height: 0;
                        max-height: 5.5cm; /* Limita espansione eccessiva */
                    }

                    /* Stili per l'ultima pagina con pochi prodotti */
                    .product-grid.sparse-page {
                        justify-content: flex-start;
                    }

                    .product-grid.sparse-page > .product-card-wrapper,
                    .product-grid.sparse-page > .product-pair-wrapper {
                        flex: 0 0 auto;
                        min-height: 4cm;
                        max-height: 5.2cm;
                    }
                    
                    .product-grid > .product-card-wrapper:last-child,
                    .product-grid > .product-pair-wrapper:last-child {
                        margin-bottom: 0;
                    }

                    /* Stili per le coppie di prodotti */
                    .product-pair-wrapper {
                        flex-direction: row !important;
                        gap: 0.5cm; /* Spazio orizzontale tra le due colonne */
                    }

                    .product-pair-wrapper > .product-card-wrapper {
                        width: 50%;
                    }
                    
                    .category-header {
                        width: 100%;
                        padding-top: 2px;
                        padding-bottom: 2px;
                        border-bottom: 2px solid #8C1C06;
                        color: #8C1C06;
                        font-size: 18px;
                        font-weight: 700;
                        flex: 0 0 auto;
                        page-break-after: avoid;
                        margin-bottom: 1mm;
                    }

                    /* IMPORTANTE: usa > * per selezionare sia <a> (Link) che <div> */
                    .product-grid > .product-card-wrapper > *,
                    .product-pair-wrapper > .product-card-wrapper > * {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        height: 100%;
                    }

                    /* Assicura che i contenitori delle immagini dei prodotti abbiano dimensioni minime */
                    .product-grid > .product-card-wrapper > div,
                    .product-pair-wrapper > .product-card-wrapper > div {
                        height: 100%; /* La card interna riempie il wrapper */
                        display: flex; /* Importante per far espandere il figlio */
                        flex-direction: column;
                    }

                    /* Fallback anche a schermo: immagini prodotto sempre cover */
                    .catalog-product-image {
                        object-fit: cover;
                        object-position: center;
                        width: 100%;
                        height: 100%;
                        display: block;
                    }

                    /* CSS specifici per generazione PDF con Puppeteer */
                    @media print {
                        * {
                            box-shadow: none !important;
                            text-shadow: none !important;
                        }

                        img {
                            -webkit-print-color-adjust: exact !important;
                            color-adjust: exact !important;
                            max-width: 100% !important;
                        }

                        /* Immagini prodotto: SEMPRE cover (senza euristiche su alt) */
                        .catalog-product-image {
                            object-fit: cover !important;
                            object-position: center !important;
                            width: 100% !important;
                            height: 100% !important;
                            min-width: 100% !important;
                            min-height: 100% !important;
                        }

                        /* Loghi marchi: sempre contain */
                        .catalog-logo-image {
                            object-fit: contain !important;
                            max-width: 100% !important;
                            max-height: 100% !important;
                            width: auto !important;
                            height: auto !important;
                        }

                        .product-grid > .product-card-wrapper,
                        .product-grid > .product-pair-wrapper {
                            page-break-inside: avoid !important;
                            flex: 1 !important;
                            max-height: 5.5cm !important;
                            display: flex !important;
                            flex-direction: column !important;
                            min-height: 0 !important;
                        }

                        .product-grid.sparse-page > .product-card-wrapper,
                        .product-grid.sparse-page > .product-pair-wrapper {
                            flex: 0 0 auto !important;
                            min-height: 4cm !important;
                            max-height: 5.2cm !important;
                        }

                        .product-grid > .product-pair-wrapper {
                            flex-direction: row !important;
                        }
                    }

                    .footer {
                        position: absolute;
                        bottom: 0.5cm;
                        left: 0.5cm;
                        right: 0.5cm;
                        text-align: center;
                        font-size: 10px;
                        color: #6B7280;
                        border-top: 1px solid #E5E7EB;
                        padding-top: 8px;
                        display: flex;
                        justify-content: space-between;
                    }
                `}
            </style>
            {/* Enhanced Cover Page */}
            <div className="page cover-page">
                <div className="watermark">
                    <img src="/images/logo.png" alt="Logo" width={200} height={200} loading="eager" />
                </div>
                <div className="cover-content">
                    <div className="logo-container">
                        <img src="/images/logo.png" alt="Azienda Agricola Il Pichello" width={350} height={350} loading="eager" />
                    </div>
                    <h1 className="cover-title">Catalogo Prodotti</h1>
                    <p className="cover-subtitle">dell’Appennino Reggiano</p>
                    <h1 className="cover-title">2026</h1>

                    <div className="cover-info">
                        <h3>Tradizione e Qualità dall'Appennino Reggiano</h3>
                        <p>Da generazioni coltiviamo con passione cereali antichi, legumi e produciamo miele artigianale nel cuore dell'Appennino Reggiano. I nostri prodotti biorazionali nascono dal rispetto per la terra e dalle tecniche tradizionali tramandate di generazione in generazione.</p>
                        <p>Ogni prodotto è certificato e controllato, garantendo la massima qualità e autenticità. Scoprite la nostra gamma completa di specialità montane, ideali per una alimentazione sana e genuina.</p>

                        <div className="contact-info">
                            <strong>Azienda Agricola Il Pichello</strong><br />
                            Via Dante Alighieri 141, 42033 Marola - Carpineti (RE)<br />
                            Tel: 340/8200080 | 339/7981644<br />
                            Email: info@agricolailpichello.it<br />
                            Web: www.agricolailpichello.it
                        </div>
                    </div>
                </div>
            </div>

            {/* Certifications Page */}
            <div className="page certifications-page">
                <div className="watermark">
                    <img src="/images/logo.png" alt="Logo" width={150} height={150} loading="eager" />
                </div>
                <h2 className="certifications-title">Le Nostre Certificazioni</h2>
                <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#4B5563', fontSize: '14px' }}>
                    Ogni prodotto è caratterizzato da specifiche certificazioni che ne garantiscono qualità, origine e metodi di lavorazione tradizionali.
                </p>

                <div className="certifications-grid">
                    {certifications.map((cert, index) => (
                        <div key={index} className="certification-card">
                            <div className="certification-header">
                                <div className="certification-icon">
                                    {cert.icon ? (
                                        <img src={cert.icon} alt={cert.name} width={28} height={28} loading="eager" style={{ objectFit: 'contain' }} />
                                    ) : (
                                        <div style={{ fontSize: '20px' }}>🏆</div>
                                    )}
                                </div>
                                <div className="certification-name">{cert.name}</div>
                            </div>
                            <div className="certification-description">{cert.description}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Pages */}
            {productPages.map((pageItems, pageIndex) => {
                // Conta quante "righe" di prodotti ci sono (product = 1, product-pair = 1)
                const productRowCount = pageItems.filter(item => item.type === 'product' || item.type === 'product-pair').length;
                const isLastPage = pageIndex === productPages.length - 1;
                const isSparsePage = isLastPage && productRowCount < 5;

                return (
                    <div key={pageIndex} className="page">
                        <div className="watermark">
                            <img src="/images/logo.png" alt="Logo" width={150} height={150} loading="eager" />
                        </div>
                        <div className={`product-grid${isSparsePage ? ' sparse-page' : ''}`}>
                            {pageItems.map((item, index) => {
                                if (item.type === 'header') {
                                    return (
                                        <div key={`header-${index}`} className="category-header">
                                            {item.title}
                                        </div>
                                    );
                                }

                                if (item.type === 'product-pair') {
                                    return (
                                        <div key={`pair-${index}`} className="product-pair-wrapper">
                                            {item.data.map((product) => (
                                                <div key={product._id} className="product-card-wrapper">
                                                    <CatalogCard
                                                        product={product}
                                                        viewMode="detailed"
                                                        isPrint={false}
                                                        forceEagerLoad={true}
                                                        isCompactLayout={true}
                                                    />
                                                </div>
                                            ))}
                                            {/* Spacer per l'ultimo elemento dispari se necessario */}
                                            {item.data.length === 1 && (
                                                <div className="product-card-wrapper" style={{ opacity: 0 }}></div>
                                            )}
                                        </div>
                                    );
                                }

                                return (
                                    <div key={item.data._id} className="product-card-wrapper">
                                        <CatalogCard
                                            product={item.data}
                                            viewMode="detailed"
                                            isPrint={false}
                                            forceEagerLoad={true}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="footer">
                            <span>Azienda Agricola Il Pichello - info@agricolailpichello.it</span>
                            <span>{`Pagina ${pageIndex + 3} di ${productPages.length + 2}`}</span>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default PrintCatalogPage;
