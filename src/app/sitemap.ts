import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.agricolailpichello.it';

  // Data dell'ultimo aggiornamento
  const lastModified = new Date();

  return [
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
    {
      url: `${baseUrl}/#contact`,
      lastModified: lastModified,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    // TODO: Aggiungere dinamicamente le pagine prodotto individuali quando disponibili
    // Esempio: /prodotti/miele-acacia, /prodotti/cereali-antichi, etc.
  ];
}
