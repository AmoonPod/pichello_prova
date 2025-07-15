"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Image as ImageIcon, Package, Leaf } from "lucide-react";
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
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -100px 0px", // Trigger earlier
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isInView) setIsVisible(true);
  }, [isInView]);

  // Fallback per assicurarsi che la sezione sia visibile anche se isInView non funziona
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="products"
      className="relative py-16 lg:py-24 bg-background overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-32 left-10 w-28 h-28 rounded-full bg-secondary/5 blur-2xl animate-pulse delay-300" />
      <div className="absolute bottom-32 right-10 w-36 h-36 rounded-full bg-primary/5 blur-3xl animate-pulse delay-700" />
      <div
        className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-secondary/3 blur-xl animate-bounce"
        style={{ animationDuration: "5s" }}
      />

      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 rounded-full px-4 py-2 text-sm text-secondary mb-4">
            <Package className="w-4 h-4" />
            <span className="font-medium">La Nostra Gamma</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            I Nostri <span className="text-secondary">Prodotti</span>
          </h2>

          <div className="w-20 h-1 bg-secondary rounded-full mx-auto mb-4" />

          <p className="text-base md:text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
            Scopri la nostra vasta gamma di prodotti genuini, coltivati e
            lavorati con cura per portare sulla tua tavola il vero sapore della
            natura
          </p>
        </motion.div>

        {/* Products Layout - Mobile List, Desktop Grid */}
        <div className="mb-16">
          {/* Mobile List View */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="block lg:hidden space-y-3"
          >
            {categories
              .sort((a, b) => a.ordine - b.ordine)
              .map((category, index) => {
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

                if (!slugString || typeof slugString !== "string") {
                  return null;
                }

                const hasImage = category.immagine?.image;

                return (
                  <motion.div
                    key={category._id}
                    variants={itemVariants}
                    className="group"
                  >
                    <Link href={`/prodotti?categoria=${slugString}`}>
                      <div className="flex items-center gap-4 bg-card/80 border border-border rounded-xl p-4 hover:bg-card hover:shadow-md transition-all duration-300">
                        {/* Image */}
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-backgroundvariant">
                          {hasImage ? (
                            <img
                              src={
                                category.immagine?.image || "/placeholder.jpg"
                              }
                              alt={category.nome || "Categoria"}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-6 h-6 text-muted-foreground/60" />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                            {category.nome}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {category.descrizione ||
                              "Scopri i prodotti di questa categoria"}
                          </p>
                        </div>

                        {/* Arrow */}
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors flex-shrink-0" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
          </motion.div>

          {/* Desktop Grid View */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden lg:grid gap-6 lg:gap-8 justify-items-center mx-auto"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              maxWidth: "calc(4 * 320px + 3 * 2rem)",
              width: "100%",
            }}
          >
            {categories
              .sort((a, b) => a.ordine - b.ordine)
              .map((category, index) => {
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
                  return null;
                }

                // Check if category image exists
                const hasImage = category.immagine?.image;

                return (
                  <motion.div
                    key={category._id}
                    variants={itemVariants}
                    className="group relative overflow-hidden w-full"
                  >
                    {/* Decorative Background */}
                    <div
                      className={`absolute inset-2 bg-gradient-to-br ${
                        index % 2 === 0
                          ? "from-primary/3 via-primary/5 to-primary/8"
                          : "from-secondary/3 via-secondary/5 to-secondary/8"
                      } rounded-2xl transform ${
                        index % 3 === 0
                          ? "rotate-1"
                          : index % 3 === 1
                            ? "-rotate-1"
                            : "rotate-0.5"
                      } group-hover:rotate-0 transition-transform duration-500`}
                    />

                    {/* Card Content */}
                    <div className="relative bg-card/90 backdrop-blur-sm border border-border rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.2)] transition-all duration-300 h-full">
                      <Link
                        href={`/prodotti?categoria=${slugString}`}
                        className="block h-full"
                      >
                        {/* Image Section */}
                        <div className="relative aspect-[4/3] overflow-hidden bg-backgroundvariant">
                          {hasImage ? (
                            <img
                              src={
                                category.immagine?.image || "/placeholder.jpg"
                              }
                              alt={category.nome || "Categoria"}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center">
                              <ImageIcon className="w-16 h-16 text-muted-foreground/40" />
                            </div>
                          )}

                          {/* Overlay Gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Floating Badge */}
                          <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm border border-border rounded-full p-2 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                            <Leaf className="w-4 h-4 text-secondary" />
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-5 lg:p-6">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg lg:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                              {category.nome}
                            </h3>
                            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-secondary transform translate-x-0 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 ml-2" />
                          </div>

                          <div className="w-12 h-0.5 bg-secondary rounded-full mb-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                          <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                            {category.descrizione ||
                              "Scopri i prodotti genuini di questa categoria, coltivati con metodi tradizionali."}
                          </p>

                          {/* Action Indicator */}
                          <div className="mt-4 inline-flex items-center text-sm font-medium text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span>Esplora categoria</span>
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </div>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center pt-12 lg:pt-16"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Dal Campo alla Tua <span className="text-secondary">Tavola</span>
            </h3>
            <p className="text-base md:text-lg text-muted-foreground font-medium mb-8 lg:mb-10 max-w-2xl mx-auto">
              Assapora l'autenticità dei nostri raccolti biorazionali. Sfoglia
              il catalogo completo oppure richiedi una consulenza per trovare i
              sapori perfetti per te.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/prodotti">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  Vedi Tutti i Prodotti
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contatti">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary/5 font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300"
                >
                  Contattaci Ora
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
