"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChefHat, Timer, ArrowRight, ScanEye, Star, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface Prodotto {
  _id: string
  nome: string
  descrizione?: string
  ingredienti?: string
  slug: { current: string } | string
  immagini?: { image: string; alt?: string }[]
}

function RisottoCard({ product, index }: { product: Prodotto; index: number }) {
  const images = product.immagini?.map(img => img.image) || []
  const [activeImage, setActiveImage] = useState(images[0] || "")
  const slug = typeof product.slug === 'string' ? product.slug : product.slug?.current

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md border border-stone-700 hover:shadow-lg hover:border-secondary/50 transition-all duration-300 group">
      {/* Immagine */}
      <div className="relative bg-stone-800 h-[250px] md:h-[300px] lg:h-[380px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {activeImage ? (
              <Image
                src={activeImage}
                alt={`${product.nome} - Risotto artigianale dell'Appennino Reggiano, Il Pichello`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-stone-700 to-stone-900 flex items-center justify-center">
                <ChefHat className="w-12 h-12 text-secondary" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-secondary text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded text-primary-foreground shadow-sm flex items-center gap-1">
            <Star className="w-2.5 h-2.5" />
            Premium
          </span>
        </div>
      </div>

      {/* Contenuto */}
      <div className="p-4 flex flex-col gap-3 bg-white">
        {/* Header */}
        <div>
          <h3 className="text-xl font-serif font-bold text-foreground leading-tight mb-1.5 line-clamp-1">
            {product.nome}
          </h3>
          {product.ingredienti && (
            <p className="text-sm text-muted-foreground leading-relaxed font-light line-clamp-3">
              <span className="font-medium text-foreground">Ingredienti:</span> {product.ingredienti}
            </p>
          )}
        </div>

        {/* Specs Compact */}
        <div className="flex gap-4 py-2 border-t border-stone-100">
          <div className="flex items-center gap-1.5">
            <Timer className="w-3.5 h-3.5 text-secondary" />
            <span className="text-xs font-semibold text-foreground">18 min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-secondary" />
            <span className="text-xs font-semibold text-foreground">Carnaroli</span>
          </div>
        </div>

        {/* Thumbnails (se ci sono più immagini) */}
        {images.length > 1 && (
          <div className="flex gap-1.5">
            {images.slice(0, 4).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                      className={cn(
                        "relative w-10 h-10 rounded-md overflow-hidden border transition-all duration-200",
                        activeImage === img
                          ? "border-secondary shadow-sm opacity-100 ring-1 ring-secondary"
                          : "border-stone-200 opacity-60 hover:opacity-100 hover:border-stone-300"
                      )}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center gap-2 pt-1">
          {slug && (
            <Link href={`/prodotti/${slug}`} className="flex-1">
              <Button variant="ghost" size="sm" className="w-full text-xs text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg">
                Dettagli
              </Button>
            </Link>
          )}
          <Link href={`/contatti?prodotto=${encodeURIComponent(product.nome)}`} className="flex-1">
            <Button size="sm" className="w-full rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 text-xs font-semibold shadow-sm hover:shadow-md transition-all">
              Ordina <ArrowRight className="ml-1 w-3 h-3" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function GalleriaRisotti({ risotti }: { risotti: Prodotto[] }) {
  return (
    <section className="bg-stone-900 py-16 lg:py-24 relative overflow-hidden" id="i-risotti">
      {/* Decorazioni sfondo */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-stone-700/30 rounded-full blur-[100px] pointer-events-none" />

      {/* Intro */}
      <div className="container mx-auto px-4 mb-12 lg:mb-16 text-center max-w-4xl relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-bold uppercase tracking-widest mb-4 border border-secondary/30">
          <ChefHat className="w-3.5 h-3.5" />
          Linea Gourmet
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-[1.1]">
          Risotti <span className="text-secondary italic">d'Autore.</span>
        </h2>

        <p className="text-lg text-stone-400 font-light max-w-2xl mx-auto leading-relaxed">
          Non il solito preparato. Usiamo <strong className="text-stone-200 font-medium">Riso Carnaroli</strong> di alta qualità
          e condimenti disidratati artigianalmente: funghi porcini, tartufo nero, zafferano in pistilli.
        </p>
      </div>

      {/* Product List - Grid Layout */}
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {risotti.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {risotti.map((product, index) => (
              <RisottoCard key={product._id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-stone-700">
            <ChefHat className="w-16 h-16 text-stone-600 mx-auto mb-4" />
            <p className="text-stone-400 text-lg mb-4">I risotti arriveranno presto!</p>
            <Link href="/contatti?prodotto=Risotti">
              <Button variant="outline" className="rounded-full border-stone-600 text-stone-300 hover:bg-stone-800">
                Contattaci per info
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Bottom note */}
      <div className="container mx-auto px-4 mt-12 text-center relative z-10">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full border border-white/10">
          <span className="text-secondary font-bold">Pronto in 18 min</span>
          <span className="w-px h-4 bg-stone-700" />
          <span className="text-secondary font-bold">Senza Glutammato</span>
          <span className="w-px h-4 bg-stone-700" />
          <span className="text-stone-400 text-sm">Chicco Integro</span>
        </div>
      </div>
    </section>
  )
}
