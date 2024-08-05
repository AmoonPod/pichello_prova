import { ProdottoType } from "../../../../types";
import {
  getProdotti,
  getProdottoBySlug,
} from "../../../../sanity/sanity.query";
import Navbar from "@/components/Navbar";
import ProdottoGallery from "@/components/prodotto/prodotto_gallery";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}) {
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
            url: prodotto.immagine_di_copertina.image,
            width: 600,
            height: 600,
            alt: prodotto.immagine_di_copertina.alt,
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

export default async function Product({
  params,
}: {
  params: { name: string };
}) {
  const prodotto: ProdottoType = await getProdottoBySlug(params.name);
  if (!prodotto) return null;
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row items-start gap-8 max-w-4xl mx-auto  py-12 md:py-24 lg:py-32 xl:py-48">
        <ProdottoGallery images={prodotto.immagini} />
        <div className="flex-1 grid gap-4">
          <h1 className="text-[44px] font-bold">{prodotto.nome}</h1>
          <p className="text-muted-foreground text-base">
            {prodotto.descrizione}
          </p>
        </div>
      </div>
    </>
  );
}
