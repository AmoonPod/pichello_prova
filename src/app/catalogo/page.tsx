import CatalogClient from "@/components/CatalogClient";
import { getCategorie, getProdotti } from "../../../sanity/sanity.query";
import { CategoriaType, ProdottoType } from "../../../types";
import { Suspense } from "react";
import FooterV2 from "@/components/new/Footer";
import "../globals.css";
import { Metadata } from "next";

type Props = {
  searchParams: Promise<{ categoria?: string }>;
};

// Force static generation with revalidation for maximum performance
export const dynamic = "force-static";
export const revalidate = 1800; // Revalidate every 30 minutes for fresh catalog data

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const categories: CategoriaType[] = await getCategorie();
  const categoriaSlug = resolvedSearchParams.categoria;

  const currentCategory = categoriaSlug
    ? categories.find((cat) => {
      const slug = JSON.parse(JSON.stringify(cat.slug)).current;
      return slug === categoriaSlug;
    })
    : null;

  if (currentCategory) {
    const categoryName = currentCategory.nome;
    const title = `Catalogo ${categoryName} | Il Pichello - Presentazione Commerciale`;
    const description = `Catalogo commerciale ${categoryName.toLowerCase()} biorazionali dell'Azienda Agricola Il Pichello. Tutte le informazioni tecniche e commerciali per presentazioni clienti.`;
    const canonicalUrl = `https://www.agricolailpichello.it/catalogo?categoria=${categoriaSlug}`;

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
            alt: `Catalogo ${categoryName} biorazionali dell'Azienda Agricola Il Pichello`,
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
      robots: {
        index: false, // Catalog is for internal commercial use
        follow: true,
      },
    };
  }

  // Default metadata for main catalog page
  return {
    title: "Catalogo Commerciale | Azienda Agricola Il Pichello",
    description:
      "Catalogo commerciale completo dei prodotti biorazionali: miele artigianale, cereali antichi e legumi dell'Appennino Reggiano. Strumento per presentazioni clienti con dettagli tecnici e commerciali.",
    openGraph: {
      type: "website",
      locale: "it_IT",
      url: "https://www.agricolailpichello.it/catalogo",
      siteName: "Azienda Agricola Il Pichello",
      title: "Catalogo Commerciale | Azienda Agricola Il Pichello",
      description:
        "Catalogo commerciale completo dei prodotti biorazionali: miele artigianale, cereali antichi e legumi dell'Appennino Reggiano. Strumento per presentazioni clienti con dettagli tecnici e commerciali.",
      images: [
        {
          url: "/images/prodotti-og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Catalogo commerciale completo dell'Azienda Agricola Il Pichello con prodotti biorazionali dell'Appennino Reggiano",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Catalogo Commerciale | Azienda Agricola Il Pichello",
      description:
        "Catalogo commerciale completo dei prodotti biorazionali: miele artigianale, cereali antichi e legumi dell'Appennino Reggiano. Strumento per presentazioni clienti con dettagli tecnici e commerciali.",
      images: ["/images/prodotti-og-image.jpg"],
    },
    alternates: {
      canonical: "https://www.agricolailpichello.it/catalogo",
    },
    robots: {
      index: true, // Catalog is for internal commercial use
      follow: true,
    },
  };
}

const CatalogoServer = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams;

  // Fetch prodotti and categories in parallel for optimal performance
  const [prodotti, categories] = await Promise.all([
    getProdotti(),
    getCategorie(),
  ]);

  return (
    <>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Caricamento catalogo...</p>
          </div>
        </div>
      }>
        <CatalogClient
          prodotti={prodotti}
          categorie={categories}
          searchParams={resolvedSearchParams}
        />
      </Suspense>
      <FooterV2 prodotti={prodotti} categorie={categories} />
    </>
  );
};

export default CatalogoServer;