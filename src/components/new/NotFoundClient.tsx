"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import "@/app/globals.css";

export default function NotFoundClient() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-backgroundvariant">
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-lg mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-bold">!</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Pagina non trovata
          </h1>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Sembra che il prodotto o la pagina che stai cercando non esista o sia stata spostata.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/prodotti">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Vai ai Prodotti
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Torna alla Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
