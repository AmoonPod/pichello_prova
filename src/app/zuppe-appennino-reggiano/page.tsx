import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import FooterV2 from "@/components/new/Footer"
import {
  ArrowRight,
  Phone,
  Mail,
  Check,
  Star,
  Quote,
  Truck
} from "lucide-react"
import "../globals.css"
import { getProdottiByCategoria } from "sanity/sanity.query"

// Components
import HeroZuppe from "@/components/zuppe/HeroZuppe"
import ProcessoZuppe from "@/components/zuppe/ProcessoZuppe"
import GalleriaZuppe from "@/components/zuppe/GalleriaZuppe"
import GalleriaRisotti from "@/components/zuppe/GalleriaRisotti"
import WhyChooseZuppe from "@/components/zuppe/WhyChooseZuppe"

// Force static generation
export const dynamic = "force-static"
export const revalidate = 3600 // 1 hour

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NODE_ENV === "production"
    ? "https://www.agricolailpichello.it"
    : "http://localhost:3000"

const pageUrl = `${baseUrl}/zuppe-appennino-reggiano`

export const metadata: Metadata = {
  title: "Zuppe Artigianali e Risotti | Appennino Reggiano | Il Pichello",
  description:
    "Zuppe di legumi e cereali dell'Appennino Reggiano, preparate a mano a Marola di Carpineti. Ingredienti naturali, senza conservanti, pronte da cuocere in 30-40 minuti. Risotti gourmet con riso Carnaroli. Spedizione in tutta Italia.",
  keywords: [
    "zuppe artigianali",
    "zuppe di legumi",
    "zuppe Appennino Reggiano",
    "risotti pronti",
    "zuppe farro orzo",
    "zuppe lenticchie",
    "zuppe senza conservanti",
    "comfort food italiano",
    "zuppe Reggio Emilia",
    "Il Pichello zuppe",
    "zuppe cereali antichi",
    "minestre montagna",
    "risotto funghi porcini",
    "risotto tartufo",
    "zuppe vegetariane",
    "proteine vegetali"
  ],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: pageUrl,
    siteName: "Azienda Agricola Il Pichello",
    title: "Zuppe Artigianali e Risotti | Appennino Reggiano",
    description:
      "Zuppe di legumi e cereali preparate a mano nell'Appennino Reggiano. Ingredienti naturali, pronte da cuocere. Il vero comfort food italiano.",
    images: [
      {
        url: "/images/zuppe_background.jpg",
        width: 1200,
        height: 630,
        alt: "Zuppe artigianali dell'Appennino Reggiano - Azienda Agricola Il Pichello"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Zuppe Artigianali e Risotti | Appennino Reggiano",
    description:
      "Zuppe di legumi e cereali dell'Appennino. Ingredienti naturali, senza conservanti.",
    images: ["/images/zuppe_background.jpg"]
  },
  alternates: {
    canonical: pageUrl
  }
}

// JSON-LD Schema per SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": `${pageUrl}#product`,
      name: "Zuppe Artigianali dell'Appennino Reggiano",
      description:
        "Zuppe e minestre di legumi e cereali antichi, preparate a mano nell'Appennino Reggiano. Mix di farro, orzo, lenticchie e grani antichi. Senza conservanti, pronte da cuocere in 30-40 minuti. 100% vegetali, ricche di proteine.",
      image: [`${baseUrl}/images/zuppe_background.jpg`],
      brand: {
        "@type": "Brand",
        name: "Azienda Agricola Il Pichello"
      },
      manufacturer: {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`
      },
      category: "Zuppe e Minestre",
      countryOfOrigin: {
        "@type": "Country",
        name: "Italia"
      },
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Tempo di Cottura",
          value: "30-40 minuti"
        },
        {
          "@type": "PropertyValue",
          name: "Conservazione",
          value: "Oltre 12 mesi"
        },
        {
          "@type": "PropertyValue",
          name: "Tipo",
          value: "100% Vegetale"
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
      }
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Quanto durano le confezioni di zuppe?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Grazie all'atmosfera protettiva e alla disidratazione naturale, i nostri prodotti durano oltre 12 mesi in dispensa, senza conservanti chimici."
          }
        },
        {
          "@type": "Question",
          name: "Le zuppe sono adatte a diete vegetariane?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Assolutamente sì. Tutte le nostre zuppe sono 100% vegetali. Sono ideali anche per chi cerca fonti proteiche alternative alla carne."
          }
        },
        {
          "@type": "Question",
          name: "Come si cucinano le zuppe?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Versa il contenuto in pentola con acqua fredda o brodo, porta a bollore e lascia cuocere lentamente per 30-40 minuti. A fine cottura aggiungi un filo d'olio."
          }
        },
        {
          "@type": "Question",
          name: "Spedite in tutta Italia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sì, spediamo con corriere espresso in tutta Italia. L'imballaggio è sicuro per garantire l'integrità del prodotto."
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
          name: "Zuppe e Risotti",
          item: pageUrl
        }
      ]
    }
  ]
}

export default async function ZuppePage() {
  // Fetch zuppe e risotti da Sanity
  const prodotti = await getProdottiByCategoria("zuppe-e-risotti")
  // Separa zuppe e risotti (i risotti hanno "risotto" nel nome)
  const zuppe = prodotti.filter((p: any) => !p.nome?.toLowerCase().includes("risotto"))
  const risotti = prodotti.filter((p: any) => p.nome?.toLowerCase().includes("risotto"))
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen">
        {/* Hero Section */}
        <HeroZuppe />

        {/* Processo - "Come nascono" */}
        <ProcessoZuppe />

        {/* Galleria Zuppe */}
        <GalleriaZuppe zuppe={zuppe} />

        {/* Galleria Risotti */}
        <GalleriaRisotti risotti={risotti} />

        {/* Come si preparano */}
        <section className="py-16 lg:py-24 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Semplicità in cucina
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
                Come si <span className="text-primary">preparano?</span>
              </h2>
              <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
                Tre semplici passaggi per un risultato da chef
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  num: "1",
                  title: "Versa",
                  text: "Metti il contenuto della busta in pentola con acqua fredda (o brodo). Nessun soffritto necessario."
                },
                {
                  num: "2",
                  title: "Cuoci",
                  text: "Porta a bollore e lascia cuocere lentamente per 30-40 minuti, finché l'acqua non si assorbe."
                },
                {
                  num: "3",
                  title: "Condisci",
                  text: "A fuoco spento, aggiungi un filo d'olio buono e, se vuoi, una spolverata di parmigiano."
                }
              ].map((step, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-primary/20 hover:shadow-lg hover:border-primary/40 transition-all duration-300 text-center group"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <span className="text-2xl font-serif font-bold text-primary">{step.num}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Section - Perché sceglierci */}
        <WhyChooseZuppe />

        {/* Testimonianze */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-stone-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                <Star className="w-4 h-4 fill-primary" />
                Recensioni verificate
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
                Cosa dicono i nostri <span className="text-primary">clienti</span>
              </h2>
              <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
                Il comfort food dell'Appennino conquista tutta Italia
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  name: "Marco T.",
                  location: "Milano",
                  rating: 5,
                  text: "Finalmente zuppe vere! Niente a che vedere con quelle del supermercato. Si sente che sono fatte con ingredienti di qualità. La zuppa di farro è diventata un must del mio inverno.",
                  use: "Cena veloce"
                },
                {
                  name: "Francesca B.",
                  location: "Reggio Emilia",
                  rating: 5,
                  text: "Le compro sempre al mercato di Piazza Fontanesi. Ottime per chi lavora e non ha tempo di cucinare ma non vuole rinunciare a mangiare bene. I miei figli le adorano!",
                  use: "Famiglia"
                },
                {
                  name: "Antonio R.",
                  location: "Roma",
                  rating: 5,
                  text: "Me le sono fatte spedire dopo averle assaggiate in vacanza in Emilia. Il risotto ai funghi porcini è eccezionale, cremoso al punto giusto. Nulla da invidiare a quello fatto da zero.",
                  use: "Risotti gourmet"
                }
              ].map((review, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  <Quote className="w-8 h-8 text-primary/20 mb-3" />

                  <p className="text-muted-foreground text-sm leading-relaxed flex-grow mb-4">
                    "{review.text}"
                  </p>

                  <div className="flex gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${star <= review.rating ? 'fill-secondary text-secondary' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>

                  <div className="border-t border-stone-100 pt-4">
                    <p className="font-semibold text-foreground">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.location}</p>
                    <span className="inline-block mt-2 text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                      {review.use}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 lg:py-24 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
                Pronto a scaldarti con le nostre zuppe?
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
                <Link href="/contatti?prodotto=Zuppe%20e%20Risotti%20Artigianali&richiesta=ordine">
                  <Button
                    size="lg"
                    className="bg-white hover:bg-white/90 text-primary font-bold px-10 py-4 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group"
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
