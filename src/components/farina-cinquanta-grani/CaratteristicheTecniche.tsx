import { FlaskConical, Scale, Gauge, Award, Info } from "lucide-react"

const specs = [
  {
    icon: Gauge,
    label: "Forza (W)",
    value: "280 - 330",
    description: "Forza medio-alta, ideale per lievitazioni lunghe e impasti strutturati",
    highlight: true
  },
  {
    icon: Scale,
    label: "Rapporto P/L",
    value: "0,5 - 0,7",
    description: "Equilibrio perfetto tra tenacità ed estensibilità dell'impasto",
    highlight: false
  },
  {
    icon: Award,
    label: "Classificazione",
    value: "Panificabile Superiore",
    description: "La categoria più alta per farine destinate alla panificazione",
    highlight: true
  },
  {
    icon: FlaskConical,
    label: "Macinazione",
    value: "A tutto corpo",
    description: "Conserva integralmente il germe di grano e i nutrienti",
    highlight: false
  }
]

export default function CaratteristicheTecniche() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left - Content */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
                <FlaskConical className="w-4 h-4" />
                Per i professionisti
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Caratteristiche <span className="text-amber-600">tecniche</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                La farina Antichi Cinquanta Grani non è solo buona: ha caratteristiche tecniche 
                che la rendono perfetta per panificatori professionisti e appassionati esigenti.
              </p>

              {/* Specs grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {specs.map((spec, index) => (
                  <div 
                    key={index}
                    className={`rounded-2xl p-5 border ${
                      spec.highlight 
                        ? 'bg-amber-50 border-amber-200' 
                        : 'bg-gray-50 border-gray-100'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        spec.highlight ? 'bg-amber-200' : 'bg-gray-200'
                      }`}>
                        <spec.icon className={`w-5 h-5 ${
                          spec.highlight ? 'text-amber-700' : 'text-gray-600'
                        }`} />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{spec.label}</p>
                        <p className={`text-xl font-bold ${
                          spec.highlight ? 'text-amber-700' : 'text-gray-900'
                        }`}>{spec.value}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">{spec.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Info box */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                  <Info className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Cosa significano questi valori?</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-amber-400 mb-2">Forza W (280-330)</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    La <strong className="text-white">forza W</strong> indica la capacità della farina di assorbire acqua e 
                    trattenere i gas durante la lievitazione. Un valore di <strong className="text-white">280-330</strong> è 
                    considerato <strong className="text-white">medio-alto</strong>, perfetto per impasti a lunga lievitazione 
                    come pane con pasta madre, pizza in teglia e focacce.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-amber-400 mb-2">Rapporto P/L (0,5-0,7)</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Il <strong className="text-white">rapporto P/L</strong> misura l'equilibrio tra tenacità (P) ed 
                    estensibilità (L) dell'impasto. Un valore di <strong className="text-white">0,5-0,7</strong> indica 
                    una farina <strong className="text-white">ben bilanciata</strong>, che si stende facilmente senza 
                    strapparsi e mantiene la forma durante la cottura.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-amber-400 mb-2">Panificabile Superiore</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    È la <strong className="text-white">classificazione più alta</strong> per le farine destinate alla 
                    panificazione. Garantisce risultati eccellenti con tutti i tipi di impasto, dalla pizza napoletana 
                    al pane casereccio.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <p className="text-amber-400 text-sm font-medium">
                  💡 La granulometria irregolare della macinatura a pietra rende questa farina 
                  particolarmente adatta alle <strong>lievitazioni naturali</strong>.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
