import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities, categories } from "@/data/localSeoConfig";
import { getProdottiByCategoria, getProdottiBySlugs, getProdotti, getCategorie } from "~/sanity/sanity.query";
import FooterV2 from "@/components/new/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Truck, MapPin, Star, ShieldCheck, Leaf } from "lucide-react";
import Breadcrumb from "@/components/new/Breadcrumb";
import "@/app/globals.css";

// Components
import PastaGallery from "@/components/pasta-artigianale/PastaGallery";
import VariantiFarina from "@/components/farina-cinquanta-grani/VariantiFarina";
import GalleriaZuppe from "@/components/zuppe/GalleriaZuppe";
import GalleriaRisotti from "@/components/zuppe/GalleriaRisotti";
import { Phone, Mail } from "lucide-react";

// Force static generation
export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateStaticParams() {
  const params: { citta: string; categoria: string }[] = [];
  for (const city of cities) {
    for (const category of categories) {
      params.push({
        citta: city.slug,
        categoria: category.slug,
      });
    }
  }
  return params;
}

export async function generateMetadata(props: { params: Promise<{ citta: string; categoria: string }> }): Promise<Metadata> {
  const params = await props.params;
  const city = cities.find((c) => c.slug === params.citta);
  const category = categories.find((c) => c.slug === params.categoria);

  if (!city || !category) return {};

  return {
    title: `${category.name} a ${city.name} | Consegna a Domicilio Il Pichello`,
    description: `Cerchi ${category.name.toLowerCase()} a ${city.name}? Azienda Agricola Il Pichello consegna prodotti artigianali, bio e km0 direttamente a casa tua a ${city.name} e provincia.`,
    alternates: {
      canonical: `https://www.agricolailpichello.it/consegna/${city.slug}/${category.slug}`,
    },
  };
}

export default async function LocalSeoPage(props: { params: Promise<{ citta: string; categoria: string }> }) {
  const params = await props.params;
  const city = cities.find((c) => c.slug === params.citta);
  const category = categories.find((c) => c.slug === params.categoria);

  if (!city || !category) {
    return notFound();
  }

  // Fetch products based on category configuration
  let prodotti: any[] = [];
  if (category.sanityCategory) {
    prodotti = await getProdottiByCategoria(category.sanityCategory);
  } else if (category.sanityProductSlugs) {
    prodotti = await getProdottiBySlugs(category.sanityProductSlugs);
  }

  // Fetch footer data
  const [allProdotti, allCategorie] = await Promise.all([
    getProdotti(),
    getCategorie(),
  ]);

  // Determine which component to render
  const renderProductGallery = () => {
    switch (category.slug) {
      case "pasta-artigianale":
        return <PastaGallery prodotti={prodotti} hideIntro={true} />;
      case "farine-macinate-a-pietra":
        return <VariantiFarina prodotti={prodotti} hideIntro={true} />;
      case "zuppe-e-legumi":
        const zuppeOnly = prodotti.filter((p: any) => !p.nome?.toLowerCase().includes("risotto"));
        const risottiOnly = prodotti.filter((p: any) => p.nome?.toLowerCase().includes("risotto"));
        return (
          <>
            <GalleriaZuppe zuppe={zuppeOnly} hideIntro={true} />
            <div className="py-12"></div>
            <GalleriaRisotti risotti={risottiOnly} />
          </>
        );
      default:
        // Generic Grid for other categories (Miele, etc.)
        return (
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {prodotti.map((product: any) => (
                <Link key={product._id} href={`/prodotti/${product.slug.current || product.slug}`} className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100">
                  <div className="relative aspect-square bg-stone-50 overflow-hidden">
                    {product.immagini?.[0]?.image && (
                      <img
                        src={product.immagini[0].image}
                        alt={product.nome}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-stone-900 group-hover:text-primary transition-colors mb-2">{product.nome}</h3>
                    <p className="text-stone-500 line-clamp-2 text-sm leading-relaxed">{product.descrizione}</p>
                    <div className="mt-4 flex items-center text-primary font-medium text-sm">
                      Scopri di più <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
    }
  };

  const contactPrefilledMessage = encodeURIComponent(
    `Ciao, sono di ${city.name}. Vorrei ordinare ${category.name.toLowerCase()} con consegna a domicilio.`
  );

  return (
    <div className="min-h-screen bg-stone-50 font-sans">

      {/* HERO SECTION REDESIGNED */}
      <header className="relative bg-white py-8 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-50/50 skew-x-12 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-stone-50 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumb
            items={[
              { label: "Consegna", href: "/consegna" },
              { label: city.name, href: `/consegna/${city.slug}` },
              { label: category.name }
            ]}
          />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest mb-8 border border-primary/20 animate-fade-in">
                <MapPin className="w-4 h-4" />
                Disponibile a {city.name}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-stone-900 mb-6 leading-tight">
                {category.name} <br />
                <span className="text-primary italic">a casa tua</span>
              </h1>

              <p className="text-lg md:text-xl text-stone-600 mb-10 leading-relaxed max-w-2xl lg:mx-0 mx-auto">
                Abiti a <strong>{city.name}</strong>? Non accontentarti.
                Scegli la qualità artigianale e biorazionale de Il Pichello.
                {category.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href={`/contatti?messaggio=${contactPrefilledMessage}`}>
                  <Button size="lg" className="rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                    Ordina Ora
                  </Button>
                </Link>
                <div className="flex items-center justify-center gap-2 text-stone-500 text-sm px-4 py-2 bg-stone-100 rounded-full">
                  <Truck className="w-4 h-4" />
                  <span>Consegna rapida a {city.name}</span>
                </div>
              </div>
            </div>

            {/* Right side visual */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                {/* Fallback image or category specific image could go here */}
                {/* Ideally we would show a featured product image here. 
                     For now we use a gradient placeholder or the first product image if available */}
                <img
                  src="/images/pasta/mezzi_paccheri_appennino_reggiano_5.webp"
                  alt={category.name}
                  className="w-full h-full object-cover"
                />

              </div>

              {/* Floating badges */}
              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full text-green-700">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-stone-500 uppercase font-bold tracking-wider">Metodo</p>
                  <p className="font-bold text-stone-900">Biorazionale</p>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="bg-amber-100 p-2 rounded-full text-amber-700">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-stone-500 uppercase font-bold tracking-wider">Qualità</p>
                  <p className="font-bold text-stone-900">Artigianale</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Benefits Bar */}
      <section className="bg-primary/5 border-y border-primary/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 border border-white/50 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900">Garanzia di Qualità</h3>
                <p className="text-sm text-stone-600">Prodotti controllati e genuini</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 border border-white/50 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900">Direttamente a {city.name}</h3>
                <p className="text-sm text-stone-600">Nessun intermediario</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 border border-white/50 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900">Sostenibilità</h3>
                <p className="text-sm text-stone-600">Filiera corta e rispetto per la natura</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog */}
      <main id="catalogo" className="py-16 lg:py-24">
        {renderProductGallery()}
      </main>

      {/* Local SEO Text Block & CTA */}
      <section className="bg-stone-100 py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">
            Ordina {category.name.toLowerCase()} a {city.name}
          </h2>
          <div className="prose prose-stone mx-auto text-lg text-stone-600 leading-relaxed">
            <p>
              Non siamo un supermercato, ma una vera azienda agricola. Coltiviamo in Appennino e portiamo i nostri prodotti a <strong>{city.name}</strong>.
              Scegliere noi significa sostenere l'agricoltura locale e mangiare cibo vero, sano e tracciato.
            </p>
          </div>

          <div className="mt-10 p-8 bg-white rounded-3xl shadow-sm inline-block w-full max-w-2xl">
            <h3 className="text-xl font-bold text-stone-900 mb-4">Come ricevere a casa?</h3>
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
                  <p className="text-stone-600 text-sm">Clicca qui sotto e compila la richiesta. Ti ricontattiamo noi.</p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-stone-100 text-center">
              <Link href={`/contatti?messaggio=${contactPrefilledMessage}`}>
                <Button className="rounded-full px-10 py-6 text-lg">Richiedi {category.name} Ora</Button>
              </Link>
            </div>
          </div>

          <div className="mt-12">
            <Link href={`/consegna/${city.slug}`}>
              <Button variant="outline" className="rounded-full px-8 border-stone-200 text-stone-600 hover:text-primary hover:border-primary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Tutti i prodotti per {city.name}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <FooterV2 prodotti={allProdotti} categorie={allCategorie} />
    </div>
  );
}
