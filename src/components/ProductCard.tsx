import Link from "next/link";
import { ProdottoType } from "../../types";
import CategoryTag from "./category_tag";
import { Image as ImageIcon } from "lucide-react";

export default function ProductCard({ product }: { product: ProdottoType }) {
  let slug = JSON.parse(JSON.stringify(product.slug)).current;

  const hasImage =
    product.immagini &&
    product.immagini.length > 0 &&
    product.immagini[0]?.image;
  const imageUrl = hasImage ? product.immagini[0].image : null;
  const imageAlt = hasImage
    ? product.immagini[0].alt || product.nome
    : product.nome;

  if (!slug) return null;

  return (
    <Link href={`/prodotti/${slug}`} className="group">
      <div className="grid gap-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full bg-white">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={imageAlt}
            className="aspect-square object-cover rounded-xl group-hover:scale-105 transition-transform duration-300 w-full"
          />
        ) : (
          <div className="aspect-square w-full bg-gray-100 rounded-xl flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-gray-400" />
          </div>
        )}

        <div className="grid gap-1.5 py-1">
          <h3 className="font-semibold text-sm md:text-base text-black line-clamp-2">
            {product.nome}
          </h3>
          <CategoryTag category={product.categoria} />
        </div>
      </div>
    </Link>
  );
}
