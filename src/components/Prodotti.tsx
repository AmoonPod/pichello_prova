"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { CategoriaType, ProdottoType } from "../../types";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, Filter, Grid, List, SlidersHorizontal } from "lucide-react";

const ProductsClient = ({
  prodotti,
  categorie,
}: {
  prodotti: ProdottoType[];
  categorie: CategoriaType[];
}) => {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("categoria");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Force list view on mobile
      if (mobile) {
        setViewMode("list");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update selected category if URL changes
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    const currentCategory = searchParams.get("categoria");
    if (currentCategory !== selectedCategory) {
      setSelectedCategory(currentCategory);
    }
  }, [searchParams, selectedCategory]);

  // Filter products based on search term and selected category
  const filteredProdotti = prodotti.filter((product) => {
    const matchesSearch = product.nome
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const productCategorySlug = JSON.parse(
      JSON.stringify(product.categoria_slug)
    ).current;
    const matchesCategory = selectedCategory
      ? productCategorySlug === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  // Get current category name for display
  const getCurrentCategoryName = () => {
    if (!selectedCategory) return "Tutti i Prodotti";
    const category = categorie.find((cat) => {
      const slug = JSON.parse(JSON.stringify(cat.slug)).current;
      return slug === selectedCategory;
    });
    return category?.nome || "Categoria";
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative ">
        <div className="relative mx-auto px-4 py-16 sm:py-20 lg:py-24 bg-primary ">
          <div className="text-center text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              I Nostri Prodotti
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Esplora la nostra selezione di prodotti agricoli di alta qualità,
              coltivati con passione e rispetto per la terra.
            </p>
            {/* Desktop Search Bar */}
            <div className="hidden md:block mt-8">
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Cerca prodotto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/95 border-0 text-gray-900 placeholder:text-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:w-80 lg:flex-shrink-0">
            <div className="sticky top-8 space-y-6">
              {/* Category Filters */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold text-gray-900">Categorie</h2>
                </div>
                <div className="space-y-1 grid">
                  <Link href="/prodotti" scroll={false}>
                    <div
                      className={`cursor-pointer rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
                        !selectedCategory
                          ? "bg-primary text-white shadow-md"
                          : "hover:bg-gray-50 text-gray-700 border border-gray-200"
                      }`}
                    >
                      Tutte le categorie
                      <span className="float-right text-xs opacity-75">
                        {prodotti.length}
                      </span>
                    </div>
                  </Link>
                  {categorie.map((category: CategoriaType) => {
                    const slug = JSON.parse(
                      JSON.stringify(category.slug)
                    ).current;
                    const categoryCount = prodotti.filter((product) => {
                      const productCategorySlug = JSON.parse(
                        JSON.stringify(product.categoria_slug)
                      ).current;
                      return productCategorySlug === slug;
                    }).length;

                    return (
                      <Link
                        key={category._id}
                        href={`/prodotti?categoria=${slug}`}
                        scroll={false}
                      >
                        <div
                          className={`cursor-pointer rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
                            selectedCategory === slug
                              ? "bg-primary text-white shadow-md"
                              : "hover:bg-gray-50 text-gray-700 border border-gray-200"
                          }`}
                        >
                          {category.nome}
                          <span className="float-right text-xs opacity-75">
                            {categoryCount}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {/* Mobile Search & Filters */}
            <div className="md:hidden mb-6 space-y-4">
              {/* Mobile Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Cerca prodotto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-500 rounded-xl"
                />
              </div>

              {/* Mobile Category Filters */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold text-gray-900">
                    {getCurrentCategoryName()}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {filteredProdotti.length}{" "}
                    {filteredProdotti.length === 1 ? "prodotto" : "prodotti"}
                  </span>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  <Link href="/prodotti" scroll={false}>
                    <button
                      className={`text-sm whitespace-nowrap px-4 py-2 rounded-full transition-all duration-200 ${
                        !selectedCategory
                          ? "bg-primary text-white shadow-md"
                          : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      Tutte
                    </button>
                  </Link>
                  {categorie.map((category: CategoriaType) => {
                    const slug = JSON.parse(
                      JSON.stringify(category.slug)
                    ).current;
                    return (
                      <Link
                        key={category._id}
                        href={`/prodotti?categoria=${slug}`}
                        scroll={false}
                      >
                        <button
                          className={`text-sm whitespace-nowrap px-4 py-2 rounded-full transition-all duration-200 ${
                            selectedCategory === slug
                              ? "bg-primary text-white shadow-md"
                              : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {category.nome}
                        </button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Results Header - Desktop Only */}
            {!isMobile && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                    {getCurrentCategoryName()}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600">
                    {filteredProdotti.length}{" "}
                    {filteredProdotti.length === 1
                      ? "prodotto trovato"
                      : "prodotti trovati"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "grid"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "list"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Products Grid/List */}
            {filteredProdotti.length > 0 ? (
              <div
                className={`${
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                    : "space-y-3 sm:space-y-4"
                }`}
              >
                {filteredProdotti.map((product) => (
                  <div
                    key={product._id}
                    className="transform hover:scale-105 transition-all duration-200"
                  >
                    <ProductCard product={product} viewMode={viewMode} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 sm:py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  Nessun prodotto trovato
                </h3>
                <p className="text-sm sm:text-base text-gray-600 text-center max-w-md px-4">
                  Non abbiamo trovato prodotti che corrispondono ai tuoi criteri
                  di ricerca. Prova a modificare i filtri o la ricerca.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory(null);
                  }}
                  className="mt-4 px-4 sm:px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base"
                >
                  Cancella filtri
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductsClient;
