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
      slug
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
      slug
    }`,
    { slug }
  );
}
