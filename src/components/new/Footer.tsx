"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Wheat,
  Clock,
  Heart,
  ExternalLink,
  Download,
  Loader2,
} from "lucide-react";
import { ProdottoType, CategoriaType } from "../../../types";

interface FooterV2Props {
  prodotti?: ProdottoType[];
  categorie?: CategoriaType[];
}

const FooterV2: React.FC<FooterV2Props> = ({
  prodotti = [],
  categorie = [],
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleCatalogDownload = async () => {
    if (isDownloading) return;

    try {
      setIsDownloading(true);

      // Lazy load the PDF generation functionality
      const { useCatalogPDF } = await import("@/hooks/useCatalogPDF");
      const { generatePDF } = useCatalogPDF();

      generatePDF(prodotti, categorie);

      // Reset loading state after a delay (since we can't detect when download completes)
      setTimeout(() => {
        setIsDownloading(false);
      }, 5000);
    } catch (error) {
      setIsDownloading(false);
    }
  };

  return (
    <footer className="relative bg-white text-gray-900 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-secondary blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/30 blur-[100px]" />
      </div>

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #374151 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Column 1 - Brand & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4 lg:mb-6">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary rounded-full flex items-center justify-center">
                <Wheat className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                  Azienda Agricola Il Pichello
                </h3>
                <p className="text-primary text-sm font-medium">
                  Appennino Reggiano dal 1985
                </p>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6 lg:mb-8 text-base lg:text-lg">
              Nel cuore dell'Appennino Reggiano coltiviamo con passione prodotti
              biorazionali genuini. Dalla terra di Marola alle vostre tavole,
              preservando le tradizioni contadine e rispettando i ritmi della
              natura.
            </p>

            {/* Download Catalog Button - Optimized with lazy loading */}
            <div className="mb-6 lg:mb-8">
              <button
                onClick={handleCatalogDownload}
                disabled={isDownloading}
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground font-semibold px-5 py-2.5 lg:px-6 lg:py-3 rounded-full shadow-lg hover:shadow-xl disabled:shadow-md transition-all duration-300 transform hover:-translate-y-1 disabled:translate-y-0 disabled:cursor-not-allowed text-sm lg:text-base w-full sm:w-auto justify-center sm:justify-start"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="w-4 h-4 lg:w-5 lg:h-5 animate-spin" />
                    Generando PDF...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 lg:w-5 lg:h-5" />
                    Scarica Catalogo PDF
                  </>
                )}
              </button>
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 gap-3 lg:gap-4">
              {/* Phone contacts in a single row on larger screens, stacked on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="tel:3408200080"
                  className="bg-gray-50 rounded-xl p-3 lg:p-4 border border-gray-200 hover:bg-gray-100 transition-all duration-300 block group"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 lg:h-5 lg:w-5 text-primary group-hover:scale-110 transition-transform flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-gray-900 font-semibold text-sm">
                        Mirco
                      </p>
                      <p className="text-gray-600 text-xs group-hover:text-primary transition-colors">
                        340/8200080
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href="tel:3397981644"
                  className="bg-gray-50 rounded-xl p-3 lg:p-4 border border-gray-200 hover:bg-gray-100 transition-all duration-300 block group"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 lg:h-5 lg:w-5 text-primary group-hover:scale-110 transition-transform flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-gray-900 font-semibold text-sm">
                        Viviana
                      </p>
                      <p className="text-gray-600 text-xs group-hover:text-primary transition-colors">
                        339/7981644
                      </p>
                    </div>
                  </div>
                </a>
              </div>

              {/* Email contact full width */}
              <a
                href="mailto:info@agricolailpichello.it"
                className="bg-gray-50 rounded-xl p-3 lg:p-4 border border-gray-200 hover:bg-gray-100 transition-all duration-300 block group"
              >
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 lg:h-5 lg:w-5 text-secondary group-hover:scale-110 transition-transform flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-900 font-semibold text-sm">Email</p>
                    <p className="text-gray-600 text-xs group-hover:text-secondary transition-colors break-all">
                      info@agricolailpichello.it
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Column 2 - Navigation */}
          <div className="mt-8 lg:mt-0">
            <h4 className="text-lg lg:text-xl font-bold mb-4 lg:mb-6 text-gray-900 flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              Navigazione
            </h4>
            <ul className="space-y-2 lg:space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-primary transition-colors duration-300 flex items-center gap-2 group text-sm lg:text-base py-1"
                >
                  <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-primary transition-colors" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#la-nostra-azienda"
                  className="text-gray-600 hover:text-primary transition-colors duration-300 flex items-center gap-2 group text-sm lg:text-base py-1"
                >
                  <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-primary transition-colors" />
                  La Nostra Azienda
                </Link>
              </li>
              <li>
                <Link
                  href="/prodotti"
                  className="text-gray-600 hover:text-primary transition-colors duration-300 flex items-center gap-2 group text-sm lg:text-base py-1"
                >
                  <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-primary transition-colors" />
                  Prodotti
                </Link>
              </li>
              <li>
                <Link
                  href="/#dove-siamo"
                  className="text-gray-600 hover:text-primary transition-colors duration-300 flex items-center gap-2 group text-sm lg:text-base py-1"
                >
                  <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-primary transition-colors" />
                  Dove Siamo
                </Link>
              </li>
              <li>
                <Link
                  href="/contatti"
                  className="text-gray-600 hover:text-primary transition-colors duration-300 flex items-center gap-2 group text-sm lg:text-base py-1"
                >
                  <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-primary transition-colors" />
                  Contatti
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Location & Hours */}
          <div className="mt-8 lg:mt-0">
            <h4 className="text-lg lg:text-xl font-bold mb-4 lg:mb-6 text-gray-900 flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              Dove Trovarci
            </h4>

            <div className="space-y-4 lg:space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 lg:h-5 lg:w-5 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-900 font-medium text-sm">Indirizzo</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Via Dante Alighieri 141
                    <br />
                    42033 Marola, Carpineti (RE)
                    <br />
                    Emilia-Romagna
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 lg:h-5 lg:w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-900 font-medium text-sm">Orari</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Lun-Ven: 9:00 - 18:00
                    <br />
                    Sabato: 9:00 - 13:00
                    <br />
                    <span className="text-xs italic">Domenica: Chiuso</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-6 lg:pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-6">
            {/* Copyright */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <p className="text-gray-600 text-sm">
                © {new Date().getFullYear()} Azienda Agricola Il Pichello.
                Tutti i diritti riservati.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                P.IVA: 01234567890 | REA: RE-123456
              </p>
            </div>

            {/* Developer Credit */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-gray-50 rounded-full px-4 py-2 lg:px-6 lg:py-3 border border-gray-200 hover:bg-gray-100 transition-all duration-300 group order-1 lg:order-2">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-400 group-hover:scale-110 transition-transform" />
                <span className="text-gray-600 text-xs sm:text-sm text-center sm:text-left">
                  Sviluppato con passione da
                </span>
              </div>
              <Link
                href="https://manueldeceglie.it"
                target="_blank"
                className="text-primary font-bold text-xs sm:text-sm hover:text-secondary transition-colors flex items-center gap-1 group"
              >
                Manuel De Ceglie
                <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterV2;
