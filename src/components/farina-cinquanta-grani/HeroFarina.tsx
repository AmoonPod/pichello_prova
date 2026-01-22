import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin, Wheat, Mountain, Sparkles, Award, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroFarina() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-amber-50 to-white">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply" />

      {/* Gradient blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-amber-200/30 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-amber-300/20 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 pt-12 pb-16 lg:pt-20 lg:pb-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT COLUMN - Text & CTA */}
          <div className="flex flex-col gap-6 lg:gap-8 text-center lg:text-left">

            {/* Badges */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 text-amber-800 px-4 py-1.5 rounded-full text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>50 Varietà di Grani Antichi</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-green-100 border border-green-200 text-green-800 px-4 py-1.5 rounded-full text-sm font-semibold">
                <Award className="w-4 h-4" />
                <span>Prodotto di Montagna</span>
              </div>
            </div>

            {/* Headline - SEO Optimized H1 */}
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-serif font-bold leading-[1.1] text-gray-900">
              Farina di Grani Antichi<br />
              <span className="text-primary italic">Macinata a Pietra</span>
            </h1>

            {/* Subheadline with brand name */}
            <p className="text-xl md:text-2xl font-semibold text-amber-700 -mt-2">
              Antichi Cinquanta Grani dell'Appennino Reggiano
            </p>

            {/* Description - SEO Rich */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
              <strong className="text-foreground">Per chi cerca una farina artigianale di qualità superiore</strong>:
              un miscuglio prezioso di 50 varietà di frumenti antichi, coltivati senza chimica
              e macinati a pietra nel nostro mulino a Marola, <strong className="text-foreground">vicino Castelnovo ne' Monti</strong>.
              <span className="hidden md:inline"> Spedizione in tutta Italia.</span>
            </p>

            {/* Key features */}
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3 bg-white/80 backdrop-blur rounded-xl p-4 border border-amber-100">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Wheat className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Senza chimica</p>
                  <p className="text-xs text-gray-500">Coltivazione naturale</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/80 backdrop-blur rounded-xl p-4 border border-amber-100">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mountain className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Macinata a pietra</p>
                  <p className="text-xs text-gray-500">Nel nostro mulino</p>
                </div>
              </div>
            </div>

            {/* CTA Area */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-2">
              <Link href="/contatti?prodotto=Farina%20Antichi%20Cinquanta%20Grani&richiesta=ordine">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-secondary text-white font-bold text-lg px-8 py-6 rounded-xl shadow-lg shadow-amber-600/20 hover:shadow-amber-600/30 transition-all transform hover:-translate-y-0.5"
                >
                  <Truck className="mr-2 w-5 h-5" />
                  Ordina ora
                </Button>
              </Link>
              <Link href="#varianti">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 border-secondary text-primary hover:bg-primary/5 font-semibold text-lg px-8 py-6 rounded-xl bg-transparent"
                >
                  Scopri le 3 varianti
                </Button>
              </Link>
            </div>

            {/* Location badge - SEO Local */}
            <div className="flex items-center gap-2 text-gray-500 justify-center lg:justify-start text-sm">
              <MapPin className="w-4 h-4" />
              <span>Prodotta a <strong className="text-gray-700">Marola di Carpineti (RE)</strong> - A pochi minuti da <strong className="text-gray-700">Castelnovo ne' Monti</strong></span>
            </div>
          </div>

          {/* RIGHT COLUMN - Visual */}
          <div className="relative">
            {/* Main image container */}
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-amber-200 animate-spin-slow" style={{ animationDuration: '60s' }} />

              {/* Main circular image */}
              <div className="absolute inset-4 rounded-full overflow-hidden shadow-2xl shadow-amber-900/20">
                <Image
                  src="/images/cereali.jpg"
                  alt="Campo di grani antichi a Marola di Carpineti, vicino Castelnovo ne' Monti, Appennino Reggiano - Farina Cinquanta Grani Il Pichello"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent" />
              </div>

              {/* Floating stats cards */}
              <div className="absolute -left-4 lg:-left-8 top-1/4 bg-white rounded-2xl shadow-xl p-4 border border-amber-100 animate-float">
                <div className="text-3xl font-bold text-amber-600">50</div>
                <div className="text-xs text-gray-500 font-medium">Varietà<br />di grano</div>
              </div>

              <div className="absolute -right-4 lg:-right-8 top-1/2 bg-white rounded-2xl shadow-xl p-4 border border-amber-100 animate-float" style={{ animationDelay: '1s' }}>
                <div className="text-3xl font-bold text-amber-600">W 280</div>
                <div className="text-xs text-gray-500 font-medium">Forza<br />panificabile</div>
              </div>

              <div className="absolute left-1/4 -bottom-4 bg-white rounded-2xl shadow-xl p-4 border border-amber-100 animate-float" style={{ animationDelay: '2s' }}>
                <div className="text-3xl font-bold text-amber-600">3</div>
                <div className="text-xs text-gray-500 font-medium">Varianti<br />disponibili</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
