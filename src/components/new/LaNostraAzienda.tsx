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
      className="relative py-12  bg-backgroundvariant overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-primary/5 blur-2xl animate-pulse delay-500" />
      <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-secondary/5 blur-3xl animate-pulse delay-1000" />

      <div className=" mx-auto px-4 container">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm text-primary mb-4">
            <Mountain className="w-4 h-4" />
            <span className="font-medium">Tradizione dell'Appennino</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            La Nostra <span className="text-primary">Azienda</span>
          </h2>

          <div className="w-20 h-1 bg-primary rounded-full mx-auto mb-4" />

          <p className="text-base md:text-lg text-secondary font-medium max-w-2xl mx-auto">
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
            {/* Unified Story Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                  La Nostra Storia e Filosofia
                </h3>
              </div>

              <div className="prose prose-lg max-w-none space-y-6 text-base lg:text-lg text-muted-foreground leading-relaxed">
                <h4 className="text-xl font-semibold text-primary mt-0 mb-4 first:mt-0">
                  L'Origine del Nome: da 'Pichel' a Pichello
                </h4>
                <p>
                  L'azienda agricola{" "}
                  <span className="font-semibold text-primary text-xl">
                    Il Pichello
                  </span>{" "}
                  deve il suo nome alla storica casa contadina chiamata da
                  sempre{" "}
                  <em className="text-secondary font-medium">'pichel'</em> in
                  dialetto reggiano, italianizzato sulle carte antiche come{" "}
                  <strong className="text-primary">Pichello</strong>.
                </p>

                <h4 className="text-xl font-semibold text-primary mt-8 mb-4">
                  Una Tradizione Radicata nell'Appennino Reggiano
                </h4>
                <p>
                  Nel cuore dell'
                  <span className="font-bold text-secondary text-lg">
                    Appennino Reggiano
                  </span>
                  , la nostra famiglia coltiva da generazioni seguendo i ritmi
                  naturali delle stagioni, studiando con sapienza le
                  composizioni dei terreni e selezionando le piante migliori con
                  metodi tramandati nel tempo, proprio qui a{" "}
                  <span className="font-semibold text-primary">Marola</span>,
                  nel cuore dell'Appennino di{" "}
                  <span className="font-semibold text-secondary">
                    Carpineti
                  </span>
                  .
                </p>

                <h4 className="text-xl font-semibold text-primary mt-8 mb-4">
                  Il Nostro Impegno: Metodo Biorazionale a Marola
                </h4>
                <p>
                  Il nostro{" "}
                  <span className="font-bold text-primary text-lg">
                    metodo biorazionale
                  </span>{" "}
                  rappresenta la nostra filosofia di vita: un'agricoltura
                  sostenibile di montagna, praticata con orgoglio sui nostri
                  terreni a{" "}
                  <span className="font-semibold text-secondary">
                    Marola (Carpineti, RE)
                  </span>
                  , che rifiuta pesticidi e stratagemmi moderni. Attraverso la
                  rotazione delle colture, l'uso di concimi naturali
                  dell'Appennino e la tutela della biodiversità locale,
                  rispettiamo profondamente la natura e la sapienza contadina
                  dell'Appennino per creare prodotti
                  <strong className="text-secondary">
                    {" "}
                    sinceri, autentici e genuini
                  </strong>
                  .
                </p>

                <h4 className="text-xl font-semibold text-primary mt-8 mb-4">
                  La Passione di Famiglia: Mirco e Viviana
                </h4>
                <p>
                  Oggi,{" "}
                  <span className="font-bold text-primary">
                    Mirco e Viviana
                  </span>{" "}
                  portano avanti questa eredità con la stessa passione,
                  dedicandosi ogni giorno alla cura dei nostri campi nell'alta{" "}
                  <span className="font-semibold text-secondary">
                    Val Tassobbio
                  </span>{" "}
                  e alla produzione di alimenti che raccontano l'anima dell'
                  <span className="font-semibold text-primary">
                    Appennino Reggiano
                  </span>
                  .
                </p>

                <blockquote className="border-l-4 border-primary pl-6 italic text-lg text-secondary font-medium mt-8">
                  "Ogni prodotto nasce dalla terra di Marola e arriva sulle
                  tavole con la sincerità di chi rispetta la natura e le
                  tradizioni montane dell'Appennino."
                </blockquote>
              </div>
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
            <div className="relative h-96 lg:h-[300px] rounded-3xl overflow-hidden shadow-2xl mb-6">
              <Image
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
                alt="La storica casa contadina 'Il Pichello' a Marola, Appennino Reggiano - Azienda Agricola biorazionale"
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
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Suggestivo paesaggio dell'Appennino Reggiano vicino a Marola, territorio dell'Agricola Il Pichello"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/20" />
                <div className="absolute bottom-2 left-2 text-white text-sm font-medium">
                  Il Territorio
                </div>
              </div>
              <div className="relative h-32 lg:h-40 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Interno del laboratorio artigianale dell'Agricola Il Pichello dove trasformiamo i prodotti dell'Appennino"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-secondary/20" />
                <div className="absolute bottom-2 left-2 text-white text-sm font-medium">
                  Laboratorio
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
          <div className="group relative overflow-hidden h-full">
            <div className="absolute inset-2 bg-gradient-to-br from-primary/3 via-primary/5 to-primary/8 rounded-3xl transform rotate-0.5 group-hover:rotate-1 transition-transform duration-500" />
            <div className="relative bg-card/90 backdrop-blur-sm border border-primary/20 rounded-3xl p-6 lg:p-8 hover:border-primary/40 transition-colors h-full flex flex-col">
              <div className="flex items-start gap-4 mb-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                    <Leaf className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full animate-pulse" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    Biorazionale
                  </h4>
                  <div className="w-12 h-0.5 bg-primary rounded-full mb-4" />
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm lg:text-base flex-1">
                Coltiviamo seguendo i ritmi naturali sui terreni di Marola,
                senza pesticidi o additivi chimici, rispettando la terra
                dell'Appennino Reggiano che ci nutre da generazioni con metodi
                sostenibili.
              </p>
            </div>
          </div>

          {/* Qualità */}
          <div className="group relative overflow-hidden h-full">
            <div className="absolute inset-2 bg-gradient-to-br from-secondary/3 via-secondary/5 to-secondary/8 rounded-3xl transform -rotate-0.5 group-hover:-rotate-1 transition-transform duration-500" />
            <div className="relative bg-card/90 backdrop-blur-sm border border-secondary/20 rounded-3xl p-6 lg:p-8 hover:border-secondary/40 transition-colors h-full flex flex-col">
              <div className="flex items-start gap-4 mb-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center transform rotate-6 group-hover:rotate-0 transition-transform duration-300">
                    <Award className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse delay-300" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">
                    Qualità Autentica
                  </h4>
                  <div className="w-12 h-0.5 bg-secondary rounded-full mb-4" />
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm lg:text-base flex-1">
                Ogni prodotto è selezionato e controllato con cura maniacale,
                dal campo alla tavola, garantendo eccellenza e genuinità.
              </p>
            </div>
          </div>

          {/* Tradizione */}
          <div className="group relative overflow-hidden h-full">
            <div className="absolute inset-2 bg-gradient-to-br from-primary/3 via-primary/5 to-primary/8 rounded-3xl transform rotate-0.3 group-hover:rotate-0.8 transition-transform duration-500" />
            <div className="relative bg-card/90 backdrop-blur-sm border border-primary/20 rounded-3xl p-6 lg:p-8 hover:border-primary/40 transition-colors h-full flex flex-col">
              <div className="flex items-start gap-4 mb-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
                    <TreePine className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full animate-pulse delay-700" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    Tradizione Montana
                  </h4>
                  <div className="w-12 h-0.5 bg-primary rounded-full mb-4" />
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm lg:text-base flex-1">
                Metodi tramandati di generazione in generazione nell'Appennino
                Reggiano, in particolare nella zona di Marola e Carpineti, dove
                la sapienza contadina dell'alta Val Tassobbio incontra
                l'innovazione sostenibile.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
