"use client";
import "../app/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
      <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8 max-w-lg w-full text-center animate-fade-in">
        <h1 className="text-5xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Pagina non trovata
        </h2>
        <p className="text-gray-600 text-base mb-2">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <p className="text-gray-400 text-sm">
          Stai per essere reindirizzato alla homepage...
        </p>
      </div>
    </div>
  );
}
