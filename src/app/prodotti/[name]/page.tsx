"use server";

import { ProdottoType } from "../../../../types";
import {
  getProdotti,
  getProdottoBySlug,
} from "../../../../sanity/sanity.query";
import "../../globals.css";
import ProdottoGallery from "@/components/prodotto/prodotto_gallery";
import ProductCard from "@/components/ProductCard";
import CategoryTag from "@/components/category_tag";
import { Image as ImageIcon } from "lucide-react";
import BarcodeDisplay from "@/components/BarcodeDisplay";

export default async function Product(props: {
  params: Promise<{ name: string }>;
}) {
  const params = await props.params;
  const prodotto: ProdottoType = await getProdottoBySlug(params.name);
  const prodotti: ProdottoType[] = await getProdotti();
  if (!prodotto) return null;

  const hasImages = prodotto.immagini && prodotto.immagini.length > 0;

  return (
    <>
      <div className="min-h-screen ">
        {/* Hero Section */}
        <div className="relative bg-white">
          <div className="container">
            {/* Breadcrumb */}
            <nav className="flex mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <a
                    href="/prodotti"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Prodotti
                  </a>
                </li>
                <li>
                  <span className="text-gray-300">/</span>
                </li>
                <li>
                  <span className="text-gray-900 font-medium">
                    {prodotto.nome}
                  </span>
                </li>
              </ol>
            </nav>

            {/* Main product section */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
              {/* Gallery Section */}
              <div className="lg:col-span-2 lg:sticky lg:top-8">
                {hasImages ? (
                  <ProdottoGallery images={prodotto.immagini} />
                ) : (
                  <div className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center shadow-lg">
                    <ImageIcon className="w-32 h-32 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Product Info Section */}
              <div className="lg:col-span-3 space-y-8">
                {/* Header */}
                <div className="space-y-4">
                  <CategoryTag category={prodotto.categoria} />
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    {prodotto.nome}
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {prodotto.descrizione}
                  </p>
                </div>

                {/* Contact CTA - Design originale con colori del design system */}
                <div className="relative group">
                  <div className="absolute inset-2 bg-gradient-to-br from-primary/10 via-primary/15 to-primary/20 rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500" />

                  <div className="relative bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20 hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          Ti interessa questo prodotto?
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          Contattaci per informazioni su disponibilità, quantità e per effettuare il tuo ordine.
                          <span className="block text-xs mt-1 text-muted-foreground/80">
                            Risposta garantita entro 24 ore
                          </span>
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <a
                          href="tel:3408200080"
                          className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-sm group"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          Chiama Ora
                        </a>

                        <a
                          href={`/contatti?prodotto=${encodeURIComponent(prodotto.nome)}`}
                          className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-primary font-semibold px-6 py-3 rounded-full border-2 border-primary shadow-sm hover:shadow-md transition-all duration-300 text-sm group"
                        >
                          <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          Scrivi Messaggio
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Info Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="text-sm text-gray-500 mb-1">Scadenza</div>
                    <div className="font-semibold text-gray-900">
                      {prodotto.scadenza || "N/D"}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="text-sm text-gray-500 mb-1">Pezzi</div>
                    <div className="font-semibold text-gray-900">
                      {prodotto.pezzi ?? "N/D"}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="text-sm text-gray-500 mb-1">Umidità</div>
                    <div className="font-semibold text-gray-900">
                      {prodotto.umidita !== null &&
                        prodotto.umidita !== undefined
                        ? `${prodotto.umidita}%`
                        : "N/D"}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="text-sm text-gray-500 mb-1">Allergeni</div>
                    <div className="font-semibold text-gray-900 text-xs">
                      Può contenere Glutine
                    </div>
                  </div>
                </div>

                {/* Available Formats and EAN Codes */}
                {prodotto.formati && prodotto.formati.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">
                      Formati Disponibili
                    </h3>
                    <div className="space-y-4">
                      {(() => {
                        // Group formats by EAN code
                        const groupedFormats = prodotto.formati.reduce(
                          (groups, item) => {
                            const ean = item.codice_ean || "no-ean";
                            if (!groups[ean]) {
                              groups[ean] = [];
                            }
                            groups[ean].push(item.formato);
                            return groups;
                          },
                          {} as Record<string, string[]>
                        );

                        return Object.entries(groupedFormats).map(
                          ([ean, formats], index) => (
                            <div
                              key={index}
                              className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200"
                            >
                              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex flex-wrap gap-2 mb-2">
                                    {formats.map((formato, formatIndex) => (
                                      <span
                                        key={formatIndex}
                                        className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm"
                                      >
                                        {formato}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex-1 lg:max-w-xs">
                                  {ean !== "no-ean" ? (
                                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                                      <span className="font-medium text-sm block mb-2 text-gray-700">
                                        Codice EAN:
                                      </span>
                                      <BarcodeDisplay
                                        value={ean}
                                        height={35}
                                        displayValue={true}
                                      />
                                    </div>
                                  ) : (
                                    <p className="text-sm text-gray-500 bg-white rounded-lg p-3 border border-gray-200">
                                      <span className="font-medium">EAN:</span>{" "}
                                      Non disponibile
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        );
                      })()}
                    </div>
                  </div>
                )}

                {/* Brands Section */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">
                    Certificazioni e Marchi
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {prodotto.marchi?.prodotto_di_montagna && (
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow">
                        <img
                          src="/logo-Prodotto-di-Montagna.jpg"
                          alt="Prodotto di Montagna"
                          title="Prodotto di Montagna"
                          className="w-full h-16 object-contain"
                        />
                      </div>
                    )}
                    {prodotto.marchi?.senza_ammollo && (
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow">
                        <img
                          src="/senza ammollo.jpg"
                          alt="Senza Ammollo"
                          title="Senza Ammollo"
                          className="w-full h-16 object-contain"
                        />
                      </div>
                    )}
                    {prodotto.marchi?.senza_cereali && (
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow">
                        <img
                          src="/senza cereali.jpg"
                          alt="Senza Cereali"
                          title="Senza Cereali"
                          className="w-full h-16 object-contain"
                        />
                      </div>
                    )}
                    {prodotto.marchi?.riso_italiano && (
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow">
                        <img
                          src="/riso italiano.jpg"
                          alt="Riso Italiano"
                          title="Riso Italiano"
                          className="w-full h-16 object-contain"
                        />
                      </div>
                    )}
                    {prodotto.marchi?.varieta_antica && (
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow">
                        <img
                          src="/varieta.antica.jpg"
                          alt="Varietà Antica"
                          title="Varietà Antica"
                          className="w-full h-16 object-contain"
                        />
                      </div>
                    )}
                    {prodotto.marchi?.macinato_a_pietra && (
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow">
                        <img
                          src="/macinata a pietra.jpg"
                          alt="Macinato a Pietra"
                          title="Macinato a Pietra"
                          className="w-full h-16 object-contain"
                        />
                      </div>
                    )}
                    {prodotto.marchi?.decorticato_a_pietra && (
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow">
                        <img
                          src="/decorticato a pietra.jpg"
                          alt="Decorticato a Pietra"
                          title="Decorticato a Pietra"
                          className="w-full h-16 object-contain"
                        />
                      </div>
                    )}
                    {prodotto.marchi?.pianificabile_superiore && (
                      <div className="bg-gradient-to-r from-primary to-blue-600 text-white rounded-lg p-3 border border-gray-200 flex items-center justify-center hover:shadow-md transition-shadow">
                        <span className="text-sm font-medium text-center">
                          Pianificabile superiore
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Nutritional Values */}
                {prodotto.valori_nutrizionali && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">
                      Valori Nutrizionali
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="text-sm text-gray-700 space-y-2">
                        {prodotto.valori_nutrizionali
                          ?.split("\n")
                          .map((line, index) => {
                            if (!line.trim()) return null;
                            const firstSpaceIndex = line.indexOf(" ");
                            let firstWord, rest;
                            if (firstSpaceIndex === -1) {
                              firstWord = line;
                              rest = "";
                            } else {
                              firstWord = line.substring(0, firstSpaceIndex);
                              rest = line.substring(firstSpaceIndex + 1);
                            }
                            return (
                              <div
                                key={index}
                                className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0"
                              >
                                <span className="font-semibold text-gray-900">
                                  {firstWord}
                                </span>
                                <span className="text-gray-600">{rest}</span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                )}


              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="bg-[#FBECC9] py-16 mt-16">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Prodotti correlati
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Scopri altri prodotti della nostra selezione che potrebbero
                interessarti
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {prodotti.slice(0, 3).map((product: ProdottoType) => (
                <div
                  key={product._id}
                  className="transform hover:scale-105 transition-transform duration-200"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
