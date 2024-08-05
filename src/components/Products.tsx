import { getDocuments } from "outstatic/server";
import ProductCard from "./ProductCard";
import { getProdotti } from "../../sanity/sanity.query";
import { ProdottoType } from "../../types";
import { Button } from "./ui/button";
import Link from "next/link";

export default async function Products() {
  const prodotti: ProdottoType[] = await getProdotti();
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6 ">
        <div className="grid gap-4 md:gap-6 lg:gap-8 justify-items-center">
          <div className="space-y-2 text-center max-w-[800px]">
            <h2 className="text-secondary text-lg tracking-widest">
              I Nostri Prodotti
            </h2>
            <h1 className="text-primary text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Gusta l'eccellenza dei <br /> nostri prodotti
            </h1>
            <p className="text-muted-foreground md:text-xl text-center w-full">
              I nostri prodotti rappresentano l'impegno costante per offrire
              qualità e gusto genuino. Scopri la freschezza e l'autenticità dei
              frutti della nostra terra, selezionati con cura per te.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {prodotti.slice(0, 4).map((product: ProdottoType) => (
              <ProductCard
                product={product}
                key={product._id}
                showDescription={true}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <Link href="/products" prefetch={true}>
            <Button variant="secondary" className="mx-auto mt-8">
              Sfoglia tutti i prodotti
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
