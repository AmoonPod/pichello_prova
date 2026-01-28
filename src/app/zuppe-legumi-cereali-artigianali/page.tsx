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

// PRODUCTION DOMAIN - sempre usare il dominio canonico per SEO
const baseUrl = "https://www.agricolailpichello.it"

const pageUrl = `${baseUrl}/zuppe-legumi-cereali-artigianali`

export const metadata: Metadata = {
  title: "Zuppe di Legumi e Cereali Artigianali | Pronte in 30 Minuti | Il Pichello",
  description:
    "Zuppe contadine e Risotti gourmet senza conservanti. Solo legumi italiani e cereali antichi. 100% vegane, ricche di proteine vegetali. Il pasto sano e veloce, pronto in 30 minuti. Acquista online dal produttore.",
  keywords: [
    "zuppe legumi online",
    "zuppe vegane proteiche",
    "zuppe pronte senza conservanti",
    "zuppe artigianali italiane",
    "risotti pronti gourmet",
    "kit risotto funghi porcini",
    "zuppe farro lenticchie",
    "minestre cereali antichi",
    "zuppe vegetariane proteine",
    "comfort food italiano",
    "zuppe plant based",
    "pasto veloce sano",
    "zuppe secche vendita online",
    "risotto tartufo artigianale",
    "cesti regalo alimentari",
    "proteine vegetali legumi"
  ],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: pageUrl,
    siteName: "Azienda Agricola Il Pichello",
    title: "Zuppe di Legumi e Cereali Artigianali | Pronte in 30 Minuti",
    description:
      "Zuppe contadine e Risotti gourmet senza conservanti. 100% vegane, ricche di proteine vegetali. Pronte in 30 minuti. Spedizione in tutta Italia.",
    images: [
      {
        url: "/images/zuppe_background.jpg",
        width: 1200,
        height: 630,
        alt: "Zuppe artigianali di legumi e cereali - 100% vegane - Il Pichello"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Zuppe di Legumi e Cereali Artigianali | Pronte in 30 Minuti",
    description:
      "Zuppe vegane e Risotti gourmet senza conservanti. Pronte in 30 minuti. Spedizione in Italia.",
    images: ["/images/zuppe_background.jpg"]
  },
  alternates: {
    canonical: pageUrl
  }
}

// Recipe schemas per le zuppe principali (SEO avanzato)
const recipeSchemas = [
  {
    "@type": "Recipe",
    "@id": `${pageUrl}#zuppa-contadina`,
    name: "Zuppa Contadina dell'Appennino",
    description: "Mix pronto di farro, orzo e lenticchie per una zuppa rustica e nutriente. Ideale per dieta vegana e vegetariana, ricca di proteine vegetali.",
    image: [`${baseUrl}/images/zuppe/zuppa_contadina.webp`],
    recipeCuisine: "Italiana",
    recipeCategory: "Zuppa",
    totalTime: "PT40M",
    prepTime: "PT5M",
    cookTime: "PT35M",
    recipeYield: "4 porzioni",
    keywords: "zuppa vegana, zuppa proteine vegetali, zuppa farro lenticchie, comfort food",
    suitableForDiet: ["https://schema.org/VeganDiet", "https://schema.org/VegetarianDiet"],
    author: {
      "@type": "Organization",
      name: "Azienda Agricola Il Pichello"
    },
    recipeIngredient: [
      "1 confezione Zuppa Contadina Il Pichello (300g)",
      "1 litro di acqua fredda o brodo vegetale",
      "Olio extravergine di oliva a piacere",
      "Sale e pepe q.b."
    ],
    recipeInstructions: [
      {
        "@type": "HowToStep",
        text: "Versa il contenuto della busta in una pentola con 1 litro di acqua fredda o brodo vegetale."
      },
      {
        "@type": "HowToStep",
        text: "Porta a bollore, poi abbassa la fiamma e lascia cuocere lentamente per 30-35 minuti."
      },
      {
        "@type": "HowToStep",
        text: "A cottura ultimata, condisci con un filo d'olio extravergine e servi calda."
      }
    ],
    nutrition: {
      "@type": "NutritionInformation",
      proteinContent: "12g per porzione",
      fiberContent: "8g per porzione",
      calories: "180 kcal per porzione"
    }
  },
  {
    "@type": "Recipe",
    "@id": `${pageUrl}#zuppa-montanaro`,
    name: "Zuppa del Montanaro",
    description: "Ricetta tradizionale dell'Appennino con cereali e legumi di montagna. 100% vegetale, senza conservanti. Pronta in 40 minuti.",
    image: [`${baseUrl}/images/zuppe/zuppa_montanaro.webp`],
    recipeCuisine: "Italiana",
    recipeCategory: "Zuppa",
    totalTime: "PT45M",
    prepTime: "PT5M",
    cookTime: "PT40M",
    recipeYield: "4 porzioni",
    keywords: "zuppa montagna, ricetta tradizionale, zuppe italiane, plant based",
    suitableForDiet: ["https://schema.org/VeganDiet", "https://schema.org/VegetarianDiet"],
    author: {
      "@type": "Organization",
      name: "Azienda Agricola Il Pichello"
    },
    recipeIngredient: [
      "1 confezione Zuppa del Montanaro Il Pichello (300g)",
      "1,2 litri di acqua o brodo",
      "Olio extravergine di oliva",
      "Parmigiano Reggiano grattugiato (opzionale)"
    ],
    recipeInstructions: [
      {
        "@type": "HowToStep",
        text: "Metti il contenuto in pentola con acqua fredda. Non serve ammollo."
      },
      {
        "@type": "HowToStep",
        text: "Cuoci a fuoco lento per 35-40 minuti mescolando occasionalmente."
      },
      {
        "@type": "HowToStep",
        text: "Servi con olio a crudo e, se gradito, una spolverata di Parmigiano."
      }
    ],
    nutrition: {
      "@type": "NutritionInformation",
      proteinContent: "14g per porzione",
      fiberContent: "10g per porzione",
      calories: "200 kcal per porzione"
    }
  },
  {
    "@type": "Recipe",
    "@id": `${pageUrl}#risotto-funghi-porcini`,
    name: "Kit Risotto ai Funghi Porcini Artigianale",
    description: "Risotto gourmet con Riso Carnaroli e funghi porcini secchi dell'Appennino. Pronto in 20 minuti, cremoso e profumato.",
    image: [`${baseUrl}/images/zuppe/risotto_porcini.webp`],
    recipeCuisine: "Italiana",
    recipeCategory: "Risotto",
    totalTime: "PT25M",
    prepTime: "PT5M",
    cookTime: "PT20M",
    recipeYield: "3-4 porzioni",
    keywords: "kit risotto funghi porcini, risotto pronto gourmet, regalo gastronomico",
    author: {
      "@type": "Organization",
      name: "Azienda Agricola Il Pichello"
    },
    recipeIngredient: [
      "1 Kit Risotto Funghi Porcini Il Pichello",
      "1 litro di brodo vegetale caldo",
      "50g di burro",
      "Parmigiano Reggiano grattugiato",
      "1 bicchiere di vino bianco secco"
    ],
    recipeInstructions: [
      {
        "@type": "HowToStep",
        text: "Tosta il riso in padella con metà del burro per 2 minuti."
      },
      {
        "@type": "HowToStep",
        text: "Sfuma con vino bianco, poi aggiungi i funghi e il brodo caldo poco alla volta."
      },
      {
        "@type": "HowToStep",
        text: "Cuoci per 16-18 minuti. Manteca con burro e Parmigiano."
      }
    ]
  }
]

// JSON-LD Schema per SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      "@id": `${pageUrl}#productlist`,
      name: "Zuppe e Risotti Artigianali - Il Pichello",
      description: "Collezione di zuppe di legumi e cereali 100% vegane e risotti gourmet. Senza conservanti, pronte in 30 minuti.",
      numberOfItems: 8,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Product",
            name: "Zuppa Contadina",
            description: "Mix di farro, orzo e lenticchie. 100% vegana, ricca di proteine vegetali.",
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "EUR",
              lowPrice: "4.50",
              highPrice: "6.00",
              availability: "https://schema.org/InStock"
            }
          }
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Product",
            name: "Zuppa del Montanaro",
            description: "Ricetta tradizionale dell'Appennino con cereali e legumi di montagna.",
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "EUR",
              lowPrice: "4.50",
              highPrice: "6.00",
              availability: "https://schema.org/InStock"
            }
          }
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "Product",
            name: "Kit Risotto ai Funghi Porcini",
            description: "Risotto gourmet con Riso Carnaroli e funghi porcini secchi dell'Appennino.",
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "EUR",
              lowPrice: "6.00",
              highPrice: "8.00",
              availability: "https://schema.org/InStock"
            }
          }
        }
      ]
    },
    ...recipeSchemas,
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
