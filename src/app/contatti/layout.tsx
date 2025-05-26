import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contatti | Azienda Agricola Il Pichello - Marola, Appennino Reggiano",
  description:
    "Contatta l'Azienda Agricola Il Pichello a Marola (RE) per informazioni sui nostri prodotti biorazionali. Vendita diretta ai mercati e su appuntamento in azienda nell'Appennino Reggiano.",

  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://www.agricolailpichello.it/contatti",
    siteName: "Azienda Agricola Il Pichello",
    title:
      "Contatti | Azienda Agricola Il Pichello - Marola, Appennino Reggiano",
    description:
      "Contatta l'Azienda Agricola Il Pichello a Marola (RE) per informazioni sui nostri prodotti biorazionali. Vendita diretta ai mercati e su appuntamento in azienda.",
    images: [
      {
        url: "/images/contatti-og-image.jpg", // Immagine specifica per contatti
        width: 1200,
        height: 630,
        alt: "Contatti Azienda Agricola Il Pichello - Marola (RE)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Contatti | Azienda Agricola Il Pichello - Marola, Appennino Reggiano",
    description:
      "Contatta l'Azienda Agricola Il Pichello a Marola (RE) per informazioni sui nostri prodotti biorazionali. Vendita diretta ai mercati e su appuntamento in azienda.",
    images: ["/images/contatti-og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.agricolailpichello.it/contatti",
  },
};

export default function ContattiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
