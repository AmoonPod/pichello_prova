import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cities, categories } from "@/data/localSeoConfig";
import FooterV2 from "@/components/new/Footer";
import { getProdotti, getCategorie } from "~/sanity/sanity.query";
import { ArrowRight, MapPin, Phone, Truck, Wheat, Soup, ChefHat, Mail, Package } from "lucide-react";
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

  // JSON-LD per Local SEO "A Bomba"
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `Consegna Prodotti Agricoli a ${city.name}`,
    "serviceType": "Food Delivery",
    "description": `Servizio di consegna a domicilio di pasta artigianale, farine e prodotti tipici a ${city.name} e provincia.`,
    "provider": {
      "@type": "Organization",
      "name": "Azienda Agricola Il Pichello",
      "url": "https://www.agricolailpichello.it"
    },
    "areaServed": {
      "@type": "Place",
      "name": city.name,
      "address": {
        "@type": "PostalAddress",
        "addressRegion": city.region,
        "addressCountry": "IT"
      }
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Prodotti Agricoli Disponibili",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Pasta Artigianale Trafilata al Bronzo"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Farine Macinate a Pietra"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Zuppe di Legumi e Cereali"
          }
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
                  src="/images/pasta/mezzi_paccheri_appennino_reggiano_5.webp"
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
                  src="/images/zuppe/zuppe.webp"
                  alt={`Zuppe pronte consegna ${city.name}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* 4. Miele e Tutto il Catalogo (Nuova Sezione Unificata) */}
            <div className="group grid md:grid-cols-2 gap-8 items-center bg-amber-50 rounded-3xl p-6 md:p-10 shadow-sm border border-amber-100">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group-hover:scale-[1.02] transition-transform duration-500">
                <Image
                  src="/images/miele.webp"
                  alt={`Prodotti tipici Il Pichello consegna ${city.name}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-widest mb-4">
                  <Truck className="w-3.5 h-3.5" />
                  Disponibilità Immediata
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">
                  Miele, Conserve e Altro
                </h2>
                <p className="text-stone-600 text-lg mb-8 leading-relaxed">
                  Oltre ai nostri classici, portiamo a {city.name} anche il nostro <strong>Miele artigianale</strong>, cereali e prodotti freschi.
                  Scopri l'intero catalogo di prodotti genuini.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/prodotti">
                    <Button size="lg" className="rounded-full bg-amber-700 hover:bg-amber-800 text-white font-bold px-8">
                      Vedi Tutti i Prodotti
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Local SEO Text Block & CTA */}
      <section className="bg-white py-20 border-t border-stone-100">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* SEO Text */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6">
              La tua spesa contadina a {city.name}
            </h2>
            <div className="prose prose-stone mx-auto text-lg text-stone-600 leading-relaxed">
              <p>
                L'<strong>Azienda Agricola Il Pichello</strong> non è un semplice e-commerce.
                Siamo produttori diretti. Coltiviamo i nostri campi nell'Appennino Reggiano e portiamo i frutti del nostro lavoro fino a <strong>{city.name}</strong>.
                <br />
                Scegliere noi significa saltare ogni intermediario: dal campo alla tua tavola, garantendo freschezza, sostenibilità e il vero sapore della tradizione.
              </p>
            </div>
          </div>

          {/* CTA Box "Come Ordinare" - Redesigned */}
          <div className="bg-primary/5 rounded-[2.5rem] p-8 md:p-12 border border-primary/10 relative overflow-hidden">
            {/* Decorative blob */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-4">
                  Come ordinare a {city.name}?
                </h3>
                <p className="text-stone-600 text-lg mb-6">
                  Scegli la modalità che preferisci. Siamo a tua disposizione per consigliarti i prodotti migliori della stagione.
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2 text-sm font-bold text-primary bg-white px-3 py-1.5 rounded-full shadow-sm border border-primary/10">
                    <Truck className="w-4 h-4" /> Consegna Rapida
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-primary bg-white px-3 py-1.5 rounded-full shadow-sm border border-primary/10">
                    <Package className="w-4 h-4" /> Prodotti Freschi
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full md:w-auto gap-4">
                <Link href={`/contatti?messaggio=${contactPrefilledMessage}`} className="w-full">
                  <Button size="lg" className="w-full rounded-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
                    <Mail className="w-5 h-5 mr-2" />
                    Ordina Online
                  </Button>
                </Link>

                <a href="tel:3408200080" className="w-full">
                  <Button size="lg" variant="outline" className="w-full rounded-full h-14 text-lg font-bold border-2 border-primary text-primary hover:bg-primary/5 bg-white">
                    <Phone className="w-5 h-5 mr-2" />
                    Chiama 340 8200080
                  </Button>
                </a>
                <p className="text-xs text-center text-stone-500 mt-1">
                  Risponde Mirco (anche WhatsApp)
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <FooterV2 prodotti={prodotti} categorie={sanityCategories} />
    </div>
  );
}
