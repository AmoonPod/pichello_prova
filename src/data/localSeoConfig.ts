export const cities = [
  { slug: "reggio-emilia", name: "Reggio Emilia", region: "Emilia-Romagna", prefix: "a" },
  { slug: "modena", name: "Modena", region: "Emilia-Romagna", prefix: "a" },
  { slug: "parma", name: "Parma", region: "Emilia-Romagna", prefix: "a" },
  { slug: "bologna", name: "Bologna", region: "Emilia-Romagna", prefix: "a" },
  { slug: "milano", name: "Milano", region: "Lombardia", prefix: "a" },
  { slug: "sassuolo", name: "Sassuolo", region: "Emilia-Romagna", prefix: "a" },
  { slug: "carpi", name: "Carpi", region: "Emilia-Romagna", prefix: "a" },
  { slug: "castelnovo-ne-monti", name: "Castelnovo ne' Monti", region: "Emilia-Romagna", prefix: "a" }
];

export const categories = [
  { 
    slug: "pasta-artigianale", 
    name: "Pasta Artigianale", 
    sanityCategory: "pasta-di-semola-di-grano-duro",
    sanityProductSlugs: null,
    keywords: ["pasta trafilata al bronzo", "pasta di grano duro", "pasta artigianale online", "pasta senatore cappelli"],
    description: "Pasta di semola di grano duro coltivato in Appennino, trafilata al bronzo ed essiccata lentamente."
  },
  { 
    slug: "farine-macinate-a-pietra", 
    name: "Farine Macinate a Pietra", 
    sanityCategory: null, 
    sanityProductSlugs: [
      "farina-antichi-cinquanta-grani-integrale", 
      "farina-antichi-cinquanta-grani-semintegrale", 
      "farina-antichi-cinquanta-grani-fiore"
    ],
    keywords: ["farina per pizza", "farina grani antichi", "farina tipo 1", "farina integrale", "farina macinata a pietra"],
    description: "Farine di grani antichi macinate a pietra nel nostro mulino. Ideali per pane, pizza e dolci fatti in casa."
  },
  { 
    slug: "zuppe-e-legumi", 
    name: "Zuppe e Legumi", 
    sanityCategory: "zuppe-e-risotti",
    sanityProductSlugs: null,
    keywords: ["zuppe pronte", "legumi secchi", "zuppe vegetali", "risotti pronti", "zuppa di farro"],
    description: "Zuppe di legumi e cereali pronte da cuocere, senza conservanti. Il sapore della tradizione contadina."
  },
  {
    slug: "miele-e-conserve",
    name: "Miele e Conserve",
    sanityCategory: "prodotti-dellalveare",
    sanityProductSlugs: null,
    keywords: ["miele artigianale", "miele di acacia", "polline", "miele biologico"],
    description: "Miele dell'Appennino Reggiano e prodotti dell'alveare, raccolti nel rispetto delle api e dell'ambiente."
  }
];
