import { ProdottoType } from "../../../../types";
import {
  getProdotti,
  getProdottoBySlug,
  getCategorie,
} from "../../../../sanity/sanity.query";
import "../../globals.css";
import ProdottoGallery from "@/components/prodotto/prodotto_gallery";
import ProductCard from "@/components/ProductCard";
import CategoryTag from "@/components/category_tag";
import { Image as ImageIcon } from "lucide-react";
import BarcodeDisplay from "@/components/BarcodeDisplay";
import FooterV2 from "@/components/new/Footer";
import Link from "next/link";
import { Metadata } from "next";

// Force static generation with revalidation for product pages
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

// Generate static paths for all products at build time
export async function generateStaticParams() {
  const prodotti: ProdottoType[] = await getProdotti();

  return prodotti.map((prodotto) => {
    const slug = JSON.parse(JSON.stringify(prodotto.slug)).current;
    return {
      name: slug,
    };
  });
}

// Generate dynamic metadata for each product
export async function generateMetadata(props: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const prodotto = await getProdottoBySlug(params.name);

  if (!prodotto) {
    return {
      title: "Prodotto non trovato | Azienda Agricola Il Pichello",
      description: "Il prodotto richiesto non è stato trovato.",
    };
  }

  // Get the first product image or fallback to default
  const productImage = prodotto.immagini?.[0]?.image || "/images/og-image.png";

  // Create SEO-optimized title and description
  const title = `${prodotto.nome} | ${prodotto.categoria} Bio Appennino Reggiano`;
  const description = `Acquista ${prodotto.nome} biologico dell'Azienda Agricola Il Pichello. ${prodotto.descrizione} Prodotto genuino dall'Appennino Reggiano, coltivato con metodi biorazionali tradizionali.`;
  const canonicalUrl = `https://www.agricolailpichello.it/prodotti/${params.name}`;
  return {
    title,
    description,
    keywords: [
      prodotto.nome,
      prodotto.categoria,
      "bio",
      "biorazionale",
      "Appennino Reggiano",
      "Il Pichello",
      "azienda agricola",
      "prodotti genuini",
      "km0",
      "tradizionale",
    ].join(", "),

    openGraph: {
      type: "website",
      locale: "it_IT",
      url: canonicalUrl,
      siteName: "Azienda Agricola Il Pichello",
      title,
      description,
      images: [
        {
          url: productImage,
          width: 1200,
          height: 630,
          alt: `${prodotto.nome} - ${prodotto.categoria} biorazionale dell'Azienda Agricola Il Pichello`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [productImage],
    },

    alternates: {
      canonical: canonicalUrl,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function Product(props: {
  params: Promise<{ name: string }>;
}) {
  const params = await props.params;

  // Fetch product, all products, and categories in parallel for better performance
  const [prodotto, prodotti, categorie] = await Promise.all([
    getProdottoBySlug(params.name),
    getProdotti(),
    getCategorie(),
  ]);

  if (!prodotto) return null;

  const hasImages = prodotto.immagini && prodotto.immagini.length > 0;

  // Product-specific JSON-LD structured data
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: prodotto.nome,
    description: prodotto.descrizione,
    category: prodotto.categoria,
    brand: {
      "@type": "Brand",
      name: "Il Pichello",
      logo: "https://www.agricolailpichello.it/images/logo.png",
    },
    manufacturer: {
      "@type": "Organization",
      "@id": "https://www.agricolailpichello.it/#organization",
      name: "Azienda Agricola Il Pichello",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Via Dante Alighieri 141",
        addressLocality: "Marola",
        postalCode: "42033",
        addressCountry: "IT",
      },
    },
    image: prodotto.immagini?.map((img: any) => img.image).filter(Boolean) || [
      "https://www.agricolailpichello.it/images/og-image.png",
    ],
    additionalProperty: [
      ...(prodotto.umidita !== null && prodotto.umidita !== undefined
        ? [
          {
            "@type": "PropertyValue",
            name: "Umidità",
            value: `${prodotto.umidita}%`,
          },
        ]
        : []),
      ...(prodotto.scadenza
        ? [
          {
            "@type": "PropertyValue",
            name: "Scadenza",
            value: prodotto.scadenza,
          },
        ]
        : []),
    ],
    ...(prodotto.formati &&
      prodotto.formati.length > 0 && {
      offers: prodotto.formati.map((formato: any, index: number) => ({
        "@type": "Offer",
        name: formato.formato,
        ...(formato.codice_ean && {
          gtin13: formato.codice_ean,
        }),
        seller: {
          "@type": "Organization",
          "@id": "https://www.agricolailpichello.it/#organization",
        },
        availability: "https://schema.org/InStock",
        priceCurrency: "EUR",
        url: `https://www.agricolailpichello.it/prodotti/${JSON.parse(JSON.stringify(prodotto.slug)).current}`,
      })),
    }),
    ...(prodotto.valori_nutrizionali && {
      nutrition: {
        "@type": "NutritionInformation",
        description: prodotto.valori_nutrizionali,
      },
    }),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <div className="min-h-screen ">
        {/* Hero Section */}
        <div className="relative bg-white">
          <div className="container">
            {/* Breadcrumb */}
            <nav className="flex mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <a
                    href="/prodotti"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Prodotti
                  </a>
                </li>
                <li>
                  <span className="text-gray-300">/</span>
                </li>
                <li>
                  <span className="text-gray-900 font-medium">
                    {prodotto.nome}
                  </span>
                </li>
              </ol>
            </nav>

            {/* Main product section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Gallery Section */}
              <div className="lg:col-span-5 lg:sticky lg:top-8">
                {hasImages ? (
                  <ProdottoGallery images={prodotto.immagini} />
                ) : (
                  <div className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center shadow-lg">
                    <ImageIcon className="w-32 h-32 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Product Info Section */}
              <div className="lg:col-span-7 space-y-8">
                {/* Header */}
                <div className="space-y-4">
                  <CategoryTag category={prodotto.categoria} />
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    {prodotto.nome}
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {prodotto.descrizione}
                  </p>
                </div>

                {/* Contact CTA - Design originale con colori del design system */}
                <div className="relative group">
                  <div className="absolute inset-2 bg-gradient-to-br from-primary/10 via-primary/15 to-primary/20 rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500" />

                  <div className="relative bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20 hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          Ti interessa questo prodotto?
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          Contattaci per informazioni su disponibilità, quantità
                          e per effettuare il tuo ordine.
                          <span className="block text-xs mt-1 text-muted-foreground/80">
                            Risposta garantita entro 24 ore
                          </span>
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <a
                          href="tel:3408200080"
                          className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-sm group"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          Chiama Ora
                        </a>

                        <a
                          href={`/contatti?prodotto=${encodeURIComponent(prodotto.nome)}`}
                          className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-primary font-semibold px-6 py-3 rounded-full border-2 border-primary shadow-sm hover:shadow-md transition-all duration-300 text-sm group"
                        >
                          <svg
                            className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                          Scrivi Messaggio
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Info Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="text-sm text-gray-500 mb-1">Scadenza</div>
                    <div className="font-semibold text-gray-900">
                      {prodotto.scadenza || "N/D"}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="text-sm text-gray-500 mb-1">Umidità</div>
                    <div className="font-semibold text-gray-900">
                      {prodotto.umidita !== null &&
                        prodotto.umidita !== undefined
                        ? `${prodotto.umidita}%`
                        : "N/D"}
                    </div>
                  </div>
                  {/* Allergeni section: only show if categoria is not 'Prodotti dell'alveare' */}
                  {!prodotto.categoria.includes("alveare") && (
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <div className="text-sm text-gray-500 mb-1">
                        Allergeni
                      </div>
                      <div className="font-semibold text-gray-900 text-xs">
                        Può contenere Glutine in quanto i macchinari utilizzati
                        lavorano anche cereali
                      </div>
                    </div>
                  )}
                </div>

                {/* Available Formats and EAN Codes */}
                {prodotto.formati && prodotto.formati.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">
                      Formati Disponibili
                    </h3>
                    <div className="space-y-4">
                      {(() => {
                        // Group formats by EAN code
                        const groupedFormats = prodotto.formati.reduce(
                          (groups: any, item: any) => {
                            const ean = item.codice_ean || "no-ean";
                            if (!groups[ean]) {
                              groups[ean] = [];
                            }
                            groups[ean].push(item.formato);
                            return groups;
                          },
                          {} as Record<string, string[]>
                        );

                        return Object.entries(groupedFormats).map(
                          ([ean, formats], index) => (
                            <div
                              key={index}
                              className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200"
                            >
                              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex flex-wrap gap-2 mb-2">
                                    {(formats as string[]).map(
                                      (
                                        formato: string,
                                        formatIndex: number
                                      ) => (
                                        <span
                                          key={formatIndex}
                                          className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm"
                                        >
                                          {formato}
                                        </span>
                                      )
                                    )}
                                  </div>
                                </div>
                                <div className="flex-1 lg:max-w-xs max-w-full min-w-0">
                                  {ean !== "no-ean" ? (
                                    <div className="bg-white rounded-lg p-3 border border-gray-200 overflow-hidden">
                                      <span className="font-medium text-sm block mb-2 text-gray-700">
                                        Codice EAN:
                                      </span>
                                      <BarcodeDisplay
                                        value={ean}
                                        height={35}
                                        displayValue={true}
                                      />
                                    </div>
                                  ) : (
                                    <p className="text-sm text-gray-500 bg-white rounded-lg p-3 border border-gray-200">
                                      <span className="font-medium">EAN:</span>{" "}
                                      Non disponibile
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        );
                      })()}
                    </div>
                  </div>
                )}

                {/* Brands Section */}
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-8 items-center">
                  {prodotto.marchi?.prodotto_di_montagna && (
                    <img
                      src="/logo-Prodotto-di-Montagna.jpg"
                      alt="Prodotto di Montagna"
                      title="Prodotto di Montagna"
                      className="w-full h-20 object-contain transition-transform hover:scale-105"
                    />
                  )}
                  {prodotto.marchi?.senza_ammollo && (
                    <img
                      src="/senza ammollo.jpg"
                      alt="Senza Ammollo"
                      title="Senza Ammollo"
                      className="w-full h-20 object-contain transition-transform hover:scale-105"
                    />
                  )}
                  {prodotto.marchi?.senza_cereali && (
                    <img
                      src="/senza cereali.jpg"
                      alt="Senza Cereali"
                      title="Senza Cereali"
                      className="w-full h-20 object-contain transition-transform hover:scale-105"
                    />
                  )}
                  {prodotto.marchi?.riso_italiano && (
                    <img
                      src="/riso italiano.jpg"
                      alt="Riso Italiano"
                      title="Riso Italiano"
                      className="w-full h-20 object-contain transition-transform hover:scale-105"
                    />
                  )}
                  {prodotto.marchi?.varieta_antica && (
                    <img
                      src="/varieta.antica.jpg"
                      alt="Varietà Antica"
                      title="Varietà Antica"
                      className="w-full h-20 object-contain transition-transform hover:scale-105"
                    />
                  )}
                  {prodotto.marchi?.macinato_a_pietra && (
                    <img
                      src="/macinata a pietra.jpg"
                      alt="Macinato a Pietra"
                      title="Macinato a Pietra"
                      className="w-full h-20 object-contain transition-transform hover:scale-105"
                    />
                  )}
                  {prodotto.marchi?.decorticato_a_pietra && (
                    <img
                      src="/decorticato a pietra.jpg"
                      alt="Decorticato a Pietra"
                      title="Decorticato a Pietra"
                      className="w-full h-20 object-contain transition-transform hover:scale-105"
                    />
                  )}
                  {prodotto.marchi?.pianificabile_superiore && (
                    <div className="text-center font-semibold text-gray-700 text-lg transition-transform hover:scale-105">
                      Pianificabile superiore
                    </div>
                  )}
                </div>

                {/* Nutritional Values */}
                {prodotto.valori_nutrizionali && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">
                      Valori Nutrizionali
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="text-sm text-gray-700 space-y-2">
                        {prodotto.valori_nutrizionali
                          ?.split("\n")
                          .map((line: string, index: number) => {
                            if (!line.trim()) return null;
                            const firstSpaceIndex = line.indexOf(" ");
                            let firstWord, rest;
                            if (firstSpaceIndex === -1) {
                              firstWord = line;
                              rest = "";
                            } else {
                              firstWord = line.substring(0, firstSpaceIndex);
                              rest = line.substring(firstSpaceIndex + 1);
                            }
                            return (
                              <div
                                key={index}
                                className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0"
                              >
                                <span className="font-semibold text-gray-900">
                                  {firstWord}
                                </span>
                                <span className="text-gray-600">{rest}</span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products - Redesigned */}
        <section className="bg-[#FBECC9] py-16 lg:py-20 mt-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12 lg:mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm text-primary mb-6">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span className="font-medium">Prodotti Correlati</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                Scopri Altri
                <span className="block text-primary">
                  Sapori dell'Appennino
                </span>
              </h2>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Altri prodotti della nostra selezione che potrebbero
                interessarti, coltivati con la stessa passione e autenticità
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {prodotti
                .slice(0, 3)
                .map((product: ProdottoType, index: number) => (
                  <div
                    key={product._id}
                    className="group"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <div className="relative">
                      {/* Decorative background */}
                      <div
                        className={`absolute inset-2 rounded-xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500 ${index % 3 === 0
                          ? "bg-gradient-to-br from-primary/10 via-primary/15 to-primary/20"
                          : index % 3 === 1
                            ? "bg-gradient-to-br from-secondary/10 via-secondary/15 to-secondary/20"
                            : "bg-gradient-to-br from-primary/5 via-primary/10 to-primary/15"
                          }`}
                      />

                      {/* Product Card */}
                      <div className="relative">
                        <ProductCard product={product} />
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12 lg:mt-16">
              <Link
                href="/prodotti"
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
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
          </div>
        </section>
      </div>
      <FooterV2 prodotti={prodotti} categorie={categorie} />
    </>
  );
}
