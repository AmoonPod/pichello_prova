import { Wheat, Mountain, CircleDot, Timer, Sparkles, Heart, ArrowDown } from "lucide-react"

const steps = [
  {
    icon: Mountain,
    number: "01",
    title: "Coltivazione Eroica",
    description: "I 50 grani antichi crescono insieme a Marola (700m). Nessun diserbante, solo la forza competitiva del miscuglio naturale.",
    detail: "Coltivazione naturale"
  },
  {
    icon: Wheat,
    number: "02",
    title: "La Trebbiatura",
    description: "Raccogliamo il grano al picco della maturazione. La selezione inizia già nel campo: solo le spighe migliori arrivano al mulino.",
    detail: "Selezione manuale"
  },
  {
    icon: CircleDot,
    number: "03",
    title: "Le Pietre del Mulino",
    description: "Il cuore del processo. Due grandi pietre naturali girano lentamente. Il chicco viene 'aperto' e non polverizzato.",
    detail: "Bassa velocità"
  },
  {
    icon: Timer,
    number: "04",
    title: "A Freddo",
    description: "La bassa velocità impedisce il surriscaldamento. Le vitamine e il germe di grano non si bruciano (come accade nei mulini industriali).",
    detail: "Nutrienti intatti"
  },
  {
    icon: Sparkles,
    number: "05",
    title: "La Setacciatura",
    description: "Separiamo la crusca dalla farina. Qui decidiamo l'anima del prodotto: Integrale, Semintegrale o Fiore, ma sempre ricca di fibre.",
    detail: "3 Gradi di purezza"
  },
  {
    icon: Heart,
    number: "06",
    title: "Il Sacco",
    description: "Insacchettiamo a mano. La farina che ricevi è 'viva', profuma di campo e ha una scadenza breve perché è priva di conservanti.",
    detail: "Freschezza viva"
  }
]

export default function ProcessoMacinazione() {
  return (
    <section className="py-20 lg:py-32 bg-[#FDFBF7] relative overflow-hidden">

      {/* Background Decorativo: Rumore e curve */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-100/40 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* COLONNA SINISTRA: Sticky Intro & USP (Unique Selling Proposition) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-10">

            {/* Header */}
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 text-amber-700 font-bold uppercase tracking-[0.2em] text-xs">
                <CircleDot className="w-4 h-4" />
                Il Metodo Il Pichello
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-[1.1]">
                Il grano non va <br />
                <span className="text-amber-700 italic">stressato.</span>
              </h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Dimentica le farine bianche e morte del supermercato.
                Qui seguiamo un processo lento che rispetta l'anima del chicco.
              </p>
            </div>

            {/* HIGHLIGHT BOX: Macinatura a pietra (SEO Focus) */}
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-stone-200/50 border border-amber-100 relative overflow-hidden group">
              {/* Decorazione */}
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-50 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out" />

              <div className="relative z-10">
                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4 flex items-center gap-3">
                  <CircleDot className="w-6 h-6 text-amber-600" />
                  Perché la Pietra?
                </h3>
                <div className="space-y-4 text-stone-600">
                  <p>
                    Le macine industriali a cilindri girano veloci e scaldano la farina, uccidendo le parti vive.
                  </p>
                  <p>
                    <strong>La nostra pietra gira lenta.</strong> Mantiene il chicco freddo.
                    Il risultato? Una farina che conserva tutto il <strong className="text-amber-700">Germe di Grano</strong>,
                    la parte più ricca di oli essenziali, vitamine e sapore.
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-stone-100 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
                  <Sparkles className="w-4 h-4" /> Alta Digeribilità
                </div>
              </div>
            </div>

          </div>

          {/* COLONNA DESTRA: Timeline Steps */}
          <div className="lg:col-span-7 relative">

            {/* Linea Verticale Connettiva */}
            <div className="absolute left-8 top-8 bottom-8 w-px bg-amber-200 lg:left-12 dashed-line" />

            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="relative flex items-start gap-6 lg:gap-10 group">

                  {/* Icon Circle */}
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 lg:w-24 lg:h-24 bg-white border border-amber-100 rounded-2xl flex flex-col items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-amber-300 transition-all duration-300">
                    <span className="text-[10px] font-bold text-amber-400 mb-1">0{index + 1}</span>
                    <step.icon className="w-6 h-6 lg:w-8 lg:h-8 text-amber-700" />
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl lg:text-2xl font-serif font-bold text-stone-900 mb-2 group-hover:text-amber-700 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-stone-600 leading-relaxed mb-3">
                      {step.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold uppercase tracking-wide rounded-full group-hover:bg-amber-50 group-hover:text-amber-800 transition-colors">
                      {step.detail}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}