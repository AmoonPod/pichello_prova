import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Wheat, TreePine, Phone } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pagina Non Trovata | Azienda Agricola Il Pichello",
  description:
    "La pagina che stai cercando non esiste. Torna alla homepage dell'Azienda Agricola Il Pichello o esplora i nostri prodotti biorazionali.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, [router]);
  return null;
}
