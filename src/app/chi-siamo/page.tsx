"use client";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrittaPiccolina from "@/components/scrittaPiccolina";
import storiaPichello from "../../../public/images/pichello.jpg";

export default function ChiSiamoPage() {
    return (
        <>
            <Navbar />
            <section className="mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 lg:items-start px-8 py-8 lg:py-20">
                <div className="container px-4 md:px-6 max-w-7xl">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-[56px] text-primary">
                            Chi siamo
                        </h1>
                        <p className="text-muted-foreground md:text-lg">
                            Scopri la storia e i valori che guidano l'Azienda Agricola Il Pichello
                        </p>
                    </div>
                    <div className="grid gap-12 lg:grid-cols-2 items-center">
                        <Image
                            src={storiaPichello}
                            alt="Storia del Pichello"
                            className="rounded-xl object-cover"
                        />
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold">Le Nostre Radici</h2>
                                <p className="text-muted-foreground">
                                    Il Pichello trae il suo nome dalla storica casa contadina chiamata 'pichel'
                                    in dialetto reggiano. Questa denominazione, tramandata attraverso le generazioni,
                                    è stata poi italianizzata in "Pichello", diventando il simbolo della nostra
                                    azienda agricola.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold">La Nostra Missione</h2>
                                <p className="text-muted-foreground">
                                    Da generazioni, la nostra famiglia si dedica con passione alla coltivazione
                                    e all'allevamento, mantenendo vive le antiche tradizioni agricole del territorio.
                                    Il nostro impegno è quello di produrre alimenti genuini nel rispetto della natura
                                    e delle stagioni.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold">I Nostri Valori</h2>
                                <p className="text-muted-foreground">
                                    Sostenibilità, tradizione e innovazione sono i pilastri su cui si fonda
                                    la nostra attività. Ogni giorno lavoriamo per offrire prodotti di alta qualità,
                                    coltivati con metodi rispettosi dell'ambiente e della biodiversità locale.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 bg-secondary text-secondary-foreground rounded-xl p-8">
                        <h2 className="text-2xl font-bold mb-4 text-center">La Nostra Filosofia</h2>
                        <p className="text-center max-w-[800px] mx-auto">
                            Crediamo che il vero valore dell'agricoltura risieda nel rispetto della terra
                            e delle sue stagioni. Ogni nostro prodotto racconta una storia di dedizione,
                            passione e amore per la natura, valori che trasmettiamo di generazione in
                            generazione.
                        </p>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
