"use client";

import React, { useState, useCallback } from "react";
import { ProdottoType, CategoriaType } from "../../types";
import JsBarcode from "jsbarcode";

export const useCatalogPDF = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string>("");

  // Helper function to validate and fix EAN codes
  const validateAndFixEAN = (ean: string): string | null => {
    const cleaned = ean.replace(/\D/g, "").trim();
    if (cleaned.length === 0) return null;
    if (cleaned.length < 12) return null;
    if (cleaned.length === 14) return cleaned.substring(0, 13);
    if (cleaned.length === 13) return cleaned;
    if (cleaned.length === 12) {
      const checkDigit = calculateEAN13CheckDigit(cleaned);
      return cleaned + checkDigit;
    }
    if (cleaned.length > 14) return cleaned.substring(0, 13);
    return null;
  };

  const calculateEAN13CheckDigit = (ean12: string): string => {
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      const digit = parseInt(ean12[i]);
      sum += i % 2 === 0 ? digit : digit * 3;
    }
    const checkDigit = (10 - (sum % 10)) % 10;
    return checkDigit.toString();
  };

  // Helper function to compress and resize images for PDF
  const compressImageForPDF = (
    imageUrl: string,
    maxWidth: number,
    maxHeight: number,
    quality: number = 0.7
  ): Promise<{ dataUrl: string; width: number; height: number } | null> => {
    return new Promise((resolve) => {
      try {
        const img = new Image();
        img.crossOrigin = "anonymous";

        // Set timeout to avoid hanging on slow images
        const timeout = setTimeout(() => {
          resolve(null);
        }, 5000); // 5 second timeout

        img.onload = () => {
          clearTimeout(timeout);
          try {
            // Create canvas for resizing
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            if (!ctx) {
              resolve(null);
              return;
            }

            // Calculate new dimensions while preserving aspect ratio
            let { width, height } = img;
            const aspectRatio = width / height;

            // More aggressive size reduction for PDF
            if (width > maxWidth) {
              width = maxWidth;
              height = width / aspectRatio;
            }

            if (height > maxHeight) {
              height = maxHeight;
              width = height * aspectRatio;
            }

            // Ensure minimum size for readability
            if (width < 100) {
              width = 100;
              height = width / aspectRatio;
            }

            // Set canvas size
            canvas.width = width;
            canvas.height = height;

            // Fill with white background
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, width, height);

            // Draw resized image with highest quality settings
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            // Enable additional quality improvements
            ctx.globalCompositeOperation = "source-over";
            ctx.drawImage(img, 0, 0, width, height);

            // Convert to compressed JPEG with high quality for better appearance
            const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
            resolve({
              dataUrl: compressedDataUrl,
              width: width,
              height: height,
            });
          } catch (error) {
            console.warn("Error compressing image:", error);
            resolve(null);
          }
        };

        img.onerror = () => {
          clearTimeout(timeout);
          resolve(null);
        };

        img.src = imageUrl;
      } catch (error) {
        console.warn("Error loading image:", error);
        resolve(null);
      }
    });
  };

  // Helper function to generate barcode as data URL
  const generateBarcodeDataURL = (ean: string): string | null => {
    try {
      const canvas = document.createElement("canvas");
      const validEAN = validateAndFixEAN(ean);
      if (!validEAN) return null;

      JsBarcode(canvas, validEAN, {
        format: "EAN13",
        width: 1.5,
        height: 40,
        displayValue: true,
        margin: 5,
        fontSize: 8,
        textMargin: 2,
      });

      return canvas.toDataURL();
    } catch (error) {
      return null;
    }
  };

  const generatePDF = useCallback(
    (prodotti: ProdottoType[], categorie: CategoriaType[]) => {
      if (isGenerating) return;

      setIsGenerating(true);
      setProgress(0);
      setStatus("Inizializzazione...");

      // Use setTimeout to make it completely non-blocking
      setTimeout(async () => {
        try {
          // Step 1: Load libraries (20%)
          setStatus("Caricamento librerie...");
          setProgress(20);

          const { default: jsPDF } = await import("jspdf");

          // Step 2: Prepare data (30%)
          setStatus("Preparazione dati...");
          setProgress(30);

          // Debug: log input data
          // Debug logs removed for production

          // Group products by category
          const prodottiPerCategoria = categorie
            .map((categoria) => ({
              categoria,
              prodotti: prodotti.filter((p) => p.categoria === categoria.nome),
            }))
            .filter((group) => group.prodotti.length > 0);

          // Check if we have data
          if (prodottiPerCategoria.length === 0) {
            // Create a fallback with all products
            if (prodotti.length > 0) {
              prodottiPerCategoria.push({
                categoria: {
                  _id: "fallback",
                  nome: "Tutti i Prodotti",
                  descrizione: "Catalogo completo dei nostri prodotti",
                  slug: { current: "tutti-prodotti", _type: "slug" },
                  ordine: 0,
                },
                prodotti: prodotti,
              });
            } else {
              // If no products at all, create a placeholder
              throw new Error(
                "Nessun prodotto disponibile per generare il catalogo."
              );
            }
          }

          // Step 3: Create PDF (40%)
          setStatus("Creazione PDF...");
          setProgress(40);

          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
          });

          // PDF dimensions
          const pageWidth = 210;
          const pageHeight = 297;
          const margin = 15;
          const contentWidth = pageWidth - margin * 2;
          const contentHeight = pageHeight - margin * 2;

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

          const addWrappedText = (
            text: string,
            x: number,
            y: number,
            maxWidth: number,
            fontSize: number = 10,
            style: "normal" | "bold" | "italic" = "normal",
            color: number[] = [0, 0, 0]
          ) => {
            pdf.setTextColor(color[0], color[1], color[2]);
            pdf.setFontSize(fontSize);
            pdf.setFont("helvetica", style);
            const lines = pdf.splitTextToSize(text, maxWidth);
            pdf.text(lines, x, y);
            return lines.length * (fontSize * 0.35 + 1); // Line height with spacing
          };

          const addSection = (
            title: string,
            content: string,
            x: number,
            y: number,
            maxWidth: number
          ) => {
            let currentY = y;

            // Add title
            pdf.setFontSize(9);
            pdf.setFont("helvetica", "bold");
            pdf.text(title, x, currentY);
            currentY += 4;

            // Add content
            if (content) {
              pdf.setFontSize(8);
              pdf.setFont("helvetica", "normal");
              const lines = pdf.splitTextToSize(content, maxWidth);
              pdf.text(lines, x, currentY);
              currentY += lines.length * 3;
            }

            return currentY - y;
          };

          // Step 4: Add header (50%)
          setStatus("Aggiunta intestazione...");
          setProgress(50);

          // Main header
          pdf.setFillColor(112, 42, 0); // Primary color from site
          pdf.rect(0, 0, pageWidth, 35, "F");

          // Company name
          pdf.setTextColor(255, 255, 255);
          pdf.setFontSize(20);
          pdf.setFont("helvetica", "bold");
          pdf.text("Azienda Agricola Il Pichello", margin, 15);

          pdf.setFontSize(12);
          pdf.setFont("helvetica", "normal");
          pdf.text("Catalogo Prodotti Biorazionali", margin, 25);

          // Contact info in header
          pdf.setFontSize(8);
          pdf.text(
            "Tel: 340/8200080 | 339/7981644 | info@agricolailpichello.it",
            margin,
            31
          );

          yPosition = 45;

          // Company info box
          pdf.setTextColor(0, 0, 0);
          pdf.setDrawColor(112, 42, 0);
          pdf.setLineWidth(0.5);
          pdf.rect(margin, yPosition, contentWidth, 25);

          const infoY = yPosition + 5;
          pdf.setFontSize(9);
          pdf.setFont("helvetica", "bold");
          pdf.text("Informazioni Azienda", margin + 5, infoY);

          pdf.setFontSize(8);
          pdf.setFont("helvetica", "normal");
          pdf.text(
            "Via Dante Alighieri 141, 42033 Marola, Carpineti (RE) - Emilia-Romagna",
            margin + 5,
            infoY + 5
          );
          pdf.text(
            "Dal 1985 - Tradizione e qualità nell'Appennino Reggiano",
            margin + 5,
            infoY + 10
          );
          pdf.text(
            "Prodotti biorazionali certificati e controllati",
            margin + 5,
            infoY + 15
          );

          yPosition += 35;

          // Add a test line to ensure PDF generation works
          pdf.setTextColor(0, 0, 0);
          pdf.setFontSize(10);
          pdf.setFont("helvetica", "normal");

          // Step 5: Add products (60-90%)
          setStatus("Aggiunta prodotti...");
          setProgress(60);

          let productCount = 0;
          const totalProducts = prodottiPerCategoria.reduce(
            (sum, group) => sum + group.prodotti.length,
            0
          );

          for (const group of prodottiPerCategoria) {
            // Check space for category header
            checkPageSpace(25);

            // Category header - design pulito e centrato
            pdf.setFillColor(112, 42, 0); // Primary color background
            pdf.rect(margin, yPosition, contentWidth, 16, "F");

            // Category name - centrato e con wrapping gestito
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(12);
            pdf.setFont("helvetica", "bold");

            const categoryText = `${group.categoria.nome} (${group.prodotti.length} prodotti)`;
            const textLines = pdf.splitTextToSize(
              categoryText,
              contentWidth - 10
            );
            const lineHeight = 4; // Altezza riga fissa per il calcolo
            const textHeight = textLines.length * lineHeight;
            const startY = yPosition + (16 - textHeight) / 2 + 4;

            pdf.text(textLines, margin + contentWidth / 2, startY, {
              align: "center",
              baseline: "middle",
            });

            yPosition += 22;

            // Products in this category
            for (const prodotto of group.prodotti) {
              productCount++;
              const progressValue = 60 + (productCount / totalProducts) * 30;
              setProgress(Math.round(progressValue));
              setStatus(
                `Processando prodotto ${productCount}/${totalProducts}...`
              );

              // Reset colors and styles
              pdf.setTextColor(0, 0, 0);
              pdf.setFontSize(10);
              pdf.setFont("helvetica", "normal");

              // Design completamente nuovo - calcolo altezza dinamica
              let leftColHeight = 0;
              let rightColHeight = 0;

              // Calculate left column height
              // Add height for product image if available
              if (prodotto.immagini && prodotto.immagini.length > 0) {
                leftColHeight += 8 + 60 + 5; // Section title + generous estimated image height + spacing
              }
              if (prodotto.formati && prodotto.formati.length > 0) {
                leftColHeight += 8; // Section title
                const groupedFormats = prodotto.formati.reduce(
                  (groups, item) => {
                    const ean = item?.codice_ean || "no-ean";
                    if (!groups[ean]) groups[ean] = [];
                    if (item?.formato) groups[ean].push(item.formato);
                    return groups;
                  },
                  {} as Record<string, string[]>
                );
                for (const [ean, formats] of Object.entries(groupedFormats)) {
                  const formatLines = pdf.splitTextToSize(
                    formats.join(" • "),
                    contentWidth / 2 - 15
                  );
                  leftColHeight += formatLines.length * 4 + 2; // Format text

                  // Add height for barcode or EAN text
                  if (ean !== "no-ean") {
                    leftColHeight += 12 + 5; // Barcode height + spacing
                  } else {
                    leftColHeight += 5; // Text fallback
                  }
                }
              }
              if (
                prodotto.marchi &&
                Object.values(prodotto.marchi).some(Boolean)
              ) {
                leftColHeight += 12; // Section title + spacing
                const certificazioni = Object.keys(prodotto.marchi).filter(
                  (key) =>
                    prodotto.marchi?.[key as keyof typeof prodotto.marchi]
                );
                const certLines = pdf.splitTextToSize(
                  certificazioni.join(", "),
                  contentWidth / 2 - 15
                );
                leftColHeight += certLines.length * 4;
              }

              // Calculate right column height
              // Nutritional values
              if (prodotto.valori_nutrizionali) {
                rightColHeight += 8; // Section title
                const nutritionalLines = prodotto.valori_nutrizionali
                  .split("\n")
                  .filter((line) => line.trim())
                  .slice(0, 8); // Limit to 8 values
                rightColHeight += nutritionalLines.length * 4.5; // More accurate line height
              }

              let estimatedHeight =
                45 + Math.max(leftColHeight, rightColHeight); // Adequate spacing for info bar and content
              checkPageSpace(estimatedHeight);

              const cardStartY = yPosition;

              let cardY = yPosition + 8;

              // Product name
              const productName =
                prodotto.nome || "Nome prodotto non disponibile";
              pdf.setTextColor(0, 0, 0);
              pdf.setFontSize(14);
              pdf.setFont("helvetica", "bold");
              pdf.text(productName, margin + 5, cardY);
              cardY += 6;

              // Separator line
              pdf.setDrawColor(230, 230, 230);
              pdf.line(margin + 5, cardY, margin + contentWidth - 5, cardY);
              cardY += 5;

              // Info essenziali bar
              const infoBarY = cardY;
              pdf.setFillColor(248, 250, 252);
              pdf.rect(margin + 5, infoBarY, contentWidth - 10, 12, "F");

              // Info in formato tabellare pulito
              const infoItems = [
                {
                  label: "Scadenza",
                  value: prodotto.scadenza || "N/D",
                },
                {
                  label: "Pezzi/scatola",
                  value: prodotto.pezzi?.toString() || "N/D",
                },
                {
                  label: "Umidità",
                  value: prodotto.umidita ? `${prodotto.umidita}%` : "N/D",
                },
                {
                  label: "Allergeni",
                  value: "Glutine",
                },
              ];

              const infoColWidth = (contentWidth - 20) / 4;
              for (let i = 0; i < infoItems.length; i++) {
                const x = margin + 8 + i * infoColWidth;

                // Label
                pdf.setTextColor(100, 100, 100);
                pdf.setFontSize(6);
                pdf.setFont("helvetica", "normal");
                pdf.text(infoItems[i].label, x, infoBarY + 4);

                // Value
                pdf.setTextColor(0, 0, 0);
                pdf.setFontSize(7);
                pdf.setFont("helvetica", "bold");
                pdf.text(infoItems[i].value, x, infoBarY + 8);
              }

              cardY += 18;

              const contentStartY = cardY;
              const leftColX = margin + 5;
              const rightColX = margin + contentWidth / 2 + 5;
              const colWidth = contentWidth / 2 - 10;
              let leftY = contentStartY;
              let rightY = contentStartY;

              // --- LEFT COLUMN ---

              // Product Image
              if (prodotto.immagini && prodotto.immagini.length > 0) {
                pdf.setTextColor(0, 0, 0);
                pdf.setFontSize(9);
                pdf.setFont("helvetica", "bold");
                pdf.text("Immagine Prodotto", leftColX, leftY);
                leftY += 5;

                try {
                  const imageUrl = prodotto.immagini[0].image;
                  if (imageUrl) {
                    const imageWidth = colWidth - 10; // Max width for image

                    try {
                      const compressedResult = await compressImageForPDF(
                        imageUrl,
                        400, // max width for compression
                        600, // max height for compression
                        0.9
                      );

                      if (compressedResult) {
                        const sourceAspectRatio =
                          compressedResult.width / compressedResult.height;

                        const scaledWidth = imageWidth;
                        const scaledHeight = scaledWidth / sourceAspectRatio;

                        pdf.setDrawColor(220, 220, 220);
                        pdf.setLineWidth(0.2);
                        pdf.rect(
                          leftColX,
                          leftY,
                          scaledWidth,
                          scaledHeight,
                          "D"
                        );

                        pdf.addImage(
                          compressedResult.dataUrl,
                          "JPEG",
                          leftColX,
                          leftY,
                          scaledWidth,
                          scaledHeight
                        );

                        leftY += scaledHeight + 8;
                      } else {
                        const placeholderHeight = 35;
                        pdf.setTextColor(100, 100, 100);
                        pdf.setFontSize(8);
                        pdf.text(
                          "Immagine non disponibile",
                          leftColX + 5,
                          leftY + placeholderHeight / 2
                        );
                        pdf.setTextColor(0, 0, 0); // Reset color
                        leftY += placeholderHeight + 8;
                      }
                    } catch (error) {
                      const placeholderHeight = 35;
                      pdf.setTextColor(100, 100, 100);
                      pdf.setFontSize(8);
                      pdf.text(
                        "Immagine non disponibile",
                        leftColX + 5,
                        leftY + placeholderHeight / 2
                      );
                      pdf.setTextColor(0, 0, 0); // Reset color
                      leftY += placeholderHeight + 8;
                    }
                  }
                } catch (error) {
                  // If there's any error, just skip the image
                  console.warn("Error adding product image to PDF:", error);
                }
              }

              // Formats section with integrated barcodes
              if (prodotto.formati && prodotto.formati.length > 0) {
                pdf.setTextColor(0, 0, 0);
                pdf.setFontSize(9);
                pdf.setFont("helvetica", "bold");
                pdf.text("Formati", leftColX, leftY);
                leftY += 5;

                const groupedFormats = prodotto.formati.reduce(
                  (groups, item) => {
                    const ean = item?.codice_ean || "no-ean";
                    if (!groups[ean]) groups[ean] = [];
                    if (item?.formato) groups[ean].push(item.formato);
                    return groups;
                  },
                  {} as Record<string, string[]>
                );

                for (const [ean, formats] of Object.entries(groupedFormats)) {
                  // Show formats
                  pdf.setTextColor(112, 42, 0);
                  pdf.setFontSize(8);
                  pdf.setFont("helvetica", "bold");
                  const formatLines = pdf.splitTextToSize(
                    formats.join(" • "),
                    colWidth - 5 // Leave margin for safety
                  );
                  pdf.text(formatLines, leftColX, leftY);
                  leftY += formatLines.length * 4 + 2;

                  // Show barcode instead of text EAN
                  if (ean !== "no-ean") {
                    try {
                      const barcodeDataURL = generateBarcodeDataURL(ean);
                      if (barcodeDataURL) {
                        const maxBarcodeWidth = Math.min(40, colWidth); // Ensure it fits in column
                        const barcodeHeight = 12;

                        pdf.addImage(
                          barcodeDataURL,
                          "PNG",
                          leftColX,
                          leftY,
                          maxBarcodeWidth,
                          barcodeHeight
                        );
                        leftY += barcodeHeight + 5;
                      } else {
                        // Fallback: show EAN as text
                        pdf.setTextColor(100, 100, 100);
                        pdf.setFontSize(7);
                        pdf.text(`EAN: ${ean}`, leftColX, leftY);
                        leftY += 5;
                      }
                    } catch (error) {
                      // Fallback: show EAN as text
                      pdf.setTextColor(100, 100, 100);
                      pdf.setFontSize(7);
                      pdf.text(`EAN: ${ean}`, leftColX, leftY);
                      leftY += 5;
                    }
                  } else {
                    pdf.setTextColor(100, 100, 100);
                    pdf.setFontSize(7);
                    pdf.text("EAN non disponibile", leftColX, leftY);
                    leftY += 5;
                  }
                }
              }

              // Certifications section
              if (
                prodotto.marchi &&
                Object.values(prodotto.marchi).some(Boolean)
              ) {
                leftY += 4;
                pdf.setTextColor(0, 0, 0);
                pdf.setFontSize(9);
                pdf.setFont("helvetica", "bold");
                pdf.text("Certificazioni", leftColX, leftY);
                leftY += 5;

                const certificazioni = [];
                if (prodotto.marchi?.prodotto_di_montagna)
                  certificazioni.push("Prodotto di Montagna");
                if (prodotto.marchi?.varieta_antica)
                  certificazioni.push("Varietà Antica");
                if (prodotto.marchi?.pianificabile_superiore)
                  certificazioni.push("Pianificabile Superiore");
                // Add other certifications here

                pdf.setTextColor(80, 80, 80);
                pdf.setFontSize(8);
                const certLines = pdf.splitTextToSize(
                  certificazioni.join(", "),
                  colWidth - 5 // Leave margin for safety
                );
                pdf.text(certLines, leftColX, leftY);
                leftY += certLines.length * 4;
              }

              // --- RIGHT COLUMN ---

              // Nutritional values
              if (prodotto.valori_nutrizionali) {
                pdf.setTextColor(0, 0, 0);
                pdf.setFontSize(9);
                pdf.setFont("helvetica", "bold");
                pdf.text("Valori Nutrizionali (per 100g)", rightColX, rightY);
                rightY += 5;

                const nutritionalLines = prodotto.valori_nutrizionali
                  .split("\n")
                  .filter((l) => l.trim())
                  .slice(0, 8); // Limit to 8 values

                for (const line of nutritionalLines) {
                  let label = line;
                  let value = "";
                  const firstSpaceIndex = line.indexOf(" ");
                  if (firstSpaceIndex > -1) {
                    label = line.substring(0, firstSpaceIndex).trim();
                    value = line.substring(firstSpaceIndex + 1).trim();
                  }

                  if (rightY > cardStartY + estimatedHeight - 10) continue;

                  pdf.setTextColor(80, 80, 80);
                  pdf.setFontSize(8);
                  pdf.setFont("helvetica", "normal");
                  pdf.text(label, rightColX, rightY);

                  pdf.setTextColor(0, 0, 0);
                  pdf.setFont("helvetica", "bold");
                  pdf.text(value, rightColX + colWidth, rightY, {
                    align: "right",
                  });

                  rightY += 4.5;
                }
              }

              // Calculate actual card height based on content
              const actualHeight = Math.max(leftY, rightY) - cardStartY + 10; // 10px bottom padding

              // Draw card border and separator with the correct dynamic height
              pdf.setDrawColor(220, 220, 220);
              pdf.setLineWidth(0.3);
              pdf.rect(margin, cardStartY, contentWidth, actualHeight, "D");

              // Vertical separator
              pdf.setDrawColor(230, 230, 230);
              pdf.line(
                margin + contentWidth / 2,
                contentStartY - 5,
                margin + contentWidth / 2,
                cardStartY + actualHeight - 5
              );

              yPosition = cardStartY + actualHeight + 5;
            }

            yPosition += 3; // Extra space between categories
          }

          // Step 6: Add footer (95%)
          setStatus("Finalizzazione...");
          setProgress(95);

          // Footer on every page
          const addFooter = (pageNum: number) => {
            const footerY = pageHeight - 10;

            pdf.setTextColor(107, 114, 128);
            pdf.setFontSize(7);
            pdf.setFont("helvetica", "italic");

            // Left side - generation date
            const currentDate = new Date().toLocaleDateString("it-IT");
            pdf.text(`Catalogo generato il ${currentDate}`, margin, footerY);

            // Center - company name
            pdf.setFont("helvetica", "bold");
            pdf.text("Azienda Agricola Il Pichello", pageWidth / 2, footerY, {
              align: "center",
            });

            // Right side - page number
            pdf.setFont("helvetica", "normal");
            pdf.text(`Pagina ${pageNum}`, pageWidth - margin, footerY, {
              align: "right",
            });
          };

          // Add footer to all pages
          for (let i = 1; i <= currentPage; i++) {
            if (i > 1) {
              pdf.setPage(i);
            }
            addFooter(i);
          }

          // Step 7: Download (100%)
          setStatus("Download in corso...");
          setProgress(100);

          const currentDateForFilename = new Date()
            .toLocaleDateString("it-IT")
            .replace(/\//g, "-");
          pdf.save(`Catalogo-Il-Pichello-${currentDateForFilename}.pdf`);

          setStatus("Completato!");
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Errore sconosciuto";
          setStatus("Errore nella generazione");

          alert(
            "Errore durante la generazione del PDF. Riprova tra qualche momento."
          );
        } finally {
          // Reset after a delay to show completion
          setTimeout(() => {
            setIsGenerating(false);
            setProgress(0);
            setStatus("");
          }, 1500);
        }
      }, 0); // Execute immediately but non-blocking
    },
    [isGenerating]
  );

  return { generatePDF, isGenerating, progress, status };
};
