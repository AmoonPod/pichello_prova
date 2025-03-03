export const categoria = {
  name: "categoria",
  title: "Categoria",
  type: "document",

  fields: [
    {
      name: "nome",
      title: "Nome",
      type: "string",
      validation: (Rule: any) => Rule.required().min(1).max(50), // Validazione per il nome della categoria
    },
    {
      name: "descrizione",
      title: "Descrizione",
      type: "text",
      validation: (Rule: any) => Rule.required().min(1).max(500), // Validazione per la descrizione della categoria
    },
  ],
};
