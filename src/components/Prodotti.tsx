"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
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
  // Initialize from query param "categoria"
  const initialCategory = searchParams.get("categoria");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory
  );

  // Optionally, update the state if the URL changes
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  // Aggiungere un useEffect per aggiornare i parametri della query
  useEffect(() => {
    const currentCategory = searchParams.get("categoria");
    if (currentCategory !== selectedCategory) {
      setSelectedCategory(currentCategory);
    }
  }, [searchParams, selectedCategory]);

  const filteredProdotti = prodotti.filter((product) => {
    const matchesSearch = product.nome
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    console.log(
      "confronto categoria",
      JSON.parse(JSON.stringify(product.categoria_slug)).current,
      selectedCategory
    );
    const matchesCategory = selectedCategory
      ? JSON.parse(JSON.stringify(product.categoria_slug)).current ===
        selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative min-h-screen py-20">
      <section className="mx-auto max-w-7xl flex flex-col lg:flex-row px-4 py-6 lg:px-16 lg:py-12 min-h-screen ">
        {/* Sidebar for Desktop */}
        <aside className="hidden lg:block lg:w-1/4 space-y-4 pr-8 w-[30%]">
          {/* Search Bar */}
          <Input
            type="text"
            placeholder="Cerca prodotto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />

          <h2 className="text-xl font-semibold text-primary">Filtra per</h2>

          {/* Categories List */}
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
            {categorie.map((category: CategoriaType) => (
              <Link
                href={`/prodotti?categoria=${JSON.parse(JSON.stringify(category.slug)).current}`}
                key={category._id}
              >
                <li
                  key={category._id}
                  className={`cursor-pointer rounded-md ${
                    selectedCategory ===
                    JSON.parse(JSON.stringify(category.slug)).current
                      ? "text-primary font-bold"
                      : "hover:text-primary hover:opacity-80"
                  }`}
                >
                  {category.nome}
                </li>
              </Link>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <div className="flex-grow lg:w-[70%] w-full">
          {/* Filters Section for Mobile */}
          <div className="lg:hidden mb-6 space-y-4">
            <Select
              onValueChange={setSelectedCategory}
              value={selectedCategory!}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleziona una categoria" />
              </SelectTrigger>
              <SelectContent>
                {categorie.map((category) => (
                  <SelectItem key={category._id} value={category.nome}>
                    {category.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="text"
              placeholder="Cerca prodotto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Products Header */}
          <div className="mb-6 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl text-primary">
              Prodotti
            </h1>
            <p className="text-muted-foreground md:text-lg">
              Esplora la nostra selezione di prodotti agricoli di alta qualità.
            </p>
          </div>

          {/* Products Grid */}
          {filteredProdotti.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
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
      </section>
    </div>
  );
};

export default ProductsClient;
