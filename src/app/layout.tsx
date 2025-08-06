import NavbarV2 from "@/components/new/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
// Dynamic metadataBase based on environment
const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NODE_ENV === "production"
    ? "https://www.agricolailpichello.it"
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: `%s | Azienda Agricola Il Pichello`,
    default: "Azienda Agricola Il Pichello", // Fallback generico
  },
  description:
    "Azienda agricola specializzata in prodotti biorazionali nell'Appennino Reggiano. Miele, cereali, legumi e trasformati di qualità.",
  authors: [{ name: "Azienda Agricola Il Pichello" }],
  creator: "Azienda Agricola Il Pichello",
  publisher: "Azienda Agricola Il Pichello",

  // Default Open Graph tags
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "Azienda Agricola Il Pichello",
    title: "Azienda Agricola Il Pichello",
    description:
      "Azienda agricola specializzata in prodotti biorazionali nell'Appennino Reggiano. Miele, cereali, legumi e trasformati di qualità.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Azienda Agricola Il Pichello - Prodotti Biorazionali Appennino Reggiano",
      },
    ],
  },

  // Twitter Card tags
  twitter: {
    card: "summary_large_image",
    title: "Azienda Agricola Il Pichello",
    description:
      "Azienda agricola specializzata in prodotti biorazionali nell'Appennino Reggiano. Miele, cereali, legumi e trasformati di qualità.",
    images: ["/images/og-image.png"],
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
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
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
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileColor": "#da532c",
    "msapplication-config": "/favicon/browserconfig.xml",
    "theme-color": "#ffffff",
  },
};

export const bricolageGrotesque = Bricolage_Grotesque({
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  preload: true,
});

// Schema.org JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: `${baseUrl}/`,
      name: "Azienda Agricola Il Pichello",
      description:
        "Azienda agricola specializzata in prodotti biorazionali nell'Appennino Reggiano",
      publisher: {
        "@id": `${baseUrl}/#organization`,
      },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${baseUrl}/prodotti?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      ],
      inLanguage: "it-IT",
    },
    {
      "@type": ["LocalBusiness", "Farm"],
      "@id": `${baseUrl}/#organization`,
      name: "Azienda Agricola Il Pichello",
      alternateName: "Il Pichello",
      url: `${baseUrl}/`,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/logo.png`,
        width: 400,
        height: 400,
      },
      image: [`${baseUrl}/images/og-image.png`],
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
        description: "Vendita diretta  in azienda",
      },
      priceRange: "€€",
      currenciesAccepted: "EUR",
      paymentAccepted: "Contanti, Carta di credito",
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
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link rel="preconnect" href="https://cdn.sanity.io" />
          <link rel="dns-prefetch" href="https://www.google-analytics.com" />
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        <link rel="preload" href="/globals.css" as="style" />

        {/* Preload critical brand assets */}
        <link rel="preload" href="/LOGO.png" as="image" type="image/png" />
        <link rel="preload" href="/logo-Prodotto-di-Montagna.jpg" as="image" type="image/jpeg" />

        {/* Optimizations for Sanity CDN */}
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className={`${bricolageGrotesque.className}`}>
        <NavbarV2 />
        {children}
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
