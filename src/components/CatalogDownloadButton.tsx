"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Loader2, CheckCircle } from "lucide-react";
import { useCatalogPDF } from '../hooks/useCatalogPDF';
import { ProdottoType, CategoriaType } from '../../types';

interface CatalogDownloadButtonProps {
    prodotti: ProdottoType[];
    categorie: CategoriaType[];
    className?: string;
}

const CatalogDownloadButton: React.FC<CatalogDownloadButtonProps> = ({
    prodotti,
    categorie,
    className = ""
}) => {
    const { generatePDF, isGenerating, progress, status } = useCatalogPDF();

    const handleDownload = async () => {
        // This is now truly async and non-blocking
        generatePDF(prodotti, categorie);
    };

    return (
        <div className={`relative group ${className}`}>
            <Button
                onClick={handleDownload}
                disabled={isGenerating}
                className="relative bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group w-full sm:w-auto"
                size="lg"
            >
                {isGenerating ? (
                    <div className="flex flex-col items-center">
                        <div className="flex items-center mb-2">
                            <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                            <span>Generazione PDF...</span>
                        </div>
                        <div className="text-xs opacity-80">
                            {status}
                        </div>
                        {progress > 0 && (
                            <div className="w-full bg-white/20 rounded-full h-1 mt-2">
                                <div
                                    className="bg-white h-1 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        )}
                    </div>
                ) : status === 'Completato!' ? (
                    <>
                        <CheckCircle className="w-5 h-5 mr-3 text-gray-400" />
                        <span>PDF Scaricato!</span>
                    </>
                ) : (
                    <>
                        <Download className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                        <span>Scarica Catalogo Prodotti</span>
                        <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </Button>

            {/* Progress tooltip for more details */}
            {isGenerating && progress > 0 && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black/75 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                    {progress}% - {status}
                </div>
            )}
        </div>
    );
};

export default CatalogDownloadButton; 