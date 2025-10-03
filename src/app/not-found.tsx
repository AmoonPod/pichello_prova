"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NavbarV2 from "@/components/new/Navbar";
import FooterV2 from "@/components/new/Footer";
import { getProdotti, getCategorie } from "../../sanity/sanity.query";
import { ProdottoType, CategoriaType } from "../../types";
import { Home } from "lucide-react";

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [prodotti, setProdotti] = useState<ProdottoType[]>([]);
  const [categorie, setCategorie] = useState<CategoriaType[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [prodottiData, categorieData] = await Promise.all([
          getProdotti(),
          getCategorie(),
        ]);
        setProdotti(prodottiData);
        setCategorie(categorieData);
      } catch (error) {
        console.error("Failed to fetch data for footer:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      router.replace("/");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <>
      <NavbarV2 />
      <main className="min-h-[70vh] flex items-center justify-center bg-gray-50/50">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-8xl font-bold text-primary animate-pulse">404</h1>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Pagina non trovata
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Oops! Sembra che tu abbia imboccato un sentiero sconosciuto. La
              pagina che cerchi non è qui.
            </p>
            <p className="mt-6 text-sm text-gray-500">
              Sarai reindirizzato alla homepage tra{" "}
              <span className="font-bold text-primary">{countdown}</span> secondi.
            </p>
            <div className="mt-8">
              <Button asChild>
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Torna alla Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <FooterV2 prodotti={prodotti} categorie={categorie} />
    </>
  );
}
