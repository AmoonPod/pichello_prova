"use client";
import "../globals.css";
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
  MessageCircle,
  ShoppingCart,
  Info,
} from "lucide-react";

const ContactsPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [isVisible, setIsVisible] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [prefilledProduct, setPrefilledProduct] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [messageContent, setMessageContent] = useState("");

  useEffect(() => {
    if (isInView) setIsVisible(true);
  }, [isInView]);

  // Handle URL parameters for pre-filling the form
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const productParam = urlParams.get('prodotto');
    if (productParam) {
      setPrefilledProduct(productParam);
      setSelectedSubject("ordine");
      setMessageContent(`Sono interessato al prodotto "${productParam}". Vorrei sapere disponibilità, quantità minime e prezzo. Grazie.`);
    }
  }, []);

  // Function to clear pre-compilation and redirect to clean /contatti
  const clearPrecompilation = () => {
    setPrefilledProduct("");
    setSelectedSubject("");
    setMessageContent("");
    // Redirect to clean /contatti URL without parameters
    window.history.pushState({}, '', '/contatti');
  };

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
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Compact Hero Section */}
      <section className="relative py-12 lg:py-16 bg-primary overflow-hidden">
        {/* Decorative Elements - Reduced */}
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/5 blur-2xl animate-pulse delay-300" />
        <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-white/5 blur-xl animate-pulse delay-700" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-white mb-4">
              <Phone className="w-4 h-4" />
              <span className="font-medium">Per Ordini o Informazioni</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Contattaci
            </h1>

            <p className="text-base md:text-lg text-white/90 font-medium max-w-2xl mx-auto leading-relaxed">
              Siamo qui per rispondere alle tue domande sui nostri prodotti biorazionali dell'Appennino Reggiano e per ricevere i tuoi ordini
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact Bar - NEW: Immediately visible contact options */}
      <section className="py-8 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6"
          >
            {/* Quick Phone Contact */}
            <div className="flex items-center justify-center md:justify-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/20 hover:bg-primary/10 transition-colors">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">Chiama Ora</h3>
                <div className="space-y-1">
                  <a href="tel:3408200080" className="block text-primary font-bold hover:underline text-sm">
                    Mirco: 340/8200080
                  </a>
                  <a href="tel:3397981644" className="block text-primary font-bold hover:underline text-sm">
                    Viviana: 339/7981644
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Email Contact */}
            <div className="flex items-center justify-center md:justify-start gap-3 p-4 bg-secondary/5 rounded-xl border border-secondary/20 hover:bg-secondary/10 transition-colors">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">Scrivi Email</h3>
                <a href="mailto:info@agricolailpichello.it" className="text-secondary font-bold hover:underline text-sm">
                  info@agricolailpichello.it
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center justify-center md:justify-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/20 hover:bg-primary/10 transition-colors">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">Vieni a Trovarci</h3>
                <div className="space-y-1">
                  <p className="text-primary font-bold text-sm">Via Dante Alighieri 141</p>
                  <p className="text-primary font-bold text-sm">42033 Marola, Carpineti (RE)</p>
                  <p className="text-primary font-semibold text-xs">Lun-Ven: 9:00-18:00 | Sab: 9:00-13:00</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content - Reduced padding */}
      <section className="py-12 lg:py-16 relative">
        {/* Background decorative elements - Reduced */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/5 blur-xl animate-pulse delay-300" />
        <div className="absolute bottom-20 right-10 w-16 h-16 rounded-full bg-secondary/5 blur-lg animate-pulse delay-700" />

        <div className="container mx-auto px-4">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="max-w-4xl mx-auto"
          >
            {/* Contact Form - Full width */}
            <motion.div
              variants={itemVariants}
              className="relative group"
            >
              <div className="absolute inset-2 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/15 rounded-3xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500" />

              <div className="relative bg-white border border-border rounded-3xl p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.2)] transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                      Inviaci un Messaggio
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      {prefilledProduct
                        ? `Richiesta per: ${prefilledProduct}`
                        : "Per ordini, informazioni sui prodotti o richieste personalizzate"
                      }
                    </p>
                  </div>
                </div>

                {prefilledProduct && (
                  <div className="mb-6 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <ShoppingCart className="w-4 h-4" />
                        <span className="font-medium">
                          Form pre-compilato per il prodotto: <strong>{prefilledProduct}</strong>
                        </span>
                      </div>
                      <button
                        onClick={clearPrecompilation}
                        className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 hover:bg-primary/30 text-primary hover:text-primary/80 transition-all duration-200 group"
                        title="Rimuovi pre-compilazione"
                        type="button"
                      >
                        <svg className="w-3 h-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

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
                        htmlFor="subject"
                        className="text-foreground font-medium"
                      >
                        Motivo del Contatto
                      </Label>
                      <select
                        id="subject"
                        className="w-full px-3 py-2 border border-border rounded-md focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        required
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                      >
                        <option value="">Seleziona...</option>
                        <option value="ordine">Effettuare un ordine</option>
                        <option value="info-prodotti">Informazioni sui prodotti</option>
                        <option value="disponibilita">Disponibilità prodotti</option>
                        <option value="prezzi">Richiesta prezzi</option>
                        <option value="altro">Altro</option>
                      </select>
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
                        placeholder="Descrivi la tua richiesta, i prodotti che ti interessano, quantità desiderate..."
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
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


          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactsPage;
