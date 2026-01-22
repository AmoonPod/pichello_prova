"use client"

import Link from "next/link"
import { MapPin, Mountain, Wheat, Award, ArrowRight, CircleDot } from "lucide-react"

export default function TerritorySection() {
    return (
        <section className="py-24 lg:py-32 bg-[#FDFBF7] relative overflow-hidden">

            {/* Background Decorativo Grano (SVG Sottile) */}
            <div className="absolute right-0 bottom-0 w-64 h-64 opacity-[0.03] pointer-events-none text-stone-900">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M45.7,-76.3C58.9,-69.3,69.1,-55.8,76.5,-41.6C83.9,-27.4,88.5,-12.5,86.8,1.9C85.1,16.2,77.1,30.1,68.1,42.7C59.1,55.3,49.1,66.7,37.1,72.6C25.1,78.5,11.1,79,-2.1,82.6C-15.3,86.2,-27.7,92.9,-38.2,89.2C-48.7,85.5,-57.3,71.4,-65.9,58.3C-74.5,45.2,-83.1,33.1,-86.3,19.6C-89.5,6.1,-87.3,-8.8,-80.4,-21.5C-73.5,-34.2,-61.9,-44.7,-49.9,-52.1C-37.9,-59.5,-25.5,-63.8,-12.6,-64.8C0.3,-65.8,13.2,-63.5,32.5,-83.3L45.7,-76.3Z" transform="translate(100 100)" />
                </svg>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

                    {/* COLONNA SINISTRA: SEO TEXT (7 Colonne) */}
                    <div className="lg:col-span-7 space-y-8">

                        {/* Tagline */}
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-amber-600"></span>
                            <span className="text-amber-700 font-bold uppercase tracking-[0.2em] text-xs">
                                Il Territorio come Ingrediente
                            </span>
                        </div>

                        {/* H2 SEO Friendly */}
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight">
                            Radici profonde nell'<span className="text-amber-700 italic">Appennino Reggiano</span>.
                        </h2>

                        {/* SEO Prose */}
                        <div className="prose prose-lg text-stone-600 font-light leading-relaxed max-w-none">
                            <p>
                                Non importiamo grano. La nostra pasta nasce interamente a <strong className="text-stone-900 font-medium">Marola</strong>,
                                nel comune di <strong className="text-stone-900 font-medium">Carpineti</strong>.
                                Qui, nel cuore dell'Appennino di <strong className="text-stone-900 font-medium">Reggio Emilia</strong>,
                                l'agricoltura segue ancora i ritmi delle stagioni, non quelli del mercato.
                            </p>
                            <p>
                                A 700 metri di altitudine, l'aria tersa e le forti escursioni termiche donano al nostro
                                <strong className="text-stone-900 font-medium"> grano duro</strong> caratteristiche proteiche uniche.
                                Tutto avviene qui: coltivazione, macinatura a pietra nel nostro mulino e produzione della pasta.
                            </p>
                        </div>

                        {/* Cross-link alla Farina */}
                        <Link href="/farina-antichi-cinquanta-grani-appennino-reggiano" className="group block">
                            <div className="bg-stone-100/50 border border-stone-200 rounded-xl p-5 hover:bg-stone-100 hover:border-amber-300 transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors flex-shrink-0">
                                        <CircleDot className="w-6 h-6 text-amber-700" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-stone-900 font-semibold mb-1">Dallo stesso mulino: Farina 50 Grani</p>
                                        <p className="text-stone-600 text-sm">50 varietà di grani antichi macinati a pietra. Integrale, semintegrale e fiore.</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-stone-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* COLONNA DESTRA: Visual Authority Badge (5 Colonne) */}
                    <div className="lg:col-span-5 relative">
                        <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100 relative overflow-hidden">

                            {/* Elementi decorativi stile "Timbro" */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-[4rem] -mr-4 -mt-4 z-0"></div>

                            <div className="relative z-10 space-y-8">
                                <div className="flex items-center gap-4 border-b border-stone-100 pb-6">
                                    <div className="w-12 h-12 bg-stone-900 text-white rounded-full flex items-center justify-center">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-stone-900 text-lg uppercase tracking-wide">Origine Certificata</h3>
                                        <p className="text-stone-500 text-sm">Coordinate: 44.4° N, 10.5° E</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between group">
                                        <div className="flex items-center gap-3">
                                            <Mountain className="w-5 h-5 text-stone-400 group-hover:text-amber-600 transition-colors" />
                                            <span className="text-stone-700 font-medium">Altitudine</span>
                                        </div>
                                        <span className="font-serif font-bold text-stone-900 text-lg">700 mt</span>
                                    </div>

                                    <div className="w-full h-px bg-stone-100"></div>

                                    <div className="flex items-center justify-between group">
                                        <div className="flex items-center gap-3">
                                            <Wheat className="w-5 h-5 text-stone-400 group-hover:text-amber-600 transition-colors" />
                                            <span className="text-stone-700 font-medium">Grano</span>
                                        </div>
                                        <span className="font-serif font-bold text-stone-900 text-lg">100% Reggiano</span>
                                    </div>

                                    <div className="w-full h-px bg-stone-100"></div>

                                    <div className="flex items-center justify-between group">
                                        <div className="flex items-center gap-3">
                                            <Award className="w-5 h-5 text-stone-400 group-hover:text-amber-600 transition-colors" />
                                            <span className="text-stone-700 font-medium">Lavorazione</span>
                                        </div>
                                        <span className="font-serif font-bold text-stone-900 text-lg">Artigianale</span>
                                    </div>
                                </div>

                                {/* Timbro KM0 */}
                                <div className="pt-6 mt-6 flex justify-center">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100/30 border border-amber-200 rounded-lg text-amber-800 text-xs font-bold uppercase tracking-widest">
                                        Filiera Corta • Km Zero
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ombra decorativa sfalsata */}
                        <div className="absolute inset-0 bg-stone-900 rounded-2xl transform translate-x-4 translate-y-4 -z-10 opacity-5"></div>
                    </div>

                </div>
            </div>
        </section>
    )
}