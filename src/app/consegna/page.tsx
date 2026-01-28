import { Metadata } from "next";
import Link from "next/link";
import { cities } from "@/data/localSeoConfig";
import FooterV2 from "@/components/new/Footer";
import { getProdotti, getCategorie } from "~/sanity/sanity.query";
import { MapPin, ArrowRight, Truck } from "lucide-react";
import Breadcrumb from "@/components/new/Breadcrumb";
import "@/app/globals.css";

// Force static generation
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Consegna Prodotti Tipici a Domicilio | Il Pichello",
  description: "Consegna a domicilio di pasta artigianale, farina, miele e prodotti tipici dell'Appennino Reggiano. Scopri le città servite.",
  alternates: {
    canonical: "https://www.agricolailpichello.it/consegna",
  },
};

export default async function ConsegnaIndexPage() {
  const [prodotti, categorie] = await Promise.all([
    getProdotti(),
    getCategorie(),
  ]);

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <div className="container mx-auto px-4 py-8 ">
        <Breadcrumb items={[{ label: "Consegna a Domicilio" }]} />

        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20">
            <Truck className="w-3.5 h-3.5" />
            Servizio di Consegna
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stone-900 mb-6">
            Portiamo l'Appennino <span className="text-primary italic">a casa tua</span>
          </h1>

          <p className="text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Scegli la tua città per scoprire i prodotti disponibili per la consegna a domicilio.
            Dal nostro mulino e dai nostri campi, direttamente sulla tua tavola.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/consegna/${city.slug}`}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 hover:border-primary/30 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-amber-50 group-hover:bg-primary/10 flex items-center justify-center text-primary mb-4 transition-colors duration-300">
                <MapPin className="w-8 h-8" />
              </div>

              <h2 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-primary transition-colors">
                {city.name}
              </h2>

              <p className="text-sm text-stone-500 mb-6">
                Consegna in {city.region}
              </p>

              <div className="mt-auto flex items-center text-primary font-medium text-sm group-hover:underline decoration-primary/30 underline-offset-4">
                Visualizza prodotti
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <section className="bg-white py-16 border-t border-stone-100">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-stone-900 mb-4">Non trovi la tua città?</h3>
          <p className="text-stone-600 max-w-2xl mx-auto mb-8">
            Effettuiamo spedizioni in tutta Italia tramite corriere espresso.
            Contattaci per organizzare la tua consegna personalizzata.
          </p>
          <Link
            href="/contatti"
            className="inline-flex items-center justify-center px-8 py-3 bg-stone-900 text-white font-medium rounded-full hover:bg-stone-800 transition-colors"
          >
            Contattaci
          </Link>
        </div>
      </section>

      <FooterV2 prodotti={prodotti} categorie={categorie} />
    </div>
  );
}
