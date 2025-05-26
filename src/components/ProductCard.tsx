import Link from "next/link";
import { ProdottoType } from "../../types";
import CategoryTag from "./category_tag";
import { Image as ImageIcon } from "lucide-react";

export default function ProductCard({
  product,
  viewMode = "grid",
}: {
  product: ProdottoType;
  viewMode?: "grid" | "list";
}) {
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

  if (viewMode === "list") {
    return (
      <Link href={`/prodotti/${slug}`} className="group">
        <div className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="flex-shrink-0">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-32 h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-gray-900 truncate mb-1">
                  {product.nome}
                </h3>
                <CategoryTag category={product.categoria} />
                {product.descrizione && (
                  <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                    {product.descrizione}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid view (default)
  return (
    <Link href={`/prodotti/${slug}`} className="group">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
        <div className="aspect-square overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-base text-gray-900 mb-2">
            {product.nome}
          </h3>
          <CategoryTag category={product.categoria} />
          {product.descrizione && (
            <p className="text-gray-600 text-sm mt-2 line-clamp-3">
              {product.descrizione}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
