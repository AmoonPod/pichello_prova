"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { CategoriaType } from "../../../types";
import Link from "next/link";

type ProductsSectionClientProps = {
  categories: CategoriaType[];
};

export default function ProductsSectionClient({
  categories,
}: ProductsSectionClientProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  console.log(categories);
  return (
    <section
      id="products"
      className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 lg:items-start px-8 py-8 lg:py-20 md:px-6"
    >
      <div className="container mx-auto px-4 space-y-4">
        <h2 className="font-extrabold text-4xl lg:text-5xl tracking-tight flex flex-col gap-3 items-center text-primary">
          I Nostri Prodotti
        </h2>

        <p className="text-center text-lg max-w-3xl mx-auto mb-12">
          Scopri la nostra vasta gamma di prodotti genuini, coltivati e lavorati
          con cura per portare sulla tua tavola il vero sapore della natura.
        </p>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 pt-4"
        >
          {categories.map((category) => (
            <motion.div
              key={category._id}
              variants={itemVariants}
              className="product-card group relative overflow-hidden rounded-xl bg-white shadow-md"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.immagine?.image || "/placeholder.jpg"}
                  alt={category.nome}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-bold mb-1">{category.nome}</h3>
                <Link
                  href={`/prodotti?categoria=${JSON.parse(JSON.stringify(category.slug)).current}`}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                  >
                    Scopri <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="pt-6 text-center">
          <Button size="lg">Vedi Tutti i Prodotti</Button>
        </div>
      </div>
    </section>
  );
}
