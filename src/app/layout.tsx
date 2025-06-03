import NavbarV2 from "@/components/new/Navbar";
import { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { headers } from "next/headers";
import { usePathname } from "next/navigation";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.agricolailpichello.it"),
  title: {
    template: `%s | Azienda Agricola Il Pichello`,
    default: "Azienda Agricola Il Pichello", // Fallback generico
  },
  authors: [{ name: "Azienda Agricola Il Pichello" }],
  creator: "Azienda Agricola Il Pichello",
  publisher: "Azienda Agricola Il Pichello",
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
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  other: {
    "msapplication-TileColor": "#da532c",
    "msapplication-config": "/favicon/browserconfig.xml",
    "theme-color": "#ffffff",
  },
};

const bricolageGrotesque = Bricolage_Grotesque({
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

// Schema.org JSON-LD structured data
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
      telephone: ["+393408200080", "+393397981644"], // O un numero principale
      email: "info@agricolailpichello.it",

      geo: {
        "@type": "GeoCoordinates",
        latitude: 44.4949,
        longitude: 10.5058,
      },
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const heads = await headers();
  const pathname = heads.get("x-current-path");
  const isStudio = pathname?.includes("/studio");
  if (isStudio) {
    return (
      <html>
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd),
            }}
          />
        </head>
        <body>{children}</body>
      </html>
    );
  }
  return (
    <html lang="it">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className={`${bricolageGrotesque.className} `}>
        <NavbarV2 />
        {children}
      </body>
    </html>
  );
}
