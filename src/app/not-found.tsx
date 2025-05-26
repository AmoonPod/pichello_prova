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
  return (
    <div className="min-h-[80vh] bg-backgroundvariant flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Code */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-primary/20 mb-4">
            404
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <TreePine className="w-6 h-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Pagina Non Trovata
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            La pagina che stai cercando non esiste o è stata spostata. Ma non
            preoccuparti, i nostri prodotti biorazionali ti aspettano!
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              Torna alla Homepage
            </Button>
          </Link>
          <Link href="/prodotti">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-2"
            >
              <Wheat className="w-4 h-4 mr-2" />
              Scopri i Prodotti
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
