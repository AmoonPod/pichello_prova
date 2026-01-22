"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Soup, Timer, ArrowRight, ScanEye, Flame, Users } from "lucide-react"
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

function ZuppaCard({ product, index }: { product: Prodotto; index: number }) {
  const images = product.immagini?.map(img => img.image) || []
  const [activeImage, setActiveImage] = useState(images[0] || "/images/zuppe_background.jpg")
  const slug = typeof product.slug === 'string' ? product.slug : product.slug?.current

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md border border-stone-200 hover:shadow-lg hover:border-primary/40 transition-all duration-300 group">
      {/* Immagine */}
      <div className="relative bg-stone-100 h-[250px] md:h-[300px] lg:h-[380px] overflow-hidden">
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
                alt={`${product.nome} - Zuppa artigianale dell'Appennino Reggiano, Il Pichello`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                <Soup className="w-12 h-12 text-primary" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/95 backdrop-blur text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded text-stone-800 shadow-sm flex items-center gap-1">
            <Soup className="w-2.5 h-2.5" />
            Zuppa
          </span>
        </div>
      </div>

      {/* Contenuto */}
      <div className="p-4 flex flex-col gap-3">
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
            <Timer className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-foreground">30-40 min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-foreground">4 porzioni</span>
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
                          ? "border-primary shadow-sm opacity-100 ring-1 ring-primary"
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
            <Button size="sm" className="w-full rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold shadow-sm hover:shadow-md transition-all">
              Ordina <ArrowRight className="ml-1 w-3 h-3" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function GalleriaZuppe({ zuppe }: { zuppe: Prodotto[] }) {
  return (
    <section className="bg-[#F9F9F7] py-16 lg:py-24" id="le-zuppe">
      {/* Intro */}
      <div className="container mx-auto px-4 mb-12 lg:mb-16 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-primary/20">
          <Soup className="w-3.5 h-3.5" />
          Comfort Food dell'Appennino
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 leading-[1.1]">
          Le nostre <span className="text-primary italic">Zuppe.</span>
        </h2>

        <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
          Dalla tradizione contadina alle varianti gourmet.
          <strong className="text-foreground font-medium"> Ogni busta è una ricetta bilanciata</strong>, pronta da cuocere.
        </p>
      </div>

      {/* Product List - Grid Layout */}
      <div className="container mx-auto px-4 max-w-7xl">
        {zuppe.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {zuppe.map((product, index) => (
              <ZuppaCard key={product._id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-300">
            <Soup className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg mb-4">Le zuppe stanno cuocendo... torna presto!</p>
            <Link href="/contatti?prodotto=Zuppe">
              <Button variant="outline" className="rounded-full">
                Contattaci per info
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Bottom note */}
      <div className="container mx-auto px-4 mt-12 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-sm border border-primary/20">
          <span className="text-primary font-bold">100% Vegetale</span>
          <span className="w-px h-4 bg-stone-200" />
          <span className="text-primary font-bold">Senza Conservanti</span>
          <span className="w-px h-4 bg-stone-200" />
          <span className="text-stone-600 text-sm">Atmosfera Protettiva</span>
        </div>
      </div>
    </section>
  )
}
