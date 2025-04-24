"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Image as ImageIcon } from "lucide-react";
import { CategoriaType } from "../../../types";
import Link from "next/link";

type ProductsSectionClientProps = {
  categories: CategoriaType[];
};

// Define local slug generation function matching Sanity schema logic
const generateLocalSlug = (input: string): string => {
  if (!input) return "";
  return input.toLowerCase().replace(/\s+/g, "-").slice(0, 96);
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

  return (
    <section id="products" className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
      <div className="container mx-auto space-y-8">
        <div className="text-center">
          <h2 className="font-extrabold text-4xl lg:text-5xl tracking-tight text-primary mb-3">
            I Nostri Prodotti per Categoria
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Scopri la nostra vasta gamma di prodotti genuini, coltivati e
            lavorati con cura per portare sulla tua tavola il vero sapore della
            natura.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-6 md:gap-8 pt-8"
        >
          {categories.map((category) => {
            // Safely determine the slug string
            let slugString: string | undefined | null = null;
            if (
              category.slug &&
              typeof category.slug === "object" &&
              category.slug.current
            ) {
              slugString = category.slug.current;
            } else if (category.slug && typeof category.slug === "string") {
              slugString = category.slug;
            } else {
              slugString = generateLocalSlug(category.nome || "");
            }

            // Skip if slug is not a valid non-empty string
            if (!slugString || typeof slugString !== "string") {
              console.warn(
                `Skipping category due to invalid slug: ${category.nome || category._id}`
              );
              return null;
            }

            // Check if category image exists (used for conditional rendering)
            const hasImage = category.immagine?.image;

            return (
              <motion.div
                key={category._id}
                variants={itemVariants}
                className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)] flex flex-col bg-background rounded-lg border border-border shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-lg"
              >
                <Link
                  href={`/prodotti?categoria=${slugString}`}
                  className=" flex flex-col flex-grow"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100 flex items-center justify-center">
                    {hasImage ? (
                      <img
                        src={category.immagine?.image || "/placeholder.jpg"}
                        alt={category.nome || "Categoria"}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-primary mb-1 truncate">
                      {category.nome}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2 h-10 flex-grow">
                      {category.descrizione ||
                        "Scopri i prodotti di questa categoria."}
                    </p>
                    <div className="mt-auto text-sm font-medium text-secondary hover:text-primary inline-flex items-center self-start">
                      Scopri <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="pt-8 text-center">
          <Link href="/prodotti">
            <Button size="lg">Vedi Tutti i Prodotti</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
