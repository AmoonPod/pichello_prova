import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cities, categories } from "@/data/localSeoConfig";
import FooterV2 from "@/components/new/Footer";
import { getProdotti, getCategorie } from "~/sanity/sanity.query";
import { ArrowRight, MapPin, Phone, Truck, Wheat, Soup, ChefHat, Mail } from "lucide-react";
import Breadcrumb from "@/components/new/Breadcrumb";
import { Button } from "@/components/ui/button";
import "@/app/globals.css";

// Force static generation
export const dynamic = "force-static";

export async function generateStaticParams() {
  return cities.map((city) => ({
    citta: city.slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ citta: string }> }): Promise<Metadata> {
  const params = await props.params;
  const city = cities.find((c) => c.slug === params.citta);

  if (!city) return {};

  return {
    title: `Consegna Prodotti Agricoli a ${city.name} | Pasta, Farina e Zuppe | Il Pichello`,
    description: `Cerchi prodotti agricoli genuini a ${city.name}? Azienda Agricola Il Pichello consegna Pasta artigianale, Farine macinate a pietra e Zuppe contadine. Ordina direttamente dal produttore.`,
    alternates: {
      canonical: `https://www.agricolailpichello.it/consegna/${city.slug}`,
    },
    keywords: [
      `spesa a domicilio ${city.name}`,
      `pasta artigianale ${city.name}`,
      `farina grani antichi ${city.name}`,
      `zuppe legumi ${city.name}`,
      `prodotti agricoli ${city.name}`,
      "Il Pichello",
      "filiera corta"
    ],
  };
}

export default async function CityPage(props: { params: Promise<{ citta: string }> }) {
  const params = await props.params;
  const city = cities.find((c) => c.slug === params.citta);

  if (!city) {
    return notFound();
  }

  const [prodotti, sanityCategories] = await Promise.all([
    getProdotti(),
    getCategorie(),
  ]);

  const contactPrefilledMessage = encodeURIComponent(
    `Ciao, scrivo da ${city.name}. Vorrei informazioni su come ordinare i vostri prodotti con consegna a domicilio.`
  );

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      {/* Hero Section Localizzata */}
      <section className="relative bg-white pt-8 pb-16 lg:pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-50/30 -skew-x-12 translate-x-1/3" />
        
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumb
            items={[
              { label: "Consegna", href: "/consegna" },
              { label: city.name }
            ]}
          />

          <div className="text-center max-w-4xl mx-auto mt-12 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-bold uppercase tracking-widest mb-6 border border-green-100 animate-fade-in">
              <MapPin className="w-4 h-4" />
              Servizio attivo a {city.name}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-stone-900 mb-6 leading-tight">
              Dall'Appennino alla tua tavola a <span className="text-primary italic block md:inline">{city.name}</span>
            </h1>

            <p className="text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto mb-10">
              Pasta artigianale, Farine di grani antichi e Zuppe contadine. 
              Il sapore vero della montagna, consegnato direttamente a casa tua.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/contatti?messaggio=${contactPrefilledMessage}`}>
                <Button size="lg" className="rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all bg-primary hover:bg-primary/90 text-white">
                  Ordina Ora
                </Button>
              </Link>
              <a href="tel:3408200080">
                <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg border-stone-200 hover:border-primary hover:text-primary transition-all bg-white">
                  <Phone className="w-5 h-5 mr-2" />
                  Chiama 340 8200080
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Le 3 Sezioni Principali */}
      <section className="py-12 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 max-w-6xl mx-auto">
            
            {/* 1. Pasta */}
            <div className="group grid md:grid-cols-2 gap-8 items-center bg-white rounded-3xl p-6 md:p-10 shadow-sm hover:shadow-xl transition-all duration-500 border border-stone-100">
              <div className="order-2 md:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-widest mb-4">
                  <Wheat className="w-3.5 h-3.5" />
                  Trafilata al bronzo
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">
                  Pasta Artigianale
                </h2>
                <p className="text-stone-600 text-lg mb-6 leading-relaxed">
                  Semola di grano duro 100% italiano coltivato nei nostri campi. 
                  Essiccazione lenta oltre 24 ore per una pasta rugosa e tenace, che tiene la cottura alla perfezione.
                </p>
                <Link href={`/consegna/${city.slug}/pasta-artigianale`}>
                  <Button variant="link" className="text-amber-700 p-0 text-lg font-semibold group-hover:translate-x-2 transition-transform">
                    Scopri la Pasta a {city.name} <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="order-1 md:order-2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group-hover:scale-[1.02] transition-transform duration-500">
                 <Image 
                   src="/images/pasta/mezzi_paccheri_appennino_reggiano.webp"
                   alt={`Pasta artigianale consegna ${city.name}`}
                   fill
                   className="object-cover"
                 />
              </div>
            </div>

            {/* 2. Farine */}
            <div className="group grid md:grid-cols-2 gap-8 items-center bg-white rounded-3xl p-6 md:p-10 shadow-sm hover:shadow-xl transition-all duration-500 border border-stone-100">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group-hover:scale-[1.02] transition-transform duration-500">
                 <Image 
                   src="/images/cereali.jpg"
                   alt={`Farina grani antichi consegna ${city.name}`}
                   fill
                   className="object-cover"
                 />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-bold uppercase tracking-widest mb-4">
                  <ChefHat className="w-3.5 h-3.5" />
                  Macinata a Pietra
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">
                  Farine di Grani Antichi
                </h2>
                <p className="text-stone-600 text-lg mb-6 leading-relaxed">
                  Miscela unica di 50 varietà antiche. Forza W280 naturale, ideale per pizza, pane e grandi lievitati.
                  Sapore autentico e alta digeribilità.
                </p>
                <Link href={`/consegna/${city.slug}/farine-macinate-a-pietra`}>
                  <Button variant="link" className="text-stone-700 p-0 text-lg font-semibold group-hover:translate-x-2 transition-transform">
                    Vedi le Farine a {city.name} <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* 3. Zuppe */}
            <div className="group grid md:grid-cols-2 gap-8 items-center bg-white rounded-3xl p-6 md:p-10 shadow-sm hover:shadow-xl transition-all duration-500 border border-stone-100">
              <div className="order-2 md:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-widest mb-4">
                  <Soup className="w-3.5 h-3.5" />
                  Comfort Food
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">
                  Zuppe e Risotti
                </h2>
                <p className="text-stone-600 text-lg mb-6 leading-relaxed">
                  Mix pronti di legumi e cereali, 100% vegetali e senza conservanti. 
                  Il sapore della tradizione contadina pronto in 30 minuti sulla tua tavola.
                </p>
                <Link href={`/consegna/${city.slug}/zuppe-e-legumi`}>
                  <Button variant="link" className="text-green-700 p-0 text-lg font-semibold group-hover:translate-x-2 transition-transform">
                    Scegli le Zuppe a {city.name} <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="order-1 md:order-2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group-hover:scale-[1.02] transition-transform duration-500">
                 <Image 
                   src="/images/zuppe_background.jpg"
                   alt={`Zuppe pronte consegna ${city.name}`}
                   fill
                   className="object-cover"
                 />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Altri Prodotti (Miele) Grid semplice */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-serif font-bold text-center text-stone-900 mb-10">
            Altri prodotti disponibili a {city.name}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
             {categories.filter(c => c.slug === 'miele-e-conserve').map(cat => (
               <Link 
                 key={cat.slug} 
                 href={`/consegna/${city.slug}/${cat.slug}`}
                 className="flex items-center gap-4 p-6 rounded-2xl bg-yellow-50 border border-yellow-100 hover:shadow-md transition-all"
               >
                 <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700">
                   <Truck className="w-6 h-6" />
                 </div>
                 <div>
                   <h3 className="font-bold text-stone-900">{cat.name}</h3>
                   <p className="text-sm text-stone-600">Scopri di più</p>
                 </div>
                 <ArrowRight className="w-5 h-5 text-yellow-600 ml-auto" />
               </Link>
             ))}
          </div>
        </div>
      </section>

      {/* Local SEO Text Block */}
      <section className="bg-stone-100 py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">
            Azienda Agricola Il Pichello: la tua spesa contadina
          </h2>
          <div className="prose prose-stone mx-auto text-lg text-stone-600 leading-relaxed">
            <p>
              Non siamo un supermercato, ma una vera azienda agricola. Coltiviamo in Appennino e portiamo i nostri prodotti a <strong>{city.name}</strong>.
              Scegliere noi significa sostenere l'agricoltura locale e mangiare cibo vero, sano e tracciato.
            </p>
          </div>
          
          <div className="mt-10 p-8 bg-white rounded-3xl shadow-sm inline-block w-full max-w-2xl">
            <h3 className="text-xl font-bold text-stone-900 mb-4">Come ordinare a {city.name}?</h3>
            <div className="grid sm:grid-cols-2 gap-6 text-left">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full text-green-700 mt-1">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-stone-900">Telefono / WhatsApp</p>
                  <p className="text-stone-600 text-sm">Chiama o scrivi a Mirco al 340 8200080 per un ordine rapido.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full text-green-700 mt-1">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-stone-900">Modulo Online</p>
                  <p className="text-stone-600 text-sm">Compila il form e ti ricontattiamo per confermare consegna e pagamento.</p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-stone-100 text-center">
               <Link href={`/contatti?messaggio=${contactPrefilledMessage}`}>
                <Button className="rounded-full px-10">Richiedi Listino e Ordina</Button>
               </Link>
            </div>
          </div>
        </div>
      </section>

      <FooterV2 prodotti={prodotti} categorie={sanityCategories} />
    </div>
  );
}
