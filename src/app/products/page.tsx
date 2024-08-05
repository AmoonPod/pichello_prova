"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProdotti } from "../../../sanity/sanity.query";
import { ProdottoType } from "../../../types";

const ProdottiPage = () => {
  const [prodotti, setProdotti] = useState<ProdottoType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProdotti();
      setProdotti(data);
    };

    fetchData();
  }, []);

  const filteredProdotti = prodotti.filter((product) =>
    product.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <section className="md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6 max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none text-primary">
                Prodotti
              </h1>
              <p className="text-muted-foreground md:text-lg">
                Esplora la nostra selezione di prodotti agricoli di alta
                qualità.
              </p>
            </div>
            <div>
              <Input
                type="text"
                placeholder="Cerca prodotto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProdotti.map((product: ProdottoType) => (
              <ProductCard
                product={product}
                key={product._id}
                showDescription={true}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProdottiPage;
