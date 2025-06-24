import HeroSection from "@/components/new/HeroSection";
import AboutSection from "@/components/new/LaNostraAzienda";
import ProductsSection from "@/components/new/Prodotti";
import LocationSection from "@/components/new/DoveSiamo";
import ContactSection from "@/components/new/Contatti";
import FooterV2 from "@/components/new/Footer";
import { getProdotti, getCategorie } from "../../sanity/sanity.query";
import "../app/globals.css";
import { Metadata } from "next";

// Force static generation with revalidation for homepage
export const dynamic = "force-static";
export const revalidate = 1800; // Revalidate every 30 minutes (homepage changes more frequently)

export const metadata: Metadata = {
  title:
    "Azienda Agricola Il Pichello | Prodotti Biorazionali Appennino Reggiano",
  description:
    "Scopri l'Azienda Agricola Il Pichello a Marola (RE), cuore dell'Appennino Reggiano. Coltiviamo con passione prodotti biorazionali: miele, cereali, legumi e trasformati. Tradizione e sostenibilità a km0.",

  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://www.agricolailpichello.it/",
    siteName: "Azienda Agricola Il Pichello",
    title:
      "Azienda Agricola Il Pichello | Prodotti Biorazionali Appennino Reggiano",
    description:
      "Scopri l'Azienda Agricola Il Pichello a Marola (RE), cuore dell'Appennino Reggiano. Coltiviamo con passione prodotti biorazionali: miele, cereali, legumi e trasformati. Tradizione e sostenibilità a km0.",
    images: [
      {
        url: "/images/og-image.png", // Fixed extension from .jpg to .png
        width: 1200,
        height: 630,
        alt: "Azienda Agricola Il Pichello - Prodotti Biorazionali Appennino Reggiano",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Azienda Agricola Il Pichello | Prodotti Biorazionali Appennino Reggiano",
    description:
      "Scopri l'Azienda Agricola Il Pichello a Marola (RE), cuore dell'Appennino Reggiano. Coltiviamo con passione prodotti biorazionali: miele, cereali, legumi e trasformati. Tradizione e sostenibilità a km0.",
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
        "Azienda agricola specializzata in prodotti biorazionali nell'Appennino Reggiano",
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
        "Azienda agricola specializzata nella produzione di miele, cereali, legumi e trasformati con metodi biorazionali nell'Appennino Reggiano. Vendita diretta ai mercati e su appuntamento in azienda.",
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
        name: "Prodotti Biorazionali",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Miele",
              description: "Miele prodotto con metodi biorazionali",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Cereali",
              description: "Cereali coltivati con tecniche sostenibili",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Legumi",
              description: "Legumi di alta qualità dell'Appennino Reggiano",
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
      </main>
      <FooterV2 prodotti={prodotti} categorie={categorie} />
    </div>
  );
}
