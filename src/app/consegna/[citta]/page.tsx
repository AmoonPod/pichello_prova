import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, categories } from "@/data/localSeoConfig";
import FooterV2 from "@/components/new/Footer";
import { getProdotti, getCategorie } from "~/sanity/sanity.query";
import { ArrowRight, MapPin, Wheat, ChefHat, Soup, Sprout } from "lucide-react";
import Breadcrumb from "@/components/new/Breadcrumb";
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
    title: `Consegna Pasta Artigianale, Miele e Legumi a ${city.name} | Il Pichello`,
    description: `Azienda Agricola Il Pichello porta a ${city.name} il meglio dell'Appennino: Pasta artigianale, Cereali, Legumi e Miele biologico. Ordina online, consegna a domicilio.`,
    alternates: {
      canonical: `https://www.agricolailpichello.it/consegna/${city.slug}`,
    },
    keywords: [
      `pasta artigianale ${city.name}`,
      `miele biologico ${city.name}`,
      `legumi appennino ${city.name}`,
      `cereali antichi ${city.name}`,
      `consegna spesa ${city.name}`,
      "Il Pichello",
    ],
  };
}

// Icon helper
const getCategoryIcon = (slug: string) => {
  switch (slug) {
    case "pasta-artigianale": return <Wheat className="w-8 h-8" />;
    case "farine-macinate-a-pietra": return <ChefHat className="w-8 h-8" />;
    case "zuppe-e-legumi": return <Soup className="w-8 h-8" />;
    case "miele-e-conserve": return <Sprout className="w-8 h-8" />;
    default: return <Wheat className="w-8 h-8" />;
  }
};

// Color helper
const getCategoryColor = (slug: string) => {
  switch (slug) {
    case "pasta-artigianale": return "text-amber-600 bg-amber-50 group-hover:bg-amber-100";
    case "farine-macinate-a-pietra": return "text-stone-600 bg-stone-100 group-hover:bg-stone-200";
    case "zuppe-e-legumi": return "text-green-600 bg-green-50 group-hover:bg-green-100";
    case "miele-e-conserve": return "text-yellow-600 bg-yellow-50 group-hover:bg-yellow-100";
    default: return "text-primary bg-primary/10 group-hover:bg-primary/20";
  }
};

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

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <div className="container mx-auto px-4 py-8 ">
        <Breadcrumb
          items={[
            { label: "Consegna a Domicilio", href: "/consegna" },
            { label: city.name }
          ]}
        />

        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-widest mb-6 border border-green-100">
            <MapPin className="w-3.5 h-3.5" />
            Consegna attiva a {city.name}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight">
            Pasta, Miele e Legumi Bio a <span className="text-primary italic block md:inline">{city.name}</span>
          </h1>

          <p className="text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto mb-8">
            Portiamo sulla tua tavola a <strong>{city.name}</strong> i sapori autentici dell'Appennino Reggiano.
            Scopri la nostra selezione di <strong>Cereali antichi</strong>, <strong>Legumi</strong>, <strong>Miele artigianale</strong> e <strong>Pasta trafilata al bronzo</strong>.
            Coltivazione biorazionale e filiera cortissima.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto mb-20">
          {categories.map((category) => {
            const icon = getCategoryIcon(category.slug);
            const colorClass = getCategoryColor(category.slug);

            return (
              <Link
                key={category.slug}
                href={`/consegna/${city.slug}/${category.slug}`}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 hover:border-primary/30 flex items-start gap-6"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${colorClass}`}>
                  {icon}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-stone-900 mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h2>
                  <p className="text-stone-600 mb-4 leading-relaxed text-sm">
                    {category.description}
                  </p>
                  <div className="flex items-center text-primary font-medium group-hover:underline decoration-primary/30 underline-offset-4 text-sm">
                    Ordina a {city.name}
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* SEO Content Block */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone-100 mb-20">
          <h2 className="text-3xl font-bold text-stone-900 mb-6">
            Perché scegliere i nostri prodotti a {city.name}?
          </h2>
          <div className="prose prose-stone max-w-none text-stone-600">
            <p className="mb-4">
              La nostra Azienda Agricola coltiva con metodo <strong>biorazionale</strong> nell'incontaminato scenario dell'Appennino Reggiano.
              Consegniamo direttamente a {city.name} per garantirti la massima freschezza senza intermediari.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-xl font-bold text-stone-800 mb-3 flex items-center gap-2">
                  <Wheat className="w-5 h-5 text-amber-600" /> Cereali e Farine
                </h3>
                <p className="text-sm">
                  Coltiviamo varietà antiche come il Grano del Miracolo e il Gentil Rosso. Le nostre farine sono <strong>macinate a pietra</strong> per preservare tutto il germe e le proprietà nutrizionali.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-800 mb-3 flex items-center gap-2">
                  <Soup className="w-5 h-5 text-green-600" /> Legumi e Zuppe
                </h3>
                <p className="text-sm">
                  Ceci, Farro, Orzo e Cicerchie coltivati nei nostri campi. Le nostre zuppe sono mix bilanciati pronti da cuocere, ricchi di fibre e proteine vegetali.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-800 mb-3 flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-yellow-600" /> Miele Artigianale
                </h3>
                <p className="text-sm">
                  Miele vergine integrale, estratto a freddo per mantenere intatti profumi e benefici. Un prodotto 100% naturale dalle nostre arnie in montagna.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-800 mb-3 flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-amber-700" /> Pasta Artigianale
                </h3>
                <p className="text-sm">
                  Pasta secca prodotta con le nostre semole, <strong>trafilata al bronzo</strong> ed essiccata lentamente a bassa temperatura. Ruvida, tiene la cottura e trattiene i sughi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterV2 prodotti={prodotti} categorie={sanityCategories} />
    </div>
  );
}
