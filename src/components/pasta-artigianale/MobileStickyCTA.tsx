"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false)
  const encodedMessage = encodeURIComponent(
    "Ciao, vorrei ordinare la pasta artigianale Il Pichello. Mi inviate il listino e i tempi di spedizione?"
  )

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 sm:hidden transition-transform duration-300",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="mx-4 mb-4 bg-stone-900 text-white rounded-2xl shadow-2xl shadow-stone-900/20 p-3 flex items-center gap-3">
        <div className="flex-1">
          <p className="text-sm font-semibold">Pronto a ordinare?</p>
          <p className="text-xs text-white/80">Richiedi il listino o scrivici su WhatsApp, ti rispondiamo subito.</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/393397981644?text=${encodedMessage}`}
            className="inline-flex"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              size="sm"
              variant="secondary"
              className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-3"
            >
              <MessageCircle className="w-4 h-4 mr-1" /> WhatsApp
            </Button>
          </a>
          <Link href={`/contatti?prodotto=Pasta%20artigianale&messaggio=${encodedMessage}`} className="inline-flex">
            <Button size="sm" className="rounded-full bg-white text-stone-900 hover:bg-amber-100">
              <ShoppingBag className="w-4 h-4 mr-1" /> Listino
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
