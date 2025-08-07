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

const pageUrl = `${baseUrl}/azienda-agricola-reggio-emilia-modena-e-bologna`;

export const metadata: Metadata = {
    title: "Azienda Agricola Forniture per Reggio Emilia, Modena, Bologna | Il Pichello",
    description: "Siamo produttori diretti e riforniamo ristoranti e negozi a Reggio Emilia, Modena, Bologna e nord Italia con farine, cereali, legumi e miele di montagna.",
    keywords: [
        "azienda agricola Reggio Emilia",
        "azienda agricola Modena",
        "azienda agricola Bologna",
        "fornitori ristoranti Reggio Emilia",
        "fornitori ristoranti Modena",
        "fornitori ristoranti Bologna",
        "prodotti agricoli nord italia",
        "vendita ingrosso farine",
        "Azienda Agricola Il Pichello",
    ],
    openGraph: {
        title: "Azienda Agricola per Reggio Emilia, Modena e Bologna | Il Pichello",
        description: "Produzione e fornitura diretta di prodotti agricoli di montagna per attività a Reggio Emilia, Modena e Bologna. Contattaci per collaborazioni.",
        url: pageUrl,
        images: [
            {
                url: `${baseUrl}/images/contattaci.png`,
                width: 1200,
                height: 630,
                alt: "Contatti Azienda Agricola Il Pichello per Reggio Emilia, Modena, Bologna",
            },
        ],
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "Azienda Agricola Reggio Emilia, Modena, Bologna | Il Pichello",
        description: "Siamo produttori diretti e forniamo attività in tutto il nord Italia, inclusa la zona di Reggio Emilia, Modena e Bologna.",
        images: [`${baseUrl}/images/contattaci.png`],
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
            "name": "Forniture Azienda Agricola per Reggio Emilia, Modena e Bologna",
            "isPartOf": { "@id": `${baseUrl}/#website` },
            "description": "Scopri le forniture dirette di prodotti agricoli di montagna per ristoranti, negozi e attività a Reggio Emilia, Modena e Bologna.",
        },
        {
            "@type": "Article",
            "@id": `${pageUrl}#article`,
            "headline": "Forniture Dirette per Attività a Reggio Emilia, Modena e Bologna",
            "description": "L'Azienda Agricola Il Pichello offre forniture dirette di prodotti di montagna a ristoranti, negozi e attività a Reggio Emilia, Modena, Bologna e in tutto il nord Italia.",
            "image": [`${baseUrl}/images/contattaci.png`],
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
                <div className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: "url('/images/contattaci.png')" }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
                        <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-6 ${bricolageGrotesque.className}`}>
                            Produttori Diretti per Reggio Emilia, Modena e Bologna
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl max-w-4xl leading-relaxed">
                            Riforniamo attività in tutto il nord Italia con la qualità dei nostri prodotti di montagna.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Azienda Agricola Reggio Emilia, Modena, Bologna", href: "/azienda-agricola-reggio-emilia-modena-e-bologna", current: true },
                        ]}
                    />

                    <section className="max-w-5xl mx-auto mt-12 mb-16">
                        <div className="bg-backgroundvariant rounded-2xl p-8 md:p-12 border border-primary/20">
                            <p className="text-xl md:text-2xl leading-relaxed text-foreground font-medium">
                                Siamo diretti produttori e riforniamo le attività di tutto il nord Italia: <strong className="text-primary">farine macinate a pietra, cereali antichi, legumi di montagna, ortaggi di stagione e miele</strong>.
                            </p>
                        </div>
                    </section>

                    <article className="prose lg:prose-xl max-w-4xl mx-auto mt-8">
                        <h2 className={`text-3xl md:text-4xl font-bold text-foreground mb-6 ${bricolageGrotesque.className}`}>
                            Collabora con Noi: Forniture per Ristoranti e Negozi
                        </h2>
                        <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                            Se hai un ristorante, un negozio di prodotti tipici o un'attività nel settore alimentare a <strong className="text-foreground">Reggio Emilia, Modena, Bologna</strong> o in altre zone del nord Italia, Il Pichello è il tuo partner ideale. Offriamo forniture dirette di prodotti coltivati e raccolti nel nostro Appennino, garantendo freschezza, tracciabilità e un sapore inconfondibile che i tuoi clienti sapranno apprezzare.
                        </p>

                        <h3 className="text-2xl font-bold text-primary mb-4">Perché Scegliere le Nostre Forniture</h3>
                        <ul className="text-lg leading-relaxed text-muted-foreground mb-8">
                            <li><strong className="text-foreground">Filiera Corta Garantita:</strong> Dal campo alla tua attività, senza intermediari.</li>
                            <li><strong className="text-foreground">Prodotti di Montagna Certificati:</strong> Qualità superiore grazie alla coltivazione in alta quota.</li>
                            <li><strong className="text-foreground">Sostenibilità e Rispetto per l'Ambiente:</strong> Metodi di coltivazione che preservano la biodiversità.</li>
                            <li><strong className="text-foreground">Flessibilità e Personalizzazione:</strong> Soluzioni su misura per le esigenze della tua attività.</li>
                        </ul>

                        <h3 className="text-2xl font-bold text-secondary mb-4">A Chi Ci Rivolgiamo</h3>
                        <p className="text-lg leading-relaxed mb-6">
                            Le nostre forniture sono pensate per:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-card p-6 rounded-lg border border-border"><strong className="text-foreground">Ristoranti e Agriturismi</strong> che cercano ingredienti autentici per menù a km 0.</div>
                            <div className="bg-card p-6 rounded-lg border border-border"><strong className="text-foreground">Negozi di Prodotti Tipici e Gastronomie</strong> che vogliono offrire eccellenze locali.</div>
                            <div className="bg-card p-6 rounded-lg border border-border"><strong className="text-foreground">Gruppi di Acquisto Solidale (GAS)</strong> interessati a prodotti sani e sostenibili.</div>
                            <div className="bg-card p-6 rounded-lg border border-border"><strong className="text-foreground">Laboratori di Pasta Fresca e Panifici</strong> che utilizzano materie prime di alta qualità.</div>
                        </div>
                    </article>

                    <section className="text-center mt-16 mb-8">
                        <div className="bg-primary rounded-2xl p-8 md:p-12">
                            <h3 className={`text-3xl md:text-4xl font-bold text-primary-foreground mb-6 ${bricolageGrotesque.className}`}>
                                Vedi i Nostri Prodotti all'Ingrosso
                            </h3>
                            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                                Esplora il nostro catalogo per scoprire la gamma completa di prodotti disponibili per la tua attività.
                            </p>
                            <Link
                                href="/prodotti"
                                className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                            >
                                <span>Vai al Catalogo Prodotti</span>
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
