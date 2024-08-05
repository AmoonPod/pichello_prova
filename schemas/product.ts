export const prodotto = {
  name: "prodotto",
  title: "Prodotto",
  type: "document",

  fields: [
    {
      name: "nome",
      title: "Nome",
      type: "string",
    },
    {
      name: "descrizione",
      title: "Descrizione",
      type: "text",
    },
    {
      name: "immagini",
      title: "Immagini",
      type: "array",
      of: [
        {
          name: "immagine",
          title: "Immagine",
          type: "image",
        },
      ],
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "nome",
        maxLength: 96,
        slugify: (input: string) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 96),
      },
    },
  ],
};
