export default function CatalogHeader() {
    return (
        <div className="mb-8">
            {/* Company Header */}
            <div className="bg-primary text-white p-6 rounded-t-lg print:rounded-none print:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">
                            Azienda Agricola Il Pichello
                        </h1>
                        <p className="text-lg text-white/90">
                            Catalogo Prodotti Biorazionali
                        </p>
                    </div>
                    <div className="text-sm text-white/80 space-y-1">
                        <div>Tel: 340/8200080 | 339/7981644</div>
                        <div>info@agricolailpichello.it</div>
                    </div>
                </div>
            </div>

            {/* Company Info */}
            <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg print:rounded-none p-6 print:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    <div>
                        <h3 className="font-bold text-gray-900 mb-2">Indirizzo</h3>
                        <p className="text-gray-700">
                            Via Dante Alighieri 141<br />
                            42033 Marola, Carpineti (RE)<br />
                            Emilia-Romagna
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 mb-2">Tradizione</h3>
                        <p className="text-gray-700">
                            Dal 1985 - Tradizione e qualità<br />
                            nell'Appennino Reggiano
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 mb-2">Qualità</h3>
                        <p className="text-gray-700">
                            Prodotti biorazionali<br />
                            certificati e controllati
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
} 