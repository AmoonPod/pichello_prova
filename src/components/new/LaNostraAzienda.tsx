"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Leaf, Award, Users, Heart, Mountain, TreePine } from "lucide-react";
import Image from "next/image";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isInView) setIsVisible(true);
  }, [isInView]);

  return (
    <section
      id="chi-siamo"
      ref={ref}
      className="relative py-16 lg:py-24 bg-backgroundvariant overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-primary/5 blur-2xl animate-pulse delay-500" />
      <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-secondary/5 blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 text-sm text-primary mb-6">
            <Mountain className="w-4 h-4" />
            <span className="font-medium">Tradizione dell'Appennino</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            La Nostra
            <span className="block text-primary mt-2">Azienda</span>
          </h2>

          <div className="w-24 h-1 bg-primary rounded-full mx-auto mb-6" />

          <p className="text-lg md:text-xl text-secondary font-medium max-w-3xl mx-auto">
            Dal cuore dell'Appennino Reggiano, una storia di passione e
            autenticità
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 lg:mb-20">
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Story Card */}
            <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                  La Nostra Storia
                </h3>
              </div>

              <div className="space-y-4 text-base lg:text-lg text-muted-foreground leading-relaxed">
                <p>
                  L'azienda agricola{" "}
                  <span className="font-semibold text-primary">
                    Il Pichello
                  </span>{" "}
                  deve il suo nome alla storica casa contadina chiamata da
                  sempre <em>'pichel'</em> in dialetto reggiano, italianizzato
                  sulle carte antiche come <strong>Pichello</strong>.
                </p>

                <p>
                  Nel cuore dell'
                  <span className="font-semibold text-secondary">
                    Appennino Reggiano
                  </span>
                  , la nostra famiglia coltiva da generazioni seguendo i ritmi
                  naturali delle stagioni, studiando le composizioni dei terreni
                  e selezionando le piante migliori con metodi tramandati nel
                  tempo.
                </p>
              </div>
            </div>

            {/* Philosophy Card */}
            <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                  La Nostra Filosofia
                </h3>
              </div>

              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                Il nostro{" "}
                <span className="font-semibold text-primary">
                  metodo biorazionale
                </span>{" "}
                rappresenta la nostra idea di agricoltura sostenibile in
                montagna: senza pesticidi, senza stratagemmi moderni, solo il
                rispetto per la natura e la sapienza contadina per offrirti un
                prodotto
                <strong className="text-secondary"> sincero e autentico</strong>
                .
              </p>
            </div>
          </motion.div>

          {/* Right Column - Images */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-6">
              <Image
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
                alt="Azienda Agricola Il Pichello - Appennino Reggiano"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="text-xl lg:text-2xl font-bold">Il Pichello</h4>
                <p className="text-sm text-white/90">Appennino Reggiano</p>
              </div>
            </div>

            {/* Secondary Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-32 lg:h-40 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Cereali biorazionali"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/20" />
                <div className="absolute bottom-2 left-2 text-white text-sm font-medium">
                  Cereali
                </div>
              </div>
              <div className="relative h-32 lg:h-40 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Produzione miele"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-secondary/20" />
                <div className="absolute bottom-2 left-2 text-white text-sm font-medium">
                  Miele
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {/* Biorazionale */}
          <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 text-center hover:shadow-lg transition-shadow group">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
              <Leaf className="w-8 h-8 text-primary" />
            </div>
            <h4 className="text-xl font-bold text-foreground mb-4">
              Biorazionale
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              Coltiviamo seguendo i ritmi naturali, senza pesticidi o additivi
              chimici, rispettando la terra che ci nutre da generazioni.
            </p>
          </div>

          {/* Qualità */}
          <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 text-center hover:shadow-lg transition-shadow group">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/20 transition-colors">
              <Award className="w-8 h-8 text-secondary" />
            </div>
            <h4 className="text-xl font-bold text-foreground mb-4">
              Qualità Autentica
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              Ogni prodotto è selezionato e controllato con cura maniacale, dal
              campo alla tavola, garantendo eccellenza e genuinità.
            </p>
          </div>

          {/* Tradizione */}
          <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 text-center hover:shadow-lg transition-shadow group">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
              <TreePine className="w-8 h-8 text-primary" />
            </div>
            <h4 className="text-xl font-bold text-foreground mb-4">
              Tradizione Montana
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              Metodi tramandati di generazione in generazione nell'Appennino
              Reggiano, dove la sapienza contadina incontra l'innovazione
              sostenibile.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
