"use client";

import React, { useState, useCallback } from 'react';
import { ProdottoType, CategoriaType } from '../../types';

export const useCatalogPDF = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<string>('');

    const generatePDF = useCallback((prodotti: ProdottoType[], categorie: CategoriaType[]) => {
        if (isGenerating) return;

        setIsGenerating(true);
        setProgress(0);
        setStatus('Inizializzazione...');

        // Use setTimeout to make it completely non-blocking
        setTimeout(async () => {
            try {
                // Step 1: Load libraries (20%)
                setStatus('Caricamento librerie...');
                setProgress(20);

                const { default: jsPDF } = await import('jspdf');

                // Step 2: Prepare data (30%)
                setStatus('Preparazione dati...');
                setProgress(30);

                // Debug: log input data
                console.log('Prodotti ricevuti:', prodotti.length);
                console.log('Categorie ricevute:', categorie.length);

                // Group products by category
                const prodottiPerCategoria = categorie.map(categoria => ({
                    categoria,
                    prodotti: prodotti.filter(p => p.categoria === categoria.nome)
                })).filter(group => group.prodotti.length > 0);

                console.log('Prodotti per categoria:', prodottiPerCategoria);

                // Check if we have data
                if (prodottiPerCategoria.length === 0) {
                    console.warn('Nessun prodotto trovato per le categorie');
                    // Create a fallback with all products
                    if (prodotti.length > 0) {
                        prodottiPerCategoria.push({
                            categoria: {
                                _id: 'fallback',
                                nome: 'Tutti i Prodotti',
                                descrizione: 'Catalogo completo dei nostri prodotti',
                                slug: { current: 'tutti-prodotti', _type: 'slug' }
                            },
                            prodotti: prodotti
                        });
                    } else {
                        // If no products at all, create a placeholder
                        console.error('Nessun prodotto disponibile!');
                        throw new Error('Nessun prodotto disponibile per generare il catalogo.');
                    }
                }

                // Step 3: Create PDF (40%)
                setStatus('Creazione PDF...');
                setProgress(40);

                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4'
                });

                // PDF dimensions
                const pageWidth = 210;
                const pageHeight = 297;
                const margin = 15;
                const contentWidth = pageWidth - (margin * 2);
                const contentHeight = pageHeight - (margin * 2);

                let yPosition = margin;
                let currentPage = 1;

                // Helper functions
                const addNewPage = () => {
                    pdf.addPage();
                    yPosition = margin;
                    currentPage++;
                };

                const checkPageSpace = (requiredSpace: number) => {
                    if (yPosition + requiredSpace > pageHeight - margin) {
                        addNewPage();
                        return true;
                    }
                    return false;
                };

                const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 10, style: 'normal' | 'bold' | 'italic' = 'normal', color: number[] = [0, 0, 0]) => {
                    pdf.setTextColor(color[0], color[1], color[2]);
                    pdf.setFontSize(fontSize);
                    pdf.setFont('helvetica', style);
                    const lines = pdf.splitTextToSize(text, maxWidth);
                    pdf.text(lines, x, y);
                    return lines.length * (fontSize * 0.35 + 1); // Line height with spacing
                };

                const addSection = (title: string, content: string, x: number, y: number, maxWidth: number) => {
                    let currentY = y;

                    // Add title
                    pdf.setFontSize(9);
                    pdf.setFont('helvetica', 'bold');
                    pdf.text(title, x, currentY);
                    currentY += 4;

                    // Add content
                    if (content) {
                        pdf.setFontSize(8);
                        pdf.setFont('helvetica', 'normal');
                        const lines = pdf.splitTextToSize(content, maxWidth);
                        pdf.text(lines, x, currentY);
                        currentY += lines.length * 3;
                    }

                    return currentY - y;
                };

                // Step 4: Add header (50%)
                setStatus('Aggiunta intestazione...');
                setProgress(50);

                // Main header
                pdf.setFillColor(112, 42, 0); // Primary color from site
                pdf.rect(0, 0, pageWidth, 35, 'F');

                // Company name
                pdf.setTextColor(255, 255, 255);
                pdf.setFontSize(20);
                pdf.setFont('helvetica', 'bold');
                pdf.text('Azienda Agricola Il Pichello', margin, 15);

                pdf.setFontSize(12);
                pdf.setFont('helvetica', 'normal');
                pdf.text('Catalogo Prodotti Biorazionali', margin, 25);

                // Contact info in header
                pdf.setFontSize(8);
                pdf.text('Tel: 340/8200080 | 339/7981644 | info@agricolailpichello.it', margin, 31);

                yPosition = 45;

                // Company info box
                pdf.setTextColor(0, 0, 0);
                pdf.setDrawColor(112, 42, 0);
                pdf.setLineWidth(0.5);
                pdf.rect(margin, yPosition, contentWidth, 25);

                const infoY = yPosition + 5;
                pdf.setFontSize(9);
                pdf.setFont('helvetica', 'bold');
                pdf.text('Informazioni Azienda', margin + 5, infoY);

                pdf.setFontSize(8);
                pdf.setFont('helvetica', 'normal');
                pdf.text('Via Dante Alighieri 141, 42033 Marola, Carpineti (RE) - Emilia-Romagna', margin + 5, infoY + 5);
                pdf.text('Dal 1985 - Tradizione e qualità nell\'Appennino Reggiano', margin + 5, infoY + 10);
                pdf.text('Prodotti biorazionali certificati e controllati', margin + 5, infoY + 15);

                yPosition += 35;

                // Add a test line to ensure PDF generation works
                pdf.setTextColor(0, 0, 0);
                pdf.setFontSize(10);
                pdf.setFont('helvetica', 'normal');
                pdf.text('Test: Generazione PDF funzionante', margin, yPosition);
                yPosition += 10;

                // Step 5: Add products (60-90%)
                setStatus('Aggiunta prodotti...');
                setProgress(60);

                let productCount = 0;
                const totalProducts = prodottiPerCategoria.reduce((sum, group) => sum + group.prodotti.length, 0);

                console.log('Totale prodotti da processare:', totalProducts);

                for (const group of prodottiPerCategoria) {
                    console.log(`Processando categoria: ${group.categoria.nome} con ${group.prodotti.length} prodotti`);
                    // Check space for category header
                    checkPageSpace(25);

                    // Category header with background
                    pdf.setFillColor(254, 243, 234); // Light orange background (matching primary)
                    pdf.setDrawColor(112, 42, 0); // Primary color
                    pdf.setLineWidth(0.5);
                    pdf.rect(margin, yPosition, contentWidth, 15, 'FD');

                    pdf.setTextColor(112, 42, 0); // Primary color text
                    pdf.setFontSize(14);
                    pdf.setFont('helvetica', 'bold');
                    pdf.text(group.categoria.nome, margin + 5, yPosition + 6);

                    pdf.setFontSize(8);
                    pdf.setFont('helvetica', 'normal');
                    pdf.text(`${group.prodotti.length} prodotti disponibili`, margin + 5, yPosition + 11);

                    yPosition += 20;

                    // Category description
                    if (group.categoria.descrizione) {
                        checkPageSpace(15);
                        pdf.setTextColor(107, 114, 128);
                        pdf.setFontSize(8);
                        pdf.setFont('helvetica', 'italic');
                        const descHeight = addWrappedText(group.categoria.descrizione, margin + 5, yPosition, contentWidth - 10, 8, 'italic');
                        yPosition += descHeight + 5;
                    }

                    // Products in this category
                    for (const prodotto of group.prodotti) {
                        productCount++;
                        const progressValue = 60 + (productCount / totalProducts) * 30;
                        setProgress(Math.round(progressValue));

                        // Reset colors and styles
                        pdf.setTextColor(0, 0, 0);
                        pdf.setFontSize(10);
                        pdf.setFont('helvetica', 'normal');

                        // Estimate product card height
                        let estimatedHeight = 60; // Base height

                        // Add height for description
                        if (prodotto.descrizione) {
                            const descLines = Math.ceil(prodotto.descrizione.length / 80);
                            estimatedHeight += descLines * 3;
                        }

                        // Add height for formats
                        if (prodotto.formati && prodotto.formati.length > 0) {
                            estimatedHeight += 15 + (Math.ceil(prodotto.formati.length / 3) * 8);
                        }

                        // Add height for nutritional values
                        if (prodotto.valori_nutrizionali) {
                            const nutritionalLines = prodotto.valori_nutrizionali.split('\n').filter(line => line.trim()).length;
                            estimatedHeight += 15 + (nutritionalLines * 3);
                        }

                        // Check if we need a new page
                        checkPageSpace(estimatedHeight);

                        const cardStartY = yPosition;

                        // Draw the product card background FIRST
                        pdf.setFillColor(255, 255, 255);
                        pdf.setDrawColor(229, 231, 235);
                        pdf.setLineWidth(0.3);
                        pdf.rect(margin, cardStartY, contentWidth, estimatedHeight, 'FD');

                        let cardY = yPosition + 5;



                        // Product name
                        const productName = prodotto.nome || 'Nome prodotto non disponibile';
                        const nameHeight = addWrappedText(productName, margin + 5, cardY, contentWidth * 0.6, 12, 'bold', [0, 0, 0]);
                        cardY += nameHeight + 2;

                        // Product description
                        if (prodotto.descrizione) {
                            const descHeight = addWrappedText(prodotto.descrizione, margin + 5, cardY, contentWidth * 0.9, 9, 'normal', [60, 60, 60]);
                            cardY += descHeight + 3;
                        }

                        // Quick info section
                        const quickInfoY = cardY;
                        const infoBoxWidth = (contentWidth - 20) / 4;

                        // Quick info boxes
                        const quickInfoItems = [
                            { label: 'Scadenza', value: prodotto.scadenza || 'N/D' },
                            { label: 'Pezzi per scatola', value: prodotto.pezzi !== null && prodotto.pezzi !== undefined ? prodotto.pezzi.toString() : 'N/D' },
                            { label: 'Umidità', value: prodotto.umidita !== null && prodotto.umidita !== undefined ? `${prodotto.umidita}%` : 'N/D' },
                            { label: 'Allergeni', value: 'Può contenere Glutine' }
                        ];

                        for (let i = 0; i < quickInfoItems.length; i++) {
                            const x = margin + 5 + (i * (infoBoxWidth + 2));

                            // Info box background - stile più simile al sito
                            pdf.setFillColor(248, 250, 252);
                            pdf.setDrawColor(203, 213, 225);
                            pdf.setLineWidth(0.2);
                            pdf.rect(x, quickInfoY, infoBoxWidth, 14, 'FD');

                            // Label
                            pdf.setTextColor(107, 114, 128);
                            pdf.setFontSize(6);
                            pdf.setFont('helvetica', 'normal');
                            pdf.text(quickInfoItems[i].label, x + 2, quickInfoY + 4);

                            // Value
                            pdf.setTextColor(17, 24, 39);
                            pdf.setFontSize(8);
                            pdf.setFont('helvetica', 'bold');
                            const valueLines = pdf.splitTextToSize(quickInfoItems[i].value, infoBoxWidth - 4);
                            pdf.text(valueLines, x + 2, quickInfoY + 9);
                        }

                        cardY += 20;

                        // Formats section
                        if (prodotto.formati && prodotto.formati.length > 0) {
                            pdf.setTextColor(17, 24, 39);
                            pdf.setFontSize(10);
                            pdf.setFont('helvetica', 'bold');
                            pdf.text('Formati Disponibili', margin + 5, cardY);
                            cardY += 6;

                            // Group formats by EAN (come nel sito web)
                            const groupedFormats = prodotto.formati.reduce((groups, item) => {
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
                            }, {} as Record<string, string[]>);

                            for (const [ean, formats] of Object.entries(groupedFormats)) {
                                // Format group background - stile del sito
                                pdf.setFillColor(249, 250, 251);
                                pdf.setDrawColor(229, 231, 235);
                                pdf.setLineWidth(0.2);
                                pdf.rect(margin + 5, cardY, contentWidth - 10, 18, 'FD');

                                // Formati con stile del sito (badge verdi)
                                let formatX = margin + 8;
                                let formatY = cardY + 5;

                                for (const formato of formats) {
                                    const formatWidth = Math.max(20, formato.length * 2 + 6);

                                    // Badge background
                                    pdf.setFillColor(112, 42, 0); // Primary color from site
                                    pdf.rect(formatX, formatY, formatWidth, 6, 'F');

                                    // Badge text
                                    pdf.setTextColor(255, 255, 255);
                                    pdf.setFontSize(6);
                                    pdf.setFont('helvetica', 'bold');
                                    pdf.text(formato, formatX + 2, formatY + 4);

                                    formatX += formatWidth + 3;

                                    // Se non c'è spazio, vai a capo
                                    if (formatX > margin + contentWidth - 30) {
                                        formatX = margin + 8;
                                        formatY += 8;
                                    }
                                }

                                // EAN code section
                                if (ean !== 'no-ean') {
                                    pdf.setTextColor(75, 85, 99);
                                    pdf.setFontSize(7);
                                    pdf.setFont('helvetica', 'bold');
                                    pdf.text('Codice EAN:', margin + 8, cardY + 13);

                                    pdf.setTextColor(17, 24, 39);
                                    pdf.setFontSize(7);
                                    pdf.setFont('helvetica', 'normal');
                                    pdf.text(ean, margin + 30, cardY + 13);
                                } else {
                                    pdf.setTextColor(156, 163, 175);
                                    pdf.setFontSize(7);
                                    pdf.setFont('helvetica', 'normal');
                                    pdf.text('EAN: Non disponibile', margin + 8, cardY + 13);
                                }

                                cardY += 22;
                            }
                        }

                        // Certifications and Brands
                        if (prodotto.marchi && Object.values(prodotto.marchi).some(Boolean)) {
                            pdf.setTextColor(17, 24, 39);
                            pdf.setFontSize(10);
                            pdf.setFont('helvetica', 'bold');
                            pdf.text('Certificazioni e Marchi', margin + 5, cardY);
                            cardY += 6;

                            const certificazioni = [];
                            if (prodotto.marchi.prodotto_di_montagna) certificazioni.push('Prodotto di Montagna');
                            if (prodotto.marchi.senza_ammollo) certificazioni.push('Senza Ammollo');
                            if (prodotto.marchi.senza_cereali) certificazioni.push('Senza Cereali');
                            if (prodotto.marchi.riso_italiano) certificazioni.push('Riso Italiano');
                            if (prodotto.marchi.varieta_antica) certificazioni.push('Varietà Antica');
                            if (prodotto.marchi.macinato_a_pietra) certificazioni.push('Macinato a Pietra');
                            if (prodotto.marchi.decorticato_a_pietra) certificazioni.push('Decorticato a Pietra');
                            if (prodotto.marchi.pianificabile_superiore) certificazioni.push('Pianificabile Superiore');

                            // Container background
                            const certContainerHeight = Math.ceil(certificazioni.length / 4) * 12 + 8;
                            pdf.setFillColor(249, 250, 251);
                            pdf.setDrawColor(229, 231, 235);
                            pdf.setLineWidth(0.2);
                            pdf.rect(margin + 5, cardY, contentWidth - 10, certContainerHeight, 'FD');

                            // Display certifications in a grid (stile del sito)
                            let certX = margin + 8;
                            let certY = cardY + 4;
                            const certBoxWidth = (contentWidth - 26) / 4; // 4 per riga
                            const certBoxHeight = 8;
                            let certsInRow = 0;

                            for (const cert of certificazioni) {
                                if (certsInRow >= 4) {
                                    certX = margin + 8;
                                    certY += certBoxHeight + 2;
                                    certsInRow = 0;
                                }

                                // Certification box background - stile del sito
                                pdf.setFillColor(248, 250, 252);
                                pdf.setDrawColor(203, 213, 225);
                                pdf.setLineWidth(0.1);
                                pdf.rect(certX, certY, certBoxWidth, certBoxHeight, 'FD');

                                // Certification text
                                pdf.setTextColor(55, 65, 81);
                                pdf.setFontSize(5);
                                pdf.setFont('helvetica', 'bold');
                                const certLines = pdf.splitTextToSize(cert, certBoxWidth - 2);
                                pdf.text(certLines, certX + 1, certY + 3);

                                certX += certBoxWidth + 2;
                                certsInRow++;
                            }

                            cardY += certContainerHeight + 5;
                        }

                        // Nutritional values
                        if (prodotto.valori_nutrizionali) {
                            pdf.setTextColor(17, 24, 39);
                            pdf.setFontSize(10);
                            pdf.setFont('helvetica', 'bold');
                            pdf.text('Valori Nutrizionali', margin + 5, cardY);
                            cardY += 6;

                            // Nutritional values background - stile del sito
                            const nutritionalLines = prodotto.valori_nutrizionali.split('\n').filter(line => line.trim());
                            const nutritionalHeight = nutritionalLines.length * 4 + 8;

                            pdf.setFillColor(249, 250, 251);
                            pdf.setDrawColor(229, 231, 235);
                            pdf.setLineWidth(0.2);
                            pdf.rect(margin + 5, cardY, contentWidth - 10, nutritionalHeight, 'FD');

                            let nutY = cardY + 5;

                            for (const line of nutritionalLines) {
                                if (line.trim()) {
                                    const firstSpaceIndex = line.indexOf(' ');
                                    if (firstSpaceIndex > 0) {
                                        const label = line.substring(0, firstSpaceIndex).trim();
                                        const value = line.substring(firstSpaceIndex + 1).trim();

                                        // Draw line separator
                                        if (nutY > cardY + 5) {
                                            pdf.setDrawColor(229, 231, 235);
                                            pdf.setLineWidth(0.1);
                                            pdf.line(margin + 8, nutY - 2, margin + contentWidth - 8, nutY - 2);
                                        }

                                        // Label
                                        pdf.setTextColor(75, 85, 99);
                                        pdf.setFontSize(7);
                                        pdf.setFont('helvetica', 'bold');
                                        pdf.text(label, margin + 8, nutY);

                                        // Value (aligned to the right)
                                        pdf.setTextColor(17, 24, 39);
                                        pdf.setFontSize(7);
                                        pdf.setFont('helvetica', 'normal');
                                        pdf.text(value, margin + contentWidth - 8, nutY, { align: 'right' });
                                    } else {
                                        // Handle single values
                                        pdf.setTextColor(75, 85, 99);
                                        pdf.setFontSize(7);
                                        pdf.setFont('helvetica', 'normal');
                                        pdf.text(line.trim(), margin + 8, nutY);
                                    }
                                    nutY += 4;
                                }
                            }

                            cardY += nutritionalHeight + 5;
                        }

                        yPosition = cardY + 8; // Space between cards
                    }

                    yPosition += 5; // Extra space between categories
                }

                // Step 6: Add footer (95%)
                setStatus('Finalizzazione...');
                setProgress(95);

                // Footer on every page
                const addFooter = (pageNum: number) => {
                    const footerY = pageHeight - 10;

                    pdf.setTextColor(107, 114, 128);
                    pdf.setFontSize(7);
                    pdf.setFont('helvetica', 'italic');

                    // Left side - generation date
                    const currentDate = new Date().toLocaleDateString('it-IT');
                    pdf.text(`Catalogo generato il ${currentDate}`, margin, footerY);

                    // Center - company name
                    pdf.setFont('helvetica', 'bold');
                    pdf.text('Azienda Agricola Il Pichello', pageWidth / 2, footerY, { align: 'center' });

                    // Right side - page number
                    pdf.setFont('helvetica', 'normal');
                    pdf.text(`Pagina ${pageNum}`, pageWidth - margin, footerY, { align: 'right' });
                };

                // Add footer to all pages
                for (let i = 1; i <= currentPage; i++) {
                    if (i > 1) {
                        pdf.setPage(i);
                    }
                    addFooter(i);
                }

                // Step 7: Download (100%)
                setStatus('Download in corso...');
                setProgress(100);

                const currentDateForFilename = new Date().toLocaleDateString('it-IT').replace(/\//g, '-');
                pdf.save(`Catalogo-Il-Pichello-${currentDateForFilename}.pdf`);

                setStatus('Completato!');

            } catch (error) {
                console.error('Error generating PDF:', error);

                const errorMessage = error instanceof Error ? error.message : 'Errore sconosciuto';
                setStatus('Errore nella generazione');

                alert('Errore durante la generazione del PDF. Riprova tra qualche momento.');
            } finally {
                // Reset after a delay to show completion
                setTimeout(() => {
                    setIsGenerating(false);
                    setProgress(0);
                    setStatus('');
                }, 1500);
            }
        }, 0); // Execute immediately but non-blocking
    }, [isGenerating]);

    return { generatePDF, isGenerating, progress, status };
}; 