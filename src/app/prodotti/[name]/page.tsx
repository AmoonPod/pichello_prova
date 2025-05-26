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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section */}
        <div className="relative bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Gallery Section */}
              <div className="lg:sticky lg:top-8">
                {hasImages ? (
                  <ProdottoGallery images={prodotto.immagini} />
                ) : (
                  <div className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center shadow-lg">
                    <ImageIcon className="w-32 h-32 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Product Info Section */}
              <div className="space-y-8">
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
        <section className="bg-gradient-to-br from-gray-100 to-gray-50 py-16 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
