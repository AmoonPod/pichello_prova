"use client";

import React, { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

interface BarcodeProps {
  value: string;
  format?: string; // e.g., EAN13, CODE128
  width?: number;
  height?: number;
  displayValue?: boolean;
  margin?: number;
}

const BarcodeDisplay: React.FC<BarcodeProps> = ({
  value,
  format = "EAN13", // Default to EAN13 for EAN codes
  width = 2,
  height = 50,
  displayValue = true, // Show EAN below barcode by default
  margin = 10,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current && value) {
      try {
        JsBarcode(svgRef.current, value, {
          format: format,
          width: width,
          height: height,
          displayValue: displayValue,
          margin: margin,
          fontOptions: "bold",
          fontSize: 14,
        });
      } catch (e) {
        console.error("Barcode generation failed:", e);
        // Optionally clear the SVG or show an error message
        if (svgRef.current) {
          svgRef.current.innerHTML = ""; // Clear previous barcode on error
        }
      }
    }
  }, [value, format, width, height, displayValue, margin]); // Re-run if props change

  // Render nothing if value is empty, or handle error state
  if (!value) {
    return null;
  }

  return <svg ref={svgRef} />;
};

export default BarcodeDisplay;
