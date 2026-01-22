"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin, Flame, Leaf, Timer, ChefHat, Soup } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function HeroZuppe() {
  return (
    <section className="relative w-full overflow-hidden bg-background text-foreground">

      {/* TEXTURE BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply" />

      {/* GRADIENT BLOBS */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 pt-12 pb-16 lg:pt-20 lg:pb-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT COLUMN - Text & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6 lg:gap-8 text-center lg:text-left"
          >

            {/* Badges */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide">
                <Flame className="w-4 h-4" />
                Comfort Food Artigianale
              </span>
              <span className="inline-flex items-center gap-2 bg-green-100 border border-green-200 text-green-800 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide">
                <Leaf className="w-4 h-4" />
                100% Vegetale
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-serif font-bold leading-[1.1] text-foreground">
              Zuppe e Risotti<br />
              <span className="text-primary italic">dell'Appennino.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl font-semibold text-primary/80 -mt-2">
              Il calore della montagna, pronto in pentola.
            </p>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
              <strong className="text-foreground">Dimentica i liofilizzati industriali</strong>.
              Le nostre sono miscele di legumi veri, cereali antichi e spezie,
              dosate a mano nel nostro laboratorio a <strong className="text-foreground">Marola di Carpineti</strong>.
              <span className="hidden md:inline"> Aggiungi acqua, fuoco lento e un filo d'olio.</span>
            </p>

            {/* TRUST ELEMENTS (ICONS) */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border mt-2">
              <div className="flex flex-col items-center lg:items-start gap-1">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <Timer className="w-4 h-4" /> 30-40 min
                </div>
                <span className="text-xs text-muted-foreground">Cottura lenta</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <ChefHat className="w-4 h-4" /> Artigianale
                </div>
                <span className="text-xs text-muted-foreground">Dosate a mano</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <Leaf className="w-4 h-4" /> Naturale
                </div>
                <span className="text-xs text-muted-foreground">Senza conservanti</span>
              </div>
            </div>

            {/* CTA Area */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-2">
              <Link href="#le-zuppe">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all transform hover:-translate-y-0.5"
                >
                  Scopri le Zuppe
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="#i-risotti">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary/5 font-semibold text-lg px-8 py-6 rounded-xl bg-transparent"
                >
                  Vedi i Risotti
                </Button>
              </Link>
            </div>

            {/* Location badge */}
            <div className="flex items-center gap-2 text-muted-foreground justify-center lg:justify-start text-sm">
              <MapPin className="w-4 h-4" />
              <span>Preparate a <strong className="text-foreground">Marola di Carpineti (RE)</strong> - Appennino Reggiano</span>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - Visual */}
          <div className="relative h-[500px] w-full flex items-center justify-center">

            {/* Main Blob Image */}
            <motion.div
              animate={{
                borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 60% 70% 40% / 50% 60% 30% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[350px] h-[350px] lg:w-[450px] lg:h-[450px] overflow-hidden shadow-2xl shadow-primary/20 bg-muted z-10"
            >
              <Image
                src="/images/zuppe/zuppe.webp"
                alt="Zuppe artigianali Appennino Reggiano"
                fill
                className="object-cover scale-110"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>

            {/* Floating Stats Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute top-10 right-0 lg:-right-4 bg-card/95 backdrop-blur rounded-2xl shadow-xl p-4 border border-border z-30 max-w-[140px]"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <Leaf className="w-4 h-4" />
                </div>
                <span className="text-2xl font-bold text-primary">100%</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium leading-tight">Vegetale e Naturale</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute bottom-20 right-0 lg:-right-8 bg-card/95 backdrop-blur rounded-2xl shadow-xl p-4 border border-border z-30"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Soup className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-bold text-primary">4 Porzioni</div>
                  <div className="text-xs text-muted-foreground font-medium">per busta</div>
                </div>
              </div>
            </motion.div>

            {/* Floating Badge */}
            <div className="absolute -left-4 top-1/3 -translate-y-1/2 bg-card/95 backdrop-blur shadow-xl border border-border p-4 rounded-2xl hidden xl:flex flex-col items-center gap-1">
              <span className="text-3xl font-bold text-primary">12+</span>
              <span className="text-xs font-bold text-foreground uppercase tracking-widest text-center">Mesi di<br />conservazione</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}