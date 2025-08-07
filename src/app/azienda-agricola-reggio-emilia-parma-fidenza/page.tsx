import { Metadata } from "next";
import { bricolageGrotesque } from "@/app/layout";
import Contattaci from "@/components/new/Contatti";
import FooterV2 from "@/components/new/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import "../../app/globals.css";

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NODE_ENV === "production"
        ? "https://www.agricolailpichello.it"
        : "http://localhost:3000";

const pageUrl = `${baseUrl}/azienda-agricola-reggio-emilia-parma-fidenza`;

export const metadata: Metadata = {
    title: "Azienda Agricola tra Reggio Emilia, Parma e Fidenza | Il Pichello",
    description: "L'azienda agricola Il Pichello a Carpineti (Reggio Emilia) produce e vende direttamente prodotti di montagna, servendo anche le zone di Parma e Fidenza.",
    keywords: [
        "azienda agricola Reggio Emilia",
        "azienda agricola Parma",
        "azienda agricola Fidenza",
        "prodotti di montagna Appennino",
        "vendita diretta azienda agricola",
        "agriturismo Appennino Reggiano",
        "Azienda Agricola Il Pichello",
    ],
    openGraph: {
        title: "Azienda Agricola tra Reggio Emilia, Parma e Fidenza | Il Pichello",
        description: "Azienda agricola a Carpineti (Reggio Emilia), specializzata in prodotti di montagna. Forniamo Parma e Fidenza con prodotti a km 0.",
        url: pageUrl,
        images: [
            {
                url: `${baseUrl}/images/valtassobbio.jpg`,
                width: 1200,
                height: 630,
                alt: "Azienda Agricola Il Pichello vicino a Parma e Fidenza",
            },
        ],
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "Azienda Agricola tra Reggio Emilia, Parma e Fidenza | Il Pichello",
        description: "Scopri la nostra azienda agricola a Reggio Emilia, che serve anche Parma e Fidenza con prodotti di montagna di alta qualità.",
        images: [`${baseUrl}/images/valtassobbio.jpg`],
    },
    alternates: {
        canonical: pageUrl,
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": pageUrl,
            "url": pageUrl,
            "name": "Azienda Agricola tra Reggio Emilia, Parma e Fidenza",
            "isPartOf": { "@id": `${baseUrl}/#website` },
            "description": "Azienda agricola a Carpineti (RE) specializzata in prodotti di montagna, punto di riferimento per le province di Reggio Emilia, Parma e la zona di Fidenza.",
        },
        {
            "@type": "Article",
            "@id": `${pageUrl}#article`,
            "headline": "Azienda Agricola Il Pichello: Qualità dall'Appennino a Reggio Emilia, Parma e Fidenza",
            "description": "L'azienda agricola Il Pichello, situata nell'Appennino Reggiano, è un punto di riferimento per la fornitura di prodotti agricoli a Reggio Emilia, Parma e Fidenza.",
            "image": [`${baseUrl}/images/valtassobbio.jpg`],
            "author": {
                "@type": "Organization",
                "name": "Azienda Agricola Il Pichello",
            },
            "publisher": {
                "@type": "Organization",
                "name": "Azienda Agricola Il Pichello",
                "logo": {
                    "@type": "ImageObject",
                    "url": `${baseUrl}/images/logo.png`,
                },
            },
            "datePublished": new Date().toISOString(),
            "dateModified": new Date().toISOString(),
            "mainEntityOfPage": { "@id": pageUrl },
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
                <div className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: "url('/images/valtassobbio.jpg')" }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
                        <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-6 ${bricolageGrotesque.className}`}>
                            Azienda Agricola a Reggio Emilia, serviamo anche Parma e Fidenza
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl max-w-4xl leading-relaxed">
                            La nostra azienda agricola si trova a Carpineti, nel cuore dell'Appennino Reggiano, in un punto strategico tra Emilia e Toscana.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Azienda Agricola Reggio Emilia, Parma, Fidenza", href: "/azienda-agricola-reggio-emilia-parma-fidenza", current: true },
                        ]}
                    />

                    <section className="max-w-5xl mx-auto mt-12 mb-16">
                        <div className="bg-backgroundvariant rounded-2xl p-8 md:p-12 border border-primary/20">
                            <p className="text-xl md:text-2xl leading-relaxed text-foreground font-medium">
                                L'azienda agricola Il Pichello si trova a <strong className="text-primary">Carpineti</strong>, in provincia di Reggio Emilia, nel cuore dell'Appennino. Deve il suo nome alla località stessa, un luogo immerso nella natura dove coltiviamo con passione i nostri prodotti.
                            </p>
                        </div>
                    </section>

                    <article className="prose lg:prose-xl max-w-4xl mx-auto mt-8">
                        <h2 className={`text-3xl md:text-4xl font-bold text-foreground mb-6 ${bricolageGrotesque.className}`}>
                            La Nostra Storia: Passione per la Terra
                        </h2>
                        <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                            L'azienda agricola Il Pichello, situata a Carpineti (Reggio Emilia), è il frutto della passione di una famiglia per l'agricoltura di montagna. Operiamo nel rispetto della natura e delle tradizioni, portando i sapori autentici dell'Appennino anche nelle vicine province di <strong className="text-foreground">Parma</strong> e nella zona di <strong className="text-foreground">Fidenza</strong>. La nostra posizione privilegiata ci permette di essere un punto di riferimento per chi cerca prodotti genuini e a filiera corta.
                        </p>

                        <h3 className="text-2xl font-bold text-primary mb-4">Un Territorio Unico</h3>
                        <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                            Coltiviamo i nostri terreni a oltre 800 metri di altitudine, in un ambiente incontaminato che conferisce ai nostri prodotti caratteristiche uniche. Il microclima dell'Appennino Reggiano, unito alla nostra cura artigianale, ci permette di offrire farine, legumi e miele dal sapore inconfondibile.
                        </p>
                    </article>

                    <section className="text-center mt-16 mb-8">
                        <div className="bg-primary rounded-2xl p-8 md:p-12">
                            <h3 className={`text-3xl md:text-4xl font-bold text-primary-foreground mb-6 ${bricolageGrotesque.className}`}>
                                Scopri i Nostri Prodotti di Montagna
                            </h3>
                            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                                Esplora la nostra selezione di farine macinate a pietra, legumi tradizionali, miele e altri tesori del nostro Appennino.
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
