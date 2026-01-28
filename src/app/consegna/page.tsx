import { Metadata } from "next";
import Link from "next/link";
import { cities } from "@/data/localSeoConfig";
import FooterV2 from "@/components/new/Footer";
import { getProdotti, getCategorie } from "~/sanity/sanity.query";
import { MapPin, ArrowRight, Truck, Wheat, Soup, ChefHat, PackageCheck } from "lucide-react";
import Breadcrumb from "@/components/new/Breadcrumb";
import { Button } from "@/components/ui/button";
import "@/app/globals.css";

// Force static generation
export const dynamic = "force-static";

// PRODUCTION DOMAIN
const baseUrl = "https://www.agricolailpichello.it";

export const metadata: Metadata = {
  title: "Consegna Pasta Artigianale, Farine e Zuppe a Domicilio | Il Pichello",
  description: "Acquista online Farine di grani antichi macinate a pietra, Pasta artigianale trafilata al bronzo e Zuppe di legumi. Spedizioni veloci in tutta Italia.",
  keywords: [
    "farina macinata a pietra online",
    "pasta artigianale spedizione",
    "zuppe legumi vendita online",
    "prodotti tipici appennino reggiano",
    "spesa contadina a domicilio",
    "farina grani antichi vendita",
    "pasta trafilata bronzo online",
    "Il Pichello consegna"
  ],
  alternates: {
    canonical: `${baseUrl}/consegna`,
  },
  openGraph: {
    title: "Consegna Prodotti Artigianali a Domicilio | Il Pichello",
    description: "Dal nostro mulino alla tua tavola. Farine, Pasta e Zuppe dell'Appennino Reggiano consegnate in tutta Italia.",
    url: `${baseUrl}/consegna`,
    type: "website",
    locale: "it_IT",
    siteName: "Azienda Agricola Il Pichello"
  }
};

export default async function ConsegnaIndexPage() {
  const [prodotti, categorie] = await Promise.all([
    getProdotti(),
    getCategorie(),
  ]);

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      
      {/* HERO SECTION */}
      <section className="relative bg-white pt-10 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-50/40 -skew-x-12 translate-x-1/4" />
        
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumb items={[{ label: "Consegna a Domicilio" }]} />

          <div className="text-center max-w-5xl mx-auto mt-12 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest mb-8 border border-primary/20 animate-fade-in">
              <Truck className="w-4 h-4" />
              Spedizioni in tutta Italia
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-stone-900 mb-8 leading-tight">
              L'Eccellenza dell'Appennino <br className="hidden md:block" />
              <span className="text-primary italic">direttamente a casa tua</span>
            </h1>

            <p className="text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto mb-10">
              Seleziona la tua città per le consegne locali o richiedi la spedizione ovunque tu sia.
              Portiamo sulla tua tavola <strong>Farine di grani antichi</strong>, <strong>Pasta artigianale</strong> e <strong>Zuppe genuine</strong>.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Link href="#citta">
                <Button size="lg" className="rounded-full px-10 py-7 text-lg shadow-xl hover:shadow-2xl transition-all bg-primary hover:bg-primary/90 text-white font-bold">
                  Vedi Città Servite
                </Button>
              </Link>
              <Link href="#nazionale">
                <Button variant="outline" size="lg" className="rounded-full px-10 py-7 text-lg border-stone-200 hover:border-primary hover:text-primary transition-all bg-white font-bold">
                  Spedizioni in tutta Italia
                </Button>
              </Link>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                  <ChefHat className="w-6 h-6" />
                </div>
                <p className="font-bold text-stone-900 text-sm">Farine Macinate a Pietra</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700">
                  <Wheat className="w-6 h-6" />
                </div>
                <p className="font-bold text-stone-900 text-sm">Pasta Trafilata Bronzo</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                  <Soup className="w-6 h-6" />
                </div>
                <p className="font-bold text-stone-900 text-sm">Zuppe 100% Vegetali</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-700">
                  <PackageCheck className="w-6 h-6" />
                </div>
                <p className="font-bold text-stone-900 text-sm">Spedizioni Sicure</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CITIES GRID */}
      <section className="py-16 bg-stone-50" id="citta">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Consegna Locale Diretta</h2>
            <p className="text-stone-600">Seleziona la tua città per scoprire i prodotti disponibili con consegna rapida.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/consegna/${city.slug}`}
                className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 hover:border-primary/30 flex flex-col items-center text-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="w-16 h-16 rounded-2xl bg-stone-50 group-hover:bg-primary/10 flex items-center justify-center text-primary mb-5 transition-colors duration-300">
                  <MapPin className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-primary transition-colors">
                  {city.name}
                </h3>

                <p className="text-sm text-stone-500 mb-6 font-medium">
                  Consegna in {city.region}
                </p>

                <div className="mt-auto flex items-center text-primary font-bold text-sm bg-primary/5 px-4 py-2 rounded-full group-hover:bg-primary group-hover:text-white transition-all">
                  Vedi Prodotti
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SPEDIZIONE NAZIONALE / NON TROVI LA TUA CITTÀ */}
      <section className="bg-white py-20 lg:py-24 border-t border-stone-100 relative overflow-hidden" id="nazionale">
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-[#1a1814] rounded-[2.5rem] p-8 md:p-16 text-center text-white shadow-2xl overflow-hidden relative border border-white/5">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-amber-500/20">
                Spedizioni Nazionali
              </span>
              
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
                Non trovi la tua città? <br />
                <span className="text-amber-500">Spediamo in tutta Italia!</span>
              </h2>
              
              <p className="text-lg text-stone-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                Nessun problema! Organizziamo spedizioni con corriere espresso per portare i nostri prodotti ovunque tu sia.
                Milano, Roma, Torino, Palermo... il gusto dell'Appennino non ha confini.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/contatti?richiesta=spedizione_italia" className="w-full sm:w-auto">
                  <Button size="lg" className="rounded-full px-10 py-7 text-lg bg-amber-600 hover:bg-amber-500 text-white font-bold shadow-xl hover:shadow-amber-600/30 w-full transition-all duration-300">
                    Richiedi Spedizione
                  </Button>
                </Link>
                <Link href="/prodotti" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="rounded-full px-10 py-7 text-lg border-white/30 text-white hover:bg-white hover:text-stone-900 w-full font-bold transition-all duration-300 bg-transparent">
                    Sfoglia il Catalogo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterV2 prodotti={prodotti} categorie={categorie} />
    </div>
  );
}
