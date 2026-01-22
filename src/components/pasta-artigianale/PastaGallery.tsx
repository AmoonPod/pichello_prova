"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, Flame, ArrowRight, ScanEye } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// --- DATI ---
// Ho aggiunto lo 'slug' per collegare eventualmente alle pagine prodotto singole
const pastaCollections = [
  {
    id: "spaghetti",
    slug: "spaghetti",
    name: "Spaghetti",
    tagline: "Il Grande Classico",
    description: "Il formato più amato, nella sua versione autentica. Superficie ruvida che trattiene l'olio e il pomodoro. Perfetti per aglio e olio, alle vongole o con un semplice pomodoro fresco.",
    cookingTime: "9-11 min",
    intensity: "Media",
    images: [
      "/images/pasta/spaghetti_appennino_reggiano_3.webp",
      "/images/pasta/spaghetti_appennino_reggiano.webp",
      "/images/pasta/spaghetti_appennino_reggiano_2.webp",
      "/images/pasta/spaghetti_appennino_reggiano_4.webp",
    ]
  },
  {
    id: "mezzi-paccheri",
    slug: "mezzi-paccheri",
    name: "Mezzi Paccheri",
    tagline: "Il Re della Tavola",
    description: "Superficie incredibilmente ruvida e struttura spessa. Nati per abbracciare ragù di carne e sughi corposi. Si riempiono di condimento ad ogni forchettata.",
    cookingTime: "13-15 min",
    intensity: "Alta",
    images: [
      "/images/pasta/mezzi_paccheri_appennino_reggiano_6.webp",
      "/images/pasta/mezzi_paccheri_appennino_reggiano.webp",
      "/images/pasta/mezzi_paccheri_appennino_reggiano_3.webp",
      "/images/pasta/mezzi_paccheri_appennino_reggiano_4.webp",
    ]
  },
  {
    id: "fusilli",
    slug: "fusilli",
    name: "Fusilli",
    tagline: "Spirale Perfetta",
    description: "La spirale cattura il condimento in ogni piega. Ottimi con pesto, sughi vegetali o semplicemente burro e salvia. L'essiccazione lenta mantiene la forma intatta.",
    cookingTime: "11-13 min",
    intensity: "Media",
    images: [
      "/images/pasta/fusilli_appennino_reggiano_4.webp",
      "/images/pasta/fusilli_appennino_reggiano_3.webp",
      "/images/pasta/fusilli_appennino_reggiano.webp",
    ]
  },
  {
    id: "penne",
    slug: "penne-rigate",
    name: "Penne Rigate",
    tagline: "Il Classico Versatile",
    description: "Rigatura profonda e taglio netto. Il sugo entra dentro e si aggrappa fuori. Perfette per l'arrabbiata, la vodka o un ragù bianco.",
    cookingTime: "11-13 min",
    intensity: "Media-Alta",
    images: [
      "/images/pasta/penne_appennino_reggiano_5.webp",
      "/images/pasta/penne_appennino_reggiano_3.webp",
      "/images/pasta/penne_appennino_reggiano.webp",
      "/images/pasta/penne_appennino_reggiano_4.webp",
    ]
  },
  {
    id: "maccheroni",
    slug: "maccheroni",
    name: "Maccheroni",
    tagline: "Semplicità Rurale",
    description: "Il formato della domenica. Corti, robusti e versatili. Perfetti saltati in padella con ragù, salsiccia o verdure di stagione.",
    cookingTime: "11-13 min",
    intensity: "Media",
    images: [
      "/images/pasta/maccheroni_appennino_reggiano_2.webp",
      "/images/pasta/maccheroni_appennino_reggiano.webp",
      "/images/pasta/maccheroni_appennino_reggiano_4.webp",
    ]
  },
  {
    id: "tubetti",
    slug: "tubetti",
    name: "Tubetti",
    tagline: "Per Minestre e Zuppe",
    description: "Piccoli ma tenaci. Ideali per minestre di legumi, pasta e fagioli o pasta e ceci. Tengono la cottura anche nel brodo caldo.",
    cookingTime: "9-11 min",
    intensity: "Delicata",
    images: [
      "/images/pasta/tubetti_appennino_reggiano_3.webp",
      "/images/pasta/tubetti_appennino_reggiano_2.webp",
      "/images/pasta/tubetti_appennino_reggiano.webp",
    ]
  }
]

function BigProductCard({ product, index }: { product: typeof pastaCollections[0], index: number }) {
  const [activeImage, setActiveImage] = useState(product.images[0])
  const isReversed = index % 2 !== 0

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-stone-200 hover:shadow-xl transition-all duration-300">
      <div className="grid lg:grid-cols-10 gap-0 h-full">

        {/* LATO IMMAGINE (5 Colonne - Più stretto per dare spazio al testo, ma alto abbastanza) */}
        {/* Altezza ridotta a h-[400px] su desktop per farne stare 1.5 in visuale */}
        <div className={cn(
          "relative bg-stone-100 h-[300px] lg:h-[450px] overflow-hidden lg:col-span-3",
          isReversed ? "lg:order-last" : ""
        )}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={activeImage}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Badge Mobile Only */}
          <div className="absolute top-4 left-4 lg:hidden">
            <span className="bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm text-stone-800 shadow-sm">
              Bronzo
            </span>
          </div>
        </div>

        {/* LATO CONTENUTO (7 Colonne) */}
        <div className="p-6 lg:p-10 flex flex-col justify-center bg-white relative lg:col-span-7">

          <div className="flex flex-col h-full justify-between gap-6">

            {/* Header & Desc */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-3xl lg:text-4xl font-serif font-bold text-stone-900 leading-tight">
                  {product.name}
                </h3>
                <span className="hidden lg:inline-block text-[10px] font-bold uppercase tracking-widest bg-amber-50 text-amber-700 px-2 py-1 rounded border border-amber-100">
                  {product.tagline}
                </span>
              </div>

              <p className="text-stone-600 text-base leading-relaxed font-light mb-4 line-clamp-3 lg:line-clamp-none">
                {product.description}
              </p>

              {/* Specs Grid Compact */}
              <div className="flex gap-6 py-3 border-t border-stone-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <div>
                    <p className="text-[10px] text-stone-400 font-bold uppercase">Cottura</p>
                    <p className="text-sm font-semibold text-stone-800">{product.cookingTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <div>
                    <p className="text-[10px] text-stone-400 font-bold uppercase">Tenacia</p>
                    <p className="text-sm font-semibold text-stone-800">{product.intensity}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Area: Thumbnails + Dual CTA */}
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">

              {/* Thumbnails (Più piccole ora) */}
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={cn(
                      "relative w-14 h-14 rounded-lg overflow-hidden border transition-all duration-200",
                      activeImage === img
                        ? "border-amber-600 shadow-sm opacity-100 ring-1 ring-amber-600"
                        : "border-stone-100 opacity-60 hover:opacity-100 hover:border-stone-300"
                    )}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center gap-3 w-full lg:w-auto">
                {/* Link alla pagina prodotto (SEO + Info) */}
                <Link href={`/prodotti/${product.slug}`} className="hidden sm:block">
                  <Button variant="ghost" className="text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full px-4">
                    <ScanEye className="w-4 h-4 mr-2" /> Dettagli
                  </Button>
                </Link>

                {/* CTA Principale (Form Precompilato) */}
                <Link href={`/contatti?prodotto=${encodeURIComponent(product.name)}`} className="w-full lg:w-auto">
                  <Button className="w-full lg:w-auto rounded-full bg-stone-900 text-white hover:bg-amber-700 px-6 py-5 text-sm font-bold shadow-lg shadow-stone-900/10 hover:shadow-xl transition-all group">
                    Ordina Ora <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default function PastaShowcaseRefined() {
  return (
    <section className="bg-[#F9F9F7] py-16 lg:py-24" id="la-nostra-pasta">
      {/* Intro Copywriting Aggressivo */}
      <div className="container mx-auto px-4 mb-12 lg:mb-16 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/50 text-amber-800 text-xs font-bold uppercase tracking-widest mb-4 border border-amber-200/50">
          Solo grano dell'Appennino Reggiano
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stone-900 mb-6 leading-[1.1]">
          Ruvida. Tenace. <span className="text-amber-700 italic">Di Montagna.</span>
        </h2>

        <p className="text-lg text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
          Dimentica la pasta industriale liscia e sbiadita. Qui c'è solo grano del nostro Appennino,
          acqua pura e <strong className="text-stone-800 font-medium">tutto il tempo che serve</strong>.
          Scegli il formato che ti farà venire l'acquolina in bocca.
        </p>
      </div>

      {/* Product List - Max Width contenuta per visuale card multiple */}
      <div className="container mx-auto px-4 max-w-6xl flex flex-col gap-8 lg:gap-10">
        {pastaCollections.map((product, index) => (
          <BigProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

    </section>
  )
}