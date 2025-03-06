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
    <div className="relative min-h-screen lg:py-20 md:py-16 sm:py-0 ">
      <section className="mx-auto max-w-7xl flex flex-col lg:flex-row px-4 py-6 lg:px-16 lg:py-12 min-h-screen ">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar for Desktop */}
          <aside className="hidden lg:block lg:w-1/4 pr-8">
            <Input
              type="text"
              placeholder="Cerca prodotto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full mb-4"
            />
            <h2 className="text-xl font-semibold text-primary mb-2">
              Filtra per
            </h2>
            <ul className="space-y-1">
              <Link href="/prodotti">
                <li
                  className={`cursor-pointer rounded-md ${
                    !selectedCategory
                      ? "text-primary font-bold"
                      : "hover:text-primary opacity-50"
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
                      className={`cursor-pointer rounded-md ${
                        selectedCategory === slug
                          ? "text-primary font-bold"
                          : "hover:text-primary hover:opacity-80"
                      }`}
                    >
                      {category.nome}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </aside>

          {/* Main Content */}
          <div className="flex-grow lg:w-3/4 w-full mt-8 lg:mt-0">
            {/* Mobile Filters: Horizontal scrollable chips */}
            <div className="lg:hidden mb-6">
              <div className="flex space-x-4 overflow-x-auto pb-2">
                <Link href="/prodotti">
                  <button
                    className={`whitespace-nowrap px-4 py-2 rounded-full border ${
                      !selectedCategory
                        ? "bg-primary text-white"
                        : "border-gray-300 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Tutte le categorie
                  </button>
                </Link>
                {categorie.map((category: CategoriaType) => {
                  const slug = JSON.parse(
                    JSON.stringify(category.slug)
                  ).current;
                  return (
                    <Link
                      key={category._id}
                      href={`/prodotti?categoria=${JSON.parse(JSON.stringify(category.slug)).current}`}
                    >
                      <button
                        key={category._id}
                        className={`whitespace-nowrap px-4 py-2 rounded-full border ${
                          selectedCategory === slug
                            ? "bg-primary text-white"
                            : "border-gray-300 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {category.nome}
                      </button>
                    </Link>
                  );
                })}
              </div>
              {/* Mobile Search Input */}
              <Input
                type="text"
                placeholder="Cerca prodotto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full mt-4"
              />
            </div>

            {/* Products Header */}
            <div className="mb-6 text-center lg:text-left">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl text-primary">
                Prodotti
              </h1>
              <p className="text-muted-foreground md:text-lg">
                Esplora la nostra selezione di prodotti agricoli di alta
                qualità.
              </p>
            </div>

            {/* Products Grid */}
            {filteredProdotti.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredProdotti.map((product) => (
                  <ProductCard product={product} key={product._id} />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-center text-lg text-muted-foreground">
                  Nessun prodotto trovato.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsClient;
