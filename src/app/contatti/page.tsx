"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
} from "lucide-react";

const ContactsPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [isVisible, setIsVisible] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (isInView) setIsVisible(true);
  }, [isInView]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would handle the form submission here
    setFormSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 3000);
  };

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
    <div className="min-h-screen bg-backgroundvariant">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-primary overflow-hidden">
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

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-white mb-6">
              <MessageCircle className="w-4 h-4" />
              <span className="font-medium">Inizia la Conversazione</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Parliamo dei Tuoi
              <br />
              <span className="text-white/90">Prossimi Sapori</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 font-medium max-w-3xl mx-auto leading-relaxed">
              Siamo qui per rispondere alle tue domande e aiutarti a scoprire i
              nostri prodotti biorazionali dell'Appennino Reggiano
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24 relative">
        {/* Background decorative elements */}
        <div className="absolute top-40 left-10 w-32 h-32 rounded-full bg-primary/5 blur-2xl animate-pulse delay-300" />
        <div className="absolute bottom-40 right-10 w-28 h-28 rounded-full bg-secondary/5 blur-xl animate-pulse delay-700" />

        <div className="container mx-auto px-4">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="grid lg:grid-cols-3 gap-8 lg:gap-12"
          >
            {/* Contact Form - Takes 2 columns */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 relative group"
            >
              <div className="absolute inset-2 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/15 rounded-3xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500" />

              <div className="relative bg-white border border-border rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.2)] transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                    Inviaci un Messaggio
                  </h2>
                </div>

                <div className="w-16 h-0.5 bg-primary rounded-full mb-6" />

                {formSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2 text-foreground">
                      Messaggio Inviato!
                    </h3>
                    <p className="text-center text-muted-foreground">
                      Grazie per averci contattato. Ti risponderemo presto.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="firstName"
                          className="text-foreground font-medium"
                        >
                          Nome
                        </Label>
                        <Input
                          id="firstName"
                          placeholder="Il tuo nome"
                          required
                          className="border-border focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="lastName"
                          className="text-foreground font-medium"
                        >
                          Cognome
                        </Label>
                        <Input
                          id="lastName"
                          placeholder="Il tuo cognome"
                          required
                          className="border-border focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-foreground font-medium"
                      >
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="La tua email"
                        required
                        className="border-border focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-foreground font-medium"
                      >
                        Telefono (opzionale)
                      </Label>
                      <Input
                        id="phone"
                        placeholder="Il tuo numero di telefono"
                        className="border-border focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="message"
                        className="text-foreground font-medium"
                      >
                        Messaggio
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Scrivi qui la tua richiesta, domande sui prodotti, ordini personalizzati..."
                        rows={5}
                        required
                        className="border-border focus:border-primary resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Invia Messaggio
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Information - Takes 1 column */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Phone Numbers */}
              <div className="relative group">
                <div className="absolute inset-2 bg-gradient-to-br from-secondary/5 via-secondary/10 to-secondary/15 rounded-3xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-500" />

                <div className="relative bg-white border border-border rounded-3xl p-6 lg:p-8 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                      Chiamaci
                    </h3>
                  </div>

                  <div className="w-16 h-0.5 bg-secondary rounded-full mb-4" />

                  <div className="space-y-3">
                    <div>
                      <a
                        href="tel:3408200080"
                        className="block text-lg font-semibold text-foreground hover:text-secondary transition-colors"
                      >
                        Mirco: 340/8200080
                      </a>
                    </div>
                    <div>
                      <a
                        href="tel:3397981644"
                        className="block text-lg font-semibold text-foreground hover:text-secondary transition-colors"
                      >
                        Viviana: 339/7981644
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="relative group">
                <div className="absolute inset-2 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/15 rounded-3xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500" />

                <div className="relative bg-white border border-border rounded-3xl p-6 lg:p-8 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                      Scrivici
                    </h3>
                  </div>

                  <div className="w-16 h-0.5 bg-primary rounded-full mb-4" />

                  <a
                    href="mailto:info@agricolailpichello.it"
                    className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    info@agricolailpichello.it
                  </a>
                </div>
              </div>

              {/* Address & Hours */}
              <div className="grid grid-cols-1 gap-4">
                <div className="relative group">
                  <div className="absolute inset-1 bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-2xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-300" />

                  <div className="relative bg-white border border-border rounded-2xl p-4 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="w-5 h-5 text-secondary" />
                      <h4 className="font-semibold text-foreground">
                        Indirizzo
                      </h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Via Dante Alighieri 141
                      <br />
                      42033 Marola, Carpineti (RE)
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-1 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-300" />

                  <div className="relative bg-white border border-border rounded-2xl p-4 transition-all duration-300 hover:shadow-md">
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
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactsPage;
