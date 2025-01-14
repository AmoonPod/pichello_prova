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
    {
      name: "codice_ean",
      title: "Codice EAN",
      type: "string",
    },
    {
      name: "peso",
      title: "Peso",
      type: "number",
    },
    {
      name: "scadenza",
      title: "Scadenza",
      type: "string",
    },
    {
      name: "pezzi",
      title: "Pezzi",
      type: "number",
    },
    {
      name: "formati",
      title: "Formati disponibili",
      type: "array",
      of: [
        {
          name: "formato",
          title: "Formato",
          type: "string",
        },
      ],
    },
    {
      name: "categoria", // Nuovo campo per la categoria
      title: "Categoria",
      type: "reference",
      to: [{ type: "categoria" }], // Riferimento allo schema categoria
    },
  ],
};
