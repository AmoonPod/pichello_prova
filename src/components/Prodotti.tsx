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
import { ProdottoType } from "../../types";

const ProductsClient = ({
  prodotti,
  categorie,
}: {
  prodotti: ProdottoType[];
  categorie: string[];
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredProdotti = prodotti.filter((product) => {
    const matchesSearch = product.nome
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.categoria === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
  };

  return (
    <>
      <Navbar />
      <section className="mx-auto max-w-7xl flex flex-col lg:flex-row px-4 py-6 lg:px-16 lg:py-12">
        {/* Sidebar for Desktop */}
        <aside className="hidden lg:block lg:w-1/4 space-y-2 pr-8 w-[30%]">
          <h2 className="text-xl font-semibold text-primary">Filtra per</h2>
          {/* Categories List */}
          <ul className="space-y-1">
            <li
              onClick={() => setSelectedCategory("")}
              className={`cursor-pointer rounded-md ${
                !selectedCategory
                  ? "text-primary font-bold"
                  : "hover:text-primary opacity-50"
              }`}
            >
              Tutte le categorie
            </li>
            {categorie.map((category) => (
              <li
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`cursor-pointer rounded-md ${
                  selectedCategory === category
                    ? "text-primary font-bold"
                    : "hover:text-primary hover:opacity-80"
                }`}
              >
                {category}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <div className="flex-grow w-[70%]">
          {/* Filters Section for Mobile */}
          <div className="lg:hidden mb-6 space-y-4">
            <Select
              onValueChange={setSelectedCategory}
              value={selectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleziona una categoria" />
              </SelectTrigger>
              <SelectContent>
                {categorie.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProdotti.length > 0 ? (
              filteredProdotti.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))
            ) : (
              <p className="text-center col-span-full text-muted-foreground">
                Nessun prodotto trovato.
              </p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductsClient;
