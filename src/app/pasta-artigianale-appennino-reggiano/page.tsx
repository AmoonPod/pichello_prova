import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import FooterV2 from "@/components/new/Footer"
import PastaGallery from "@/components/pasta-artigianale/PastaGallery"
import { ArrowRight, Phone, Mail } from "lucide-react"
import "../globals.css"
import HeroPasta from "@/components/pasta-artigianale/HeroPasta"
import ProcessJourney from "@/components/pasta-artigianale/ProcessJourney"
import DifferenceSection from "@/components/pasta-artigianale/LaDifferenza"
import TerritorySection from "@/components/pasta-artigianale/TerritorySection"
import MobileStickyCTA from "@/components/pasta-artigianale/MobileStickyCTA"
import { pastaProducts } from "@/data/pastaProducts"
import FaqAccordion from "@/components/pasta-artigianale/FaqAccordion"

// Force static generation
export const dynamic = "force-static"
export const revalidate = 86400 // 24 hours

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NODE_ENV === "production"
    ? "https://www.agricolailpichello.it"
    : "http://localhost:3000"
const pageUrl = `${baseUrl}/pasta-artigianale-appennino-reggiano`

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
    url: pageUrl,
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
    canonical: pageUrl
  }
}

const faqItems = [
  {
    question: "Qual è il tempo di cottura ideale?",
    answer:
      "Ogni formato ha il suo tempo: 9-11 minuti per spaghetti e tubetti, fino a 13-15 minuti per i mezzi paccheri. Assaggia sempre un minuto prima del tempo indicato per servirla al dente."
  },
  {
    question: "Perché la pasta artigianale costa di più?",
    answer:
      "Utilizziamo solo grano duro coltivato da noi, macinato a pietra e lavorato con trafile in bronzo. L'essiccazione naturale dura più di 24 ore e limita la produzione giornaliera, ma garantisce sapore e digeribilità."
  },
  {
    question: "Spedite in tutta Italia?",
    answer:
      "Sì. Prepariamo le confezioni in giornata e spediamo con corriere espresso. Per ristoranti e gastronomie possiamo organizzare consegne cadenzate dall'Appennino Reggiano."
  },
  {
    question: "Contiene glifosato o additivi?",
    answer:
      "No. Coltiviamo il grano in montagna senza glifosato e impastiamo solo con semola di nostra produzione e acqua. Nessun miglioratore, colorante o conservante."
  },
  {
    question: "Che differenza c'è rispetto alla pasta industriale?",
    answer:
      "La trafila in bronzo rende la superficie ruvida, l'essiccazione lenta preserva il glutine e il sapore del grano. Risultato: tiene la cottura, trattiene il sugo e rimane digeribile."
  }
]

const productSchemas = pastaProducts.map((product) => ({
  "@type": "Product",
  "@id": `${pageUrl}#${product.slug}`,
  name: `${product.name} - Pasta artigianale trafilata al bronzo`,
  description: product.description,
  image: product.images.map((img) => `${baseUrl}${img}`),
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
  sku: product.id,
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "EUR",
    lowPrice: product.priceRange.low.toFixed(2),
    highPrice: product.priceRange.high.toFixed(2),
    offerCount: 1,
    availability: "https://schema.org/InStock",
    url: `${pageUrl}?formato=${encodeURIComponent(product.name)}`
  }
}))

const faqSchema = {
  "@type": "FAQPage",
  "@id": `${pageUrl}#faq`,
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer
    }
  }))
}

const breadcrumbList = {
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
      name: "Prodotti",
      item: `${baseUrl}/prodotti`
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Pasta Artigianale",
      item: pageUrl
    }
  ]
}

const localBusiness = {
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
}

// JSON-LD Schema
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [localBusiness, breadcrumbList, faqSchema, ...productSchemas]
}

export default function PastaArtigianalePage() {
  const contactPrefilledMessage = encodeURIComponent(
    "Ciao, vorrei il listino della pasta artigianale Il Pichello e sapere disponibilità dei formati."
  )

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

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 bg-[#F9F9F7]" id="faq">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-3 block">
                Domande frequenti
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">
                Tutto quello che vuoi sapere prima di ordinare
              </h2>
              <p className="text-stone-600 text-lg">
                Tempi di cottura, spedizioni e differenze rispetto alla pasta industriale.
              </p>
            </div>

            <FaqAccordion items={faqItems} />
          </div>
        </section>

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
              <Link href={`/contatti?prodotto=Pasta%20artigianale%20di%20semola%20di%20grano%20duro&messaggio=${contactPrefilledMessage}`}>
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

        <MobileStickyCTA />
      </main>

      <FooterV2 />
    </>
  )
}
