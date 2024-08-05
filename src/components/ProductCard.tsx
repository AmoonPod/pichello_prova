"use client";
import Link from "next/link";
import { ProdottoType } from "../../types";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: ProdottoType }) {
  const router = useRouter();
  let slug = JSON.parse(JSON.stringify(product.slug)).current;
  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg group hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
      onClick={() => router.push(`/products/${slug}`)}
    >
      <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
        <span className="sr-only">View</span>
      </Link>
      <img
        src={product.immagine_di_copertina.image}
        alt={product.immagine_di_copertina.alt}
        width={500}
        height={400}
        className="object-cover w-full h-64"
      />
      <div className="p-4 bg-background">
        <h3 className="text-lg font-semibold">{product.nome}</h3>
        <p className="text-sm text-muted-foreground">{product.descrizione}</p>
      </div>
    </div>
  );
}
