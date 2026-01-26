import { Wheat, Leaf, Flame, Timer, Package, Heart, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: Leaf,
    number: "01",
    title: "Selezione",
    description: "Solo legumi secchi premium e i nostri cereali. ",
  },
  {
    icon: Wheat,
    number: "02",
    title: "Dosaggio",
    description: "Ogni ricetta è un'equazione perfetta tra gusto e nutrizione. Proporzioni studiate per l'armonia.",
  },
  {
    icon: Flame, // Cambiato icona per renderla più chiara
    number: "03",
    title: "Tostatura",
    description: "Tostiamo leggermente alcuni ingredienti. È il trucco per sprigionare profumi intensi.",
  },
  {
    icon: Timer,
    number: "04",
    title: "Aria e Tempo",
    description: "Niente liofilizzazione chimica. Solo disidratazione naturale per preservare il sapore vero.",
  },
  {
    icon: Package,
    number: "05",
    title: "Il Sacco",
    description: "Confezioniamo a mano in atmosfera protettiva. Freschezza sigillata fino a casa tua.",
  },
  {
    icon: Heart,
    number: "06",
    title: "Tocca a Te",
    description: "Apri, versa in acqua fredda e cuoci lento. Tu metti solo il fuoco e l'olio buono.",
  }
]

export default function ProcessoZuppe() {
  return (
    <section className="py-20 lg:py-28 bg-[#FDFBF7] relative overflow-hidden">

      {/* Background Sottile */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">

        {/* HEADER COMPATTO */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
            Il Metodo Il Pichello
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Niente fretta, <span className="text-primary italic">solo natura.</span>
          </h2>
          <p className="text-stone-600 text-lg font-light">
            Dimentica le zuppe industriali precotte. Ecco come creiamo un piatto vivo,
            che profuma di campo e non di fabbrica.
          </p>
        </div>

        {/* PROCESS GRID (Streamlined) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300 relative overflow-hidden"
            >
              {/* Numero Grande Sfondato */}
              <div className="absolute -right-4 -top-4 text-9xl font-serif font-bold text-primary opacity-[0.6] group-hover:text-secondary transition-colors select-none pointer-events-none">
                {step.number}
              </div>

              <div className="relative z-10">
                {/* Icona */}
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-6 h-6" />
                </div>

                {/* Testo */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM BANNER: LA DIFFERENZA (Compattato) */}
        <div className="max-w-5xl mx-auto bg-primary rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
          {/* Decorazione */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left md:max-w-xl">
              <h3 className="text-2xl font-serif font-bold text-primary-foreground mb-2">
                Perché sono diverse?
              </h3>
              <p className="text-primary-foreground/80 font-light text-lg">
                Le zuppe industriali sono precotte ad alte temperature.
                <strong className="text-primary-foreground font-medium"> Le nostre sono crude.</strong> Mantengono le proteine vive e il sapore autentico.
              </p>
            </div>

            <div className="flex-shrink-0">
              <div className="inline-flex items-center gap-2 bg-secondary text-primary-foreground px-6 py-3 rounded-full font-bold text-sm shadow-lg shadow-secondary/50">
                <Heart className="w-4 h-4 fill-current" /> Ricche di Nutrienti
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}