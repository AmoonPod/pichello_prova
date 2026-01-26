import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Wheat, Sun, ChefHat, Leaf } from "lucide-react"; // Assicurati di avere queste icone
import { Button } from "@/components/ui/button"; // O il tuo path corretto

export default function HeroPasta() {
    const encodedMessage = encodeURIComponent(
        "Ciao, vorrei il listino della pasta artigianale Il Pichello e sapere disponibilità dei formati."
    )

    return (
        <section className="relative w-full overflow-hidden bg-background text-foreground">
            {/* BACKGROUND TEXTURE - Opzionale: aggiunge un leggero noise per togliere l'effetto "piatto" */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply"></div>

            {/* GRADIENT BLOBS - Più caldi e organici */}
            <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px]" />

            <div className="container mx-auto px-4 pt-12 pb-16 lg:pt-20 lg:pb-24 relative z-10">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                    {/* LEFT COLUMN - TEXT & CTA (5 Colonne) */}
                    <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8 text-center lg:text-left">

                        {/* LOCAL SEO BADGE */}
                        <div className="inline-flex items-center gap-2 self-center lg:self-start bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide">
                            <MapPin className="w-4 h-4" />
                            <span>Prodotta con grano duro dell'Appennino Reggiano</span>
                        </div>

                        {/* HEADLINE */}
                        <h1 className="text-4xl md:text-5xl xl:text-6xl font-serif font-bold leading-[1.1] text-foreground">
                            Pasta ruvida, <br />
                            <span className="text-primary italic">come si faceva una volta.</span>
                        </h1>

                        {/* DESCRIPTION - Umana e Sensoriale */}
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
                            Dimentica la pasta liscia e industriale. La nostra è <strong>tenace</strong>.
                            Grano duro del nostro Appennino, macinato a pietra e trafilato al bronzo per catturare ogni goccia di sugo.
                            <span className="hidden md:inline"> Essiccata lentamente, perché le cose buone non amano la fretta.</span>
                        </p>

                        {/* CTA AREA - High Visibility */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-2">
                            <Link href={`/contatti?prodotto=Pasta%20Artigianale&messaggio=${encodedMessage}`}>
                                <Button
                                    size="lg"
                                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all transform hover:-translate-y-0.5"
                                >
                                    Assaggiala ora
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href="/catalogo">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary/5 font-semibold text-lg px-8 py-6 rounded-xl bg-transparent"
                                >
                                    Vedi i formati
                                </Button>
                            </Link>
                        </div>

                        {/* TRUST ELEMENTS (ICONS) */}
                        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border mt-2">
                            <div className="flex flex-col items-center lg:items-start gap-1">
                                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                    <Wheat className="w-4 h-4" /> 100% Nostra
                                </div>
                                <span className="text-xs text-muted-foreground">Filiera cortissima</span>
                            </div>
                            <div className="flex flex-col items-center lg:items-start gap-1">
                                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                    <ChefHat className="w-4 h-4" /> Al Bronzo
                                </div>
                                <span className="text-xs text-muted-foreground">Superficie ruvida</span>
                            </div>
                            <div className="flex flex-col items-center lg:items-start gap-1">
                                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                    <Leaf className="w-4 h-4" /> Naturale
                                </div>
                                <span className="text-xs text-muted-foreground">Essiccazione lenta</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - BENTO GRID ASIMMETRICA (7 Colonne) */}
                    <div className="lg:col-span-7 h-full min-h-[550px] lg:min-h-[680px] relative">
                        <div className="grid grid-cols-12 auto-rows-fr gap-2 lg:gap-3 h-full w-full">

                            {/* Row 1-2: Spaghetti (grande) + Mezzi Paccheri (sopra) */}
                            {/* 1. SPAGHETTI - Grande a sinistra */}
                            <div className="col-span-7 row-span-4 relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
                                <Image
                                    src="/images/pasta/spaghetti_appennino_reggiano_3.webp"
                                    alt="Spaghetti artigianali trafilati al bronzo"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 45vw"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                                <span className="absolute bottom-4 left-4 text-white font-serif font-bold text-xl tracking-wide">Spaghetti</span>
                            </div>

                            {/* 2. MEZZI PACCHERI - In alto a destra */}
                            <div className="col-span-5 row-span-2 relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
                                <Image
                                    src="/images/pasta/mezzi_paccheri_appennino_reggiano_6.webp"
                                    alt="Mezzi Paccheri trafilati al bronzo texture ruvida"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 50vw, 30vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                                <span className="absolute bottom-3 left-3 text-white font-serif font-bold text-base tracking-wide">Mezzi Paccheri</span>
                            </div>

                            {/* 3. FUSILLI - Sotto Mezzi Paccheri */}
                            <div className="col-span-5 row-span-2 relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
                                <Image
                                    src="/images/pasta/fusilli_appennino_reggiano_4.webp"
                                    alt="Fusilli di grano duro artigianali"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                                <span className="absolute bottom-3 left-3 text-white font-serif font-bold text-base tracking-wide">Fusilli</span>
                            </div>

                            {/* Row 3: Penne + Tubetti (sotto spaghetti) */}
                            {/* 4. PENNE */}
                            <div className="col-span-4 row-span-2 relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
                                <Image
                                    src="/images/pasta/penne_appennino_reggiano_5.webp"
                                    alt="Penne rigate trafilate al bronzo"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 40vw, 20vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                                <span className="absolute bottom-2 left-3 text-white font-serif font-bold text-sm tracking-wide">Penne</span>
                            </div>

                            {/* 5. TUBETTI */}
                            <div className="col-span-3 row-span-2 relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
                                <Image
                                    src="/images/pasta/tubetti_appennino_reggiano_3.webp"
                                    alt="Tubetti artigianali per minestre"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 30vw, 15vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                                <span className="absolute bottom-2 left-2 text-white font-serif font-bold text-sm tracking-wide">Tubetti</span>
                            </div>

                            {/* 6. MACCHERONI - Ultimo slot */}
                            <div className="col-span-5 row-span-2 relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
                                <Image
                                    src="/images/pasta/maccheroni_appennino_reggiano_2.webp"
                                    alt="Maccheroni artigianali dell'Appennino"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                                <span className="absolute bottom-3 left-3 text-white font-serif font-bold text-base tracking-wide">Maccheroni</span>
                            </div>

                        </div>

                        {/* FLOATING BADGE - "Solo Grano Nostro" */}
                        <div className="absolute -left-4 top-1/3 -translate-y-1/2 bg-card/95 backdrop-blur shadow-xl border border-border p-4 rounded-2xl hidden xl:flex flex-col items-center gap-1 animate-in fade-in slide-in-from-left-4 duration-1000">
                            <span className="text-3xl font-bold text-primary">100%</span>
                            <span className="text-xs font-bold text-foreground uppercase tracking-widest text-center">Grano<br />Italiano</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
