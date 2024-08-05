import Link from "next/link";
import { ProdottoType } from "../../types";
import { Card } from "./ui/card";

export default function ProductCard({
  product,
  showDescription,
}: {
  product: ProdottoType;
  showDescription?: boolean;
}) {
  let slug = JSON.parse(JSON.stringify(product.slug)).current;
  return (
    <Link href={`/products/${slug}`}>
      <Card className="w-full max-w-xs rounded-xl border width hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
        <div className="grid gap-4 p-4">
          <img
            src={product.immagini[0].image}
            alt={product.immagini[0].alt}
            className="w-96 aspect-square object-cover rounded-xl"
          />
          <div className="grid gap-1.5 py-2">
            <h3 className="font-semibold text-sm md:text-base">
              {product.nome}
            </h3>
            {showDescription && (
              <p className="text-muted-foreground text-xs md:text-sm">
                {product.descrizione}
              </p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
