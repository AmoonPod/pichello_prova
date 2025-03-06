"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Clock, Phone, Mail } from "lucide-react";

const LocationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="location"
      className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 lg:items-start px-8 py-8 lg:py-20 md:px-6"
    >
      <div className="container mx-auto px-4 space-y-4">
        <h2 className="font-extrabold text-4xl lg:text-5xl tracking-tight  flex flex-col gap-3 items-center  text-primary">
          Dove Siamo
        </h2>
        <p className="text-center text-lg max-w-3xl mx-auto mb-12">
          Il Pichello si trova in località Marola nel comune di Carpineti. A
          differenza della maggior parte del carpinetano, che si trova nella
          valle del torrente Tresinaro (Valsecchia), il Pichello si trova sul
          versante opposto, nella valle del torrente Tassobbio (Val d’Enza). E’
          proprio nella Valtassobbio che coltiviamo una superficie di 300.000
          metri quadri, la maggior parte di questi situati su terreni castagnini
          della formazione di Bismantova, studiata ancora oggi in tutto il
          mondo. Orgogliosi di coltivare e allevare a Marola, 810 metri s.l.m.,
          immersa nei castagneti e querceti della Valle Tassobbio, nel cuore
          dell’Appennino Reggiano, circondata dai castelli matildici, alle porte
          del Parco Nazionale dell’Appennino Tosco-Emiliano “Il Gigante” e
          all’interno della zona MAB UNESCO.
        </p>
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-8 pt-12">
          {/* Info Cards - 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold mb-6">Vieni a Trovarci</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold">Indirizzo</h4>
                    <p className="text-muted-foreground">
                      Via Dante Alighieri 141 – Carpineti (RE)
                      <br />
                      42033 Marola, Carpineti (RE)
                      <br />
                      Reggio Emlia, Italia
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold">Orari di Apertura</h4>
                    <p className="text-muted-foreground">
                      Lunedì - Venerdì: 9:00 - 18:00
                      <br />
                      Sabato: 9:00 - 13:00
                      <br />
                      Domenica: Chiuso
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold">Telefono</h4>
                    <p className="text-muted-foreground">
                      <a href="tel:3408200080">
                        <strong>Mirco:</strong> 340/8200080
                      </a>
                      <br />
                      <a href="tel:3397981644">
                        <strong>Viviana:</strong> 339/7981644
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold">Email</h4>
                    <a href="mailto:info@agricolailpichello.it">
                      <p className="mt-2 text-gray-700">
                        info@agricolailpichello.it
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map - 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3 h-[500px] rounded-xl overflow-hidden shadow-md"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d711.536457105119!2d10.482757569662631!3d44.491678654872366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d552e2ba719e27%3A0x22cdb0cf8ee2dcff!2sAzienda%20Agricola%20Il%20Pichello!5e0!3m2!1sit!2sit!4v1736855691728!5m2!1sit!2sit"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
