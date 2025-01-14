import ProductCard from "./ProductCard";
import { getProdotti } from "../../sanity/sanity.query";
import { ProdottoType } from "../../types";
import { Button } from "./ui/button";
import Link from "next/link";
import ScrittaPiccolina from "./scrittaPiccolina";

export default async function Products() {
  const prodotti: ProdottoType[] = await getProdotti();
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 lg:px-8 lg:py-16">
      <div className="text-center mb-12">
        <div className="space-y-2">
          <ScrittaPiccolina>I Nostri Prodotti</ScrittaPiccolina>
          <h1 className="font-extrabold text-4xl lg:text-5xl text-primary tracking-tight">
            Gusta l'eccellenza dei <br /> nostri prodotti
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto font-light">
            I nostri prodotti rappresentano l'impegno costante per offrire
            qualità e gusto genuino. Scopri la freschezza e l'autenticità dei
            frutti della nostra terra, selezionati con cura per te.
          </p>
        </div>
      </div>
      <div className="grid gap-6 md:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {prodotti.slice(0, 3).map((product: ProdottoType) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link href="/products" prefetch={true}>
          <Button variant="secondary">Sfoglia tutti i prodotti</Button>
        </Link>
      </div>
    </section>
  );
}
