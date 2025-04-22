import { groq } from "next-sanity";
import client from "./sanity.client";

export async function getProdotti() {
  return client.fetch(
    groq`*[_type == "prodotto"]{
      _id,
      nome,
      descrizione,
      immagini[] {
        "image": asset->url
      },
      slug,
      "categoria": categoria->nome,
      "categoria_slug": categoria->slug
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
      formati,
      "categoria": categoria->nome,
      umidita,
      marchi,
      valori_nutrizionali
    }`,
    { slug }
  );
}

//get all categories
export async function getCategorie() {
  return await client.fetch(
    groq`*[_type == "categoria"]{
      _id,
      nome,
      descrizione,
      immagine {
        "image": asset->url
      },
      slug
    }`
  );
}
