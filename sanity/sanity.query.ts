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
      "categoria": categoria->nome
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
      peso,
      scadenza,
      formati,
      "categoria": categoria->nome
    }`,
    { slug }
  );
}

//get all categories
export async function getCategorie() {
  const categorie = await client.fetch(
    groq`*[_type == "categoria"]{
      "nome": nome
    }`
  );
  return categorie.map((c: any) => c.nome);
}
