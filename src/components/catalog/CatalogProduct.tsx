import { ProdottoType } from "../../../types";
import { Image as ImageIcon } from "lucide-react";
import BarcodeDisplay from "@/components/BarcodeDisplay";

interface CatalogProductProps {
    prodotto: ProdottoType;
    isLastInCategory?: boolean;
    isLastCategory?: boolean;
}

export default function CatalogProduct({
    prodotto,
    isLastInCategory,
    isLastCategory
}: CatalogProductProps) {
    const hasImages = prodotto.immagini && prodotto.immagini.length > 0;

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 break-inside-avoid product-card">
            {/* Product Header */}
            <div className="flex flex-col lg:flex-row gap-6 mb-6">
                {/* Image */}
                <div className="lg:w-48 w-full">
                    {hasImages ? (
                        <img
                            src={prodotto.immagini[0]?.image}
                            alt={prodotto.nome}
                            className="w-full h-32 object-cover rounded-lg"
                        />
                    ) : (
                        <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                            <ImageIcon className="w-10 h-10 text-gray-400" />
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {prodotto.nome}
                    </h3>
                    {prodotto.descrizione && (
                        <p className="text-gray-600 leading-relaxed mb-4">
                            {prodotto.descrizione}
                        </p>
                    )}
                </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="text-xs text-gray-500 mb-1">Scadenza</div>
                    <div className="font-semibold text-gray-900 text-sm">
                        {prodotto.scadenza || "N/D"}
                    </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="text-xs text-gray-500 mb-1">Pezzi per scatola</div>
                    <div className="font-semibold text-gray-900 text-sm">
                        {prodotto.pezzi ?? "N/D"}
                    </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="text-xs text-gray-500 mb-1">Umidità</div>
                    <div className="font-semibold text-gray-900 text-sm">
                        {prodotto.umidita !== null && prodotto.umidita !== undefined
                            ? `${prodotto.umidita}%`
                            : "N/D"}
                    </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="text-xs text-gray-500 mb-1">Allergeni</div>
                    <div className="font-semibold text-gray-900 text-xs">
                        Può contenere Glutine
                    </div>
                </div>
            </div>

            {/* Available Formats and EAN Codes */}
            {prodotto.formati && prodotto.formati.length > 0 && (
                <div className="mb-6 format-section">
                    <h4 className="text-lg font-bold mb-3 text-gray-900">
                        Formati Disponibili
                    </h4>
                    <div className="space-y-3">
                        {(() => {
                            // Group formats by EAN code (same logic as product page)
                            const groupedFormats = prodotto.formati.reduce(
                                (groups: Record<string, string[]>, item) => {
                                    // Handle null/undefined item or codice_ean
                                    const ean = (item && item.codice_ean) ? item.codice_ean : 'no-ean';
                                    if (!groups[ean]) {
                                        groups[ean] = [];
                                    }
                                    // Also handle null/undefined formato
                                    if (item && item.formato) {
                                        groups[ean].push(item.formato);
                                    }
                                    return groups;
                                },
                                {} as Record<string, string[]>
                            );

                            return Object.entries(groupedFormats).map(
                                ([ean, formats], index) => (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200"
                                    >
                                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    {formats.map((formato, formatIndex) => (
                                                        <span
                                                            key={formatIndex}
                                                            className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                                                        >
                                                            {formato}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex-1 lg:max-w-xs">
                                                {ean !== "no-ean" ? (
                                                    <div className="bg-white rounded-lg p-3 border border-gray-200 barcode-container">
                                                        <span className="font-medium text-sm block mb-2 text-gray-700">
                                                            Codice EAN:
                                                        </span>
                                                        <BarcodeDisplay
                                                            value={ean}
                                                            height={25}
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

            {/* Certifications and Brands */}
            {prodotto.marchi && Object.values(prodotto.marchi).some(Boolean) && (
                <div className="mb-6 certification-grid">
                    <h4 className="text-lg font-bold mb-3 text-gray-900">
                        Certificazioni e Marchi
                    </h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                        {prodotto.marchi?.prodotto_di_montagna && (
                            <div className="bg-gray-50 rounded-lg p-1 border border-gray-200">
                                <img
                                    src="/logo-Prodotto-di-Montagna.jpg"
                                    alt="Prodotto di Montagna"
                                    title="Prodotto di Montagna"
                                    className="w-full h-8 object-contain"
                                />
                            </div>
                        )}
                        {prodotto.marchi?.senza_ammollo && (
                            <div className="bg-gray-50 rounded-lg p-1 border border-gray-200">
                                <img
                                    src="/senza ammollo.jpg"
                                    alt="Senza Ammollo"
                                    title="Senza Ammollo"
                                    className="w-full h-8 object-contain"
                                />
                            </div>
                        )}
                        {prodotto.marchi?.senza_cereali && (
                            <div className="bg-gray-50 rounded-lg p-1 border border-gray-200">
                                <img
                                    src="/senza cereali.jpg"
                                    alt="Senza Cereali"
                                    title="Senza Cereali"
                                    className="w-full h-8 object-contain"
                                />
                            </div>
                        )}
                        {prodotto.marchi?.riso_italiano && (
                            <div className="bg-gray-50 rounded-lg p-1 border border-gray-200">
                                <img
                                    src="/riso italiano.jpg"
                                    alt="Riso Italiano"
                                    title="Riso Italiano"
                                    className="w-full h-8 object-contain"
                                />
                            </div>
                        )}
                        {prodotto.marchi?.varieta_antica && (
                            <div className="bg-gray-50 rounded-lg p-1 border border-gray-200">
                                <img
                                    src="/varieta.antica.jpg"
                                    alt="Varietà Antica"
                                    title="Varietà Antica"
                                    className="w-full h-8 object-contain"
                                />
                            </div>
                        )}
                        {prodotto.marchi?.macinato_a_pietra && (
                            <div className="bg-gray-50 rounded-lg p-1 border border-gray-200">
                                <img
                                    src="/macinata a pietra.jpg"
                                    alt="Macinato a Pietra"
                                    title="Macinato a Pietra"
                                    className="w-full h-8 object-contain"
                                />
                            </div>
                        )}
                        {prodotto.marchi?.decorticato_a_pietra && (
                            <div className="bg-gray-50 rounded-lg p-1 border border-gray-200">
                                <img
                                    src="/decorticato a pietra.jpg"
                                    alt="Decorticato a Pietra"
                                    title="Decorticato a Pietra"
                                    className="w-full h-8 object-contain"
                                />
                            </div>
                        )}
                        {prodotto.marchi?.pianificabile_superiore && (
                            <div className="bg-gradient-to-r from-primary to-blue-600 text-white rounded-lg p-1 border border-gray-200 flex items-center justify-center">
                                <span className="text-xs font-medium text-center">
                                    Pianificabile superiore
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Nutritional Values */}
            {prodotto.valori_nutrizionali && (
                <div className="nutritional-table">
                    <h4 className="text-lg font-bold mb-3 text-gray-900">
                        Valori Nutrizionali
                    </h4>
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
    );
} 