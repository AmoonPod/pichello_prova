import ProductsSectionClient from "./ProdottiClient";
import { getCategorie } from "../../../sanity/sanity.query";
import { CategoriaType } from "../../../types";

// This component will benefit from the parent page's static generation
export default async function ProductsSection() {
  // Categories will be cached at build time due to parent page SSG
  const categories: CategoriaType[] = await getCategorie();
  return <ProductsSectionClient categories={categories} />;
}
