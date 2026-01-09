import ProductsClient from "@/components/Prodotti";
import { getCategorie, getProdotti } from "../../../sanity/sanity.query";
import { CategoriaType, ProdottoType } from "../../../types";
import { Suspense } from "react";
import FooterV2 from "@/components/new/Footer";
import "../globals.css";
import { Metadata } from "next";

type Props = {
  searchParams: Promise<{ categoria?: string }>;
};

// Force static generation with revalidation
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour (adjust as needed)

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  // Await the searchParams Promise
  const resolvedSearchParams = await searchParams;

  // Use the same cached data from the page component
  const categories: CategoriaType[] = await getCategorie();
  const categoriaSlug = resolvedSearchParams.categoria;

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
  // Await the searchParams Promise
  const resolvedSearchParams = await searchParams;

  // Fetch prodotti and categories in parallel for better performance
  const [prodotti, categories] = await Promise.all([
    getProdotti(),
    getCategorie(),
  ]);

  return (
    <>
      <Suspense>
        <ProductsClient
          prodotti={prodotti}
          categorie={categories}
          searchParams={resolvedSearchParams}
        />
      </Suspense>
      <FooterV2 prodotti={prodotti} categorie={categories} />
    </>
  );
};

export default ProdottiServer;
