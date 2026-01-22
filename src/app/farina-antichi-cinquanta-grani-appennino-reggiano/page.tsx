import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import FooterV2 from "@/components/new/Footer"
import {
  ArrowRight,
  Phone,
  Mail,
  Wheat,
  Mountain,
  Timer,
  Sparkles,
  Award,
  Leaf,
  FlaskConical,
  Cookie,
  Pizza,
  Croissant,
  Check,
  Star,
  Quote,
  Truck
} from "lucide-react"
import "../globals.css"
import HeroFarina from "@/components/farina-cinquanta-grani/HeroFarina"
import ProcessoMacinazione from "@/components/farina-cinquanta-grani/ProcessoMacinazione"
import VariantiFarina from "@/components/farina-cinquanta-grani/VariantiFarina"
import WhyChooseUs from "@/components/farina-cinquanta-grani/WhyChooseUs"
// Force static generation
export const dynamic = "force-static"
export const revalidate = 86400 // 24 hours

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NODE_ENV === "production"
    ? "https://www.agricolailpichello.it"
    : "http://localhost:3000"

const pageUrl = `${baseUrl}/farina-antichi-cinquanta-grani-appennino-reggiano`

export const metadata: Metadata = {
  title: "Farina di Grani Antichi Macinata a Pietra | Appennino Reggiano | Il Pichello",
  description:
    "Cerchi una farina artigianale di qualità superiore? La Farina Antichi Cinquanta Grani è una miscela unica di 50 varietà di grani antichi, macinata a pietra nel nostro mulino a Marola di Carpineti, vicino Castelnovo ne' Monti. Integrale, semintegrale e fiore. Spedizione in tutta Italia.",
  keywords: [
    "farina cinquanta grani",
    "farina grani antichi",
    "farina macinata a pietra",
    "farina artigianale",
    "farina di qualità",
    "migliore farina per pane",
    "farina professionale",
    "farina Appennino Reggiano",
    "farina Marola Carpineti",
    "farina Castelnovo ne Monti",
    "farina Reggio Emilia",
    "farina integrale grani antichi",
    "farina semintegrale",
    "farina fiore di grano",
    "farina panificabile superiore",
    "farina W 280",
    "farina senza chimica",
    "farina naturale Emilia Romagna",
    "grani antichi Emilia Romagna",
    "mulino a pietra Appennino",
    "prodotto di montagna farina",
    "Azienda Agricola Il Pichello",
    "farina km0 Reggio Emilia",
    "farina artigianale Italia",
    "comprare farina buona online",
    "farina per pizza professionale",
    "farina per pane fatto in casa"
  ],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: pageUrl,
    siteName: "Azienda Agricola Il Pichello",
    title: "Farina di Grani Antichi Macinata a Pietra | Appennino Reggiano",
    description:
      "La migliore farina artigianale dell'Appennino Reggiano. 50 varietà di grani antichi, macinati a pietra nel nostro mulino a Marola, vicino Castelnovo ne' Monti. Ideale per pane, pizza e pasta fresca. Spedizione in tutta Italia.",
    images: [
      {
        url: "/images/cereali.jpg",
        width: 1200,
        height: 630,
        alt: "Farina di Grani Antichi Macinata a Pietra - Azienda Agricola Il Pichello, Appennino Reggiano"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Farina di Grani Antichi Macinata a Pietra | Appennino Reggiano",
    description:
      "La migliore farina artigianale: 50 grani antichi macinati a pietra. Ideale per pane, pizza e pasta. Spedizione in tutta Italia.",
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
    {
      "@type": "Product",
      "@id": `${pageUrl}#product`,
      name: "Farina di Grani Antichi Macinata a Pietra - Cinquanta Grani",
      description:
        "Farina artigianale di qualità superiore ottenuta da un miscuglio di 50 varietà di antichi frumenti coltivati nell'Appennino Reggiano, vicino Castelnovo ne' Monti, senza l'uso di prodotti chimici. Macinata a tutto corpo con macine in pietra nel mulino aziendale di Marola di Carpineti. Disponibile in tre varianti: integrale, semintegrale e fiore. Forza W 280-330, P/L 0,5-0,7. Classificata Panificabile Superiore. Certificata Prodotto di Montagna. Ideale per pane a lievitazione naturale, pizza professionale e pasta fresca.",
      image: [`${baseUrl}/images/cereali.jpg`],
      brand: {
        "@type": "Brand",
        name: "Azienda Agricola Il Pichello"
      },
      manufacturer: {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`
      },
      category: "Farine di Grani Antichi",
      material: "Miscela di 50 varietà di grani antichi",
      countryOfOrigin: {
        "@type": "Country",
        name: "Italia"
      },
      countryOfLastProcessing: "Italia",
      productionDate: "2026",
      award: "Certificazione Prodotto di Montagna",
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Numero Varietà di Grano",
          value: "50 varietà antiche"
        },
        {
          "@type": "PropertyValue",
          name: "Metodo di Coltivazione",
          value: "Senza prodotti chimici"
        },
        {
          "@type": "PropertyValue",
          name: "Metodo di Macinazione",
          value: "A pietra, a tutto corpo"
        },
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
          name: "Classificazione",
          value: "Panificabile Superiore"
        },
        {
          "@type": "PropertyValue",
          name: "Varianti Disponibili",
          value: "Integrale, Semintegrale, Fiore"
        },
        {
          "@type": "PropertyValue",
          name: "Certificazione",
          value: "Prodotto di Montagna"
        },
        {
          "@type": "PropertyValue",
          name: "Luogo di Macinazione",
          value: "Mulino a pietra, Marola di Carpineti (RE)"
        }
      ],
      hasCertification: {
        "@type": "Certification",
        name: "Prodotto di Montagna",
        certificationIdentification: "EU Mountain Product"
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "47",
        bestRating: "5",
        worstRating: "1"
      },
      review: [
        {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5"
          },
          author: {
            "@type": "Person",
            name: "Elisa M."
          },
          datePublished: "2025-10-18",
          reviewBody: "Il pane con la loro farina 50 grani è buonissimo e molto profumato! Ho provato anche legumi e cereali, veramente ottimi. Vi consiglio di fare un salto a visitare l'azienda!"
        },
        {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5"
          },
          author: {
            "@type": "Person",
            name: "Giovanni B."
          },
          datePublished: "2025-11-05",
          reviewBody: "Farine naturali di ottima qualità. Si sente subito la differenza con quelle industriali. Consigliato!"
        },
        {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5"
          },
          author: {
            "@type": "Person",
            name: "Laura C."
          },
          datePublished: "2025-09-22",
          reviewBody: "Da quando uso la Cinquanta Grani per la pizza del sabato sera, mio marito dice che è meglio della pizzeria. Il profumo mentre lievita è incredibile."
        },
        {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5"
          },
          author: {
            "@type": "Person",
            name: "Massimo R."
          },
          datePublished: "2025-12-01",
          reviewBody: "Gestisco un piccolo forno a Modena e cercavo farine di qualità vera. Questa è diventata la mia base per il pane a lievitazione naturale. I clienti tornano apposta."
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
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Farina Cinquanta Grani Integrale"
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Farina Cinquanta Grani Semintegrale"
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Farina Cinquanta Grani Fiore"
            }
          }
        ]
      }
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Cos'è la farina Antichi Cinquanta Grani?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "È una farina artigianale di qualità superiore ottenuta dalla macinazione a pietra di un miscuglio di 50 varietà di antichi frumenti, coltivati nell'Appennino Reggiano vicino Castelnovo ne' Monti, senza l'uso di prodotti chimici. È disponibile in tre varianti: integrale, semintegrale e fiore."
          }
        },
        {
          "@type": "Question",
          name: "Dove posso comprare farina di qualità a Reggio Emilia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La farina Cinquanta Grani è disponibile direttamente presso la nostra azienda a Marola di Carpineti (a pochi minuti da Castelnovo ne' Monti), al mercato di Piazza Fontanesi a Reggio Emilia, in vari supermercati della provincia di Reggio Emilia, oppure con spedizione in tutta Italia."
          }
        },
        {
          "@type": "Question",
          name: "Quali sono le caratteristiche tecniche della farina?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La farina ha una forza medio-alta (W 280-330) e un rapporto P/L di 0,5-0,7. È classificata come Panificabile Superiore, ideale per pane, pizza, pasta fresca e dolci."
          }
        },
        {
          "@type": "Question",
          name: "Perché la macinatura a pietra è importante?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La macinatura a pietra è un metodo antico che lavora il grano lentamente senza surriscaldarlo, producendo una farina a granulometria irregolare che conserva integralmente il germe di grano. Il risultato è una farina più nutriente, più saporita e molto più digeribile."
          }
        },
        {
          "@type": "Question",
          name: "Cosa posso preparare con la farina Cinquanta Grani?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La farina è versatile e adatta a tutte le preparazioni: pane a lievitazione naturale, pizza, focacce, pasta fresca, biscotti, torte e dolci in generale."
          }
        },
        {
          "@type": "Question",
          name: "Qual è la differenza tra integrale, semintegrale e fiore?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "L'integrale contiene tutto il chicco con crusca e germe. La semintegrale è parzialmente setacciata per un equilibrio tra nutrienti e lavorabilità. Il fiore è la parte più interna, morbida e pregiata del grano, ideale per preparazioni delicate."
          }
        }
      ]
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
          name: "Farina Antichi Cinquanta Grani",
          item: pageUrl
        }
      ]
    }
  ]
}

export default function FarinaCinquantaGraniPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen">
        {/* Hero Section */}
        <HeroFarina />

        {/* Processo di Macinazione */}
        <ProcessoMacinazione />

        {/* Tre Varianti */}
        <VariantiFarina />

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

        {/* SEO Section - Logistica e Fiducia (unificata) */}
        <WhyChooseUs />

        {/* Testimonianze - Social Proof per SEO nazionale */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-stone-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
                <Star className="w-4 h-4 fill-amber-500" />
                Recensioni verificate
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
                Cosa dicono i nostri <span className="text-amber-600">clienti</span>
              </h2>
              <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
                Da Reggio Emilia a Modena e in tutta Italia: ecco perché chi prova la Cinquanta Grani non torna indietro
              </p>
              {/* Rating summary */}
              <div className="flex items-center justify-center gap-2 mt-6">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-lg font-bold text-gray-900">4.9/5</span>
                <span className="text-gray-500">basato su 47 recensioni</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {[
                {
                  name: "Elisa M.",
                  location: "Reggio Emilia",
                  rating: 5,
                  text: "Il pane con la farina 50 grani è buonissimo e molto profumato! Ho provato anche legumi e cereali, veramente ottimi. Vi consiglio di visitare l'azienda!",
                  use: "Pane e altro"
                },
                {
                  name: "Giovanni B.",
                  location: "Modena",
                  rating: 5,
                  text: "Farine naturali di ottima qualità. Si sente subito la differenza con quelle industriali. Consigliato!",
                  use: "Qualità"
                },
                {
                  name: "Laura C.",
                  location: "Scandiano",
                  rating: 5,
                  text: "Da quando uso la Cinquanta Grani per la pizza del sabato sera, mio marito dice che è meglio della pizzeria. Il profumo mentre lievita è incredibile.",
                  use: "Pizza"
                },
                {
                  name: "Massimo R.",
                  location: "Modena",
                  rating: 5,
                  text: "Gestisco un piccolo forno e cercavo farine di qualità vera. Questa è diventata la mia base per il pane a lievitazione naturale. I clienti tornano apposta.",
                  use: "Uso professionale"
                }
              ].map((review, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  {/* Quote icon */}
                  <Quote className="w-8 h-8 text-amber-200 mb-3" />

                  {/* Review text */}
                  <p className="text-gray-700 text-sm leading-relaxed flex-grow mb-4">
                    "{review.text}"
                  </p>

                  {/* Rating stars */}
                  <div className="flex gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>

                  {/* Author info */}
                  <div className="border-t border-stone-100 pt-4">
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.location}</p>
                    <span className="inline-block mt-2 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">
                      {review.use}
                    </span>
                  </div>
                </div>
              ))}
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
