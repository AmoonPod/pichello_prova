import { groq } from 'next-sanity';
import client from './sanity.client';

export async function getProdotti() {
  return client.fetch(
    groq`*[_type == "prodotto"] | order(ordine asc){
      _id,
      nome,
      descrizione,
      immagini[] {
        "image": asset->url,
        alt
      },
      slug,
      umidita,
      scadenza,
      pezzi,
      formati[] {
        formato,
        codice_ean
      },
      midita,
      marchi,
      valori_nutrizionali,
      "categoria": categoria->nome,
      "categoria_slug": categoria->slug,
      ordine
    }`
  );
}

export async function getProdottoBySlug(slug: string) {
  return client.fetch(
    groq`*[_type == "prodotto" && slug.current == $slug][0]{
      _id,
      nome,
      descrizione,
      immagini[] {
        "image": asset->url
      },
      slug,
      umidita,
      scadenza,
      pezzi,
      formati[] {
        formato,
        codice_ean
      },
      "categoria": categoria->nome,
      umidita,
      marchi,
      valori_nutrizionali,
      ordine
    }`,
    { slug }
  );
}

//get all categories
export async function getCategorie() {
  return await client.fetch(
    groq`*[_type == "categoria"] | order(ordine asc){
      _id,
      nome,
      descrizione,
      immagine {
        "image": asset->url
      },
      slug,
      ordine
    }`
  );
}
