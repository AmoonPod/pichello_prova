import { getProdotti, getCategorie } from "../../../sanity/sanity.query";
import { ProdottoType, CategoriaType } from "../../../types";
import CatalogHeader from "@/components/catalog/CatalogHeader";
import "../globals.css";
import CatalogDownloadButton from "@/components/catalog/CatalogDownloadButton";
import CatalogProduct from "@/components/catalog/CatalogProduct";

// Force static generation
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export default async function CatalogPage({
    searchParams,
}: {
    searchParams?: { print?: string };
}) {
    // Fetch all data in parallel
    const [prodotti, categorie] = await Promise.all([
        getProdotti(),
        getCategorie()
    ]);

    // Group products by category
    const prodottiPerCategoria = categorie.map((categoria: CategoriaType) => ({
        categoria,
        prodotti: prodotti.filter((p: ProdottoType) => p.categoria === categoria.nome)
    })).filter((group: { categoria: CategoriaType; prodotti: ProdottoType[] }) => group.prodotti.length > 0);

    // Check if this is a print request
    const isPrintMode = searchParams?.print === 'true';

    return (
        <>
            {/* Auto-print script for print mode */}
            {isPrintMode && (
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              window.addEventListener('load', function() {
                setTimeout(function() {
                  window.print();
                  // Optional: close window after print dialog
                  window.addEventListener('afterprint', function() {
                    window.history.back();
                  });
                }, 1000);
              });
            `,
                    }}
                />
            )}

            {/* Viewport for screen display */}
            <div className={`min-h-screen bg-gray-50 ${isPrintMode ? 'hidden' : 'print:hidden'}`}>
                <div className="container mx-auto px-4 py-8">
                    {/* Page Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Catalogo Prodotti
                        </h1>
                        <p className="text-lg text-gray-600 mb-6">
                            Catalogo completo dei nostri prodotti biorazionali dall'Appennino Reggiano
                        </p>

                        {/* Download Button */}
                        {!isPrintMode && <CatalogDownloadButton />}
                    </div>

                    {/* Preview */}
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
                        <CatalogHeader />

                        {prodottiPerCategoria.slice(0, 1).map((group: { categoria: CategoriaType; prodotti: ProdottoType[] }) => (
                            <div key={group.categoria._id} className="mt-8">
                                <h2 className="text-2xl font-bold text-primary mb-6 border-b-2 border-primary/20 pb-2">
                                    {group.categoria.nome}
                                </h2>
                                <p className="text-gray-600 mb-6">{group.categoria.descrizione}</p>

                                {group.prodotti.slice(0, 2).map((prodotto: ProdottoType) => (
                                    <CatalogProduct key={prodotto._id} prodotto={prodotto} />
                                ))}

                                {group.prodotti.length > 2 && (
                                    <div className="text-center py-4 text-gray-500">
                                        ... e altri {group.prodotti.length - 2} prodotti
                                    </div>
                                )}
                            </div>
                        ))}

                        {prodottiPerCategoria.length > 1 && (
                            <div className="text-center py-8 text-gray-500">
                                ... e altre {prodottiPerCategoria.length - 1} categorie
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Print-optimized version (hidden on screen) */}
            <div className={`${isPrintMode ? 'block' : 'hidden print:block'}`} data-catalog-content>
                <CatalogHeader />

                {prodottiPerCategoria.map((group: { categoria: CategoriaType; prodotti: ProdottoType[] }, categoryIndex: number) => (
                    <div key={group.categoria._id} className="mb-12">
                        {/* Category Header */}
                        <div className="bg-primary/5 border-l-4 border-primary p-4 mb-6 break-inside-avoid">
                            <h2 className="text-2xl font-bold text-primary mb-2">
                                {group.categoria.nome}
                            </h2>
                            {group.categoria.descrizione && (
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {group.categoria.descrizione}
                                </p>
                            )}
                            <div className="text-sm text-gray-500 mt-2">
                                {group.prodotti.length} prodotti disponibili
                            </div>
                        </div>

                        {/* Products in this category */}
                        {group.prodotti.map((prodotto: ProdottoType, productIndex: number) => (
                            <CatalogProduct
                                key={prodotto._id}
                                prodotto={prodotto}
                                isLastInCategory={productIndex === group.prodotti.length - 1}
                                isLastCategory={categoryIndex === prodottiPerCategoria.length - 1}
                            />
                        ))}
                    </div>
                ))}

                {/* Footer for print */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-500">
                    <div className="flex justify-between items-center max-w-6xl mx-auto">
                        <span>Catalogo generato il {new Date().toLocaleDateString('it-IT')}</span>
                        <span className="font-bold">Azienda Agricola Il Pichello</span>
                        <span>www.agricolailpichello.it</span>
                    </div>
                </div>
            </div>


        </>
    );
} 