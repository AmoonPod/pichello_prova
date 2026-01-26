"use client"

import Image from "next/image"
import { Check, ChefHat, Wheat } from "lucide-react"
import { cn } from "@/lib/utils"

export default function DifferenceSection() {
    return (
        <section className="py-20 lg:py-28 bg-[#FDFBF7]">
            <div className="container mx-auto px-4">

                {/* HEADER SEMPLICE */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <span className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-3 block">
                        Qualità Tangibile
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-6">
                        La differenza si vede e si sente.
                    </h2>
                    <p className="text-stone-600 text-lg font-light">
                        Due caratteristiche che rendono la nostra pasta diversa da quella industriale.
                        Due motivi per cui non tornerai più indietro.
                    </p>
                </div>

                {/* LE 2 CARD PRINCIPALI */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">

                    {/* CARD 1: IL BRONZO (Texture) */}
                    <div className="bg-white rounded-[2rem] p-8 lg:p-10 shadow-xl shadow-stone-200/50 border border-stone-100 flex flex-col">

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center">
                                <Wheat className="w-6 h-6 text-amber-600" />
                            </div>
                            <h3 className="text-2xl lg:text-3xl font-serif font-bold text-stone-900">
                                Cattura il sugo
                            </h3>
                        </div>

                        <p className="text-stone-600 text-lg mb-8 flex-grow">
                            La <strong>trafilatura al bronzo</strong> crea micro-incisioni sulla superficie della pasta.
                            Questa rugosità trattiene il condimento in ogni piega, invece di farlo scivolare sul fondo del piatto.
                        </p>

                        {/* Immagine Dimostrativa */}
                        <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6 border border-stone-100">
                            <Image
                                src="/images/pasta/penne_ragu_appennino_reggiano.webp" // Close-up rugosità
                                alt="Dettaglio rugosità pasta trafilata al bronzo"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                loading="lazy"
                            />
                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-md shadow-sm">
                                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Superficie Ruvida</span>
                            </div>
                        </div>

                        <ul className="space-y-3 pt-4 border-t border-stone-100">
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <span className="text-stone-700 font-medium">Superficie opaca, non lucida come quella industriale</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <span className="text-stone-700 font-medium">Perfetta con sughi e condimenti</span>
                            </li>
                        </ul>

                    </div>

                    {/* CARD 2: L'ESSICCAZIONE (Tenuta) */}
                    <div className="bg-white rounded-[2rem] p-8 lg:p-10 shadow-xl shadow-stone-200/50 border border-stone-100 flex flex-col">

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center">
                                <ChefHat className="w-6 h-6 text-stone-600" />
                            </div>
                            <h3 className="text-2xl lg:text-3xl font-serif font-bold text-stone-900">
                                Non scuoce mai
                            </h3>
                        </div>

                        <p className="text-stone-600 text-lg mb-8 flex-grow">
                            L'<strong>essiccazione lenta a bassa temperatura</strong> preserva le proteine del grano.
                            Il risultato è una pasta che tiene la cottura e ad alta digeribilità.
                        </p>

                        {/* Immagine Dimostrativa */}
                        <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6 border border-stone-100">
                            <Image
                                src="/images/pasta/bollitura_pasta_appennino_reggiano.webp" // Texture fusillo
                                alt="Pasta artigianale essiccata lentamente"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                loading="lazy"
                            />
                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-md shadow-sm">
                                <span className="text-xs font-bold uppercase tracking-wider text-stone-700">Struttura Tenace</span>
                            </div>
                        </div>

                        <ul className="space-y-3 pt-4 border-t border-stone-100">
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <span className="text-stone-700 font-medium">Cottura più tollerante, difficile da scuocere</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <span className="text-stone-700 font-medium">Acqua di cottura meno amidacea</span>
                            </li>
                        </ul>

                    </div>

                </div>

            </div>
        </section>
    )
}
