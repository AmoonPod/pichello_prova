import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import FooterV2 from "@/components/new/Footer"
import PastaGallery from "@/components/pasta-artigianale/PastaGallery"
import {
  ArrowRight,
  Wheat,
  Mountain,
  Wind,
  Phone,
  Mail,
  MapPin,
  Timer,
  Sparkles,
  CircleDot,
  Check
} from "lucide-react"
import "../globals.css"
import HeroPasta from "@/components/pasta-artigianale/HeroPasta"
import ProcessJourney from "@/components/pasta-artigianale/ProcessJourney"
import DifferenceSection from "@/components/pasta-artigianale/LaDifferenza"
import TerritorySection from "@/components/pasta-artigianale/TerritorySection"

// Force static generation
export const dynamic = "force-static"
export const revalidate = 86400 // 24 hours

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NODE_ENV === "production"
    ? "https://www.agricolailpichello.it"
    : "http://localhost:3000"

export const metadata: Metadata = {
  title: "Pasta Artigianale Trafilata al Bronzo | Appennino Reggiano",
  description:
    "Pasta di semola di grano duro coltivato nell'Appennino Reggiano, macinato a pietra e trafilato al bronzo. Essiccazione naturale a temperatura ambiente. Azienda Agricola Il Pichello, Marola (RE).",
  keywords: [
    "pasta artigianale",
    "trafilata al bronzo",
    "Appennino Reggiano",
    "semola grano duro",
    "pasta essiccazione naturale",
    "Marola",
    "Carpineti",
    "Reggio Emilia",
    "pasta km0",
    "Il Pichello"
  ],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: `${baseUrl}/pasta-artigianale-appennino-reggiano`,
    siteName: "Azienda Agricola Il Pichello",
    title: "Pasta Artigianale Trafilata al Bronzo | Appennino Reggiano",
    description:
      "Pasta di semola di grano duro coltivato nell'Appennino Reggiano, macinato a pietra e trafilato al bronzo. Essiccazione naturale a temperatura ambiente.",
    images: [
      {
        url: "/images/pasta/mezzi_paccheri_appennino_reggiano.webp",
        width: 1200,
        height: 630,
        alt: "Pasta artigianale trafilata al bronzo - Azienda Agricola Il Pichello, Appennino Reggiano"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Pasta Artigianale Trafilata al Bronzo | Appennino Reggiano",
    description:
      "Pasta di semola di grano duro dell'Appennino Reggiano, trafilata al bronzo ed essiccata naturalmente.",
    images: ["/images/pasta/mezzi_paccheri_appennino_reggiano.webp"]
  },
  alternates: {
    canonical: `${baseUrl}/pasta-artigianale-appennino-reggiano`
  }
}

// JSON-LD Schema
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": `${baseUrl}/pasta-artigianale-appennino-reggiano#product`,
      name: "Pasta Artigianale di Semola di Grano Duro",
      description:
        "Pasta artigianale prodotta con semola di grano duro coltivato nell'Appennino Reggiano, macinato a pietra nel nostro mulino, trafilata al bronzo ed essiccata naturalmente a temperatura ambiente. Formati disponibili: mezzi paccheri, penne, fusilli, maccheroni, tubetti.",
      image: `${baseUrl}/images/pasta/mezzi_paccheri_appennino_reggiano.webp`,
      brand: {
        "@type": "Brand",
        name: "Azienda Agricola Il Pichello"
      },
      manufacturer: {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`
      },
      category: "Pasta Secca",
      material: "Semola di grano duro",
      countryOfOrigin: {
        "@type": "Country",
        name: "Italia"
      },
      areaServed: {
        "@type": "Place",
        name: "Appennino Reggiano, Reggio Emilia, Emilia-Romagna"
      },
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Trafilatura",
          value: "Bronzo"
        },
        {
          "@type": "PropertyValue",
          name: "Essiccazione",
          value: "Naturale a temperatura ambiente"
        },
        {
          "@type": "PropertyValue",
          name: "Macinazione",
          value: "A pietra"
        }
      ]
    },
    {
      "@type": "LocalBusiness",
      "@id": `${baseUrl}/#organization`,
      name: "Azienda Agricola Il Pichello",
      url: baseUrl,
      telephone: ["+393408200080", "+393397981644"],
      email: "info@agricolailpichello.it",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Via Dante Alighieri 141",
        addressLocality: "Marola, Carpineti",
        addressRegion: "Emilia-Romagna",
        postalCode: "42033",
        addressCountry: "IT"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 44.4949,
        longitude: 10.5058
      },
      areaServed: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 44.4949,
          longitude: 10.5058
        },
        geoRadius: "50000"
      }
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: baseUrl
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Pasta Artigianale",
          item: `${baseUrl}/pasta-artigianale-appennino-reggiano`
        }
      ]
    }
  ]
}

// Process steps data
const processSteps = [
  {
    icon: Mountain,
    title: "Coltivazione",
    description: "Grano duro coltivato nei nostri campi dell'Appennino Reggiano, a Marola e Carpineti.",
    detail: "Terreni di montagna, aria pulita"
  },
  {
    icon: CircleDot,
    title: "Macinatura a pietra",
    description: "Il grano viene macinato nel nostro mulino a pietra, preservando nutrienti e sapore.",
    detail: "Nel nostro mulino aziendale"
  },
  {
    icon: Sparkles,
    title: "Semolatura",
    description: "Setacciatura accurata per ottenere semola pura, scartando i residui di crusca.",
    detail: "Semola di qualità superiore"
  },
  {
    icon: Wheat,
    title: "Trafilatura al bronzo",
    description: "La trafila in bronzo dona ruvidità alla pasta: trattiene i sughi, esalta i sapori.",
    detail: "Superficie ruvida e porosa"
  },
  {
    icon: Wind,
    title: "Essiccazione naturale",
    description: "Niente forni industriali. Solo tempo e aria, a temperatura ambiente.",
    detail: "Come una volta, senza fretta"
  }
]

export default function PastaArtigianalePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen">
        {/* Hero Section */}
        <HeroPasta />

        {/* Process Section - "Come nasce" */}
        <ProcessJourney />

        {/* Gallery Section */}
        <PastaGallery />



        {/* Benefits Section - "Perché bronzo + essiccazione naturale" */}
        <DifferenceSection
        />

        {/* Territory Section - Local SEO */}
        <TerritorySection />

        {/* Final CTA Section */}
        <section className="py-16 lg:py-24 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Vuoi assaggiare la differenza?
              </h2>
              <p className="text-lg lg:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                Contattaci per conoscere disponibilità e prezzi.
                Rispondiamo sempre, di persona.
              </p>

              {/* Contact options */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-10">
                <a
                  href="tel:3408200080"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-5 transition-colors group"
                >
                  <Phone className="w-6 h-6 text-white mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-white font-semibold">Mirco</p>
                  <p className="text-white/70 text-sm">340/8200080</p>
                </a>
                <a
                  href="tel:3397981644"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-5 transition-colors group"
                >
                  <Phone className="w-6 h-6 text-white mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-white font-semibold">Viviana</p>
                  <p className="text-white/70 text-sm">339/7981644</p>
                </a>
                <a
                  href="mailto:info@agricolailpichello.it"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-5 transition-colors group sm:col-span-2 lg:col-span-1"
                >
                  <Mail className="w-6 h-6 text-white mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-white font-semibold">Email</p>
                  <p className="text-white/70 text-sm">info@agricolailpichello.it</p>
                </a>
              </div>

              {/* CTA Button */}
              <Link href="/contatti?prodotto=Pasta%20artigianale%20di%20semola%20di%20grano%20duro">
                <Button
                  size="lg"
                  className="bg-white hover:bg-white/90 text-primary font-bold px-10 py-4 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group"
                >
                  Richiedi informazioni
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FooterV2 />
    </>
  )
}
