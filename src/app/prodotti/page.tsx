import ProductsClient from "@/components/Prodotti";
import { getCategorie, getProdotti } from "../../../sanity/sanity.query";
import { CategoriaType, ProdottoType } from "../../../types";
import { Suspense } from "react";
import "../globals.css";
import { Metadata } from "next";

type Props = {
  searchParams: { categoria?: string };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const categories: CategoriaType[] = await getCategorie();
  const categoriaSlug = searchParams.categoria;

  // Find the category if a filter is applied
  const currentCategory = categoriaSlug
    ? categories.find((cat) => {
        const slug = JSON.parse(JSON.stringify(cat.slug)).current;
        return slug === categoriaSlug;
      })
    : null;

  if (currentCategory) {
    // Dynamic metadata for category pages
    const categoryName = currentCategory.nome;
    const title = `${categoryName} Bio Appennino Reggiano | Il Pichello`;
    const description = `Acquista online ${categoryName.toLowerCase()} biorazionali dall'Azienda Agricola Il Pichello. Prodotti genuini da Marola e Carpineti, coltivati nell'Appennino Reggiano con metodi tradizionali.`;
    const canonicalUrl = `https://www.agricolailpichello.it/prodotti?categoria=${categoriaSlug}`;

    return {
      title,
      description,
      openGraph: {
        type: "website",
        locale: "it_IT",
        url: canonicalUrl,
        siteName: "Azienda Agricola Il Pichello",
        title,
        description,
        images: [
          {
            url:
              currentCategory.immagine?.image ||
              "/images/prodotti-og-image.jpg",
            width: 1200,
            height: 630,
            alt: `${categoryName} biorazionali dell'Azienda Agricola Il Pichello dall'Appennino Reggiano`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [
          currentCategory.immagine?.image || "/images/prodotti-og-image.jpg",
        ],
      },
      alternates: {
        canonical: canonicalUrl,
      },
    };
  }

  // Default metadata for main products page
  return {
    title: "Prodotti Biorazionali | Miele e Cereali Appennino Reggiano",
    description:
      "Scopri i nostri prodotti biorazionali: miele artigianale, cereali antichi e legumi coltivati nell'Appennino Reggiano. Vendita diretta di prodotti genuini a km0 dall'Azienda Agricola Il Pichello.",

    openGraph: {
      type: "website",
      locale: "it_IT",
      url: "https://www.agricolailpichello.it/prodotti",
      siteName: "Azienda Agricola Il Pichello",
      title: "Prodotti Biorazionali | Miele e Cereali Appennino Reggiano",
      description:
        "Scopri i nostri prodotti biorazionali: miele artigianale, cereali antichi e legumi coltivati nell'Appennino Reggiano. Vendita diretta di prodotti genuini a km0 dall'Azienda Agricola Il Pichello.",
      images: [
        {
          url: "/images/prodotti-og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Selezione di prodotti biorazionali dell'Azienda Agricola Il Pichello: miele artigianale, cereali antichi e legumi dell'Appennino Reggiano",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Prodotti Biorazionali | Miele e Cereali Appennino Reggiano",
      description:
        "Scopri i nostri prodotti biorazionali: miele artigianale, cereali antichi e legumi coltivati nell'Appennino Reggiano. Vendita diretta di prodotti genuini a km0 dall'Azienda Agricola Il Pichello.",
      images: ["/images/prodotti-og-image.jpg"],
    },
    alternates: {
      canonical: "https://www.agricolailpichello.it/prodotti",
    },
  };
}

const ProdottiServer = async ({ searchParams }: Props) => {
  const prodotti: ProdottoType[] = await getProdotti();
  const categories: CategoriaType[] = await getCategorie();
  return (
    <Suspense>
      <ProductsClient
        prodotti={prodotti}
        categorie={categories}
        searchParams={searchParams}
      />
    </Suspense>
  );
};

export default ProdottiServer;
