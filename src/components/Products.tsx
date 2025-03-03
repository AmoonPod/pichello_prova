import ScrittaPiccolina from "./scrittaPiccolina";
import { getCategorie } from "../../sanity/sanity.query";
import { CategoriaType } from "../../types";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export default async function Categories() {
  const categories: CategoriaType[] = await getCategorie(); // Fetch categories with their images and descriptions
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 lg:px-8 lg:py-16">
      <div className="text-center mb-12">
        <div className="space-y-2">
          <ScrittaPiccolina>I Nostri Prodotti</ScrittaPiccolina>
          <h1 className="font-extrabold text-4xl lg:text-5xl text-primary tracking-tight">
            Gusta l'eccellenza dei <br /> nostri prodotti
          </h1>
          <p className="text-muted-foreground text-lg max-w-7xl mx-auto font-light">
            I nostri prodotti rappresentano l'impegno costante per offrire
            qualità e gusto genuino. Scopri la freschezza e l'autenticità dei
            frutti della nostra terra, selezionati con cura per te.
          </p>
        </div>
      </div>
      <div className="space-y-12 max-w-7xl mx-auto">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`flex  flex-col-reverse justify-between ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-6 md:gap-8`}
          >
            {index === 0 ? (
              <div className="text-center md:text-left space-y-4">
                <h2 className="text-2xl font-bold text-primary">
                  {category.nome}
                </h2>
                <p className="text-muted-foreground text-lg max-w-3xl mx-auto font-light">
                  {category.descrizione}
                </p>
                <Button variant={"outline"}>
                  Esplora {category.nome} <ArrowRight />
                </Button>
              </div>
            ) : (
              <div className="text-left md:text-left space-y-4">
                <h2 className="text-2xl font-bold text-primary">
                  {category.nome}
                </h2>
                <p className="text-muted-foreground text-lg max-w-3xl mx-auto font-light">
                  {category.descrizione}
                </p>
                <Button variant={"outline"}>
                  Esplora {category.nome} <ArrowRight />
                </Button>
              </div>
            )}
            <div className="flex-shrink-0">
              <img
                src={
                  "https://cdn.sanity.io/images/l173g37c/production/4f3a4c38fd3893ab853ba196dcefbb5db677a100-2967x2059.webp?w=2000&fit=max&auto=format"
                }
                alt={category.nome}
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
