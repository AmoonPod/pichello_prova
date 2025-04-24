"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Leaf, Award, Users } from "lucide-react";
import Image from "next/image";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="chi-siamo"
      className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 lg:items-start px-8 py-8 lg:py-20 md:px-6"
    >
      <div className="container mx-auto px-4">
        <h2 className="font-extrabold text-4xl lg:text-5xl tracking-tight  flex flex-col gap-3 items-center  text-primary">
          La Nostra Azienda
        </h2>

        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12"
        >
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
              alt="Il Pichello Farm"
              fill
              className="object-cover rounded-2xl"
            />
          </motion.div>

          {/* Right Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-lg mb-6">
              L’azienda agricola Il Pichello deve il suo nome alla storica casa
              contadina chiamata da sempre ‘pichel‘ (in dialetto reggiano), che
              poi venne italianizzato sulle carte più antiche come Pichello.
            </p>
            <p className="text-lg mb-8">
              La nostra azienda produce prodotti secondo il nostro metodo
              biorazionale, ovvero: seguendo i ritmi naturali delle stagioni,
              studiando con sapienza le composizioni dei vari terreni e
              selezionando le piante migliori senza l’utilizzo di stratagemmi
              moderni. La nostra idea di agricoltura sostenibile in montagna per
              offrirti un prodotto sincero!
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-bold mb-2">Biorazionale</h4>
                <p className="text-sm text-muted-foreground">
                  Coltiviamo senza pesticidi o additivi chimici
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-bold mb-2">Qualità</h4>
                <p className="text-sm text-muted-foreground">
                  Prodotti selezionati e controllati con cura
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-bold mb-2">Tradizione</h4>
                <p className="text-sm text-muted-foreground">
                  Metodi tramandati di generazione in generazione
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
