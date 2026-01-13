import { groq } from 'next-sanity';
import { unstable_cache } from 'next/cache';
import { readClient } from './sanity.client';

// Cache configuration - revalidate every hour (3600 seconds)
const CACHE_REVALIDATE = 3600;
const CACHE_TAG_PRODUCTS = 'products';
const CACHE_TAG_CATEGORIES = 'categories';

// Base fetch function for prodotti
async function fetchProdotti() {
  return readClient.fetch(
    groq`*[_type == "prodotto"] | order(ordine asc){
      _id,
      nome,
      descrizione,
      ingredienti,
      immagini[] {
        "image": asset->url + "?auto=format&fit=max&w=1400&q=75",
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
      umidita,
      marchi,
      valori_nutrizionali,
      "categoria": categoria->nome,
      "categoria_slug": categoria->slug,
      ordine
    }`
  );
}

// Base fetch function for single prodotto
async function fetchProdottoBySlug(slug: string) {
  return readClient.fetch(
    groq`*[_type == "prodotto" && slug.current == $slug][0]{
      _id,
      nome,
      descrizione,
      ingredienti,
      immagini[] {
        "image": asset->url + "?auto=format&fit=max&w=1400&q=75",
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

// Base fetch function for categories
async function fetchCategorie() {
  return readClient.fetch(
    groq`*[_type == "categoria"] | order(ordine asc){
      _id,
      nome,
      descrizione,
      immagine {
        "image": asset->url + "?auto=format&fit=max&w=1400&q=75",
      },
      slug,
      ordine
    }`
  );
}

// Cached versions using Next.js unstable_cache
export async function getProdotti() {
  return unstable_cache(fetchProdotti, ['all-products'], {
    revalidate: CACHE_REVALIDATE,
    tags: [CACHE_TAG_PRODUCTS],
  })();
}

export async function getProdottoBySlug(slug: string) {
  return unstable_cache(
    async () => fetchProdottoBySlug(slug),
    [`product-${slug}`],
    {
      revalidate: CACHE_REVALIDATE,
      tags: [CACHE_TAG_PRODUCTS, `product-${slug}`],
    }
  )();
}

export async function getCategorie() {
  return unstable_cache(fetchCategorie, ['all-categories'], {
    revalidate: CACHE_REVALIDATE,
    tags: [CACHE_TAG_CATEGORIES],
  })();
}
