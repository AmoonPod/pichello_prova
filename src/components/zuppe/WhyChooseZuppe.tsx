"use client"

import Link from "next/link"
import { MapPin, Leaf, Timer, Award, Check, Wheat, ArrowRight, Truck, Package } from "lucide-react"

export default function WhyChooseZuppe() {
  return (
    <section className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Griglia a 2 colonne */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">

          {/* COLONNA SINISTRA: Testo SEO Emotivo */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-[0.2em] text-xs">
                Qualità Senza Compromessi
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight">
                Molto più di una <br />
                <span className="text-primary italic">busta di zuppa.</span>
              </h2>
            </div>

            {/* Testo SEO diviso in paragrafi scansionabili */}
            <div className="prose prose-lg text-muted-foreground font-light leading-relaxed">
              <p>
                Se cerchi un pasto veloce ma <strong className="text-foreground font-medium">genuino</strong>, sei nel posto giusto.
                Le nostre zuppe non sono il solito prodotto industriale: sono <strong className="text-foreground font-medium">ricette originali</strong> create nel nostro laboratorio di Marola.
              </p>
              <p>
                Usiamo solo legumi selezionati, i nostri cereali macinati a pietra e spezie dosate a mano.
                <strong className="text-foreground font-medium"> Zero conservanti, zero esaltatori di sapidità</strong>.
                Solo ingredienti che potresti trovare nella dispensa della nonna.
              </p>
            </div>

            {/* Checkmark List per lettura veloce */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">Fonte eccellente di proteine vegetali</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">Adatte a diete vegetariane e vegane</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">Durata oltre 12 mesi senza conservanti</span>
              </div>
            </div>

            {/* Cross-link alla Farina */}
            <Link href="/farina-antichi-cinquanta-grani-appennino-reggiano" className="group block mt-6">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                    <Wheat className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground font-semibold text-sm">Scopri anche la nostra Farina 50 Grani</p>
                    <p className="text-muted-foreground text-xs">Macinata a pietra, 50 varietà di grani antichi</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </div>
            </Link>
          </div>

          {/* COLONNA DESTRA: BENTO GRID (I 4 pilastri) */}
          <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">

            {/* Card 1: 100% Vegetale */}
            <div className="bg-[#FDFBF7] p-8 rounded-3xl border border-stone-100 flex flex-col justify-center">
              <Leaf className="w-8 h-8 text-green-600 mb-4" />
              <div className="text-3xl font-serif font-bold text-foreground mb-1">100%</div>
              <p className="font-bold text-foreground mb-2">Vegetale e Naturale</p>
              <p className="text-sm text-muted-foreground">Tutte le nostre zuppe sono completamente vegetali. Perfette per chi cerca proteine alternative alla carne.</p>
            </div>

            {/* Card 2: Conservazione */}
            <div className="bg-[#FDFBF7] p-8 rounded-3xl border border-stone-100 flex flex-col justify-center">
              <Package className="w-8 h-8 text-primary mb-4" />
              <div className="text-xl font-serif font-bold text-foreground mb-3">Lunga Conservazione</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full" /> Oltre 12 mesi in dispensa</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full" /> Atmosfera protettiva</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full" /> Zero conservanti chimici</li>
              </ul>
            </div>

            {/* Card 3: Località (Local SEO) */}
            <div className="bg-[#FDFBF7] p-8 rounded-3xl border border-stone-100 flex flex-col justify-center">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <div className="text-xl font-serif font-bold text-foreground mb-3">Dove Trovarci</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" /> <span>Laboratorio a <strong className="text-foreground">Marola di Carpineti</strong></span></li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" /> <span>Mercato di <strong className="text-foreground">Piazza Fontanesi</strong>, Reggio Emilia</span></li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" /> <span>Supermercati in provincia di RE</span></li>
              </ul>
            </div>

            {/* Card 4: Spedizione Italia */}
            <div className="bg-primary p-8 rounded-3xl text-primary-foreground flex flex-col justify-center">
              <Truck className="w-8 h-8 text-secondary mb-4" />
              <div className="text-xl font-serif font-bold mb-3">Spediamo in Tutta Italia</div>
              <p className="text-sm text-primary-foreground/80">
                Sei a Milano, Roma o Napoli? Nessun problema. <Link href="/contatti?prodotto=Zuppe%20Artigianali" className="text-secondary hover:text-secondary/80 underline underline-offset-2 font-medium">Contattaci</Link> per ricevere le zuppe fresche direttamente a casa tua.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
