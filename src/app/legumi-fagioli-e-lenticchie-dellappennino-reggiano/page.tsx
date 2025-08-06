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

const pageUrl = `${baseUrl}/legumi-fagioli-e-lenticchie-dellappennino-reggiano`;

export const metadata: Metadata = {
    title: "Legumi, Fagioli e Lenticchie dell'Appennino Reggiano | Il Pichello",
    description:
        "✓ Legumi, fagioli e lenticchie dell'Appennino Reggiano ✓ Coltivati senza pesticidi oltre 800m ✓ Ricchi di proteine e fibre ✓ Prodotto di Montagna certificato ✓ Vendita diretta",
    keywords: [
        "legumi Appennino Reggiano",
        "fagioli Reggio Emilia",
        "lenticchie di montagna",
        "legumi senza pesticidi",
        "proteine vegetali",
        "fagioli dell'Appennino",
        "prodotto di montagna",
        "legumi biologici",
        "Azienda Agricola Il Pichello",
    ],
    openGraph: {
        title: "Legumi, Fagioli e Lenticchie dell'Appennino Reggiano | Il Pichello",
        description:
            "I nostri legumi dell'Appennino Reggiano sono coltivati con passione e senza pesticidi. Fagioli, lenticchie e altri legumi ricchi di sapore e nutrienti.",
        url: pageUrl,
        images: [
            {
                url: `${baseUrl}/images/cereali.jpg`, // Use a relevant image
                width: 1200,
                height: 630,
                alt: "Legumi coltivati nell'Appennino Reggiano",
            },
        ],
        type: "article",
        publishedTime: new Date().toISOString(),
        modifiedTime: new Date().toISOString(),
        section: "Prodotti",
        authors: ["https://www.agricolailpichello.it"],
        tags: [
            "legumi Appennino Reggiano",
            "fagioli Reggio Emilia",
            "lenticchie di montagna",
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Legumi, Fagioli e Lenticchie dell'Appennino Reggiano | Il Pichello",
        description:
            "Scopri i legumi dell'Appennino Reggiano: fagioli, lenticchie e altri legumi coltivati senza pesticidi oltre 800m di altitudine.",
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
            name: "Legumi, Fagioli e Lenticchie dell'Appennino Reggiano",
            description: "Legumi di alta qualità coltivati nell'Appennino Reggiano senza pesticidi, a oltre 800 metri di altitudine. Ricchi di proteine, fibre e nutrienti essenziali.",
            image: [`${baseUrl}/images/cereali.jpg`],
            category: "Legumi e Cereali",
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
            keywords: "legumi Appennino Reggiano, fagioli Reggio Emilia, lenticchie di montagna, legumi senza pesticidi, prodotto di montagna",
            additionalProperty: [
                {
                    "@type": "PropertyValue",
                    name: "Altitudine Coltivazione",
                    value: "800+ metri",
                },
                {
                    "@type": "PropertyValue",
                    name: "Metodo di Coltivazione",
                    value: "Senza pesticidi",
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
            headline: "Legumi, Fagioli e Lenticchie dell'Appennino Reggiano: Tradizione e Sapore",
            description: "Scopri i legumi dell'Appennino Reggiano coltivati senza pesticidi a oltre 800m di altitudine. Fagioli, lenticchie e altri legumi ricchi di proteine e sapore.",
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
            name: "Legumi, Fagioli e Lenticchie dell'Appennino Reggiano",
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
                        name: "Legumi dell'Appennino",
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
                            Legumi, Fagioli e Lenticchie dell'Appennino Reggiano
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl max-w-4xl leading-relaxed">
                            <strong>Coltivati senza pesticidi</strong> a oltre 800 metri di altitudine • <strong>Prodotto di Montagna certificato</strong> • <strong>Ricchi di proteine e fibre naturali</strong>
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">

                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Legumi dell'Appennino", href: "/legumi-fagioli-e-lenticchie-dellappennino-reggiano", current: true },
                        ]}
                    />

                    {/* Descrizione introduttiva ottimizzata per SEO */}
                    <section className="max-w-5xl mx-auto mt-12 mb-16">
                        <div className="bg-backgroundvariant rounded-2xl p-8 md:p-12 border border-primary/20">
                            <p className="text-xl md:text-2xl leading-relaxed text-foreground font-medium">
                                L'<strong className="text-primary">azienda agricola Il Pichello</strong> coltiva nella propria terra, senza l'intervento di altre aziende, ogni suo prodotto: <strong className="text-primary">legumi ricchi di gusto e sani</strong>. I nostri <strong className="text-primary">fagioli, lenticchie e legumi dell'Appennino Reggiano</strong> sono il frutto di una tradizione agricola secolare che unisce passione, territorio e sostenibilità.
                            </p>
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                <div className="bg-background rounded-xl p-6 shadow-sm border border-primary/10">
                                    <div className="text-3xl font-bold text-primary mb-2">800m+</div>
                                    <div className="text-sm text-muted-foreground">Altitudine di coltivazione</div>
                                </div>
                                <div className="bg-background rounded-xl p-6 shadow-sm border border-primary/10">
                                    <div className="text-3xl font-bold text-primary mb-2">0</div>
                                    <div className="text-sm text-muted-foreground">Pesticidi utilizzati</div>
                                </div>
                                <div className="bg-background rounded-xl p-6 shadow-sm border border-primary/10">
                                    <div className="text-3xl font-bold text-primary mb-2">100%</div>
                                    <div className="text-sm text-muted-foreground">Filiera controllata</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Articolo principale ottimizzato per SEO */}
                    <article className="prose lg:prose-xl max-w-4xl mx-auto mt-8">

                        <h2 className={`text-3xl md:text-4xl font-bold text-foreground mb-6 ${bricolageGrotesque.className}`}>
                            I Nostri Legumi dell'Appennino: Tradizione e Benessere
                        </h2>

                        <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                            Nell'<strong className="text-foreground">Appennino Reggiano</strong>, a oltre 800 metri di altitudine, coltiviamo con passione una selezione di <strong className="text-foreground">legumi di alta qualità</strong> che rappresentano l'eccellenza della nostra terra. Ogni varietà è coltivata <strong className="text-foreground">senza l'uso di pesticidi</strong>, seguendo metodi agricoli sostenibili che rispettano l'ambiente montano e preservano le proprietà nutrizionali naturali dei nostri prodotti.
                        </p>

                        <h3 className="text-2xl font-bold text-primary mb-4">Fagioli dell'Appennino Reggiano: Proteine Nobili di Montagna</h3>

                        <p className="text-lg leading-relaxed mb-6">
                            I nostri <strong className="text-foreground">fagioli dell'Appennino Reggiano</strong> sono coltivati nelle terre di montagna che circondano la nostra azienda agricola. L'altitudine elevata e il clima fresco conferiscono a questi legumi una <strong className="text-foreground">consistenza particolare e un sapore intenso</strong> che li distingue dai fagioli di pianura. La coltivazione avviene seguendo i ritmi naturali delle stagioni, senza forzature, per ottenere un prodotto genuino e ricco di proprietà nutritive.
                        </p>

                        <p className="text-lg leading-relaxed mb-6">
                            Ricchi di <strong className="text-foreground">proteine vegetali di alta qualità, fibre e minerali essenziali</strong>, i nostri fagioli sono ideali per zuppe, minestre e contorni saporiti. La loro versatilità in cucina li rende perfetti sia per ricette tradizionali dell'Appennino che per piatti moderni e creativi. Il <strong className="text-foreground">baccello carnoso e il seme gustoso</strong> sono il risultato di una selezione attenta delle migliori varietà adatte al nostro territorio montano.
                        </p>

                        <h3 className="text-2xl font-bold text-secondary mb-4">Lenticchie di Montagna: Piccoli Tesori Nutrizionali</h3>

                        <p className="text-lg leading-relaxed mb-6">
                            Le <strong className="text-foreground">lenticchie dell'Appennino Reggiano</strong> rappresentano uno dei nostri prodotti più preziosi. Coltivate a quote elevate, dove l'escursione termica tra giorno e notte favorisce lo sviluppo di principi nutritivi concentrati, queste lenticchie si distinguono per le loro <strong className="text-foreground">dimensioni contenute ma dal sapore intenso</strong> e per l'elevato contenuto di proteine, ferro e vitamine del gruppo B.
                        </p>

                        <p className="text-lg leading-relaxed mb-6">
                            La coltivazione delle lenticchie richiede particolare attenzione e pazienza, caratteristiche che contraddistinguono il nostro approccio agricolo. <strong className="text-foreground">Senza l'uso di pesticidi o fertilizzanti chimici</strong>, otteniamo un prodotto puro che mantiene intatte tutte le proprietà organolettiche. Il terreno montano, ricco di minerali e ben drenato, è l'ambiente ideale per la crescita di queste preziose leguminose che da secoli fanno parte della tradizione culinaria dell'Appennino.
                        </p>

                        <h3 className="text-2xl font-bold text-primary mb-4">Altri Legumi dell'Appennino: Varietà e Sapore</h3>

                        <p className="text-lg leading-relaxed mb-6">
                            Oltre ai fagioli e alle lenticchie, la nostra azienda agricola coltiva altre <strong className="text-foreground">varietà di legumi tipiche dell'Appennino Reggiano</strong>. Ogni legume è selezionato per la sua capacità di adattarsi al nostro clima montano e per le sue qualità nutrizionali superiori. La diversificazione delle colture non solo arricchisce la biodiversità del nostro territorio, ma offre anche ai nostri clienti una gamma completa di prodotti per una dieta equilibrata e salutare.
                        </p>

                        <p className="text-lg leading-relaxed mb-6">
                            Tutti i nostri legumi sono caratterizzati da <strong className="text-foreground">tempi di cottura ridotti e un'eccellente digeribilità</strong>, frutto della qualità del terreno e del metodo di coltivazione. La raccolta avviene a mano nei momenti ottimali di maturazione, garantendo la massima qualità del prodotto finale. Ogni varietà mantiene le sue caratteristiche distintive e il sapore autentico che solo i prodotti di montagna possono offrire.
                        </p>

                        <h3 className="text-2xl font-bold text-foreground mb-4">Perché Scegliere i Nostri Legumi dell'Appennino</h3>

                        <p className="text-lg leading-relaxed mb-6">
                            I <strong className="text-foreground">legumi dell'Appennino Reggiano dell'azienda agricola Il Pichello</strong> rappresentano l'eccellenza della produzione montana italiana. La coltivazione a oltre 800 metri di altitudine, in un ambiente incontaminato e lontano da fonti di inquinamento, garantisce prodotti puri e genuini. Il nostro impegno per l'<strong className="text-foreground">agricoltura sostenibile e rispettosa dell'ambiente</strong> si traduce in legumi ricchi di sapore e proprietà nutritive.
                        </p>

                        <p className="text-lg leading-relaxed mb-6">
                            La <strong className="text-foreground">filiera completamente controllata</strong> ci permette di seguire ogni fase della produzione, dalla semina alla raccolta, fino alla conservazione e distribuzione. Questo controllo totale garantisce la tracciabilità del prodotto e assicura ai consumatori la massima qualità e sicurezza alimentare. I nostri legumi non subiscono trattamenti chimici post-raccolta e vengono conservati con metodi naturali che preservano il sapore e le proprietà nutritive.
                        </p>

                        <p className="text-lg leading-relaxed mb-8">
                            Scegliere i nostri <strong className="text-foreground">fagioli, lenticchie e legumi dell'Appennino Reggiano</strong> significa portare in tavola prodotti autentici che raccontano la storia del nostro territorio. La certificazione "Prodotto di Montagna" attesta l'origine e la qualità superiore dei nostri legumi, mentre il sapore unico e la ricchezza nutrizionale li rendono ingredienti ideali per una cucina sana, gustosa e sostenibile.
                        </p>

                    </article>

                    {/* Sezione Processo Produttivo */}
                    <section className="max-w-5xl mx-auto mt-20 mb-16">
                        <div className="text-center mb-12">
                            <h2 className={`text-4xl md:text-5xl font-bold text-foreground mb-6 ${bricolageGrotesque.className}`}>
                                Dalla Semina alla Tavola
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Un processo naturale che rispetta i tempi della natura e preserva la qualità dei legumi dell'Appennino
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center bg-card p-8 rounded-2xl border border-border shadow-sm">
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">🌱</span>
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-4">Coltivazione Naturale</h3>
                                <p className="text-muted-foreground">
                                    Semina e coltivazione senza pesticidi nell'Appennino Reggiano, seguendo i ritmi naturali delle stagioni.
                                </p>
                            </div>
                            <div className="text-center bg-card p-8 rounded-2xl border border-border shadow-sm">
                                <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">✋</span>
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-4">Raccolta Manuale</h3>
                                <p className="text-muted-foreground">
                                    Raccolta a mano nel momento ottimale di maturazione per preservare qualità e sapore.
                                </p>
                            </div>
                            <div className="text-center bg-card p-8 rounded-2xl border border-border shadow-sm">
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">📦</span>
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-4">Conservazione Naturale</h3>
                                <p className="text-muted-foreground">
                                    Conservazione con metodi tradizionali che mantengono intatte le proprietà nutritive.
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
                                Oltre ai legumi, produciamo farine, miele e cereali. Tutti i prodotti dell'Appennino Reggiano con la garanzia della qualità Il Pichello.
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