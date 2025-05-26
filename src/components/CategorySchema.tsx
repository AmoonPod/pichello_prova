import { CategoriaType, ProdottoType } from "../../types";

interface CategorySchemaProps {
  category: CategoriaType;
  products: ProdottoType[];
  currentUrl: string;
}

const CategorySchema: React.FC<CategorySchemaProps> = ({
  category,
  products,
  currentUrl,
}) => {
  // Generate CollectionPage schema with ItemList
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.nome} dell'Appennino Reggiano`,
    description: `Scopri la collezione di ${category.nome.toLowerCase()} biorazionali dell'Azienda Agricola Il Pichello, coltivati con metodi tradizionali nell'Appennino Reggiano.`,
    url: currentUrl,
    mainEntity: {
      "@type": "ItemList",
      name: `${category.nome} Il Pichello`,
      description: `Lista dei prodotti nella categoria ${category.nome.toLowerCase()}`,
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.nome,
        description:
          product.descrizione ||
          `${product.nome} biorazionale dell'Appennino Reggiano`,
        url: `https://www.agricolailpichello.it/prodotti/${JSON.parse(JSON.stringify(product.slug)).current}`,
        image: product.immagini?.[0]?.image || "",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: "Azienda Agricola Il Pichello",
            url: "https://www.agricolailpichello.it",
          },
        },
      })),
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.agricolailpichello.it/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Prodotti",
          item: "https://www.agricolailpichello.it/prodotti",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: category.nome,
          item: currentUrl,
        },
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "Azienda Agricola Il Pichello",
      url: "https://www.agricolailpichello.it",
      logo: {
        "@type": "ImageObject",
        url: "https://www.agricolailpichello.it/images/logo.png",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(collectionPageSchema),
      }}
    />
  );
};

export default CategorySchema;
