"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowDown, Leaf } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background hero-pattern">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/10 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary/10 to-transparent"></div>

      <div className="absolute -left-20 top-1/4 w-40 h-40 rounded-full bg-primary/20 blur-3xl"></div>
      <div className="absolute -right-20 bottom-1/4 w-40 h-40 rounded-full bg-primary/20 blur-3xl"></div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.1, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex justify-center mb-8">
            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Leaf className="h-10 w-10 text-primary" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Azienda Agricola <span className="text-primary">Il Pichello</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-6">
            Seminiamo Tradizione, Raccogliamo Autenticità
          </p>

          <p className="text-lg mb-10 max-w-2xl mx-auto">
            Nel cuore dell'Appennino Reggiano coltiviamo con passione cereali,
            legumi e miele, che trasformiamo con cura nel nostro laboratorio
            aziendale insieme a tante altre nostre produzioni. Al Pichello ogni
            prodotto nasce dalla terra e arriva sulle tavole con la sincerità di
            chi rispetta la natura e i suoi tempi.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => {
                const productsSection = document.getElementById("products");
                if (productsSection) {
                  productsSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Scopri i Nostri Prodotti
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Contattaci
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator - Hide on mobile */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 hidden md:block">
        <Link href="#chi-siamo">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="cursor-pointer"
          >
            <ArrowDown className="h-10 w-10 text-primary" />
          </motion.div>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
