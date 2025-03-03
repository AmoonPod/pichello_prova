"use client";

import { useState } from "react";
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

const ProductsClient = ({
  prodotti,
  categorie,
}: {
  prodotti: ProdottoType[];
  categorie: CategoriaType[];
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProdotti = prodotti.filter((product) => {
    const matchesSearch = product.nome
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.categoria === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />
      <section className="mx-auto max-w-7xl flex flex-col lg:flex-row px-4 py-6 lg:px-16 lg:py-12 min-h-screen">
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
            <li
              onClick={() => setSelectedCategory(null)}
              className={`cursor-pointer rounded-md ${
                !selectedCategory
                  ? "text-primary font-bold"
                  : "hover:text-primary opacity-50"
              }`}
            >
              Tutte le categorie
            </li>
            {categorie.map((category: CategoriaType) => (
              <li
                key={category._id}
                onClick={() => setSelectedCategory(category.nome)}
                className={`cursor-pointer rounded-md ${
                  selectedCategory === category.nome
                    ? "text-primary font-bold"
                    : "hover:text-primary hover:opacity-80"
                }`}
              >
                {category.nome}
              </li>
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
      <Footer />
    </>
  );
};

export default ProductsClient;
