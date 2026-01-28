import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import FooterV2 from "@/components/new/Footer"
import {
  Phone,
  Mail,
  Wheat,
  Sparkles,
  Award,
  Cookie,
  Pizza,
  Croissant,
  Check,
  Truck,
  ShieldCheck,
  Activity,
  Box
} from "lucide-react"
import "../globals.css"
import HeroFarina from "@/components/farina-cinquanta-grani/HeroFarina"
import ProcessoMacinazione from "@/components/farina-cinquanta-grani/ProcessoMacinazione"
import VariantiFarina from "@/components/farina-cinquanta-grani/VariantiFarina"
import WhyChooseUs from "@/components/farina-cinquanta-grani/WhyChooseUs"
import FaqAccordion from "@/components/pasta-artigianale/FaqAccordion"
import { getProdottiBySlugs } from "sanity/sanity.query"

// Force static generation
export const dynamic = "force-static"
export const revalidate = 3600 // 1 hour

// Slugs delle farine da fetchare da Sanity
const FARINE_SLUGS = [
  "farina-antichi-cinquanta-grani-integrale",
  "farina-antichi-cinquanta-grani-semintegrale",
  "farina-antichi-cinquanta-grani-fiore"
]

// PRODUCTION DOMAIN - sempre usare il dominio canonico per SEO
const baseUrl = "https://www.agricolailpichello.it"

const pageUrl = `${baseUrl}/farina-grani-antichi-macinata-pietra`
const flourVariantsSchema = [
  {
    id: "integrale",
    name: "Farina Cinquanta Grani Integrale",
    description:
      "Farina integrale di 50 grani antichi macinata a pietra a tutto corpo: contiene crusca, germe ed endosperma per massimo profilo nutrizionale.",
    image: `${baseUrl}/images/farine/farina_cinquanta_int.webp`
  },
  {
    id: "semintegrale",
    name: "Farina Cinquanta Grani Semintegrale",
    description:
      "Farina semintegrale di grani antichi con setacciatura moderata: equilibrio tra fibre e lavorabilità per pizza e pane quotidiano.",
    image: `${baseUrl}/images/farine/farina_cinquanta_semiint.webp`
  },
  {
    id: "fiore",
    name: "Farina Cinquanta Grani Fiore",
    description:
      "La parte più interna e fine del chicco: farina fiore di grani antichi per dolci, lievitati morbidi e pasta fresca setosa.",
    image: `${baseUrl}/images/farine/farina_cinquanta_fiore.webp`
  }
]
const productGroupSchema = {
  "@type": "ProductGroup",
  "@id": `${pageUrl}#product-group`,
  name: "Farina Antichi Cinquanta Grani - 50 varietà macinate a pietra",
  description:
    "Farina artigianale di qualità superiore ottenuta da un miscuglio di 50 varietà di antichi frumenti coltivati nell'Appennino Reggiano senza prodotti chimici. Macinata a tutto corpo con macine in pietra nel mulino aziendale di Marola di Carpineti. Disponibile in tre varianti: integrale, semintegrale e fiore. Forza W 280-330, P/L 0,5-0,7. Classificata Panificabile Superiore. Certificata Prodotto di Montagna. Ideale per pane a lievitazione naturale, pizza professionale e pasta fresca.",
  image: [`${baseUrl}/images/cereali.jpg`],
  brand: {
    "@type": "Brand",
    name: "Azienda Agricola Il Pichello"
  },
  category: "Farine di Grani Antichi",
  material: "Miscela di 50 varietà di grani antichi",
  variesBy: ["Grado di macinazione"],
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Forza (W)",
      value: "280-330"
    },
    {
      "@type": "PropertyValue",
      name: "Rapporto P/L",
      value: "0,5-0,7"
    },
    {
      "@type": "PropertyValue",
      name: "Proteine",
      value: "13-14%"
    },
    {
      "@type": "PropertyValue",
      name: "Classificazione",
      value: "Panificabile Superiore"
    },
    {
      "@type": "PropertyValue",
      name: "Certificazione",
      value: "Prodotto di Montagna"
    }
  ],
  hasVariant: flourVariantsSchema.map((variant) => ({
    "@type": "Product",
    "@id": `${pageUrl}#${variant.id}`,
    name: variant.name,
    description: variant.description,
    image: [variant.image],
    url: `${pageUrl}?variante=${variant.id}`,
    sku: variant.id,
    isVariantOf: `${pageUrl}#product-group`,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Forza (W)",
        value: "280-330"
      },
      {
        "@type": "PropertyValue",
        name: "Rapporto P/L",
        value: "0,5-0,7"
      },
      {
        "@type": "PropertyValue",
        name: "Proteine",
        value: "13-14%"
      }
    ]
  }))
}
const recipeSchema = {
  "@type": "Recipe",
  "@id": `${pageUrl}#pizza-alta-digeribilita`,
  name: "Pizza ad alta digeribilità con Farina Cinquanta Grani",
  description:
    "Impasto per pizza leggera e alveolata con farina di grani antichi macinata a pietra. Lunga maturazione, alto assorbimento e grande digeribilità.",
  image: [`${baseUrl}/images/farine/farina_cinquanta_semiint.webp`],
  recipeCuisine: "Italiana",
  recipeCategory: "Pizza",
  totalTime: "PT24H",
  prepTime: "PT20M",
  cookTime: "PT8M",
  recipeYield: "4 pizze da 250g",
  keywords: "pizza ad alta digeribilità, farina grani antichi, pizza w 300",
  author: {
    "@type": "Organization",
    name: "Azienda Agricola Il Pichello"
  },
  recipeIngredient: [
    "1 kg Farina Cinquanta Grani (semintegrale o integrale)",
    "650-700 ml acqua fredda (in base alla resa desiderata)",
    "2 g lievito di birra secco o 60 g pasta madre",
    "25 g sale marino integrale",
    "20 g olio extravergine"
  ],
  recipeInstructions: [
    {
      "@type": "HowToStep",
      text: "Autolisi: mescola farina e 650 ml di acqua fino a formare un impasto grezzo. Riposa 30 minuti."
    },
    {
      "@type": "HowToStep",
      text: "Inserisci lievito e il resto dell'acqua, poi il sale e infine l'olio. Impasta fino a ottenere una maglia glutinica liscia."
    },
    {
      "@type": "HowToStep",
      text: "Piega a tre e lascia puntare 60 minuti. Chiudi in contenitore oleato e matura in frigo 18-24 ore a 4°C."
    },
    {
      "@type": "HowToStep",
      text: "Dividi in panetti da 250 g, appretto 3-4 ore a temperatura ambiente."
    },
    {
      "@type": "HowToStep",
      text: "Stendi senza sgasare, condisci e cuoci a 450°C in forno a legna o 250°C ventilato con pietra refrattaria per 7-8 minuti."
    }
  ],
  nutrition: {
    "@type": "NutritionInformation",
    proteinContent: "13 g",
    carbohydrateContent: "65 g",
    fiberContent: "5 g"
  }
}

const faqItems = [
  {
    question: "Cos'è la farina Antichi Cinquanta Grani?",
    answer:
      "Una farina artigianale ottenuta dalla macinazione a pietra di 50 varietà di grani antichi coltivati nell'Appennino Reggiano senza chimica. Disponibile in integrale, semintegrale e fiore."
  },
  {
    question: "Per quali preparazioni è indicata?",
    answer:
      "Pane a lievitazione naturale, pizza e focacce, pasta fresca e pasticceria casalinga. La forza W 280-330 e il P/L 0,5-0,7 la rendono versatile."
  },
  {
    question: "Dove posso acquistarla?",
    answer:
      "Direttamente in azienda a Marola di Carpineti, al mercato di Piazza Fontanesi (RE), in punti vendita della provincia e con spedizione in tutta Italia."
  },
  {
    question: "Qual è la differenza tra integrale, semintegrale e fiore?",
    answer:
      "Integrale: tutto il chicco con crusca e germe. Semintegrale: setacciatura parziale per equilibrio tra nutrienti e lavorabilità. Fiore: parte più interna e fine per preparazioni delicate."
  },
  {
    question: "La macinatura a pietra cosa cambia?",
    answer:
      "Lavora lentamente senza surriscaldare il chicco, conserva germe e crusca e dona più aroma, nutrienti e digeribilità rispetto alle macine industriali."
  }
]

export const metadata: Metadata = {
  title: "Farina di Grani Antichi Macinata a Pietra | W280 Forte per Pizza e Pane | Il Pichello",
  description:
    "Miscela unica di 50 Grani Antichi macinati a pietra. Forza W280 ideale per pizza, pane e grandi lievitati. Sapore autentico, basso indice glicemico. Ordina dal produttore, consegna in 24/48h.",
  keywords: [
    "farina grani antichi online",
    "farina macinata a pietra vendita",
    "farina W280 pizza",
    "farina forte per pane",
    "farina artigianale italiana",
    "farina per pizza napoletana",
    "farina lunghe lievitazioni",
    "farina integrale grani antichi",
    "farina semintegrale",
    "farina fiore di grano",
    "farina panificabile superiore",
    "farina senza additivi",
    "acquisto farina online Italia",
    "migliore farina per pizza",
    "farina professionale panificazione"
  ],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: pageUrl,
    siteName: "Azienda Agricola Il Pichello",
    title: "Farina di Grani Antichi Macinata a Pietra | W280 per Pizza e Pane",
    description:
      "Miscela unica di 50 Grani Antichi macinati a pietra. Forza W280 ideale per pizza, pane e grandi lievitati. Spedizione in tutta Italia.",
    images: [
      {
        url: "/images/cereali.jpg",
        width: 1200,
        height: 630,
        alt: "Farina di Grani Antichi Macinata a Pietra W280 - Il Pichello"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Farina di Grani Antichi Macinata a Pietra | W280 per Pizza e Pane",
    description:
      "Miscela di 50 Grani Antichi, forza W280 per lunghe lievitazioni. Spedizione in tutta Italia.",
    images: ["/images/cereali.jpg"]
  },
  alternates: {
    canonical: pageUrl
  }
}

// JSON-LD Schema ottimizzato per SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    productGroupSchema,
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
      areaServed: [
        { "@type": "City", name: "Reggio Emilia" },
        { "@type": "City", name: "Castelnovo ne' Monti" },
        { "@type": "City", name: "Carpineti" },
        { "@type": "City", name: "Modena" },
        { "@type": "City", name: "Parma" },
        { "@type": "City", name: "Bologna" },
        { "@type": "State", name: "Emilia-Romagna" },
        { "@type": "Country", name: "Italia" }
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Farine di Grani Antichi",
        itemListElement: flourVariantsSchema.map((variant) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: variant.name
          }
        }))
      }
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    },
    recipeSchema,
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
          name: "Farina Antichi Cinquanta Grani",
          item: pageUrl
        }
      ]
    }
  ]
}

const techSpecs = [
  { label: "Forza (W)", value: "280-330", note: "Per lunghe lievitazioni e pizza napoletana" },
  { label: "P/L (elasticità)", value: "0,5-0,7", note: "Equilibrio tra tenacità ed estensibilità" },
  { label: "Proteine", value: "13-14%", note: "Glutine nativo, non addizionato" },
  { label: "Classificazione", value: "Panificabile Superiore", note: "Ideale per pane, pizza, grandi lievitati" }
]

const comparisonPoints = [
  {
    industrial: "Picco glicemico e farine super raffinate che danno energia veloce ma breve.",
    ours: "Miscela completa di crusca e germe per un rilascio più graduale: indice glicemico più bilanciato."
  },
  {
    industrial: "Glutine tenace e additivi che possono appesantire e creare gonfiore.",
    ours: "Glutine nativo dei grani antichi, P/L 0,5-0,7: struttura elastica ma più digeribile."
  },
  {
    industrial: "Sapore neutro e piatti che sanno di poco.",
    ours: "Profilo aromatico di montagna: note di nocciola e cereale tostato, più gusto e profumo."
  },
  {
    industrial: "Filiera lontana e grano di provenienza incerta.",
    ours: "Coltivata e macinata a Marola di Carpineti: filiera corta, controllo totale."
  }
]

const packagingShots = [
  {
    title: "Sacco 1 kg",
    description: "Per chi panifica a casa e vuole provare le tre varianti.",
    image: "/images/farine/farina_cinquanta_semiint.webp"
  },
  {
    title: "Formati famiglia",
    description: "Lotti freschi per chi impasta ogni settimana.",
    image: "/images/farine/farina_cinquanta_int.webp"
  },
  {
    title: "Sacco professionale 25 kg",
    description: "Pensato per pizzerie e forni artigianali: costanza e resa.",
    image: "/images/farine/farina_cinquanta_fiore.webp"
  }
]

const b2bMessage = encodeURIComponent(
  "Ciao, ho una pizzeria/forno e voglio provare la Farina Cinquanta Grani in sacco da 25 kg. Potete inviarmi listino e resa sugli impasti?"
)

export default async function FarinaCinquantaGraniPage() {
  // Fetch farine da Sanity
  const prodotti = await getProdottiBySlugs(FARINE_SLUGS)
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen">
        {/* Hero Section */}
        <HeroFarina />

        {/* Tabella tecnica reologica */}
        <section className="py-14 lg:py-20 bg-white" id="specifiche">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mb-10">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em]">
                <Sparkles className="w-3.5 h-3.5" />
                Tabella Tecnica W / P&frasl;L
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mt-3 mb-3">
                Dati reologici per lunghe lievitazioni
              </h2>
              <p className="text-stone-600 max-w-2xl">
                Comunica a Google e ai tuoi clienti perché questa farina è adatta a pizza napoletana, pane e grandi lievitati:
                numeri chiari su forza, elasticità e assorbimento.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
              <div className="lg:col-span-2 bg-[#FDFBF7] border border-amber-100 rounded-2xl p-6 shadow-sm">
                <div className="grid sm:grid-cols-2 gap-4">
                  {techSpecs.map((item) => (
                    <div key={item.label} className="bg-white rounded-xl border border-amber-100 p-4 shadow-sm">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700 mb-1">{item.label}</p>
                      <p className="text-2xl font-serif font-bold text-stone-900">{item.value}</p>
                      <p className="text-sm text-stone-600 mt-1 leading-relaxed">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-stone-900 text-white rounded-2xl p-6 lg:p-8 shadow-lg">
                <p className="text-sm uppercase tracking-[0.2em] text-white/60 mb-3">Perché conta</p>
                <h3 className="text-2xl font-serif font-bold mb-3">
                  Forza stabile, glutine nativo, impasti versatili.
                </h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  W 280-330 e P/L 0,5-0,7 garantiscono elasticità e estensibilità bilanciate. Proteine 13-14% senza booster
                  industriali: più digeribilità e meno gonfiore.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-300 mt-0.5" />
                    <span>Perfetta per maturazioni 24-48h</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Activity className="w-4 h-4 text-emerald-300 mt-0.5" />
                    <span>Maglia glutinica elastica, non gommoso</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Processo di Macinazione */}
        <ProcessoMacinazione />

        {/* Tre Varianti */}
        <VariantiFarina prodotti={prodotti} />



        {/* Usi Consigliati */}
        <section className="py-16 lg:py-24 bg-amber-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
                <Cookie className="w-4 h-4" />
                Versatilità in cucina
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
                Cosa puoi creare con la <span className="text-amber-600">Cinquanta Grani</span>
              </h2>
              <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
                Una farina versatile che si presta a infinite preparazioni, dal pane quotidiano ai dolci delle feste
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: Wheat,
                  title: "Pane a lievitazione naturale",
                  description: "La forza W 280-330 è perfetta per impasti a lunga lievitazione con pasta madre",
                  variant: "Ideale con integrale"
                },
                {
                  icon: Pizza,
                  title: "Pizza e focacce",
                  description: "Impasti elastici e alveolatura perfetta, con un sapore che fa la differenza",
                  variant: "Ideale con semintegrale"
                },
                {
                  icon: Croissant,
                  title: "Pasta fresca",
                  description: "Tagliatelle, lasagne, ravioli: la ruvidità trattiene il sugo alla perfezione",
                  variant: "Ideale con fiore"
                },
                {
                  icon: Cookie,
                  title: "Biscotti e dolci",
                  description: "Sapore di grano vero, note di nocciola e consistenza che conquista",
                  variant: "Tutte le varianti"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-colors">
                    <item.icon className="w-7 h-7 text-amber-700" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  <span className="inline-block text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">
                    {item.variant}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Salute e digeribilità */}
        <section className="py-16 lg:py-24 bg-[#F7F5F0]">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
                <ShieldCheck className="w-4 h-4" />
                Alta digeribilità
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-3">
                Farina 00 industriale vs Cinquanta Grani
              </h2>
              <p className="text-stone-600">
                Spiega perché chi è sensibile al glutine (non celiaco) o soffre di gonfiore sceglie i grani antichi.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-2">Farina 00 industriale</p>
                <div className="space-y-4">
                  {comparisonPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Activity className="w-4 h-4 text-rose-500 mt-1" />
                      <p className="text-stone-700 text-sm">{point.industrial}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-amber-200 rounded-2xl p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-amber-700 mb-2">Farina Cinquanta Grani</p>
                <div className="space-y-4">
                  {comparisonPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 mt-1" />
                      <p className="text-stone-800 text-sm">{point.ours}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 bg-white" id="faq">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-stone-100 text-stone-700 rounded-full text-sm font-semibold mb-4">
                Dubbi frequenti
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-3">
                Prima di ordinare, ecco cosa sapere
              </h2>
              <p className="text-stone-600">
                Tempi di lievitazione, varianti disponibili e dove acquistare: risposte rapide alle domande che riceviamo più spesso.
              </p>
            </div>
            <FaqAccordion items={faqItems} />
          </div>
        </section>

        {/* SEO Section - Logistica e Fiducia (unificata) */}
        <WhyChooseUs />

        {/* CTA B2B */}
        <section className="py-16 lg:py-20 bg-stone-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-bold uppercase tracking-[0.2em]">
                  <Truck className="w-4 h-4" />
                  Per pizzerie e forni
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mt-4 mb-3">
                  Sacco da 25 kg: resa costante, filiera tracciata.
                </h2>
                <p className="text-white/80 mb-5">
                  Stessa macinazione artigianale, lotti omogenei e assistenza diretta dall'Appennino. Ideale per pizza napoletana e pane a lunga maturazione.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-300" /> Prove impasto su richiesta
                  </span>
                  <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-sm">
                    <Wheat className="w-4 h-4 text-emerald-300" /> Lotti 100% Appennino Reggiano
                  </span>
                </div>
              </div>
              <div className="bg-white text-stone-900 rounded-2xl p-6 shadow-xl border border-stone-200">
                <h3 className="text-xl font-semibold mb-3">Richiedi listino professionale</h3>
                <p className="text-stone-600 mb-5">
                  Ti inviamo resa in forno, tempi di maturazione e disponibilità dei sacchi da 25 kg. Risposta entro 24h.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={`/contatti?prodotto=Farina%20Antichi%20Cinquanta%20Grani&messaggio=${b2bMessage}`} className="w-full sm:w-auto">
                    <Button className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold">
                      Richiedi listino B2B
                    </Button>
                  </Link>
                  <a href="tel:3408200080" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full">
                      Chiama ora
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certificazioni */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border border-green-100">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center p-4">
                      <Award className="w-16 h-16 text-green-600" />
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-3">
                      Certificata Prodotto di Montagna
                    </h3>
                    <p className="text-gray-600 mb-4">
                      La farina Antichi Cinquanta Grani è ufficialmente certificata <strong>Prodotto di Montagna</strong> dall'Unione Europea.
                      Questa certificazione garantisce che tutte le fasi di produzione avvengono in zone montane,
                      valorizzando il territorio e le tradizioni dell'Appennino Reggiano.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                      <span className="inline-flex items-center gap-1.5 text-sm text-green-700 bg-green-100 px-3 py-1.5 rounded-full">
                        <Check className="w-4 h-4" /> Coltivazione in montagna
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm text-green-700 bg-green-100 px-3 py-1.5 rounded-full">
                        <Check className="w-4 h-4" /> Macinazione in montagna
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm text-green-700 bg-green-100 px-3 py-1.5 rounded-full">
                        <Check className="w-4 h-4" /> Filiera 100% locale
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 lg:py-24 bg-amber-700">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
                Pronto a riscoprire il sapore del grano vero?
              </h2>
              <p className="text-lg lg:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                <strong className="text-white">Spediamo in tutta Italia</strong>: Milano, Roma, Napoli, Torino... ovunque tu sia.
                Oppure ritira direttamente in azienda a Marola di Carpineti.
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

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contatti?prodotto=Farina%20Antichi%20Cinquanta%20Grani&richiesta=ordine">
                  <Button
                    size="lg"
                    className="bg-white hover:bg-white/90 text-amber-700 font-bold px-10 py-4 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group"
                  >
                    <Truck className="mr-3 w-5 h-5" />
                    Ordina con Spedizione
                  </Button>
                </Link>

              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterV2 />
    </>
  )
}
