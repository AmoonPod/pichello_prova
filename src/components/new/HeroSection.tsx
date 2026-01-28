"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Wheat,
  Truck,
  Bean,
  MapPin,
  Coffee,
  Droplets,
  TreePine,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PastaImg from "../../../public/images/pasta/mezzi_paccheri_appennino_reggiano_5.webp";
import FarinaImg from "../../../public/images/farine/farina_cinquanta_fiore.webp";
import ZuppeImg from "../../../public/images/zuppe/zuppe.webp";

// Counter animation component
const AnimatedCounter = ({
  end,
  duration = 2000,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      let startTime: number | null = null;
      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);

        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration, hasAnimated]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

// Categorie prodotti per rotazione
const productCategories = [
  {
    name: "Prodotti dall'alveare",
    icon: "🐝",
    description: "Dolcezza e benessere naturale",
    href: "/prodotti?categoria=prodotti-dall-alveare",
  },
  {
    name: "Farina 50 Grani",
    icon: <Wheat className="w-5 h-5 text-primary-foreground" />,
    description: "Macinata a pietra nel nostro mulino",
    href: "/farina-grani-antichi-macinata-pietra",
  },
  {
    name: "Pasta Artigianale",
    icon: <Wheat className="w-5 h-5 text-primary-foreground" />,
    description: "Trafilata al bronzo",
    href: "/pasta-artigianale-trafilata-bronzo",
  },
  {
    name: "Legumi e farine",
    icon: <Bean className="w-5 h-5 text-primary-foreground" />,
    description: "Varietà tradizionali montane",
    href: "/prodotti?categoria=legumi-e-farine",
  },
  {
    name: "Tisane e infusi",
    icon: <Coffee className="w-5 h-5 text-primary-foreground" />,
    description: "Aromi dell'Appennino per il relax",
    href: "/prodotti?categoria=tisane-e-infusi",
  },
  {
    name: "Zuppe e risotti",
    icon: <Droplets className="w-5 h-5 text-primary-foreground" />,
    description: "Ricette della tradizione",
    href: "/zuppe-legumi-cereali-artigianali",
  },
  {
    name: "Grano saraceno e castagne",
    icon: <TreePine className="w-5 h-5 text-primary-foreground" />,
    description: "Tesori di montagna genuini",
    href: "/prodotti?categoria=grano-saraceno-e-castagne",
  },
];

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Rotazione automatica delle categorie ogni 5 secondi (più lenta)
  // Incrementa di 3 per mostrare 3 categorie completamente nuove ogni volta
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategoryIndex((prev) => (prev + 3) % productCategories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Ottieni le 3 categorie da mostrare (quella corrente + le 2 successive)
  const getVisibleCategories = () => {
    const categories = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentCategoryIndex + i) % productCategories.length;
      categories.push(productCategories[index]);
    }
    return categories;
  };

  const visibleCategories = getVisibleCategories();

  return (
    <section className="relative flex items-center overflow-hidden bg-background m-0 p-0">
      {/* Decorative Elements */}
      <div className="absolute top-32 left-10 w-24 h-24 rounded-full bg-primary/10 blur-xl animate-pulse" />
      <div className="absolute bottom-32 right-10 w-32 h-32 rounded-full bg-secondary/10 blur-2xl animate-pulse delay-1000" />
      <div
        className="absolute top-1/2 right-1/4 w-20 h-20 rounded-full bg-primary/5 blur-lg animate-bounce"
        style={{ animationDuration: "4s" }}
      />

      <div className="mx-auto px-4 z-10 relative container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 lg:space-y-8"
          >
            {/* Badge */}


            {/* Main Heading - SEO Optimized */}
            <div>
              <p className="text-lg md:text-xl font-semibold text-primary mb-2">
                Azienda Agricola Il Pichello
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-foreground">
                Farine di Grani Antichi, Pasta Artigianale e Miele
                <span className="block text-primary mt-2">dall'Appennino Reggiano</span>
              </h1>
              <div className="w-20 lg:w-24 h-1 bg-primary rounded-full" />
            </div>

            {/* Tagline - Ottimizzata SEO */}
            <p className="text-lg md:text-xl lg:text-2xl text-secondary font-medium leading-tight">
              Vendita diretta dal produttore: Farine macinate a pietra, Pasta trafilata al bronzo e Miele artigianale. Spedizioni in tutta Italia.
            </p>

            {/* Description - Testo ottimizzato con biorazionale affiancato a termini cercati */}
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Il nostro <strong>metodo biorazionale</strong>, un'agricoltura naturale e sostenibile senza pesticidi, ci permette di coltivare prodotti genuini e sani. Scopri le nostre{" "}
              <Link
                href="/farina-grani-antichi-macinata-pietra"
                className="text-primary hover:underline font-bold"
              >
                farine integrali e semi-integrali
              </Link>
              , i legumi, le zuppe e i prodotti tipici dell'Appennino Reggiano.
            </p>

            {/* CTA Buttons - Spostati in alto per visibilità immediata */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 pb-2">
              <Link href="/prodotti">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  Scopri i Nostri Prodotti
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contatti">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary/5 font-semibold px-8 py-3 text-lg rounded-full transition-all duration-300"
                >
                  Contattaci
                </Button>
              </Link>
            </div>

            {/* Features - Griglia rotante spostata sotto le CTA */}
            <div className="h-24 md:h-28 mb-4 opacity-90 scale-95 origin-left">
              <div className="grid grid-cols-3 gap-2 md:gap-3 h-full">
                {visibleCategories.map((category, index) => (
                  <Link
                    key={`${currentCategoryIndex}-${index}`}
                    href={category.href}
                    className="block"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{
                        duration: 0.8,
                        delay: index * 0.2,
                        ease: "easeInOut",
                      }}
                      className="flex flex-col md:flex-row items-center md:gap-3 bg-card border border-border rounded-lg p-2 md:p-3 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 text-center md:text-left h-full"
                    >
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mb-2 md:mb-0">
                        {typeof category.icon === "string" ? (
                          <span className="text-primary-foreground text-lg">
                            {category.icon}
                          </span>
                        ) : (
                          category.icon
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-xs md:text-sm">
                          {category.name}
                        </h3>
                        <p className="text-xs text-muted-foreground hidden md:block">
                          {category.description}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Content - Bento Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative order-last w-full h-auto md:h-[600px]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 w-full h-full">
              {/* Farine Card - Main Vertical (Best Seller) */}
              <Link
                href="/farina-grani-antichi-macinata-pietra"
                className="relative w-full h-64 md:h-auto md:col-span-1 md:row-span-2 rounded-3xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                <Image
                  src={FarinaImg}
                  alt="Farina tipo 1 e integrale di 50 grani antichi macinata a pietra per pizza, pane e dolci"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute bottom-0 left-0 p-6 z-20 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary/90 text-primary-foreground text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full animate-pulse">
                      Best Seller
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                    Farine Antiche
                  </h3>
                  <p className="text-white/90 text-sm font-medium flex items-center gap-2">
                    Macinate a pietra <ArrowRight className="w-4 h-4" />
                  </p>
                </div>
              </Link>

              {/* Pasta Card - Top Right */}
              <Link
                href="/pasta-artigianale-trafilata-bronzo"
                className="relative w-full h-48 md:h-auto md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                <Image
                  src={PastaImg}
                  alt="Spaghetti e pasta artigianale di grani antichi trafilata al bronzo essiccata a temperatura ambiente"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute bottom-0 left-0 p-5 z-20 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <h3 className="text-xl font-bold text-white mb-1">
                    Pasta Artigianale
                  </h3>
                  <p className="text-white/90 text-sm font-medium flex items-center gap-1">
                    Trafilata al bronzo <ArrowRight className="w-3 h-3" />
                  </p>
                </div>
              </Link>

              {/* Zuppe Card - Bottom Right */}
              <Link
                href="/zuppe-legumi-cereali-artigianali"
                className="relative w-full h-48 md:h-auto md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                <Image
                  src={ZuppeImg}
                  alt="Zuppe di legumi e cereali pronti da cuocere - mix tradizionali dell'Appennino senza conservanti"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute bottom-0 left-0 p-5 z-20 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <h3 className="text-xl font-bold text-white mb-1">
                    Zuppe e Legumi
                  </h3>
                  <p className="text-white/90 text-sm font-medium flex items-center gap-1">
                    Sapori contadini <ArrowRight className="w-3 h-3" />
                  </p>
                </div>
              </Link>
            </div>

            {/* Floating Element - Km0 Seal */}
            <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 bg-white p-3 md:p-4 rounded-full shadow-xl z-30 hidden lg:block animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="bg-primary/10 p-2 md:p-3 rounded-full">
                <Truck className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="my-6 lg:my-12  grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8"
        >
          <div className="text-center bg-card/50 border border-border/50 rounded-xl p-4 lg:p-6 hover:bg-card transition-colors">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-2">
              <AnimatedCounter end={20} suffix="+" />
            </div>
            <div className="text-xs md:text-sm lg:text-base text-muted-foreground font-medium">
              Anni di Esperienza
            </div>
          </div>
          <div className="text-center bg-card/50 border border-border/50 rounded-xl p-4 lg:p-6 hover:bg-card transition-colors">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary mb-2">
              <AnimatedCounter end={120} suffix="+" />
            </div>
            <div className="text-xs md:text-sm lg:text-base text-muted-foreground font-medium">
              Prodotti Autentici
            </div>
          </div>
          <div className="text-center bg-card/50 border border-border/50 rounded-xl p-4 lg:p-6 hover:bg-card transition-colors">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-2">
              100%
            </div>
            <div className="text-xs md:text-sm lg:text-base text-muted-foreground font-medium">
              Biorazionale
            </div>
          </div>
          <div className="text-center bg-card/50 border border-border/50 rounded-xl p-4 lg:p-6 hover:bg-card transition-colors">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary mb-2">
              0km
            </div>
            <div className="text-xs md:text-sm lg:text-base text-muted-foreground font-medium">
              Filiera Corta
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
