"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { Wheat, Hammer, Droplets, Wind, Timer } from "lucide-react"

// --- DATI DI PROCESSO ---
const steps = [
    {
        id: 1,
        title: "Tutto parte dalla terra",
        subtitle: "01. Coltivazione",
        description: "Il grano duro nasce sui crinali dell'Appennino Reggiano. Coltiviamo varietà selezionate, seguendo ogni fase dalla semina al raccolto di luglio.",
        quote: "La qualità non si inventa in fabbrica, si coltiva nel campo.",
        icon: Wheat,
        accentColor: "text-amber-600",
        bgIcon: "bg-amber-50",
        image: "/images/pasta/terra_appennino_reggiano.webp"
    },
    {
        id: 2,
        title: "Macinazione a pietra",
        subtitle: "02. Il Mulino",
        description: "Le macine in pietra girano lente e non surriscaldano il grano. Così la semola conserva il profumo, il colore e le proprietà nutritive del chicco.",
        quote: "La semola buona ha il colore del sole.",
        icon: Hammer,
        accentColor: "text-stone-600",
        bgIcon: "bg-stone-100",
        image: "/images/pasta/mulino_a_pietra_appennino_reggiano.webp"
    },
    {
        id: 3,
        title: "Solo semola e acqua",
        subtitle: "03. L'Impasto",
        description: "Due ingredienti, nient'altro. La nostra semola di grano duro e acqua pura. Nessun additivo, nessun conservante. La semplicità è il segreto.",
        quote: "L'ingrediente segreto è la semplicità.",
        icon: Droplets,
        accentColor: "text-sky-600",
        bgIcon: "bg-sky-50",
        image: "/images/pasta/semola_e_acqua_appennino_reggiano.webp"
    },
    {
        id: 4,
        title: "Trafilatura al Bronzo",
        subtitle: "04. La Forma",
        description: "L'impasto passa attraverso trafile in bronzo, non in teflon. La superficie diventa ruvida e opaca: è questa rugosità che trattiene il condimento.",
        quote: "Se è liscia, il sugo scivola. Se è ruvida, si aggrappa.",
        icon: Wind,
        accentColor: "text-orange-600",
        bgIcon: "bg-orange-50",
        image: "/images/pasta/trafilatura_bronzo_appennino_reggiano.webp"
    },
    {
        id: 5,
        title: "Essiccazione Lenta",
        subtitle: "05. Il Tempo",
        description: "La pasta essicca lentamente a bassa temperatura. Ci vogliono più di 24 ore invece delle 3-4 ore dell'industria. Il risultato: una pasta che tiene la cottura e non scuoce.",
        quote: "Le cose buone richiedono tempo.",
        icon: Timer,
        accentColor: "text-yellow-600",
        bgIcon: "bg-yellow-50",
        image: "/images/pasta/essicazione_naturale.webp"
    }
]

function StickyCard({ step, index, total }: { step: typeof steps[0], index: number, total: number }) {
    // Configurazione Sticky
    // Card 1 si ferma a 100px dall'alto.
    // Card 2 si ferma a 140px... creando l'effetto cascata.
    const topOffset = 100 + (index * 40);

    // Z-Index crescente: le card successive devono stare sopra le precedenti
    const zIndex = 10 + index;

    // Animazione Scale: leggera riduzione quando la card successiva sta arrivando (opzionale)
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

    return (
        <div
            className="sticky mb-12 lg:mb-24"
            style={{
                top: `${topOffset}px`,
                zIndex: zIndex
            }}
        >
            <motion.div
                ref={ref}
                style={{ scale }}
                className="relative mx-auto w-full max-w-6xl min-h-[580px] lg:min-h-[500px] lg:h-[60vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-100 flex flex-col-reverse lg:flex-row"
            >

                {/* LATO TESTO - Su mobile appare SOTTO l'immagine */}
                <div className="flex-1 p-6 lg:p-14 flex flex-col justify-center relative z-10">
                    {/* Numero di sfondo gigante */}
                    <span className="absolute top-0 left-4 lg:left-6 text-[100px] lg:text-[200px] font-serif font-bold text-stone-900 opacity-[0.04] leading-none select-none pointer-events-none">
                        {step.id}
                    </span>

                    <div className="space-y-4 lg:space-y-6 relative">
                        <div className="flex items-center gap-3">
                            <div className={cn("w-9 h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shadow-sm transition-colors", step.bgIcon, step.accentColor)}>
                                <step.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                            </div>
                            <span className={cn("text-[10px] lg:text-xs font-bold uppercase tracking-[0.2em]", step.accentColor)}>
                                {step.subtitle}
                            </span>
                        </div>

                        <h3 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-stone-900 leading-[1.1]">
                            {step.title}
                        </h3>

                        <p className="text-base lg:text-lg text-stone-600 font-light leading-relaxed max-w-md">
                            {step.description}
                        </p>

                        <div className="pt-3 lg:pt-4 border-t border-stone-100 mt-2">
                            <p className={cn("font-serif italic text-sm lg:text-lg opacity-80", step.accentColor)}>
                                "{step.quote}"
                            </p>
                        </div>
                    </div>
                </div>

                {/* LATO IMMAGINE - Su mobile appare SOPRA il testo e più grande */}
                <div className="relative h-[280px] sm:h-[320px] lg:h-auto lg:flex-1 bg-stone-50 overflow-hidden">
                    <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover transition-transform duration-1000 hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={index === 0}
                    />
                    {/* Overlay sfumato per integrazione */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:bg-gradient-to-l lg:from-black/10" />
                </div>

            </motion.div>
        </div>
    )
}

export default function ProcessStacked() {
    return (
        // IMPORTANTE: 'relative' qui aiuta a contenere il contesto sticky.
        <section className="bg-[#FDFBF7] py-24 lg:py-32 relative" id="processo">

            {/* HEADER DELLA SEZIONE */}
            <div className="container mx-auto px-4 mb-20 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <span className="inline-block py-1.5 px-4 rounded-full bg-amber-100/50 text-amber-800 text-xs font-bold uppercase tracking-widest mb-6 border border-amber-200">
                        Artigianalità Pura
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stone-900 mb-6">
                        Come nasce l'eccellenza
                    </h2>
                    <p className="text-stone-600 text-lg md:text-xl font-light leading-relaxed">
                        Cinque passaggi fondamentali. Nessuna scorciatoia industriale.
                        Solo così il grano diventa poesia.
                    </p>
                </motion.div>
            </div>

            {/* CONTAINER DELLE CARD STICKY */}
            {/* pb-32 serve per dare spazio di scorrimento finale */}
            <div className="container mx-auto px-4 relative pb-40">
                {steps.map((step, index) => (
                    <StickyCard
                        key={step.id}
                        step={step}
                        index={index}
                        total={steps.length}
                    />
                ))}
            </div>

            {/* ELEMENTO DI CHIUSURA VISIVO */}
            <div className="flex justify-center mt-[-50px] relative z-20 pointer-events-none">
                <div className="h-32 w-px bg-gradient-to-b from-stone-300 to-transparent" />
            </div>

        </section>
    )
}