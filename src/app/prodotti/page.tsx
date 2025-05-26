import ProductsClient from "@/components/Prodotti";
import { getCategorie, getProdotti } from "../../../sanity/sanity.query";
import { CategoriaType, ProdottoType } from "../../../types";
import { Suspense } from "react";
import "../globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Prodotti Biorazionali | Miele, Cereali e Legumi dell'Appennino Reggiano",
  description:
    "Scopri i nostri prodotti biorazionali: miele artigianale, cereali antichi e legumi coltivati nell'Appennino Reggiano. Vendita diretta di prodotti genuini a km0 dall'Azienda Agricola Il Pichello.",

  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://www.agricolailpichello.it/prodotti",
    siteName: "Azienda Agricola Il Pichello",
    title:
      "Prodotti Biorazionali | Miele, Cereali e Legumi dell'Appennino Reggiano",
    description:
      "Scopri i nostri prodotti biorazionali: miele artigianale, cereali antichi e legumi coltivati nell'Appennino Reggiano. Vendita diretta di prodotti genuini a km0.",
    images: [
      {
        url: "/images/prodotti-og-image.jpg", // Immagine specifica per prodotti
        width: 1200,
        height: 630,
        alt: "Prodotti Biorazionali Azienda Agricola Il Pichello",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Prodotti Biorazionali | Miele, Cereali e Legumi dell'Appennino Reggiano",
    description:
      "Scopri i nostri prodotti biorazionali: miele artigianale, cereali antichi e legumi coltivati nell'Appennino Reggiano. Vendita diretta di prodotti genuini a km0.",
    images: ["/images/prodotti-og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.agricolailpichello.it/prodotti",
  },
};

const ProdottiServer = async () => {
  const prodotti: ProdottoType[] = await getProdotti();
  const categories: CategoriaType[] = await getCategorie();
  return (
    <Suspense>
      <ProductsClient prodotti={prodotti} categorie={categories} />
    </Suspense>
  );
};

export default ProdottiServer;
