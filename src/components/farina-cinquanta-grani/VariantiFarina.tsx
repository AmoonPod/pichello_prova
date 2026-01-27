"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Wheat, Leaf, Sparkles, ArrowRight, ScanEye, Scale, Cookie } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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

// --- DATI STATICI VARIANTI FARINA (usati come fallback/integrazioni) ---
const farineVariantiStatic = [
  {
    id: "integrale",
    slug: "farina-antichi-cinquanta-grani-integrale",
    name: "Integrale",
    tagline: "Tutto il Chicco",
    description: "La farina integrale contiene tutto: crusca, germe e endosperma. È la versione più ricca di fibre, vitamine e minerali. Perfetta per chi cerca il massimo dal punto di vista nutrizionale senza rinunciare al sapore.",
    icon: Leaf,
    fiber: "Alta",
    bestFor: "Pane rustico, focacce",
    color: "from-amber-800 to-amber-900",
    images: [
      "/images/farine/farina_cinquanta_int.webp",
    ]
  },
  {
    id: "semintegrale",
    slug: "farina-antichi-cinquanta-grani-semintegrale",
    name: "Semintegrale",
    tagline: "L'Equilibrio Perfetto",
    description: "La versione semintegrale offre il compromesso ideale tra nutrienti e lavorabilità. Parte della crusca viene rimossa, mantenendo però il germe e un buon apporto di fibre. Versatile e facile da lavorare.",
    icon: Wheat,
    fiber: "Media",
    bestFor: "Pizza, pasta fresca",
    color: "from-amber-600 to-amber-700",
    images: [
      "/images/farine/farina_cinquanta_semiint.webp",
    ]
  },
  {
    id: "fiore",
    slug: "farina-antichi-cinquanta-grani-fiore",
    name: "Fiore",
    tagline: "La Parte Più Pregiata",
    description: "Il fiore è la parte più interna, morbida e pregiata del chicco. Ottenuta con un'attenta setacciatura, è ideale per preparazioni delicate dove serve leggerezza e raffinatezza. Texture setosa e lievitazione ottimale.",
    icon: Sparkles,
    fiber: "Delicata",
    bestFor: "Dolci, brioche",
    color: "from-amber-400 to-amber-500",
    images: [
      "/images/farine/farina_cinquanta_fiore.webp",
    ]
  }
]

// Tipo ibrido che combina dati Sanity e statici
interface HybridFarina {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  icon: typeof Leaf | typeof Wheat | typeof Sparkles
  fiber: string
  bestFor: string
  color: string
  images: string[]
}

// Funzione per trovare i dati statici in base allo slug
function getStaticData(sanitySlug: string) {
  return farineVariantiStatic.find(f => 
    f.slug === sanitySlug || 
    sanitySlug.includes(f.id) ||
    f.slug.includes(sanitySlug)
  )
}

// Funzione helper per troncare la descrizione al terzo punto
function clipDescription(text: string | undefined): string {
  if (!text) return ""
  // Divide il testo per i punti
  const sentences = text.split('.')
  // Se ci sono meno di 3 punti (quindi split restituisce <= 4 elementi considerando la parte dopo l'ultimo punto), ritorna tutto
  if (sentences.length <= 4) return text
  // Altrimenti prendi le prime 3 frasi, riuniscile e aggiungi il punto finale
  return sentences.slice(0, 3).join('.') + '.'
}

// Funzione per creare prodotto ibrido (Sanity + dati statici)
function createHybridFarina(sanityProduct: SanityProdotto): HybridFarina {
  const slug = getSlug(sanityProduct.slug)
  const staticData = getStaticData(slug)
  const images = sanityProduct.immagini?.map(img => img.image) || staticData?.images || []
  
  // Ottieni la descrizione (da Sanity o statica)
  const rawDescription = sanityProduct.descrizione || staticData?.description || ""
  // Applica il troncamento
  const description = clipDescription(rawDescription)
  
  return {
    id: sanityProduct._id,
    slug: slug,
    name: sanityProduct.nome?.replace("Farina Antichi Cinquanta Grani ", "").replace("Farina Cinquanta Grani ", "") || staticData?.name || "Farina",
    tagline: staticData?.tagline || "Macinata a Pietra",
    description: description,
    icon: staticData?.icon || Wheat,
    fiber: staticData?.fiber || "Media",
    bestFor: staticData?.bestFor || "Pane, pizza, pasta",
    color: staticData?.color || "from-amber-600 to-amber-700",
    images: images
  }
}

function FarinaCard({ product, index }: { product: HybridFarina, index: number }) {
  const [activeImage, setActiveImage] = useState(product.images[0])
  const isReversed = index % 2 !== 0
  const IconComponent = product.icon

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-stone-200 hover:shadow-xl transition-all duration-300">
      <div className="grid lg:grid-cols-10 gap-0 h-full">

        {/* LATO IMMAGINE */}
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
                alt={`Sacco di farina artigianale ${product.name} a Marola, vicino Castelnovo ne' Monti, Reggio Emilia - Farina Cinquanta Grani Il Pichello`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </motion.div>
          </AnimatePresence>


          {/* Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm text-stone-800 shadow-sm flex items-center gap-1">
              <IconComponent className="w-3 h-3" />
              {product.tagline}
            </span>
          </div>
        </div>

        {/* LATO CONTENUTO */}
        <div className="p-6 lg:p-10 flex flex-col justify-center bg-white relative lg:col-span-7">

          <div className="flex flex-col h-full justify-between gap-6">

            {/* Header & Desc */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-3xl lg:text-4xl font-serif font-bold text-stone-900 leading-tight">
                  {product.name}
                </h3>
                <span className="hidden lg:inline-block text-[10px] font-bold uppercase tracking-widest bg-amber-50 text-amber-700 px-2 py-1 rounded border border-amber-100">
                  50 Grani Antichi
                </span>
              </div>

              <p className="text-stone-600 text-base leading-relaxed font-light mb-4 line-clamp-3 lg:line-clamp-none">
                {product.description}
              </p>

              {/* Specs Grid Compact */}
              <div className="flex gap-6 py-3 border-t border-stone-100">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-amber-600" />
                  <div>
                    <p className="text-[10px] text-stone-400 font-bold uppercase">Fibre</p>
                    <p className="text-sm font-semibold text-stone-800">{product.fiber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Cookie className="w-4 h-4 text-amber-600" />
                  <div>
                    <p className="text-[10px] text-stone-400 font-bold uppercase">Ideale per</p>
                    <p className="text-sm font-semibold text-stone-800">{product.bestFor}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Area: Thumbnails + Dual CTA */}
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">

              {/* Thumbnails */}
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
                {/* Link alla pagina prodotto (quando esisterà) */}
                <Link href={`/prodotti/${product.slug}`} className="hidden sm:block">
                  <Button variant="ghost" className="text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full px-4">
                    <ScanEye className="w-4 h-4 mr-2" /> Dettagli
                  </Button>
                </Link>

                {/* CTA Principale (Form Precompilato) */}
                <Link href={`/contatti?prodotto=${encodeURIComponent('Farina Cinquanta Grani ' + product.name)}`} className="w-full lg:w-auto">
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

interface VariantiFarinaProps {
  prodotti?: SanityProdotto[]
}

export default function VariantiFarina({ prodotti }: VariantiFarinaProps) {
  // Se ci sono prodotti da Sanity, li converte in formato ibrido
  // Altrimenti usa i dati statici come fallback
  const products: HybridFarina[] = prodotti && prodotti.length > 0
    ? prodotti.map(p => createHybridFarina(p))
    : farineVariantiStatic.map(f => ({
        ...f,
        id: f.id
      }))

  return (
    <section className="bg-[#F9F9F7] py-16 lg:py-24" id="varianti">
      {/* Intro */}
      <div className="container mx-auto px-4 mb-12 lg:mb-16 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/50 text-amber-800 text-xs font-bold uppercase tracking-widest mb-4 border border-amber-200/50">
          <Wheat className="w-3.5 h-3.5" />
          Tre anime, un'unica eccellenza
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stone-900 mb-6 leading-[1.1]">
          Scegli la tua <span className="text-amber-700 italic">variante.</span>
        </h2>

        <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
          La stessa miscela preziosa di 50 grani antichi, tre diversi gradi di setacciatura.
          Dalla più rustica alla più raffinata: <strong className="text-foreground font-medium">ognuna perfetta per le sue preparazioni</strong>.
        </p>
      </div>

      {/* Product List */}
      <div className="container mx-auto px-4 max-w-6xl flex flex-col gap-8 lg:gap-10">
        {products.map((product, index) => (
          <FarinaCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {/* Bottom note */}
      <div className="container mx-auto px-4 mt-12 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-sm border border-amber-100">
          <span className="text-amber-600 font-bold">W 280-330</span>
          <span className="w-px h-4 bg-stone-200" />
          <span className="text-amber-600 font-bold">P/L 0,5-0,7</span>
          <span className="w-px h-4 bg-stone-200" />
          <span className="text-stone-600 text-sm">Panificabile Superiore</span>
        </div>
        <p className="text-stone-500 text-sm mt-4">
          Tutte e tre le varianti sono <strong className="text-stone-700">certificate Prodotto di Montagna</strong>
        </p>
      </div>
    </section>
  )
}
