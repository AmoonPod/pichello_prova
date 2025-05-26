import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategorie } from "../../sanity/sanity.query";
import { CategoriaType } from "../../types";

type CategoryCardProps = {
  category: CategoriaType;
};

function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img
          src={category.immagine?.image || "/placeholder.jpg"}
          alt={category.nome}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h3 className="text-xl font-bold text-primary mb-2">
            {category.nome}
          </h3>
          <p className="text-gray-700 text-sm mb-4 line-clamp-3">
            {category.descrizione}
          </p>
        </div>
        <Link
          href={`/prodotti?categoria=${encodeURIComponent(category.nome)}`}
          className="inline-flex items-center group hover:text-primary transition-colors duration-300"
        >
          Esplora
          <ArrowRight className="ml-2 group-hover:ml-4 transition-all duration-300" />
        </Link>
      </div>
    </div>
  );
}

export default async function Categories() {
  const categories: CategoriaType[] = await getCategorie();

  return (
    <section className="container mx-auto py-16 px-4">
      <div className="text-center mb-8">
        <h2 className="font-extrabold text-4xl text-primary tracking-tight">
          Le Nostre Categorie
        </h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Scopri la nostra selezione di categorie, ognuna curata per offrirti il
          meglio.
        </p>
      </div>
      {/* Grid responsive per le categorie */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </section>
  );
}
