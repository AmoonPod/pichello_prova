"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Wheat, Truck, Bean, MapPin } from "lucide-react";
import Link from "next/link";

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

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm text-primary">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">Appennino Reggiano</span>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-foreground">
                Azienda Agricola
                <span className="block text-primary mt-2">Il Pichello</span>
              </h1>
              <div className="w-20 lg:w-24 h-1 bg-primary rounded-full" />
            </div>

            {/* Tagline */}
            <p className="text-lg md:text-xl lg:text-2xl text-secondary font-medium">
              Seminiamo Tradizione, Raccogliamo Autenticità
            </p>

            {/* Description */}
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Nel cuore dell'Appennino Reggiano coltiviamo con passione cereali,
              legumi e produciamo miele, trasformandoli nel nostro laboratorio
              aziendale. Ogni prodotto nasce dalla terra e arriva sulle tavole
              con la sincerità di chi rispetta la natura.
            </p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              <div className="flex flex-col md:flex-row items-center md:gap-3 bg-card border border-border rounded-lg p-2 md:p-3 shadow-sm hover:shadow-md transition-shadow text-center md:text-left">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mb-2 md:mb-0">
                  <Wheat className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-xs md:text-sm">
                    Cereali
                  </h3>
                  <p className="text-xs text-muted-foreground hidden md:block">
                    Coltivazione biorazionale
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center md:gap-3 bg-card border border-border rounded-lg p-2 md:p-3 shadow-sm hover:shadow-md transition-shadow text-center md:text-left">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mb-2 md:mb-0">
                  <span className="text-primary-foreground text-lg">🐝</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-xs md:text-sm">
                    Miele
                  </h3>
                  <p className="text-xs text-muted-foreground hidden md:block">
                    Produzione artigianale
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center md:gap-3 bg-card border border-border rounded-lg p-2 md:p-3 shadow-sm hover:shadow-md transition-shadow text-center md:text-left">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mb-2 md:mb-0">
                  <Bean className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-xs md:text-sm">
                    Legumi
                  </h3>
                  <p className="text-xs text-muted-foreground hidden md:block">
                    Varietà tradizionali
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link href="/prodotti">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  Scopri i Nostri Prodotti
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary/5 font-semibold px-8 py-3 text-lg rounded-full transition-all duration-300"
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

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative order-last"
          >
            {/* Main Product Image */}
            <div className="relative max-w-lg mx-auto lg:max-w-none mt-8 lg:mt-0">
              <div className="relative w-full h-80 sm:h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Prodotti Il Pichello - Cereali e legumi biologici"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl lg:text-2xl font-bold">
                    I Nostri Prodotti
                  </h3>
                  <p className="text-sm text-white/90">Genuini e autentici</p>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -left-2 lg:-top-8 lg:-left-8 bg-card border border-border rounded-xl lg:rounded-2xl p-2 lg:p-4 shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center gap-1 lg:gap-3">
                  <div className="w-8 h-8 lg:w-12 lg:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Wheat className="w-4 h-4 lg:w-6 lg:h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-xs lg:text-base">
                      100%
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Biorazionale
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-2 lg:-bottom-8 lg:-right-8 bg-card border border-border rounded-xl lg:rounded-2xl p-2 lg:p-4 shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center gap-1 lg:gap-3">
                  <div className="w-8 h-8 lg:w-12 lg:h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Truck className="w-4 h-4 lg:w-6 lg:h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-xs lg:text-base">
                      Km 0
                    </h4>
                    <p className="text-xs text-muted-foreground">Locale</p>
                  </div>
                </div>
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
              <AnimatedCounter end={10} suffix="+" />
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
