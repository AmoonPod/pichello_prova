import ProductsClient from "@/components/Prodotti";
import { getCategorie, getProdotti } from "../../../sanity/sanity.query";
import { CategoriaType, ProdottoType } from "../../../types";

const ProdottiServer = async () => {
  const prodotti: ProdottoType[] = await getProdotti();
  const categories: CategoriaType[] = await getCategorie();
  return <ProductsClient prodotti={prodotti} categorie={categories} />;
};

export default ProdottiServer;
