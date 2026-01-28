"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, Flame, ArrowRight, ScanEye } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { pastaProducts, type PastaProduct } from "@/data/pastaProducts"

// Interfaccia per i prodotti da Sanity
interface SanityProdotto {
  _id: string
  nome: string
  descrizione?: string
  ingredienti?: string
  slug: { current: string } | string
  immagini?: { image: string; alt?: string }[]
}

// Funzione per ottenere lo slug come stringa
function getSlug(slug: { current: string } | string | undefined): string {
  if (!slug) return ""
  return typeof slug === 'string' ? slug : slug.current
}

// Funzione per trovare i dati statici in base allo slug del prodotto Sanity
function getStaticData(sanitySlug: string): PastaProduct | undefined {
  // Cerca una corrispondenza esatta o parziale
  return pastaProducts.find(p => 
    p.slug === sanitySlug || 
    sanitySlug.includes(p.slug) ||
    p.slug.includes(sanitySlug)
  )
}

// Tipo ibrido che combina dati Sanity e statici
interface HybridProduct {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  cookingTime: string
  intensity: string
  images: string[]
  pairing: string
  pairingLink?: string
  pairingLabel?: string
  priceRange: { low: number; high: number }
}

// Funzione per creare prodotto ibrido (Sanity + dati statici)
function createHybridProduct(sanityProduct: SanityProdotto): HybridProduct {
  const slug = getSlug(sanityProduct.slug)
  const staticData = getStaticData(slug)
  const images = sanityProduct.immagini?.map(img => img.image) || staticData?.images || []
  
  return {
    id: sanityProduct._id,
    slug: slug,
    name: sanityProduct.nome || staticData?.name || "Pasta",
    tagline: staticData?.tagline || "Trafilata al Bronzo",
    description: sanityProduct.descrizione || staticData?.description || "",
    cookingTime: staticData?.cookingTime || "10-12 min",
    intensity: staticData?.intensity || "Media",
    images: images,
    pairing: staticData?.pairing || "Ideale con sughi corposi.",
    pairingLink: staticData?.pairingLink,
    pairingLabel: staticData?.pairingLabel,
    priceRange: staticData?.priceRange || { low: 3, high: 5 }
  }
}

function BigProductCard({ product, index }: { product: HybridProduct, index: number }) {
  const [activeImage, setActiveImage] = useState(product.images[0])
  const isReversed = index % 2 !== 0
  const prefilledMessage = encodeURIComponent(
    `Ciao, vorrei ordinare ${product.name} trafilati al bronzo. Mi inviate disponibilità e prezzi?`
  )

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-stone-200 hover:shadow-xl transition-all duration-300">
      <div className="grid lg:grid-cols-10 gap-0 h-full">

        {/* LATO IMMAGINE (5 Colonne - Più stretto per dare spazio al testo, ma alto abbastanza) */}
        {/* Altezza ridotta a h-[400px] su desktop per farne stare 1.5 in visuale */}
        <div className={cn(
          "relative bg-stone-100 h-[300px] lg:h-auto lg:min-h-full overflow-hidden lg:col-span-3",
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

              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700 bg-amber-100/60 px-2 py-1 rounded">
                  Bronzo + essiccazione lenta
                </span>
              </div>

              <p className="text-stone-600 text-base leading-relaxed font-light mb-4 line-clamp-3 lg:line-clamp-none">
                {product.description}
              </p>

              <div className="bg-stone-50 border border-stone-100 rounded-lg p-3 mb-4 text-sm text-stone-700 flex items-start gap-2">
                <span className="text-amber-600 font-semibold">Ideale con:</span>
                <div className="space-y-1">
                  <p className="leading-snug">{product.pairing}</p>
                  {product.pairingLink && (
                    <Link href={product.pairingLink} className="text-amber-700 font-semibold hover:underline inline-flex items-center gap-1 text-xs">
                      {product.pairingLabel ?? "Scopri l'abbinamento"}
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>

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

              <p className="text-sm text-stone-600">
                Prezzo indicativo: {product.priceRange.low.toFixed(2)}€ - {product.priceRange.high.toFixed(2)}€ a seconda del formato.
              </p>
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
                    <Image src={img} alt="" fill className="object-cover" sizes="56px" />
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
                <Link
                  href={`/contatti?prodotto=${encodeURIComponent(product.name)}&messaggio=${prefilledMessage}`}
                  className="w-full lg:w-auto"
                >
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

interface PastaGalleryProps {
  prodotti?: SanityProdotto[]
  hideIntro?: boolean
}

export default function PastaShowcaseRefined({ prodotti, hideIntro = false }: PastaGalleryProps) {
  // Se ci sono prodotti da Sanity, li converte in formato ibrido
  // Altrimenti usa i dati statici come fallback
  const products: HybridProduct[] = prodotti && prodotti.length > 0
    ? prodotti.map(p => createHybridProduct(p))
    : pastaProducts.map(p => ({
        ...p,
        id: p.id
      }))

  return (
    <section className="bg-[#F9F9F7] py-16 lg:py-24" id="la-nostra-pasta">
      {/* Intro Copywriting Aggressivo - Shown only if hideIntro is false */}
      {!hideIntro && (
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
      )}

      {/* Product List - Max Width contenuta per visuale card multiple */}
      <div className="container mx-auto px-4 max-w-6xl flex flex-col gap-8 lg:gap-10">
        {products.map((product, index) => (
          <BigProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

    </section>
  )
}
