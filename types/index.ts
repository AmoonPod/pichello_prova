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
};

export type Immagine = {
  alt: string;
  image: string;
};
