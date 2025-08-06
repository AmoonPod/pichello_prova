import { MetadataRoute } from 'next';
import { getProdotti, getCategorie } from '../../sanity/sanity.query';
import { ProdottoType, CategoriaType } from '../../types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.agricolailpichello.it';

  // Data dell'ultimo aggiornamento
  const lastModified = new Date();

  // Fetch all products and categories
  const [prodotti, categorie] = await Promise.all([
    getProdotti(),
    getCategorie(),
  ]);

  // Base pages
  const basePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/prodotti`,
      lastModified: lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contatti`,
      lastModified: lastModified,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: lastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/farina-dellappennino-reggio-emilia-e-carpenti`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/legumi-fagioli-e-lenticchie-dellappennino-reggiano`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Sezioni della homepage con anchor links
    {
      url: `${baseUrl}/#la-nostra-azienda`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#dove-siamo`,
      lastModified: lastModified,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ];

  // Individual product pages
  const productPages: MetadataRoute.Sitemap = prodotti.map(
    (prodotto: ProdottoType) => {
      const slug = JSON.parse(JSON.stringify(prodotto.slug)).current;
      return {
        url: `${baseUrl}/prodotti/${slug}`,
        lastModified: lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      };
    }
  );

  // Category filter pages
  const categoryPages: MetadataRoute.Sitemap = categorie.map(
    (categoria: CategoriaType) => {
      const slug = JSON.parse(JSON.stringify(categoria.slug)).current;
      return {
        url: `${baseUrl}/prodotti?categoria=${slug}`,
        lastModified: lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      };
    }
  );

  return [...basePages, ...productPages, ...categoryPages];
}
