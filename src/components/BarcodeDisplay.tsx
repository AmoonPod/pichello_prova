"use client";

import React, { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

interface BarcodeProps {
  code?: string; // For backward compatibility
  value?: string; // Legacy prop name
  productName?: string; // For accessibility
  format?: string; // Product format description
  barcodeFormat?: string; // e.g., EAN13, CODE128
  width?: number;
  height?: number;
  displayValue?: boolean;
  margin?: number;
  compact?: boolean; // For catalog compact view
}

// Function to validate and fix EAN codes
function validateAndFixEAN(ean: string): string | null {
  // Remove all non-numeric characters and spaces
  const cleaned = ean.replace(/\D/g, "").trim();

  // Must have at least some digits
  if (cleaned.length === 0) {
    return null;
  }

  // Check if we have a valid length for EAN13 (12-13 digits)
  if (cleaned.length < 12) {
    return null; // Too short, cannot fix
  }

  // If it's 14 digits, take the first 13 (common case)
  if (cleaned.length === 14) {
    return cleaned.substring(0, 13);
  }

  // If it's exactly 13 digits, return as is
  if (cleaned.length === 13) {
    return cleaned;
  }

  // If it's 12 digits, calculate the check digit
  if (cleaned.length === 12) {
    const checkDigit = calculateEAN13CheckDigit(cleaned);
    return cleaned + checkDigit;
  }

  // If longer than 14, take the first 13
  if (cleaned.length > 14) {
    return cleaned.substring(0, 13);
  }

  return null;
}

// Function to calculate EAN13 check digit
function calculateEAN13CheckDigit(ean12: string): string {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(ean12[i]);
    sum += i % 2 === 0 ? digit : digit * 3;
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit.toString();
}

const BarcodeDisplay: React.FC<BarcodeProps> = ({
  code,
  value,
  productName,
  format,
  barcodeFormat = "EAN13", // Default to EAN13 for EAN codes
  width,
  height,
  displayValue = true, // Show EAN below barcode by default
  margin,
  compact = false,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Use code or value (backward compatibility)
  const barcodeValue = code || value;

  // Set defaults based on compact mode
  const finalWidth = width || (compact ? 1.8 : 1.8);
  const finalHeight = height || (compact ? 30 : 40);
  const finalMargin = margin || (compact ? 2 : 5);

  useEffect(() => {
    if (svgRef.current && barcodeValue) {
      try {
        let processedValue = barcodeValue;
        let processedFormat = barcodeFormat;

        // If format is EAN13, validate and fix the EAN code
        if (barcodeFormat === "EAN13") {
          const fixedEAN = validateAndFixEAN(barcodeValue);
          if (fixedEAN) {
            processedValue = fixedEAN;
          } else {
            // If EAN cannot be fixed, fallback to CODE128
            processedValue = barcodeValue;
            processedFormat = "CODE128";
          }
        }

        JsBarcode(svgRef.current, processedValue, {
          format: processedFormat,
          width: finalWidth,
          height: finalHeight,
          displayValue: displayValue,
          margin: finalMargin,
          fontOptions: "bold",
          fontSize: compact ? 10 : 14,
        });
      } catch (e) {
        // Try fallback to CODE128 if EAN13 fails
        try {
          if (barcodeFormat === "EAN13" && svgRef.current) {
            JsBarcode(svgRef.current, barcodeValue, {
              format: "CODE128",
              width: finalWidth,
              height: finalHeight,
              displayValue: displayValue,
              margin: finalMargin,
              fontOptions: "bold",
              fontSize: compact ? 10 : 14,
            });
          }
        } catch (fallbackError) {
          // Clear the SVG on complete failure
          if (svgRef.current) {
            svgRef.current.innerHTML = "";
          }
        }
      }
    }
  }, [barcodeValue, barcodeFormat, finalWidth, finalHeight, displayValue, finalMargin, compact]); // Re-run if props change

  // Render nothing if value is empty
  if (!barcodeValue) {
    return null;
  }

  return (
    <div className="barcode-container w-full overflow-hidden print:barcode-print">
      <svg ref={svgRef} className="max-w-full h-auto print:max-w-full" />
    </div>
  );
};

export default BarcodeDisplay;
