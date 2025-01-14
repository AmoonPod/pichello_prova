import { ProdottoType } from "../../../../types";
import {
  getProdotti,
  getProdottoBySlug,
} from "../../../../sanity/sanity.query";
import Navbar from "@/components/Navbar";
import ProdottoGallery from "@/components/prodotto/prodotto_gallery";
import ProductCard from "@/components/ProductCard";
import { title } from "process";

export async function generateMetadata(
  props: {
    params: Promise<{ name: string }>;
  }
) {
  const params = await props.params;
  try {
    const prodotto: ProdottoType = await getProdottoBySlug(params.name);

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

export default async function Product(
  props: {
    params: Promise<{ name: string }>;
  }
) {
  const params = await props.params;
  const prodotto: ProdottoType = await getProdottoBySlug(params.name);
  const prodotti: ProdottoType[] = await getProdotti();
  if (!prodotto) return null;
  return (
    <>
      <Navbar />
      <div className=" flex flex-col mx-auto">
        <div className="mx-auto max-w-4xl flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 lg:items-start px-8 py-8 lg:py-20">
          <ProdottoGallery images={prodotto.immagini} />
          <div className="flex-1 grid gap-4">
            <h1 className="text-[44px] font-bold">{prodotto.nome}</h1>
            <p className="text-muted-foreground text-base">
              {prodotto.descrizione}
            </p>
          </div>
        </div>
        <section className="bg-muted py-12 ">
          <div className="max-w-4xl mx-auto ">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Dettagli del prodotto
              </h2>
              <div className="mt-4 text-muted-foreground space-y-4">
                {prodotto.descrizione}
              </div>
            </div>
          </div>
        </section>
        <section className="bg-background py-12 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Prodotti correlati
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
              {prodotti.slice(0, 4).map((product: ProdottoType) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
