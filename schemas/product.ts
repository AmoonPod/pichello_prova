export const prodotto = {
  name: 'prodotto',
  title: 'Prodotto',
  type: 'document',

  fields: [
    { name: 'nome', title: 'Nome', type: 'string' },
    { name: 'descrizione', title: 'Descrizione', type: 'text' },
    {
      name: 'immagini',
      title: 'Immagini',
      type: 'array',
      of: [{ name: 'immagine', title: 'Immagine', type: 'image' }],
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'nome',
        maxLength: 96,
        slugify: (input: string) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 96),
      },
    },
    { name: 'scadenza', title: 'Scadenza', type: 'string' },
    { name: 'pezzi', title: 'Pezzi', type: 'number' },
    {
      name: 'formati',
      title: 'Formati disponibili',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'formato', title: 'Formato', type: 'string' },
            { name: 'codice_ean', title: 'Codice EAN', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'categoria', // Nuovo campo per la categoria
      title: 'Categoria',
      type: 'reference',
      to: [{ type: 'categoria' }], // Riferimento allo schema categoria
    },
    //umidità
    { name: 'umidita', title: 'Umidità', type: 'number' },
    //here I want marchi, that are booleans: Prodotto di montagna, senza ammollo, senza cereali, riso italiano, varietà antica, macinato a pietra, decorticato a pietra, pianificabile superiore
    {
      name: 'marchi',
      title: 'Marchi',
      type: 'object',
      fields: [
        {
          name: 'prodotto_di_montagna',
          title: 'Prodotto di montagna',
          type: 'boolean',
        },
        { name: 'senza_ammollo', title: 'Senza ammollo', type: 'boolean' },
        { name: 'senza_cereali', title: 'Senza cereali', type: 'boolean' },
        { name: 'riso_italiano', title: 'Riso italiano', type: 'boolean' },
        { name: 'varieta_antica', title: 'Varietà antica', type: 'boolean' },
        {
          name: 'macinato_a_pietra',
          title: 'Macinato a pietra',
          type: 'boolean',
        },
        {
          name: 'decorticato_a_pietra',
          title: 'Decorticato a pietra',
          type: 'boolean',
        },
        {
          name: 'pianificabile_superiore',
          title: 'Pianificabile superiore',
          type: 'boolean',
        },
      ],
      options: { layout: 'checkbox' },
    },
    //now I need valori nutrizionali. here is an example: Energia 2932 KJ-690Kcal - Grassi 5,2 g di cui acidi grassi saturi 0,7 g - Carboidrati 80,1 g di cui zuccheri 3,2 g - Fibre 29 g -Proteine 38 g - Sale 0,01g
    { name: 'valori_nutrizionali', title: 'Valori Nutrizionali', type: 'text' },
  ],
};
