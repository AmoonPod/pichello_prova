import { getProdotti } from "../../../../sanity/sanity.query";
import { ProdottoType } from "../../../../types";
import CatalogCard from "@/components/CatalogCard";
import "../../../app/globals.css";
/* eslint-disable @next/next/no-img-element */

const PrintCatalogPage = async () => {
    const prodotti: ProdottoType[] = await getProdotti();

    const chunkProducts = (products: ProdottoType[], chunkSize: number) => {
        const chunks = [];
        for (let i = 0; i < products.length; i += chunkSize) {
            chunks.push(products.slice(i, i + chunkSize));
        }
        return chunks;
    };

    const productPages = chunkProducts(prodotti, 4);

    const certifications = [
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
            name: "Prodotto di Montagna",
            description: "Coltivati nell'Appennino Reggiano, dove l'altitudine e il clima montano conferiscono caratteristiche organolettiche uniche.",
            icon: "/logo-Prodotto-di-Montagna.jpg"
        },
        {
            name: "Senza Ammollo",
            description: "Legumi selezionati che non necessitano di ammollo preliminare, per una preparazione più rapida e conveniente.",
            icon: "/senza ammollo.jpg"
        },
        {
            name: "Senza Cereali",
            description: "Prodotti puri al 100%, senza aggiunta di cereali, ideali per chi cerca purezza e specificità nutrizionale.",
            icon: "/senza cereali.jpg"
        },
        {
            name: "Riso Italiano",
            description: "Riso coltivato esclusivamente in Italia, rispettando le tradizioni risicole nazionali e la qualità del territorio.",
            icon: "/riso italiano.jpg"
        },
        {
            name: "Macinato a Pietra",
            description: "Lavorazione tradizionale con macine di pietra che preserva le proprietà nutritive e il sapore autentico dei cereali.",
            icon: "/macinata a pietra.jpg"
        },
        {
            name: "Decorticato a Pietra",
            description: "Processo di decorticazione delicato con pietre naturali che mantiene integre le qualità nutrizionali del prodotto.",
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
                        margin-bottom: 2rem;
                    }

                    .cover-title {
                        font-size: 48px;
                        font-weight: 700;
                        margin-bottom: 16px;
                        color: #8C1C06;
                        text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
                    }
                    
                    .cover-subtitle {
                       font-size: 24px;
                       color: #4B5563;
                       margin-bottom: 2rem;
                    }

                    .cover-info {
                        background: rgba(255,255,255,0.9);
                        padding: 2rem;
                        border-radius: 12px;
                        box-shadow: 0 8px 25px rgba(0,0,0,0.1);
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
                        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
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
                        gap: 0.3rem;
                        width: 100%;
                        flex: 1;
                    }
                    
                    .product-grid > div {
                        min-height: 5cm;
                        max-height: 6.4cm;
                        flex: 1;
                        page-break-inside: avoid;
                        overflow: hidden;
                    }

                    /* Assicura che i contenitori delle immagini dei prodotti abbiano dimensioni minime */
                    .product-grid > div > div:first-child {
                        min-height: 140px;
                    }

                    /* CSS specifici per generazione PDF con Puppeteer */
                    @media print {
                        img {
                            -webkit-print-color-adjust: exact !important;
                            color-adjust: exact !important;
                            object-fit: cover !important;
                            object-position: center !important;
                            max-width: 100% !important;
                            height: 100% !important;
                        }

                        /* Regole specifiche per le immagini dei prodotti per riempire completamente lo spazio */
                        .product-grid > div img:not([alt*="Montagna"]):not([alt*="Ammollo"]):not([alt*="Cereali"]):not([alt*="Italiano"]):not([alt*="Antica"]):not([alt*="Pietra"]):not([alt*="Perlato"]) {
                            object-fit: cover !important;
                            object-position: center !important;
                            width: 100% !important;
                            height: 100% !important;
                            min-width: 100% !important;
                            min-height: 100% !important;
                        }

                        /* Regole specifiche per i loghi dei marchi per evitare tagli */
                        .product-grid img[alt*="Montagna"],
                        .product-grid img[alt*="Ammollo"],
                        .product-grid img[alt*="Cereali"],
                        .product-grid img[alt*="Italiano"],
                        .product-grid img[alt*="Antica"],
                        .product-grid img[alt*="Pietra"],
                        .product-grid img[alt*="Perlato"] {
                            object-fit: contain !important;
                            max-width: 100% !important;
                            max-height: 100% !important;
                            width: auto !important;
                            height: auto !important;
                        }

                        .product-grid > div {
                            page-break-inside: avoid !important;
                            min-height: 5cm !important;
                            max-height: 6.4cm !important;
                            flex: 1 !important;
                            display: flex !important;
                            flex-direction: column !important;
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
                        <img src="/images/logo.png" alt="Azienda Agricola Il Pichello" width={150} height={150} loading="eager" />
                    </div>
                    <h1 className="cover-title">Catalogo Prodotti</h1>
                    <p className="cover-subtitle">Azienda Agricola Il Pichello</p>

                    <div className="cover-info">
                        <h3>Tradizione e Qualità dall'Appennino Reggiano</h3>
                        <p>Dal 1985 coltiviamo con passione cereali antichi, legumi e produciamo miele artigianale nel cuore dell'Appennino Reggiano. I nostri prodotti biorazionali nascono dal rispetto per la terra e dalle tecniche tradizionali tramandate di generazione in generazione.</p>
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
            {productPages.map((pageProducts, pageIndex) => (
                <div key={pageIndex} className="page">
                    <div className="watermark">
                        <img src="/images/logo.png" alt="Logo" width={150} height={150} loading="eager" />
                    </div>
                    <div className="product-grid">
                        {pageProducts.map((product) => (
                            <CatalogCard
                                key={product._id}
                                product={product}
                                viewMode="detailed"
                                isPrint={false}
                                forceEagerLoad={true}
                            />
                        ))}
                    </div>
                    <div className="footer">
                        <span>Azienda Agricola Il Pichello - info@agricolailpichello.it</span>
                        <span>{`Pagina ${pageIndex + 3} di ${productPages.length + 2}`}</span>
                    </div>
                </div>
            ))}
        </>
    );
};

export default PrintCatalogPage;
