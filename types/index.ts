export type Slug = { _type: 'slug'; current: string };

export type ProdottoType = {
  _id: string;
  nome: string;
  descrizione: string;
  immagini: Immagine[];
  slug: Slug;
  peso: number;
  scadenza: string;
  pezzi: number | null;
  formati: { formato: string; codice_ean?: string }[];
  categoria: string;
  categoria_slug: Slug;
  umidita?: number | null;
  marchi?: {
    prodotto_di_montagna?: boolean;
    senza_ammollo?: boolean;
    senza_cereali?: boolean;
    riso_italiano?: boolean;
    varieta_antica?: boolean;
    macinato_a_pietra?: boolean;
    decorticato_a_pietra?: boolean;
    pianificabile_superiore?: boolean;
  };
  valori_nutrizionali?: string;
};

export type Immagine = {
  _type: 'immagine' | 'image';
  _key?: string;
  alt?: string;
  image?: string;
  asset?: { _type: 'reference'; _ref: string };
};

export type CategoriaType = {
  _id: string;
  nome: string;
  descrizione: string;
  immagine?: Immagine;
  slug: Slug;
};
