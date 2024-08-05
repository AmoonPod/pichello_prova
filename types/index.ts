import { PortableTextBlock } from "sanity";

export type ProdottoType = {
  _id: string;
  nome: string;
  descrizione: string;
  immagine_di_copertina: {
    alt: string;
    image: string;
  };
  immagini: Immagine[];
  slug: string;
};

export type Immagine = {
  alt: string;
  image: string;
};
