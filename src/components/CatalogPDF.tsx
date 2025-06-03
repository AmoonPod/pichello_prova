"use client";

import React from 'react';
import { ProdottoType, CategoriaType } from '../../types';
import { Calendar, Package, Droplets } from 'lucide-react';

interface CatalogPDFProps {
    prodotti: ProdottoType[];
    categorie: CategoriaType[];
}

const CatalogPDF: React.FC<CatalogPDFProps> = ({ prodotti, categorie }) => {
    // Group products by category
    const prodottiPerCategoria = categorie.map(categoria => ({
        categoria,
        prodotti: prodotti.filter(p => p.categoria === categoria.nome)
    })).filter(group => group.prodotti.length > 0);

    return (
        <div
            id="catalog-content"
            className="bg-white text-gray-900 font-sans"
            style={{
                width: '210mm',
                minHeight: '297mm',
                margin: '0 auto',
                padding: '20mm',
                fontSize: '12px',
                lineHeight: '1.4'
            }}
        >
            {/* Header */}
            <div className="text-center mb-12 border-b-2 border-primary pb-8">
                <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">🌾</span>
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Azienda Agricola Il Pichello
                        </h1>
                        <p className="text-lg text-primary font-semibold">
                            Catalogo Prodotti Biorazionali
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-8 text-center text-sm">
                    <div>
                        <h3 className="font-bold text-gray-900 mb-2">Contatti</h3>
                        <p>Tel: 340/8200080</p>
                        <p>Tel: 339/7981644</p>
                        <p>info@agricolailpichello.it</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 mb-2">Indirizzo</h3>
                        <p>Via Dante Alighieri 141</p>
                        <p>42033 Marola, Carpineti (RE)</p>
                        <p>Emilia-Romagna</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 mb-2">Dal</h3>
                        <p className="text-2xl font-bold text-primary">1985</p>
                        <p>Tradizione e qualità</p>
                        <p>nell'Appennino Reggiano</p>
                    </div>
                </div>
            </div>

            {/* Categories and Products */}
            {prodottiPerCategoria.map((group, categoryIndex) => (
                <div key={group.categoria._id} className="mb-12">
                    {/* Category Header */}
                    <div className="mb-8">
                        <div
                            className="rounded-xl p-6 text-center"
                            style={{
                                background: `linear-gradient(135deg, #22c55e, #22c55e80)`,
                                color: 'white'
                            }}
                        >
                            <h2 className="text-3xl font-bold mb-2">
                                {group.categoria.nome}
                            </h2>
                            {group.categoria.descrizione && (
                                <p className="text-lg opacity-90">
                                    {group.categoria.descrizione}
                                </p>
                            )}
                            <div className="mt-4 text-sm opacity-80">
                                {group.prodotti.length} prodott{group.prodotti.length === 1 ? 'o' : 'i'} disponibil{group.prodotti.length === 1 ? 'e' : 'i'}
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 gap-8">
                        {group.prodotti.map((prodotto, productIndex) => (
                            <div
                                key={prodotto._id}
                                className="border border-gray-200 rounded-lg overflow-hidden"
                                style={{ pageBreakInside: 'avoid' }}
                            >
                                <div className="grid grid-cols-3 gap-6 p-6">
                                    {/* Product Image Placeholder - Removed actual images to avoid CORS issues */}
                                    <div className="flex items-center justify-center">
                                        <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex flex-col items-center justify-center text-primary">
                                            <Package className="w-16 h-16 mb-2" />
                                            <span className="text-sm font-semibold text-center px-2">
                                                {prodotto.nome}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="col-span-2">
                                        <div className="mb-4">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                                {prodotto.nome}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {prodotto.descrizione}
                                            </p>
                                        </div>

                                        {/* Quick Info */}
                                        <div className="grid grid-cols-3 gap-4 mb-4">
                                            <div className="bg-gray-50 rounded-lg p-3 text-center">
                                                <Calendar className="w-5 h-5 text-primary mx-auto mb-1" />
                                                <div className="text-xs text-gray-500">Scadenza</div>
                                                <div className="font-semibold text-sm">{prodotto.scadenza || "N/D"}</div>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-3 text-center">
                                                <Package className="w-5 h-5 text-primary mx-auto mb-1" />
                                                <div className="text-xs text-gray-500">Pezzi</div>
                                                <div className="font-semibold text-sm">{prodotto.pezzi ?? "N/D"}</div>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-3 text-center">
                                                <Droplets className="w-5 h-5 text-primary mx-auto mb-1" />
                                                <div className="text-xs text-gray-500">Umidità</div>
                                                <div className="font-semibold text-sm">
                                                    {prodotto.umidita !== null && prodotto.umidita !== undefined
                                                        ? `${prodotto.umidita}%`
                                                        : "N/D"}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Formats */}
                                        {prodotto.formati && prodotto.formati.length > 0 && (
                                            <div className="mb-4">
                                                <h4 className="font-bold text-sm mb-2 text-gray-900">Formati Disponibili:</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {prodotto.formati.map((formato, index) => (
                                                        <span
                                                            key={index}
                                                            className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium"
                                                        >
                                                            {formato.formato}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Certifications */}
                                        {prodotto.marchi && Object.values(prodotto.marchi).some(Boolean) && (
                                            <div>
                                                <h4 className="font-bold text-sm mb-2 text-gray-900">Certificazioni:</h4>
                                                <div className="flex flex-wrap gap-2 text-xs">
                                                    {prodotto.marchi.prodotto_di_montagna && (
                                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                                                            Prodotto di Montagna
                                                        </span>
                                                    )}
                                                    {prodotto.marchi.senza_ammollo && (
                                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                            Senza Ammollo
                                                        </span>
                                                    )}
                                                    {prodotto.marchi.senza_cereali && (
                                                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">
                                                            Senza Cereali
                                                        </span>
                                                    )}
                                                    {prodotto.marchi.riso_italiano && (
                                                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                                                            Riso Italiano
                                                        </span>
                                                    )}
                                                    {prodotto.marchi.varieta_antica && (
                                                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                                                            Varietà Antica
                                                        </span>
                                                    )}
                                                    {prodotto.marchi.macinato_a_pietra && (
                                                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                                            Macinato a Pietra
                                                        </span>
                                                    )}
                                                    {prodotto.marchi.decorticato_a_pietra && (
                                                        <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                                                            Decorticato a Pietra
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Nutritional Values */}
                                {prodotto.valori_nutrizionali && (
                                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                                        <h4 className="font-bold text-sm mb-3 text-gray-900">Valori Nutrizionali:</h4>
                                        <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs">
                                            {prodotto.valori_nutrizionali.split('\n').map((line, index) => {
                                                if (!line.trim()) return null;
                                                const [label, value] = line.split(' ').reduce((acc, word, i) => {
                                                    if (i === 0) acc[0] = word;
                                                    else acc[1] = (acc[1] || '') + ' ' + word;
                                                    return acc;
                                                }, ['', '']);

                                                return (
                                                    <div key={index} className="flex justify-between">
                                                        <span className="font-medium text-gray-700">{label}:</span>
                                                        <span className="text-gray-600">{value?.trim()}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Footer */}
            <div className="border-t-2 border-primary pt-6 mt-12 text-center text-sm text-gray-600">
                <p className="mb-2">
                    <strong>Azienda Agricola Il Pichello</strong> -
                    Prodotti biorazionali dell'Appennino Reggiano dal 1985
                </p>
                <p>
                    Per ordini e informazioni: 340/8200080 | 339/7981644 | info@agricolailpichello.it
                </p>
                <p className="mt-2 text-xs">
                    Catalogo generato il {new Date().toLocaleDateString('it-IT')}
                </p>
            </div>
        </div>
    );
};

export default CatalogPDF; 