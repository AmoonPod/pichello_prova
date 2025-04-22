export type ProdottoType = {
  _id: string;
  nome: string;
  descrizione: string;
  immagini: Immagine[];
  slug: string;
  codice_ean: string;
  peso: number;
  scadenza: string;
  pezzi: number;
  formati: string[];
  categoria: string;
  categoria_slug: string;
  umidita?: number;
  marchi?: any;
  valori_nutrizionali?: string;
};

export type Immagine = {
  alt: string;
  image: string;
};

export type CategoriaType = {
  _id: string;
  nome: string;
  descrizione: string;
  immagine: Immagine;
  slug: string;
};
