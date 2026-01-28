"use client"

import Link from "next/link"
import { MapPin, ChefHat, Truck, Award, Check, Wheat, ArrowRight } from "lucide-react"

export default function WhyChooseUs() {
    return (
        <section className="py-20 lg:py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-4">

                {/* Griglia a 2 colonne */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">

                    {/* COLONNA SINISTRA: Testo SEO Emotivo */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className="inline-flex items-center gap-2 text-amber-700 font-bold uppercase tracking-[0.2em] text-xs">
                                La Scelta Professionale
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight">
                                Molto più di una <br />
                                <span className="text-amber-700 italic">farina artigianale.</span>
                            </h2>
                        </div>

                        {/* Testo SEO diviso in paragrafi scansionabili */}
                        <div className="prose prose-lg text-muted-foreground font-light leading-relaxed">
                            <p>
                                Se stai cercando una farina per elevare i tuoi impasti, sei nel posto giusto.
                                La nostra <strong className="text-foreground font-medium">Farina Antichi Cinquanta Grani</strong> non è polvere da supermercato:
                                è il risultato di anni di selezione nei campi dell'Appennino Reggiano.
                            </p>
                            <p>
                                Coltiviamo a <strong className="text-foreground font-medium">Marola di Carpineti</strong>, a pochi minuti da Castelnovo ne' Monti.
                                Qui, nel nostro mulino a pietra, maciniamo il grano a bassissima velocità per non bruciare il germe e i nutrienti.
                                È il segreto che rende questa farina la base perfetta per il <strong className="text-foreground font-medium">pane fatto in casa</strong>,
                                la <strong className="text-foreground font-medium">pizza professionale</strong> e la pasta fresca emiliana.
                            </p>
                        </div>

                        {/* Checkmark List per lettura veloce */}
                        <div className="pt-4 space-y-3">
                            <div className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-amber-600" />
                                <span className="text-stone-800 font-medium">Zero pesticidi e prodotti chimici in campo</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-amber-600" />
                                <span className="text-stone-800 font-medium">Adatta a lunghe lievitazioni e lievito madre</span>
                            </div>
                        </div>

                        {/* Cross-link alla Pasta */}
                        <Link href="/pasta-artigianale-trafilata-bronzo" className="group block mt-6">
                            <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 hover:bg-amber-50 hover:border-amber-300 transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors flex-shrink-0">
                                        <Wheat className="w-5 h-5 text-amber-700" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-stone-900 font-semibold text-sm">Scopri anche la nostra Pasta Artigianale</p>
                                        <p className="text-stone-600 text-xs">Trafilata al bronzo, essiccata naturalmente</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* COLONNA DESTRA: BENTO GRID (I 4 pilastri) */}
                    <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">

                        {/* Card 1: Panificabile Superiore (Valore Tecnico) */}
                        <div className="bg-[#FDFBF7] p-8 rounded-3xl border border-stone-100 flex flex-col justify-center">
                            <Award className="w-8 h-8 text-amber-600 mb-4" />
                            <div className="text-3xl font-serif font-bold text-stone-900 mb-1">W 280-330</div>
                            <p className="font-bold text-stone-800 mb-2">Panificabile Superiore</p>
                            <p className="text-sm text-stone-500">Maglia glutinica tenace. Regge idratazioni elevate per pizze alveolate e pane leggero.</p>
                        </div>

                        {/* Card 2: Utilizzi (SEO Cooking Keywords) */}
                        <div className="bg-[#FDFBF7] p-8 rounded-3xl border border-stone-100 flex flex-col justify-center">
                            <ChefHat className="w-8 h-8 text-amber-600 mb-4" />
                            <div className="text-xl font-serif font-bold text-stone-900 mb-3">Estrema Versatilità</div>
                            <ul className="space-y-2 text-sm text-stone-600">
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span> Pizza Napoletana e Teglia</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span> Pane Casereccio e Ciabatte</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span> Sfoglia e Pasta Fresca</li>
                            </ul>
                        </div>

                        {/* Card 3: Località & Mercati (Local SEO) */}
                        <div className="bg-[#FDFBF7] p-8 rounded-3xl border border-stone-100 flex flex-col justify-center">
                            <MapPin className="w-8 h-8 text-amber-600 mb-4" />
                            <div className="text-xl font-serif font-bold text-stone-900 mb-3">Dove Trovarci</div>
                            <ul className="space-y-2 text-sm text-stone-600">
                                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 flex-shrink-0"></span> <span>Mulino a <strong className="text-stone-700">Marola</strong>, vicino Castelnovo ne' Monti</span></li>
                                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 flex-shrink-0"></span> <span>Mercato di <strong className="text-stone-700">Piazza Fontanesi</strong>, Reggio Emilia</span></li>
                                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 flex-shrink-0"></span> <span>Supermercati in provincia di RE</span></li>
                            </ul>
                        </div>

                        {/* Card 4: Spedizione Italia (E-commerce SEO) */}
                        <div className="bg-stone-900 p-8 rounded-3xl text-white flex flex-col justify-center">
                            <Truck className="w-8 h-8 text-amber-400 mb-4" />
                            <div className="text-xl font-serif font-bold mb-3">Spediamo in Tutta Italia</div>
                            <p className="text-sm text-stone-300">
                                Sei a Milano, Roma o Napoli? Nessun problema. <Link href="/contatti?prodotto=Farina%20Antichi%20Cinquanta%20Grani" className="text-amber-400 hover:text-amber-300 underline underline-offset-2 font-medium">Contattaci</Link> per ricevere la farina fresca dal mulino direttamente a casa tua.
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    )
}