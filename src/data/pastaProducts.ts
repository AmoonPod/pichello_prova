export type PastaProduct = {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  cookingTime: string
  intensity: string
  images: string[]
  pairing: string
  pairingLink?: string
  pairingLabel?: string
  priceRange: {
    low: number
    high: number
  }
}

export const pastaProducts: PastaProduct[] = [
  {
    id: "spaghetti",
    slug: "spaghetti",
    name: "Spaghetti",
    tagline: "Il Grande Classico",
    description:
      "Il formato più amato, nella sua versione autentica. Superficie ruvida che trattiene l'olio e il pomodoro. Perfetti per aglio e olio, alle vongole o con un semplice pomodoro fresco.",
    cookingTime: "9-11 min",
    intensity: "Media",
    pairing: "Ideale con sughi rossi veloci o vongole dell'Adriatico.",
    priceRange: { low: 3, high: 5 },
    images: [
      "/images/pasta/spaghetti_appennino_reggiano_3.webp",
      "/images/pasta/spaghetti_appennino_reggiano.webp",
      "/images/pasta/spaghetti_appennino_reggiano_2.webp",
      "/images/pasta/spaghetti_appennino_reggiano_4.webp"
    ]
  },
  {
    id: "mezzi-paccheri",
    slug: "mezzi-paccheri",
    name: "Mezzi Paccheri",
    tagline: "Il Re della Tavola",
    description:
      "Superficie incredibilmente ruvida e struttura spessa. Nati per abbracciare ragù di carne e sughi corposi. Si riempiono di condimento ad ogni forchettata.",
    cookingTime: "13-15 min",
    intensity: "Alta",
    pairing: "Ideale con ragù di cinghiale o funghi dell'Appennino.",
    priceRange: { low: 3, high: 5 },
    images: [
      "/images/pasta/mezzi_paccheri_appennino_reggiano_6.webp",
      "/images/pasta/mezzi_paccheri_appennino_reggiano.webp",
      "/images/pasta/mezzi_paccheri_appennino_reggiano_3.webp",
      "/images/pasta/mezzi_paccheri_appennino_reggiano_4.webp"
    ]
  },
  {
    id: "fusilli",
    slug: "fusilli",
    name: "Fusilli",
    tagline: "Spirale Perfetta",
    description:
      "La spirale cattura il condimento in ogni piega. Ottimi con pesto, sughi vegetali o semplicemente burro e salvia. L'essiccazione lenta mantiene la forma intatta.",
    cookingTime: "11-13 min",
    intensity: "Media",
    pairing: "Ideale con pesto alla genovese o crema di verdure.",
    priceRange: { low: 3, high: 5 },
    images: [
      "/images/pasta/fusilli_appennino_reggiano_4.webp",
      "/images/pasta/fusilli_appennino_reggiano_3.webp",
      "/images/pasta/fusilli_appennino_reggiano.webp"
    ]
  },
  {
    id: "penne",
    slug: "penne-rigate",
    name: "Penne Rigate",
    tagline: "Il Classico Versatile",
    description:
      "Rigatura profonda e taglio netto. Il sugo entra dentro e si aggrappa fuori. Perfette per l'arrabbiata, la vodka o un ragù bianco.",
    cookingTime: "11-13 min",
    intensity: "Media-Alta",
    pairing: "Ideale con arrabbiata o ragù bianco di cortile.",
    priceRange: { low: 3, high: 5 },
    images: [
      "/images/pasta/penne_appennino_reggiano_5.webp",
      "/images/pasta/penne_appennino_reggiano_3.webp",
      "/images/pasta/penne_appennino_reggiano.webp",
      "/images/pasta/penne_appennino_reggiano_4.webp"
    ]
  },
  {
    id: "maccheroni",
    slug: "maccheroni",
    name: "Maccheroni",
    tagline: "Semplicità Rurale",
    description:
      "Il formato della domenica. Corti, robusti e versatili. Perfetti saltati in padella con ragù, salsiccia o verdure di stagione.",
    cookingTime: "11-13 min",
    intensity: "Media",
    pairing: "Ideale con ragù di salsiccia o verdure di stagione.",
    priceRange: { low: 3, high: 5 },
    images: [
      "/images/pasta/maccheroni_appennino_reggiano_2.webp",
      "/images/pasta/maccheroni_appennino_reggiano.webp",
      "/images/pasta/maccheroni_appennino_reggiano_4.webp"
    ]
  },
  {
    id: "tubetti",
    slug: "tubetti",
    name: "Tubetti",
    tagline: "Per Minestre e Zuppe",
    description:
      "Piccoli ma tenaci. Ideali per minestre di legumi, pasta e fagioli o pasta e ceci. Tengono la cottura anche nel brodo caldo.",
    cookingTime: "9-11 min",
    intensity: "Delicata",
    pairing: "Ideale con minestre di legumi e zuppe di montagna.",
    pairingLink: "/zuppe-appennino-reggiano",
    pairingLabel: "Vedi le nostre zuppe",
    priceRange: { low: 3, high: 5 },
    images: [
      "/images/pasta/tubetti_appennino_reggiano_3.webp",
      "/images/pasta/tubetti_appennino_reggiano_2.webp",
      "/images/pasta/tubetti_appennino_reggiano.webp"
    ]
  }
]
