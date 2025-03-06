import { ProdottoType } from "../../../../types";
import {
  getProdotti,
  getProdottoBySlug,
} from "../../../../sanity/sanity.query";
import "../../globals.css";
import ProdottoGallery from "@/components/prodotto/prodotto_gallery";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import CategoryTag from "@/components/category_tag";

export async function generateMetadata(props: {
  params: Promise<{ name: string }>;
}) {
  const params = await props.params;
  try {
    const prodotto = await getProdottoBySlug(params.name);

    if (!prodotto)
      return {
        title: "Prodotto non trovato",
        description: "Il prodotto che stai cercando non esiste",
      };

    return {
      openGraph: {
        title: prodotto.nome,
        description: prodotto.descrizione,
        images: [
          {
            url: prodotto.immagini[0].image,
            width: 600,
            height: 600,
            alt: prodotto.immagini[0].alt,
          },
        ],
      },
    };
  } catch (error) {
    console.error(error);
    return {
      title: "Errore",
      description:
        "Si è verificato un errore durante il caricamento del prodotto",
    };
  }
}

export async function generateStaticParams() {
  try {
    const prodotti: ProdottoType[] = await getProdotti();
    return prodotti.map((prodotto) => ({
      params: { slug: prodotto.slug },
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Product(props: {
  params: Promise<{ name: string }>;
}) {
  const params = await props.params;
  const prodotto: ProdottoType = await getProdottoBySlug(params.name);
  const prodotti: ProdottoType[] = await getProdotti();
  if (!prodotto) return null;
  console.log;
  return (
    <>
      <div className="flex flex-col mx-auto py-20 min-h-screen">
        <div className="mx-auto max-w-5xl flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 lg:items-start px-8 lg:py-20">
          <ProdottoGallery images={prodotto.immagini} />
          <div className="flex-1 grid gap-4">
            <div>
              <CategoryTag category={prodotto.categoria} />
              <h1 className="text-[44px] font-bold">{prodotto.nome}</h1>
            </div>
            <p className="text-muted-foreground text-base">
              {prodotto.descrizione}
            </p>

            {/* Sezione Dettagli Prodotto */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-xl font-semibold mb-2">Dettagli Prodotto</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p>
                    <span className="font-medium">EAN:</span>{" "}
                    {prodotto.codice_ean}
                  </p>
                  <p>
                    <span className="font-medium">Scadenza:</span>{" "}
                    {prodotto.scadenza}
                  </p>
                  <p>
                    <span className="font-medium">Pezzi:</span> {prodotto.pezzi}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-medium">Grado di umidità:</span>{" "}
                    {prodotto.umidita}%
                  </p>
                  <p>
                    <span className="font-medium">Allergeni:</span> Può
                    contenere Glutine
                  </p>
                </div>
              </div>
            </div>

            {/* Sezione Marchi */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Marchi</h3>
              <div className="flex flex-wrap gap-2">
                {prodotto.marchi?.prodotto_di_montagna && (
                  <span className="bg-primary text-white px-2 py-1 rounded-full text-sm">
                    Prodotto di montagna
                  </span>
                )}
                {prodotto.marchi?.senza_ammollo && (
                  <span className="bg-primary text-white px-2 py-1 rounded-full text-sm">
                    Senza ammollo
                  </span>
                )}
                {prodotto.marchi?.senza_cereali && (
                  <span className="bg-primary text-white px-2 py-1 rounded-full text-sm">
                    Senza cereali
                  </span>
                )}
                {prodotto.marchi?.riso_italiano && (
                  <span className="bg-primary text-white px-2 py-1 rounded-full text-sm">
                    Riso italiano
                  </span>
                )}
                {prodotto.marchi?.varietà_antica && (
                  <span className="bg-primary text-white px-2 py-1 rounded-full text-sm">
                    Varietà antica
                  </span>
                )}
                {prodotto.marchi?.macinato_a_pietra && (
                  <span className="bg-primary text-white px-2 py-1 rounded-full text-sm">
                    Macinato a pietra
                  </span>
                )}
                {prodotto.marchi?.decorticato_a_pietra && (
                  <span className="bg-primary text-white px-2 py-1 rounded-full text-sm">
                    Decorticato a pietra
                  </span>
                )}
                {prodotto.marchi?.pianificabile_superiore && (
                  <span className="bg-primary text-white px-2 py-1 rounded-full text-sm">
                    Pianificabile superiore
                  </span>
                )}
              </div>
            </div>

            {/* Sezione Valori Nutrizionali */}
            {prodotto.valori_nutrizionali && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">
                  Valori Nutrizionali
                </h3>
                <div className="text-base text-muted-foreground">
                  {prodotto.valori_nutrizionali
                    .split("\n")
                    .map((line, index) => {
                      // Skip empty lines
                      if (!line.trim()) return null;
                      // Find the first space to separate the first word
                      const firstSpaceIndex = line.indexOf(" ");
                      let firstWord, rest;
                      if (firstSpaceIndex === -1) {
                        firstWord = line;
                        rest = "";
                      } else {
                        firstWord = line.substring(0, firstSpaceIndex);
                        rest = line.substring(firstSpaceIndex + 1);
                      }
                      return (
                        <p key={index}>
                          <span className="font-bold">{firstWord}</span> {rest}
                        </p>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Formati disponibili */}
            <div className="mt-4">
              {(prodotto.formati?.length > 0 || prodotto.peso) && (
                <h3 className="text-lg font-semibold">Formati disponibili</h3>
              )}
              <div className="mt-2 flex flex-wrap gap-2">
                {prodotto?.formati?.map((formato) => (
                  <span
                    key={formato}
                    className="text-muted-foreground text-sm bg-gray-200 p-2 rounded-full"
                  >
                    {formato}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="bg-muted py-12 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Prodotti correlati
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
              {prodotti.slice(0, 3).map((product: ProdottoType) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
