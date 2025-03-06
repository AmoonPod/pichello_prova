import ProductsClient from "@/components/Prodotti";
import { getCategorie, getProdotti } from "../../../sanity/sanity.query";
import { CategoriaType, ProdottoType } from "../../../types";
import { Suspense } from "react";

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
