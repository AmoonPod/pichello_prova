"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { CategoriaType, ProdottoType } from "../../types";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const ProductsClient = ({
  prodotti,
  categorie,
}: {
  prodotti: ProdottoType[];
  categorie: CategoriaType[];
}) => {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("categoria");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory
  );

  // Update selected category if URL changes
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    const currentCategory = searchParams.get("categoria");
    if (currentCategory !== selectedCategory) {
      setSelectedCategory(currentCategory);
    }
  }, [searchParams, selectedCategory]);

  // Filter products based on search term and selected category
  const filteredProdotti = prodotti.filter((product) => {
    const matchesSearch = product.nome
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const productCategorySlug = JSON.parse(
      JSON.stringify(product.categoria_slug)
    ).current;
    const matchesCategory = selectedCategory
      ? productCategorySlug === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pt-28">
      {/* Header/Banner Section */}
      <div className="bg-primary py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-primary-foreground mb-2">
            I Nostri Prodotti
          </h1>
          <p className="mt-2 text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Esplora la nostra selezione di prodotti agricoli di alta qualità,
            coltivati con passione e rispetto per la terra.
          </p>
        </div>
      </div>

      {/* Main Content Section (Filters + Grid) */}
      <section className="mx-auto container lg:flex lg:flex-row py-8 lg:py-12 min-h-screen gap-12 bg-gray-50">
        {/* Sidebar for Desktop - Refined Styling */}
        <aside className="hidden lg:block lg:w-1/4">
          {/* Make sidebar content sticky */}
          <div className="sticky top-28 p-6 bg-white rounded-xl shadow-md">
            <Input
              type="text"
              placeholder="Cerca prodotto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full mb-4"
            />
            <h2 className="text-xl font-semibold text-primary mb-3 border-b pb-2">
              Filtra per Categoria
            </h2>
            <ul className="space-y-1 mt-3">
              <Link href="/prodotti">
                <li
                  className={`cursor-pointer rounded-md px-3 py-1.5 text-sm transition-colors ${
                    !selectedCategory
                      ? "bg-primary/10 text-primary font-semibold"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  Tutte le categorie
                </li>
              </Link>
              {categorie.map((category: CategoriaType) => {
                const slug = JSON.parse(JSON.stringify(category.slug)).current;
                return (
                  <Link key={category._id} href={`/prodotti?categoria=${slug}`}>
                    <li
                      className={`cursor-pointer rounded-md px-3 py-1.5 text-sm transition-colors ${
                        selectedCategory === slug
                          ? "bg-primary/10 text-primary font-semibold"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {category.nome}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* Main Product Area */}
        <div className="flex-grow w-full mt-8 lg:mt-0">
          {/* Mobile Filters: Keep as is or refine similarly if needed */}
          <div className="lg:hidden mb-6">
            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
              <Link href="/prodotti">
                <button
                  className={`text-sm whitespace-nowrap px-4 py-2 rounded-full border transition-colors ${
                    !selectedCategory
                      ? "bg-primary text-white border-transparent"
                      : "border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400"
                  }`}
                >
                  Tutte le categorie
                </button>
              </Link>
              {categorie.map((category: CategoriaType) => {
                const slug = JSON.parse(JSON.stringify(category.slug)).current;
                return (
                  <Link key={category._id} href={`/prodotti?categoria=${slug}`}>
                    <button
                      className={`text-sm whitespace-nowrap px-4 py-2 rounded-full border transition-colors ${
                        selectedCategory === slug
                          ? "bg-primary text-white border-transparent"
                          : "border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400"
                      }`}
                    >
                      {category.nome}
                    </button>
                  </Link>
                );
              })}
            </div>
            <Input
              type="text"
              placeholder="Cerca prodotto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full mt-4"
            />
          </div>

          {/* Products Grid */}
          {filteredProdotti.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProdotti.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-background rounded-lg shadow-sm">
              <p className="text-center text-lg text-muted-foreground">
                Nessun prodotto trovato per i filtri selezionati.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductsClient;
