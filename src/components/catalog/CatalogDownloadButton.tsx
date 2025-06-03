"use client";

import { useState } from 'react';
import { Download, FileText, Printer } from 'lucide-react';

export default function CatalogDownloadButton() {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownloadPDF = async () => {
        setIsGenerating(true);

        try {
            // Use the browser's print functionality to generate PDF
            window.print();
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Errore durante la generazione del PDF. Riprova tra qualche momento.');
        } finally {
            // Reset after a delay
            setTimeout(() => {
                setIsGenerating(false);
            }, 1000);
        }
    };

    const handlePreview = () => {
        // Scroll to the preview section
        const previewElement = document.querySelector('.bg-white.rounded-lg.shadow-lg');
        if (previewElement) {
            previewElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
                onClick={handleDownloadPDF}
                disabled={isGenerating}
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:hover:translate-y-0 group"
            >
                {isGenerating ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Generazione in corso...</span>
                    </>
                ) : (
                    <>
                        <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>Scarica Catalogo PDF</span>
                    </>
                )}
            </button>

            <div className="flex gap-2">
                <button
                    onClick={handlePreview}
                    className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-primary font-semibold px-6 py-3 rounded-full border-2 border-primary shadow-sm hover:shadow-md transition-all duration-300 text-sm"
                >
                    <FileText className="w-4 h-4" />
                    <span>Anteprima</span>
                </button>

                <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-3 rounded-full text-sm">
                    <Printer className="w-4 h-4" />
                    <span>Stampa diretta</span>
                </div>
            </div>

            <div className="text-center text-sm text-gray-500 max-w-md">
                <p>
                    Clicca su "Scarica Catalogo PDF" per aprire la finestra di stampa del browser.
                    Seleziona "Salva come PDF" come destinazione per salvare il catalogo.
                </p>
            </div>
        </div>
    );
} 