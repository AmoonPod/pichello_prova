import Link from "next/link";
import { ProdottoType } from "../../types";
import CategoryTag from "./category_tag";

export default function ProductCard({ product }: { product: ProdottoType }) {
  let slug = JSON.parse(JSON.stringify(product.slug)).current;
  return (
    <Link href={`/products/${slug}`}>
      <div className="grid gap-4 p-4">
        <img
          src={product.immagini[0].image}
          alt={product.immagini[0].alt}
          className="aspect-square object-cover rounded-xl hover:scale-105 transition-transform"
        />

        <div className="grid gap-1.5 py-2">
          <h3 className="font-semibold text-sm md:text-base text-black">
            {product.nome}
          </h3>
          <CategoryTag category={product.categoria} />
        </div>
      </div>
    </Link>
  );
}
