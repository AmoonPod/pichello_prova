import Link from "next/link"
import { MapPin, Mountain, Truck, Users, ShoppingBag } from "lucide-react"

const locations = [
  "Reggio Emilia",
  "Castelnovo ne' Monti",
  "Carpineti",
  "Modena",
  "Parma",
  "Bologna",
  "Mantova",
  "Cremona",
  "Piacenza",
  "La Spezia"
]

export default function TerritoryFarina() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left - Map/Location visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-green-100 to-emerald-50 rounded-3xl p-8 lg:p-12">
                {/* Decorative mountain */}
                <div className="absolute top-4 right-4 opacity-10">
                  <Mountain className="w-32 h-32 text-green-900" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-green-600 font-medium">Dove siamo</p>
                      <h3 className="text-xl font-bold text-gray-900">Marola di Carpineti (RE)</h3>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Il nostro mulino a pietra si trova nel cuore dell'<strong className="text-gray-800">Appennino Reggiano</strong>, 
                    a <strong className="text-gray-800">Marola di Carpineti</strong>, a oltre 700 metri di altitudine, 
                    <strong className="text-gray-800"> a pochi minuti da Castelnovo ne' Monti</strong>. 
                    Qui coltiviamo i nostri 50 grani antichi e li maciniamo freschi nel nostro mulino aziendale.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="text-2xl font-bold text-green-600 mb-1">800m+</div>
                      <div className="text-xs text-gray-500">Altitudine coltivazione</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="text-2xl font-bold text-green-600 mb-1">50</div>
                      <div className="text-xs text-gray-500">Varietà di grano</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Delivery info */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
                <Truck className="w-4 h-4" />
                Dove comprare farina di qualità
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                La migliore farina artigianale<br />
                <span className="text-amber-600">a Reggio Emilia e in tutta Italia</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                <strong className="text-gray-800">Cerchi una farina di qualità superiore?</strong> Puoi acquistare 
                la nostra farina direttamente in azienda a Marola (vicino Castelnovo ne' Monti), 
                al mercato di Piazza Fontanesi a Reggio Emilia, in vari supermercati della provincia, 
                oppure con <strong className="text-gray-800">spedizione in tutta Italia</strong>.
              </p>

              {/* Locations served */}
              <div className="mb-8">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Zone di consegna diretta</p>
                <div className="flex flex-wrap gap-2">
                  {locations.map((location, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm font-medium border border-amber-100"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      {location}
                    </span>
                  ))}
                </div>
              </div>

              {/* How to buy */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Mercato di Reggio Emilia</h4>
                    <p className="text-sm text-gray-600">
                      Ci trovi al mercato di <strong>Piazza Fontanesi a Reggio Emilia</strong>.{" "}
                      <Link href="/contatti" className="text-amber-700 hover:text-amber-800 underline underline-offset-2 font-medium">Contattaci</Link> per conoscere date e orari.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ShoppingBag className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Supermercati in provincia di Reggio Emilia</h4>
                    <p className="text-sm text-gray-600">
                      I nostri prodotti sono disponibili in <strong>vari supermercati della provincia di Reggio Emilia</strong>.{" "}
                      <Link href="/contatti" className="text-amber-700 hover:text-amber-800 underline underline-offset-2 font-medium">Contattaci</Link> per sapere dove trovarci.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mountain className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Ritiro in azienda (vicino Castelnovo ne' Monti)</h4>
                    <p className="text-sm text-gray-600">
                      Vieni a trovarci a Marola di Carpineti! A pochi minuti da Castelnovo ne' Monti. 
                      Potrai vedere il mulino e portare a casa la farina appena macinata. Su appuntamento.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Truck className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Spedizione in tutta Italia</h4>
                    <p className="text-sm text-gray-600">
                      <strong>Spediamo la nostra farina artigianale in tutta Italia</strong>.{" "}
                      <Link href="/contatti?prodotto=Farina%20Antichi%20Cinquanta%20Grani" className="text-amber-700 hover:text-amber-800 underline underline-offset-2 font-medium">Contattaci</Link> per un preventivo in base al quantitativo desiderato.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
