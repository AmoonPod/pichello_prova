import ProductsSectionClient from "./ProdottiClient";
import { getCategorie } from "../../../sanity/sanity.query";
import { CategoriaType } from "../../../types";

export default async function ProductsSection() {
  const categories: CategoriaType[] = await getCategorie();
  return <ProductsSectionClient categories={categories} />;
}
