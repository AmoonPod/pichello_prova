import HeroSection from "@/components/new/HeroSection";
import AboutSection from "@/components/new/LaNostraAzienda";
import ProductsSection from "@/components/new/Prodotti";
import LocationSection from "@/components/new/DoveSiamo";
import ContactSection from "@/components/new/Contatti";
import FooterV2 from "@/components/new/Footer";
import SeoTextSection from "@/components/new/SeoTextSection";
import { getProdotti, getCategorie } from "../../sanity/sanity.query";
import "../app/globals.css";
import { Metadata } from "next";

// Force static generation with revalidation for homepage
export const dynamic = "force-static";
export const revalidate = 1800; // Revalidate every 30 minutes (homepage changes more frequently)

export const metadata: Metadata = {
  title:
    "Vendita Farine Grani Antichi, Legumi, Miele e Pasta Artigianale | Azienda Agricola Il Pichello",
  description:
    "Acquista direttamente dal produttore: Farine macinate a pietra, Pasta trafilata al bronzo e Miele italiano dell'Appennino Reggiano. Spedizioni in tutta Italia. Scopri il catalogo.",

  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://www.agricolailpichello.it/",
    siteName: "Azienda Agricola Il Pichello",
    title:
      "Vendita Farine Grani Antichi, Legumi, Miele e Pasta Artigianale | Il Pichello",
    description:
      "Acquista direttamente dal produttore: Farine di Grani Antichi macinate a pietra, Pasta trafilata al bronzo e Miele artigianale. Spedizioni in tutta Italia.",
    images: [
      {
        url: "/images/og-image.png", // Fixed extension from .jpg to .png
        width: 1200,
        height: 630,
        alt: "Azienda Agricola Il Pichello - Farine di Grani Antichi, Pasta e Miele dell'Appennino Reggiano",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Vendita Farine Grani Antichi, Legumi, Miele e Pasta Artigianale | Il Pichello",
    description:
      "Acquista direttamente dal produttore: Farine macinate a pietra, Pasta trafilata al bronzo e Miele italiano. Spedizioni in tutta Italia.",
    images: ["/images/og-image.png"],
  },
  alternates: {
    canonical: "https://www.agricolailpichello.it/",
  },
};

// Schema.org JSON-LD structured data per la homepage
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.agricolailpichello.it/#website",
      url: "https://www.agricolailpichello.it/",
      name: "Azienda Agricola Il Pichello",
      description:
        "Azienda agricola specializzata in prodotti naturali e sostenibili coltivati con metodo biorazionale nell'Appennino Reggiano",
      publisher: {
        "@id": "https://www.agricolailpichello.it/#organization",
      },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://www.agricolailpichello.it/prodotti?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      ],
      inLanguage: "it-IT",
    },
    {
      "@type": ["LocalBusiness", "Farm"],
      "@id": "https://www.agricolailpichello.it/#organization",
      name: "Azienda Agricola Il Pichello",
      alternateName: "Il Pichello",
      url: "https://www.agricolailpichello.it/",
      logo: {
        "@type": "ImageObject",
        url: "https://www.agricolailpichello.it/images/logo.png",
        width: 400,
        height: 400,
      },
      image: ["https://www.agricolailpichello.it/images/og-image.png"],
      description:
        "Azienda agricola specializzata nella produzione di miele, farine di grani antichi, legumi e pasta artigianale con metodo biorazionale (agricoltura naturale e sostenibile senza pesticidi) nell'Appennino Reggiano. Vendita diretta e spedizioni in tutta Italia.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Via Dante Alighieri 141",
        addressLocality: "Marola",
        addressRegion: "Emilia-Romagna",
        postalCode: "42033",
        addressCountry: "IT",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 44.4949,
        longitude: 10.5058,
      },
      telephone: ["+393408200080", "+393397981644"],
      email: "info@agricolailpichello.it",
      sameAs: [
        "https://www.facebook.com/agricolailpichello",
        "https://www.instagram.com/agricolailpichello",
      ],
      areaServed: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 44.4949,
          longitude: 10.5058,
        },
        geoRadius: "50000",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Prodotti Naturali e Artigianali",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Miele Artigianale",
              description: "Miele italiano dell'Appennino Reggiano prodotto con metodo biorazionale naturale",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Farine di Grani Antichi",
              description: "Farine macinate a pietra da 50 varietà di grani antichi coltivati senza pesticidi",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Legumi e Zuppe",
              description: "Legumi naturali e zuppe pronte da cuocere dell'Appennino Reggiano",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Pasta Artigianale",
              description: "Pasta trafilata al bronzo ed essiccata a temperatura ambiente con semola di grani antichi",
            },
          },
        ],
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        description: "Vendita diretta ai mercati e su appuntamento in azienda",
      },
      priceRange: "€€",
      currenciesAccepted: "EUR",
      paymentAccepted: "Cash, Credit Card",
    },
  ],
};

export default async function Index() {
  // Fetch data for the footer catalog download
  const [prodotti, categorie] = await Promise.all([
    getProdotti(),
    getCategorie(),
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      {/* <Navbar /> */}
      <main className="min-h-[90vh]">
        {/* <Hero /> */}
        <HeroSection />
        <div className="bg-[#FBECC9]">
          <AboutSection />
        </div>
        <ProductsSection />
        <div className="bg-[#FBECC9]">
          <LocationSection />
        </div>
        <ContactSection />
        <SeoTextSection />
      </main>
      <FooterV2 prodotti={prodotti} categorie={categorie} />
    </div>
  );
}
