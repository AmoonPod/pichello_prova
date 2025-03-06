"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  return (
    <section
      id="contact"
      className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 lg:items-start px-8 py-8 lg:py-20 md:px-6 bg-white"
    >
      <div className="container mx-auto px-4">
        <h2 className="font-extrabold text-4xl lg:text-5xl tracking-tight  flex flex-col gap-3 items-center  text-primary">
          Contattaci
        </h2>

        <div ref={ref} className="max-w-4xl mx-auto mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left Column - Form */}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6">
                  Inviaci un Messaggio
                </h3>

                {formSubmitted ? (
                  <div className="flex flex-col items-center justify-center h-full py-8">
                    <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
                    <h4 className="text-xl font-bold mb-2">
                      Messaggio Inviato!
                    </h4>
                    <p className="text-center text-muted-foreground">
                      Grazie per averci contattato. Ti risponderemo al più
                      presto.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nome</Label>
                        <Input
                          id="firstName"
                          placeholder="Il tuo nome"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Cognome</Label>
                        <Input
                          id="lastName"
                          placeholder="Il tuo cognome"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="La tua email"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefono</Label>
                      <Input
                        id="phone"
                        placeholder="Il tuo numero di telefono"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Messaggio</Label>
                      <Textarea
                        id="message"
                        placeholder="Il tuo messaggio"
                        rows={4}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Invia Messaggio
                    </Button>
                  </form>
                )}
              </div>

              {/* Right Column - Image */}
              <div className="relative hidden md:block">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80')",
                  }}
                >
                  <div className="absolute inset-0 bg-primary/30"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg text-center max-w-xs">
                    <h4 className="text-xl font-bold mb-2">Contattaci</h4>
                    <p className="text-muted-foreground mb-4">
                      Sei interessato ai nostri prodotti o vuoi saperne di più
                      sulla nostra azienda?
                    </p>
                    <p className="font-semibold">
                      Compila il form e verrai ricontattato al più presto.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
