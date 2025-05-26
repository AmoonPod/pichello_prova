"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";

const FinalCTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isInView) setIsVisible(true);
  }, [isInView]);

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-32 bg-primary overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-white/5 blur-3xl animate-pulse delay-300" />
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-white/5 blur-2xl animate-pulse delay-700" />
      <div
        className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-white/3 blur-xl animate-bounce"
        style={{ animationDuration: "7s" }}
      />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-white mb-6">
            <MessageCircle className="w-4 h-4" />
            <span className="font-medium">Inizia il Tuo Viaggio</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Pronto a Gustare
            <br />
            <span className="text-white/90">l'Autenticità?</span>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/80 font-medium max-w-3xl mx-auto mb-10 lg:mb-12 leading-relaxed">
            Scopri i sapori genuini dell'Appennino Reggiano. Contattaci per
            ordinare i nostri prodotti biorazionali o per ricevere informazioni
            personalizzate sulla nostra offerta.
          </p>

          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 lg:mb-16">
            <Link href="/contatti">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white hover:bg-white/90 text-primary font-bold px-10 py-4 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group border-2 border-transparent hover:border-white/20"
              >
                Contattaci Ora
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Button
              size="lg"
              className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-10 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => {
                const productsSection = document.getElementById("products");
                if (productsSection) {
                  productsSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Esplora i Prodotti
            </Button>
          </div>

          {/* Contact Info Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Chiamaci</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Parla direttamente con noi per ordini e informazioni immediate
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Scrivici</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Invia una richiesta dettagliata per offerte personalizzate
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
