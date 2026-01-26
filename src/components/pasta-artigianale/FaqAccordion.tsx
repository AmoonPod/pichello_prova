"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

type FaqItem = {
  question: string
  answer: string
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-3 max-w-4xl mx-auto">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={item.question}
            className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden"
          >
            <button
              type="button"
              className="w-full flex items-center justify-between px-4 sm:px-6 py-4 text-left"
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="text-base sm:text-lg font-semibold text-stone-900">{item.question}</span>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-stone-500 transition-transform duration-200",
                  isOpen ? "rotate-180" : ""
                )}
              />
            </button>
            <div
              className={cn(
                "px-4 sm:px-6 overflow-hidden transition-all duration-200",
                isOpen ? "pb-4 max-h-96" : "max-h-0"
              )}
            >
              <p className="text-stone-700 leading-relaxed text-sm sm:text-base">{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
