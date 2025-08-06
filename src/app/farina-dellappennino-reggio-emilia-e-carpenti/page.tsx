import { Metadata } from "next";
import { bricolageGrotesque } from "@/app/layout";
import Contattaci from "@/components/new/Contatti";
import FooterV2 from "@/components/new/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import "../../app/globals.css"
const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NODE_ENV === "production"
        ? "https://www.agricolailpichello.it"
        : "http://localhost:3000";

const pageUrl = `${baseUrl}/farina-dellappennino-reggio-emilia-e-carpenti`;

export const metadata: Metadata = {
    title: "Farina dell'Appennino Reggio Emilia e Carpineti | Macinata a Pietra | Il Pichello",
    description:
        "✓ Farina di grano tenero, integrale e semintegrale dell'Appennino di Reggio Emilia ✓ Prodotta a Carpineti oltre 800m ✓ Macinata a pietra ✓ Prodotto di Montagna certificato ✓ Vendita diretta",
    keywords: [
        "farina Appennino Reggio Emilia",
        "farina Carpineti",
        "farina di montagna",
        "grano tenero Reggio Emilia",
        "farina integrale Appennino",
        "farina semintegrale",
        "macinata a pietra",
        "prodotto di montagna",
        "farina artigianale",
        "Azienda Agricola Il Pichello",
    ],
    openGraph: {
        title: "Farina dell'Appennino di Reggio Emilia e Carpineti | Il Pichello",
        description:
            "La nostra farina dell'Appennino Reggiano, prodotta a Carpineti, è l'ingrediente perfetto per le tue ricette. Genuina, sostenibile e ricca di sapore.",
        url: pageUrl,
        images: [
            {
                url: `${baseUrl}/images/cereali.jpg`, // Use a relevant image
                width: 1200,
                height: 630,
                alt: "Campo di grano nell'Appennino Reggiano",
            },
        ],
        type: "article",
        publishedTime: new Date().toISOString(),
        modifiedTime: new Date().toISOString(),
        section: "Prodotti",
        authors: ["https://www.agricolailpichello.it"],
        tags: [
            "farina Appennino Reggio Emilia",
            "farina Carpineti",
            "farina di montagna",
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Farina dell'Appennino di Reggio Emilia e Carpineti | Il Pichello",
        description:
            "Scopri la farina di grano tenero, integrale e semintegrale dell'Appennino di Reggio Emilia, prodotta a Carpineti a oltre 800m.",
        images: [`${baseUrl}/images/cereali.jpg`],
    },
    alternates: {
        canonical: pageUrl,
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Product",
            "@id": `${pageUrl}#product`,
            name: "Farina dell'Appennino di Reggio Emilia e Carpineti",
            description: "Farina di grano tenero, integrale e semintegrale prodotta a Carpineti, nel cuore dell'Appennino Reggiano, a oltre 800 metri di altitudine. Macinata a pietra con metodi tradizionali.",
            image: [`${baseUrl}/images/cereali.jpg`],
            category: "Farine e Cereali",
            brand: {
                "@type": "Brand",
                name: "Azienda Agricola Il Pichello",
                url: baseUrl,
            },
            manufacturer: {
                "@type": "Organization",
                name: "Azienda Agricola Il Pichello",
                address: {
                    "@type": "PostalAddress",
                    streetAddress: "Via Dante Alighieri 141",
                    addressLocality: "Marola",
                    addressRegion: "Emilia-Romagna",
                    postalCode: "42033",
                    addressCountry: "IT",
                },
            },
            productionDate: new Date().toISOString().split('T')[0],
            keywords: "farina Appennino Reggio Emilia, farina Carpineti, farina di montagna, macinata a pietra, prodotto di montagna",
            additionalProperty: [
                {
                    "@type": "PropertyValue",
                    name: "Altitudine Produzione",
                    value: "800+ metri",
                },
                {
                    "@type": "PropertyValue",
                    name: "Metodo di Macinazione",
                    value: "Macinata a pietra",
                },
                {
                    "@type": "PropertyValue",
                    name: "Certificazione",
                    value: "Prodotto di Montagna",
                },
            ],
            offers: {
                "@type": "Offer",
                url: pageUrl,
                priceCurrency: "EUR",
                availability: "https://schema.org/InStock",
                seller: {
                    "@type": "Organization",
                    name: "Azienda Agricola Il Pichello",
                },
            },
        },
        {
            "@type": "Article",
            "@id": `${pageUrl}#article`,
            headline: "Farina dell'Appennino di Reggio Emilia e Carpineti: Tradizione e Qualità",
            description: "Scopri la farina di grano tenero, integrale e semintegrale dell'Appennino di Reggio Emilia, prodotta a Carpineti a oltre 800m di altitudine.",
            image: [`${baseUrl}/images/cereali.jpg`],
            author: {
                "@type": "Organization",
                name: "Azienda Agricola Il Pichello",
            },
            publisher: {
                "@type": "Organization",
                name: "Azienda Agricola Il Pichello",
                logo: {
                    "@type": "ImageObject",
                    url: `${baseUrl}/images/logo.png`,
                },
            },
            datePublished: new Date().toISOString(),
            dateModified: new Date().toISOString(),
            mainEntityOfPage: {
                "@type": "WebPage",
                "@id": pageUrl,
            },
            about: {
                "@id": `${pageUrl}#product`,
            },
        },
        {
            "@type": "WebPage",
            "@id": pageUrl,
            url: pageUrl,
            name: "Farina dell'Appennino di Reggio Emilia e Carpineti",
            isPartOf: {
                "@id": `${baseUrl}/#website`,
            },
            about: {
                "@id": `${pageUrl}#product`,
            },
            primaryImageOfPage: {
                "@type": "ImageObject",
                url: `${baseUrl}/images/cereali.jpg`,
            },
            breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: "Home",
                        item: baseUrl,
                    },
                    {
                        "@type": "ListItem",
                        position: 2,
                        name: "Farina dell'Appennino",
                        item: pageUrl,
                    },
                ],
            },
        },
    ],
};


export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <main className="bg-background">
                {/* Hero Section ottimizzato */}
                <div className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: "url('/images/cereali.jpg')" }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
                        <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-6 ${bricolageGrotesque.className}`}>
                            Farina dell'Appennino di Reggio Emilia e Carpineti
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl max-w-4xl leading-relaxed">
                            <strong>Macinata a pietra</strong> a oltre 800 metri di altitudine • <strong>Prodotto di Montagna certificato</strong> • <strong>Vendita diretta dall'azienda</strong>
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">

                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Farina dell'Appennino", href: "/farina-dellappennino-reggio-emilia-e-carpenti", current: true },
                        ]}
                    />

                    {/* Descrizione introduttiva ottimizzata per SEO */}
                    <section className="max-w-5xl mx-auto mt-12 mb-16">
                        <div className="bg-backgroundvariant rounded-2xl p-8 md:p-12 border border-primary/20">
                            <p className="text-xl md:text-2xl leading-relaxed text-foreground font-medium">
                                Tra i vari tipi di farine, i più amati sono quella di <strong className="text-primary">grano tenero, integrale e semintegrale</strong> nate a <strong className="text-primary">Carpineti</strong>, nel cuore dell'<strong className="text-primary">Appennino di Reggio Emilia</strong>, a più di 800 metri dal livello del mare. Questa non è una semplice farina: è il racconto autentico della nostra terra di montagna.
                            </p>
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                <div className="bg-background rounded-xl p-6 shadow-sm border border-primary/10">
                                    <div className="text-3xl font-bold text-primary mb-2">800m+</div>
                                    <div className="text-sm text-muted-foreground">Altitudine di coltivazione</div>
                                </div>
                                <div className="bg-background rounded-xl p-6 shadow-sm border border-primary/10">
                                    <div className="text-3xl font-bold text-primary mb-2">100%</div>
                                    <div className="text-sm text-muted-foreground">Macinata a pietra</div>
                                </div>
                                <div className="bg-background rounded-xl p-6 shadow-sm border border-primary/10">
                                    <div className="text-3xl font-bold text-primary mb-2">3</div>
                                    <div className="text-sm text-muted-foreground">Varietà disponibili</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Articolo principale ottimizzato per SEO */}
                    <article className="prose lg:prose-xl max-w-4xl mx-auto mt-8">

                        <h2 className={`text-3xl md:text-4xl font-bold text-foreground mb-6 ${bricolageGrotesque.className}`}>
                            Le Nostre Farine dell'Appennino: Tradizione e Qualità
                        </h2>

                        <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                            Nella nostra azienda agricola produciamo tre tipologie di <strong className="text-foreground">farina dell'Appennino di Reggio Emilia</strong>, ciascuna con caratteristiche uniche che rispecchiano la ricchezza del nostro territorio montano. Tutte le nostre farine sono <strong className="text-foreground">macinate a pietra</strong> e provengono da grani coltivati a <strong className="text-foreground">Carpineti, a oltre 800 metri di altitudine</strong>, garantendo un prodotto di montagna autentico e certificato.
                        </p>

                        <h3 className="text-2xl font-bold text-primary mb-4">Farina di Grano Tenero Tipo "0": La Versatilità dell'Appennino</h3>

                        <p className="text-lg leading-relaxed mb-6">
                            La nostra <strong className="text-foreground">farina di grano tenero dell'Appennino di Reggio Emilia</strong> rappresenta l'eccellenza della panificazione tradizionale. Coltivata a <strong className="text-foreground">Carpineti a oltre 800 metri</strong> di altitudine, questa farina tipo "0" conserva tutto il sapore autentico del territorio montano grazie alla <strong className="text-foreground">macinazione a pietra</strong> che preserva le proprietà organolettiche del chicco.
                        </p>

                        <p className="text-lg leading-relaxed mb-6">
                            Questa farina si distingue per il suo <strong className="text-foreground">eccezionale assorbimento d'acqua</strong> e per la qualità del glutine, caratteristiche che la rendono ideale per <strong className="text-foreground">pane a lievitazione naturale, pizza napoletana e focacce</strong>. La coltivazione in alta montagna, senza l'uso di pesticidi, garantisce un prodotto puro e genuino, mentre la filiera corta e tracciabile al 100% assicura freschezza e qualità costante.
                        </p>

                        <h3 className="text-2xl font-bold text-secondary mb-4">Farina Integrale di Montagna: Benessere e Tradizione</h3>

                        <p className="text-lg leading-relaxed mb-6">
                            La <strong className="text-foreground">farina integrale dell'Appennino di Reggio Emilia</strong> è un vero concentrato di benessere e sapore. Ottenuta dalla macinazione a pietra del chicco intero, mantiene <strong className="text-foreground">crusca, germe di grano e endosperma</strong>, risultando ricca di fibre, vitamine del gruppo B, magnesio e ferro. Rispetto alla farina raffinata, contiene tre volte più fibre e presenta un indice glicemico più basso, garantendo un maggiore senso di sazietà.
                        </p>

                        <p className="text-lg leading-relaxed mb-6">
                            Il suo sapore <strong className="text-foreground">intenso e rustico, con note di nocciola</strong>, la rende perfetta per <strong className="text-foreground">pane rustico, pizza integrale e dolci salutari</strong>. L'alta digeribilità e il profilo nutrizionale superiore fanno di questa farina la scelta ideale per chi cerca un prodotto salutare senza compromessi sul gusto. La macinazione lenta a pietra preserva tutti i nutrienti naturali, offrendo un prodotto vivo e profumato.
                        </p>

                        <h3 className="text-2xl font-bold text-primary mb-4">Farina Semintegrale Tipo "2": L'Equilibrio Perfetto</h3>

                        <p className="text-lg leading-relaxed mb-6">
                            La <strong className="text-foreground">farina semintegrale di Carpineti</strong> rappresenta il compromesso ideale tra la leggerezza della farina bianca e i benefici nutrizionali di quella integrale. <strong className="text-foreground">Macinata a pietra nell'Appennino Reggiano</strong>, questa farina tipo "2" offre un'eccellente lavorabilità mantenendo un profilo nutrizionale superiore rispetto alle farine raffinate.
                        </p>

                        <p className="text-lg leading-relaxed mb-6">
                            La sua <strong className="text-foreground">ottima elasticità e lievitazione perfetta</strong> la rendono ideale per <strong className="text-foreground">pane quotidiano, pizza gourmet e pasta fresca</strong>. Il colore dorato naturale e il sapore più complesso la distinguono dalle farine tradizionali, mentre la versatilità d'uso la rende perfetta sia per ricette dolci che salate. È la scelta perfetta per chi si avvicina al mondo delle farine integrali senza rinunciare alla facilità di lavorazione.
                        </p>

                        <h3 className="text-2xl font-bold text-foreground mb-4">Perché Scegliere le Nostre Farine dell'Appennino</h3>

                        <p className="text-lg leading-relaxed mb-6">
                            Tutte le nostre <strong className="text-foreground">farine dell'Appennino di Reggio Emilia e Carpineti</strong> condividono caratteristiche uniche che le distinguono nel panorama nazionale. La coltivazione a oltre 800 metri di altitudine, in un ambiente incontaminato, conferisce ai nostri grani proprietà organolettiche superiori. Il processo di <strong className="text-foreground">macinazione a pietra</strong>, lento e delicato, preserva intatte tutte le proprietà nutritive del chicco.
                        </p>

                        <p className="text-lg leading-relaxed mb-8">
                            La nostra è una <strong className="text-foreground">filiera corta e completamente tracciabile</strong>: dal seme alla tavola, ogni fase è seguita personalmente per garantire la massima qualità. La certificazione "Prodotto di Montagna" non è solo un'etichetta, ma la garanzia di un processo produttivo che valorizza l'ambiente montano e rispetta le tradizioni agricole dell'Appennino Reggiano. Che si tratti di panificazione professionale o casalinga, le nostre farine offrono risultati eccellenti e un sapore autentico che racconta la storia della nostra terra.
                        </p>

                    </article>

                    {/* Sezione Processo Produttivo */}
                    <section className="max-w-5xl mx-auto mt-20 mb-16">
                        <div className="text-center mb-12">
                            <h2 className={`text-4xl md:text-5xl font-bold text-foreground mb-6 ${bricolageGrotesque.className}`}>
                                Dal Campo alla Tavola
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Un processo artigianale che rispetta i tempi della natura e preserva la qualità del grano dell'Appennino
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center bg-card p-8 rounded-2xl border border-border shadow-sm">
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">🌾</span>
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-4">Coltivazione di Montagna</h3>
                                <p className="text-muted-foreground">
                                    Grani antichi coltivati a Carpineti, a oltre 800 metri di altitudine, con metodi sostenibili e rispettosi dell'ambiente.
                                </p>
                            </div>
                            <div className="text-center bg-card p-8 rounded-2xl border border-border shadow-sm">
                                <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">⚙️</span>
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-4">Macinazione a Pietra</h3>
                                <p className="text-muted-foreground">
                                    Processo lento e delicato che preserva le proprietà nutritive e organolettiche del chicco.
                                </p>
                            </div>
                            <div className="text-center bg-card p-8 rounded-2xl border border-border shadow-sm">
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">🏠</span>
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-4">Vendita Diretta</h3>
                                <p className="text-muted-foreground">
                                    Filiera corta che garantisce freschezza, tracciabilità e il giusto prezzo per un prodotto d'eccellenza.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Call to Action */}
                    <section className="text-center mt-16 mb-8">
                        <div className="bg-primary rounded-2xl p-8 md:p-12">
                            <h3 className={`text-3xl md:text-4xl font-bold text-primary-foreground mb-6 ${bricolageGrotesque.className}`}>
                                Scopri Tutti i Nostri Prodotti
                            </h3>
                            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                                Oltre alla farina, produciamo miele, legumi e cereali. Tutti i prodotti dell'Appennino Reggiano con la garanzia della qualità Il Pichello.
                            </p>
                            <Link
                                href="/prodotti"
                                className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                            >
                                <span>Vedi Tutti i Prodotti</span>
                                <svg
                                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </section>

                </div>

                <Contattaci />
            </main>
            <FooterV2 />
        </>
    );
}
