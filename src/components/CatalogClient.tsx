"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { CategoriaType, ProdottoType } from "../../types";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    Search,
    Filter,
    List,
    Leaf,
    Package,
    Eye,
    ArrowLeft,
    Barcode,
    Printer
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import Breadcrumbs from "@/components/Breadcrumbs";
import CatalogCard, { CatalogCardSkeleton } from "@/components/CatalogCard";

// Debounce hook for search performance
const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const CatalogClient = ({
    prodotti,
    categorie,
    searchParams: serverSearchParams,
}: {
    prodotti: ProdottoType[];
    categorie: CategoriaType[];
    searchParams?: { categoria?: string };
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,
        amount: 0.1,
        margin: "0px 0px -100px 0px",
    });

    const [isVisible, setIsVisible] = useState(false);
    const clientSearchParams = useSearchParams();
    const initialCategory =
        serverSearchParams?.categoria || clientSearchParams.get("categoria");

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        initialCategory
    );
    // Always use detailed view for better B2B experience
    const viewMode = "detailed";
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Debounced search for better performance
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    useEffect(() => {
        if (isInView) setIsVisible(true);
    }, [isInView]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
            setIsLoading(false);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    // Memoized filter function for better performance
    const filteredProdotti = useMemo(() => {
        return prodotti.filter((prodotto) => {
            const matchesSearch = prodotto.nome
                .toLowerCase()
                .includes(debouncedSearchTerm.toLowerCase()) ||
                prodotto.descrizione?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                prodotto.categoria?.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

            const matchesCategory = selectedCategory
                ? prodotto.categoria === selectedCategory
                : true;

            return matchesSearch && matchesCategory;
        });
    }, [prodotti, debouncedSearchTerm, selectedCategory]);

    // Memoized callbacks to prevent unnecessary re-renders
    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, []);

    const handleCategoryChange = useCallback((category: string | null) => {
        setSelectedCategory(category);
    }, []);

    const clearFilters = useCallback(() => {
        setSelectedCategory(null);
        setSearchTerm("");
    }, []);

    // Print functionality
    const handlePrint = useCallback(() => {
        // Add print-specific body class
        document.body.classList.add('printing');

        // Brief delay to allow style application
        setTimeout(() => {
            window.print();

            // Remove class after printing
            setTimeout(() => {
                document.body.classList.remove('printing');
            }, 100);
        }, 100);
    }, []);

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Catalogo Commerciale", href: "/catalogo" },
        ...(selectedCategory
            ? [{ label: selectedCategory, href: `/catalogo?categoria=${selectedCategory}` }]
            : []),
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Catalogo */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <Package className="h-6 w-6 text-primary" />
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Catalogo Commerciale
                                </h1>
                            </div>
                            <Link
                                href="/prodotti"
                                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary transition-colors"
                            >
                                <Eye className="h-4 w-4" />
                                <span className="hidden sm:inline">Vista Cliente</span>
                            </Link>
                        </div>

                        <Breadcrumbs items={breadcrumbItems} />

                        {/* Search and Filters */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-4 print:hidden">
                            {/* Search Bar */}
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    type="text"
                                    placeholder="Cerca prodotti, categorie, descrizioni..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="pl-10 bg-white border-gray-300 focus:border-primary focus:ring-primary"
                                />
                            </div>



                            {/* Print Button */}
                            <button
                                onClick={handlePrint}
                                className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors print:hidden"
                                title="Stampa catalogo"
                            >
                                <Printer className="h-4 w-4" />
                                <span className="hidden sm:inline">Stampa</span>
                            </button>

                            {/* Filters Toggle */}
                            <button
                                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors print:hidden"
                            >
                                <Filter className="h-4 w-4" />
                                <span>Filtri</span>
                                {selectedCategory && (
                                    <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                                        1
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Filters Panel */}
                        {isFiltersOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 p-4 bg-gray-50 rounded-lg border"
                            >
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => handleCategoryChange(null)}
                                        className={`px-3 py-2 text-sm rounded-full transition-colors ${!selectedCategory
                                            ? "bg-primary text-white"
                                            : "bg-white text-gray-700 hover:bg-gray-100"
                                            }`}
                                    >
                                        Tutte le categorie
                                    </button>
                                    {categorie.map((categoria) => (
                                        <button
                                            key={categoria._id}
                                            onClick={() => handleCategoryChange(categoria.nome)}
                                            className={`px-3 py-2 text-sm rounded-full transition-colors ${selectedCategory === categoria.nome
                                                ? "bg-primary text-white"
                                                : "bg-white text-gray-700 hover:bg-gray-100"
                                                }`}
                                        >
                                            {categoria.nome}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Results Summary */}
                        <div className="mt-4 flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-900 font-medium">
                                    {filteredProdotti.length} {filteredProdotti.length === 1 ? 'prodotto' : 'prodotti'}
                                </span>
                                {selectedCategory && (
                                    <span className="text-gray-600">
                                        in <span className="font-medium">{selectedCategory}</span>
                                    </span>
                                )}
                                {searchTerm && (
                                    <span className="text-gray-600">
                                        per <span className="font-medium">"{searchTerm}"</span>
                                    </span>
                                )}
                            </div>
                            {(selectedCategory || searchTerm) && (
                                <button
                                    onClick={clearFilters}
                                    className="text-primary hover:text-primary font-medium text-sm px-3 py-1 rounded-full hover:bg-gray-50 transition-colors"
                                >
                                    Cancella filtri
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:px-0 print:py-0 print:max-w-none" ref={ref}>
                {isLoading ? (
                    // Skeleton loading state
                    <div className="flex flex-col gap-4">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <CatalogCardSkeleton key={index} viewMode={viewMode} />
                        ))}
                    </div>
                ) : filteredProdotti.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <Package className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Nessun prodotto corrisponde ai criteri
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {searchTerm
                                    ? `Non abbiamo trovato prodotti per "${searchTerm}"`
                                    : "Non ci sono prodotti in questa categoria"
                                }
                                {(searchTerm || selectedCategory) && ". Prova a modificare i filtri di ricerca."}
                            </p>
                            {(selectedCategory || searchTerm) && (
                                <button
                                    onClick={clearFilters}
                                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition-colors font-medium"
                                >
                                    Mostra tutti i prodotti
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex flex-col gap-4 print-detailed-list"
                    >
                        {filteredProdotti.map((prodotto, index) => (
                            <motion.div
                                key={prodotto._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={
                                    isVisible
                                        ? { opacity: 1, y: 0 }
                                        : { opacity: 0, y: 20 }
                                }
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.05,
                                    ease: "easeOut",
                                }}
                                className="catalog-card"
                            >
                                <CatalogCard
                                    product={prodotto}
                                    viewMode={viewMode}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default CatalogClient;