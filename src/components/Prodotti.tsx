"use client";

import { useState, useEffect, useRef } from "react";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { CategoriaType, ProdottoType } from "../../types";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Filter, Grid, List, Leaf, ShoppingBag } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";
import Breadcrumbs from "@/components/Breadcrumbs";
import CategorySchema from "@/components/CategorySchema";
import Head from "next/head";

const ProductsClient = ({
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
    margin: "0px 0px -100px 0px", // Trigger earlier
  });
  const [isVisible, setIsVisible] = useState(false);
  const clientSearchParams = useSearchParams();
  const router = useRouter();
  const initialCategory =
    serverSearchParams?.categoria || clientSearchParams.get("categoria");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (isInView) setIsVisible(true);
  }, [isInView]);

  // Fallback per assicurarsi che la sezione sia visibile anche se isInView non funziona
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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
    const currentCategory =
      serverSearchParams?.categoria || clientSearchParams.get("categoria");
    if (currentCategory !== selectedCategory) {
      setSelectedCategory(currentCategory);
    }
  }, [serverSearchParams, clientSearchParams, selectedCategory]);

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

  // Get current category for full object
  const getCurrentCategory = () => {
    if (!selectedCategory) return null;
    return categorie.find((cat) => {
      const slug = JSON.parse(JSON.stringify(cat.slug)).current;
      return slug === selectedCategory;
    });
  };

  // Generate SEO-friendly category title
  const getCategoryTitle = () => {
    const currentCategory = getCurrentCategory();
    if (!currentCategory) return "Tutti i Prodotti";
    return `${currentCategory.nome} dell'Appennino Reggiano`;
  };

  // Generate category description content
  const getCategoryDescription = () => {
    const currentCategory = getCurrentCategory();
    if (!currentCategory) return null;

    const categoryName = currentCategory.nome.toLowerCase();

    // Category-specific descriptions with local SEO
    const descriptions: { [key: string]: string } = {
      "cereali-e-farine": `Le nostre farine sono il cuore della tradizione culinaria dell'Appennino Reggiano. Coltiviamo antiche varietà di grano sui terreni di Marola e Carpineti, macinandole lentamente a pietra nel nostro mulino tradizionale. I cereali crescono sui suoli castagnini della formazione di Bismantova, a 810 metri di altitudine nella Valle del Tassobbio. Le nostre farine integrali biorazionali conservano tutte le proprietà nutritive del chicco, ideali per pane e pasta dal sapore autentico dell'Appennino. Ogni sacchetto racchiude la passione per la terra di Marola e l'impegno verso un'agricoltura sostenibile che rispetta i tempi naturali della montagna.`,

      miele: `Il nostro miele artigianale nasce dalle fioriture spontanee dell'Appennino Reggiano, tra i castagneti di Marola e i prati della Valle del Tassobbio. Le nostre api bottinano sui fiori di castagno, acacia, tiglio e sulla ricca flora montana di Carpineti, producendo un miele dal carattere unico e intenso. Ogni vasetto di miele dell'Azienda Agricola Il Pichello racconta la biodiversità dell'Appennino di Reggio Emilia, dalle fioriture primaverili alle ultime raccolte autunnali. Il nostro apiario, situato a 810 metri di altitudine, garantisce un prodotto puro e genuino, lavorato secondo le antiche tradizioni dell'Appennino Reggiano.`,

      legumi: `I legumi secchi dell'Appennino Reggiano rappresentano una tradizione millenaria della montagna emiliana. Sui nostri terreni di Marola coltiviamo varietà autoctone come fagioli borlotti, cannellini e lenticchie rosse, adattate al clima dell'alta Valle del Tassobbio. I legumi biorazionali del Pichello crescono senza trattamenti chimici, beneficiando della ricchezza dei suoli castagnini di Carpineti. Ogni varietà viene selezionata e coltivata secondo i metodi tradizionali dell'Appennino, garantendo sapore intenso e alta digeribilità. I nostri legumi secchi sono perfetti per zuppe, minestre e primi piatti della cucina montana reggiana.`,

      "tisane-e-infusi": `Le tisane e gli infusi dell'Appennino Reggiano nascono dalla raccolta di erbe spontanee e coltivate sui nostri terreni di Marola. Nella Valle del Tassobbio crescono spontaneamente camomilla, melissa, menta e altre preziose erbe officinali, che raccogliamo seguendo i ritmi naturali delle stagioni. Le nostre miscele di tisane biorazionali uniscono il sapere erboristico dell'Appennino alle proprietà benefiche delle piante di montagna. Ogni infuso del Pichello racchiude l'essenza della flora dell'Appennino di Reggio Emilia, offrendo momenti di relax e benessere naturale.`,
    };

    return (
      descriptions[selectedCategory || ""] ||
      `Scopri i nostri ${categoryName} biorazionali, coltivati con passione sui terreni di Marola nell'Appennino Reggiano. L'Azienda Agricola Il Pichello seleziona e produce ${categoryName} di alta qualità, rispettando le tradizioni agricole della Valle del Tassobbio e i metodi biorazionali che garantiscono genuinità e sapore autentico dell'Appennino di Reggio Emilia.`
    );
  };

  // Generate breadcrumbs
  const getBreadcrumbs = () => {
    const breadcrumbs: Array<{
      label: string;
      href?: string;
      current?: boolean;
    }> = [
        { label: "Home", href: "/" },
        { label: "Prodotti", href: "/prodotti" },
      ];

    if (selectedCategory) {
      const currentCategory = getCurrentCategory();
      if (currentCategory) {
        breadcrumbs.push({
          label: currentCategory.nome,
          href: `/prodotti?categoria=${selectedCategory}`,
          current: true,
        });
      }
    } else {
      breadcrumbs[breadcrumbs.length - 1].current = true;
    }

    return breadcrumbs;
  };

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 1, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <>
      {/* Schema.org for category pages */}
      {selectedCategory && getCurrentCategory() && (
        <Head>
          <CategorySchema
            category={getCurrentCategory()!}
            products={filteredProdotti}
            currentUrl={`https://www.agricolailpichello.it/prodotti?categoria=${selectedCategory}`}
          />
        </Head>
      )}

      <div className="min-h-screen bg-backgroundvariant">
        {/* Main Content */}
        <section className="py-2 relative">
          <div className="container mx-auto px-4">
            {/* Header Area */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <Breadcrumbs items={getBreadcrumbs()} />
              <div className="mt-4 max-w-4xl">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Sapori Autentici della Montagna
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Esplora la nostra selezione di prodotti agricoli di alta
                  qualità, coltivati con passione e rispetto per la terra
                  dell'Appennino Reggiano.
                </p>
              </div>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Desktop Sidebar */}
              <aside className="hidden lg:block lg:w-80 lg:flex-shrink-0">
                <div className="sticky top-8">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="relative group"
                  >
                    <div className="absolute inset-2 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/15 rounded-3xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500" />

                    <div className="relative bg-white border border-border rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.2)] transition-all duration-300">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Filter className="w-6 h-6 text-primary" />
                        </div>
                        <h2 className="text-xl font-bold text-foreground">
                          Categorie
                        </h2>
                      </div>

                      <div className="w-16 h-0.5 bg-primary rounded-full mb-6" />

                      <div className="space-y-2">
                        <Link href="/prodotti" scroll={false}>
                          <div
                            className={`cursor-pointer rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${!selectedCategory
                              ? "bg-primary text-white shadow-md"
                              : "hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-primary/30"
                              }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>Tutte le categorie</span>
                              <span className="text-xs opacity-75 bg-white/20 px-2 py-1 rounded-full">
                                {prodotti.length}
                              </span>
                            </div>
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
                                className={`cursor-pointer rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${selectedCategory === slug
                                  ? "bg-primary text-white shadow-md"
                                  : "hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-primary/30"
                                  }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{category.nome}</span>
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full ${selectedCategory === slug
                                      ? "bg-white/20 opacity-75"
                                      : "bg-gray-100 opacity-75"
                                      }`}
                                  >
                                    {categoryCount}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </aside>

              {/* Main Content Area */}
              <main ref={ref} className="flex-1 min-w-0">
                {/* Mobile Search & Filters */}
                <div className="md:hidden mb-6 space-y-4">
                  {/* Mobile Search Bar */}
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    className="relative"
                  >
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Cerca prodotto..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 pr-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-500 rounded-xl shadow-sm focus:shadow-md transition-all duration-300"
                    />
                  </motion.div>

                  {/* Mobile Category Filters */}
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    className="relative group"
                  >
                    <div className="absolute inset-1 bg-gradient-to-br from-primary/3 to-primary/8 rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-300" />

                    <div className="relative bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <ShoppingBag className="w-5 h-5 text-primary" />
                          <h2 className="text-lg font-bold text-gray-900">
                            {selectedCategory
                              ? getCategoryTitle()
                              : getCurrentCategoryName()}
                          </h2>
                        </div>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {filteredProdotti.length} prodott
                          {filteredProdotti.length === 1 ? "o" : "i"}
                        </span>
                      </div>

                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        <Link href="/prodotti" scroll={false}>
                          <button
                            className={`text-sm whitespace-nowrap px-4 py-2 rounded-full font-medium transition-all duration-200 ${!selectedCategory
                              ? "bg-primary text-white shadow-md"
                              : "border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-primary/30"
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
                                className={`text-sm whitespace-nowrap px-4 py-2 rounded-full font-medium transition-all duration-200 ${selectedCategory === slug
                                  ? "bg-primary text-white shadow-md"
                                  : "border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-primary/30"
                                  }`}
                              >
                                {category.nome}
                              </button>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Results Header - Desktop Only */}
                {!isMobile && (
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    className="flex flex-col gap-6 mb-8"
                  >
                    <div className="flex items-center justify-between gap-4">
                      {/* Search Bar Desktop */}
                      <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          type="text"
                          placeholder="Cerca il tuo prodotto preferito..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-12 pr-4 py-2 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-500 rounded-full shadow-sm focus:shadow-md transition-all duration-300"
                        />
                      </div>

                      <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-sm border border-gray-200">
                        <button
                          onClick={() => setViewMode("grid")}
                          className={`p-2 rounded-lg transition-all duration-200 ${viewMode === "grid"
                            ? "bg-primary text-white shadow-sm"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                          <Grid className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setViewMode("list")}
                          className={`p-2 rounded-lg transition-all duration-200 ${viewMode === "list"
                            ? "bg-primary text-white shadow-sm"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                          <List className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground mb-1">
                          {selectedCategory
                            ? getCategoryTitle()
                            : getCurrentCategoryName()}
                        </h2>
                        <p className="text-muted-foreground">
                          {filteredProdotti.length}{" "}
                          {filteredProdotti.length === 1
                            ? "prodotto trovato"
                            : "prodotti trovati"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Products Grid/List */}
                {filteredProdotti.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="visible"
                    animate="visible"
                    className={`${viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                      : "space-y-3 sm:space-y-4"
                      }`}
                  >
                    {filteredProdotti.map((product, index) => (
                      <motion.div
                        key={product._id}
                        variants={itemVariants}
                        initial="visible"
                        animate="visible"
                        transition={{ delay: index * 0.05 }}
                        className="transform hover:scale-105 transition-all duration-200"
                      >
                        <ProductCard product={product} viewMode={viewMode} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    className="relative group"
                  >
                    <div className="absolute inset-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500" />

                    <div className="relative flex flex-col items-center justify-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                        <Search className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        Nessun prodotto trovato
                      </h3>
                      <p className="text-muted-foreground text-center max-w-md mb-6 leading-relaxed">
                        Non abbiamo trovato prodotti che corrispondono ai tuoi
                        criteri di ricerca. Prova a modificare i filtri o la
                        ricerca.
                      </p>
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory(null);
                          router.push("/prodotti");
                        }}
                        className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                      >
                        Cancella filtri
                      </button>
                    </div>
                  </motion.div>
                )}
              </main>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductsClient;
