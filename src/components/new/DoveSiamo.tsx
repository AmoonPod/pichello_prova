"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Clock, Mountain, Trees } from "lucide-react";

const LocationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isInView) setIsVisible(true);
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="dove-siamo"
      className="relative py-16 lg:py-24 bg-backgroundvariant overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-32 right-10 w-32 h-32 rounded-full bg-primary/5 blur-2xl animate-pulse delay-500" />
      <div className="absolute bottom-32 left-10 w-28 h-28 rounded-full bg-secondary/5 blur-xl animate-pulse delay-1000" />
      <div
        className="absolute top-1/3 left-1/3 w-20 h-20 rounded-full bg-primary/3 blur-lg animate-bounce"
        style={{ animationDuration: "6s" }}
      />

      <div className="container mx-auto px-4 container">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm text-primary mb-4">
            <Mountain className="w-4 h-4" />
            <span className="font-medium">Nel Cuore dell'Appennino</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            Dove <span className="text-primary">Siamo</span>
          </h2>

          <div className="w-20 h-1 bg-primary rounded-full mx-auto mb-4" />

          <p className="text-base md:text-lg text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed">
            A 810 metri s.l.m., immersi nei castagneti della Valle Tassobbio,
            nel cuore dell'Appennino Reggiano e della zona MAB UNESCO
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid lg:grid-cols-5 gap-8 lg:gap-12"
        >
          {/* Location Story & Info */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 space-y-6"
          >
            {/* Story Card */}
            <div className="relative group">
              {/* Decorative Background */}
              <div className="absolute inset-2 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/15 rounded-3xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500" />

              <div className="relative bg-card/90 backdrop-blur-sm border border-border rounded-3xl p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.2)] transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Trees className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                    La Nostra Terra
                  </h3>
                </div>

                <div className="w-16 h-0.5 bg-primary rounded-full mb-4" />

                <p className="text-muted-foreground leading-relaxed mb-4">
                  Il Pichello si trova in località Marola, nel comune di
                  Carpineti. A differenza del resto del carpinetano nella valle
                  del Tresinaro, noi ci troviamo sul versante opposto, nella{" "}
                  <strong>valle del torrente Tassobbio</strong>.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  Coltiviamo <strong>300.000 metri quadri</strong> su terreni
                  castagnini della formazione di Bismantova, circondata dai
                  castelli matildici e alle porte del Parco Nazionale
                  dell'Appennino Tosco-Emiliano.
                </p>
              </div>
            </div>

            {/* Location Details */}
            <div className="grid sm:grid-cols-2 gap-4">
              <motion.div variants={itemVariants} className="group relative">
                <div className="absolute inset-1 bg-gradient-to-br from-secondary/3 to-secondary/8 rounded-2xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-300" />

                <div className="relative bg-card border border-border rounded-2xl p-4 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-secondary" />
                    <h4 className="font-semibold text-foreground">Posizione</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Via Dante Alighieri 141
                    <br />
                    42033 Marola, Carpineti (RE)
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="group relative">
                <div className="absolute inset-1 bg-gradient-to-br from-primary/3 to-primary/8 rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-300" />

                <div className="relative bg-card border border-border rounded-2xl p-4 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold text-foreground">Orari</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Lun-Ven: 9:00 - 18:00
                    <br />
                    Sabato: 9:00 - 13:00
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 text-xs font-medium text-primary">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>810m s.l.m.</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 rounded-full px-3 py-1 text-xs font-medium text-secondary">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span>Zona MAB UNESCO</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 text-xs font-medium text-primary">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>300.000 mq coltivati</span>
              </div>
            </div>
          </motion.div>

          {/* Interactive Map */}
          <motion.div variants={itemVariants} className="lg:col-span-3 group">
            <div className="relative">
              {/* Decorative Background for Map */}
              <div className="absolute inset-2 bg-gradient-to-br from-secondary/5 via-secondary/10 to-secondary/15 rounded-3xl transform -rotate-0.5 group-hover:rotate-0 transition-transform duration-700" />

              <div className="relative bg-card border border-border rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.2)] transition-all duration-300">
                {/* Map Header */}
                <div className="bg-backgroundvariant/50 border-b border-border p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Vieni a Trovarci
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Valle Tassobbio, Appennino Reggiano
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map Container */}
                <div className="h-[400px] lg:h-[450px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d711.536457105119!2d10.482757569662631!3d44.491678654872366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d552e2ba719e27%3A0x22cdb0cf8ee2dcff!2sAzienda%20Agricola%20Il%20Pichello!5e0!3m2!1sit!2sit!4v1736855691728!5m2!1sit!2sit"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="transition-all duration-300 group-hover:saturate-110"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16 lg:mt-20"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Un Territorio da <span className="text-primary">Scoprire</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Vieni a visitare la nostra azienda e scopri di persona come nasce
              l'autenticità dei nostri prodotti biorazionali nel cuore
              dell'Appennino.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection;
