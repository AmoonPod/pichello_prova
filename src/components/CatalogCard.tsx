import Link from "next/link";
import Image from "next/image";
import LazyImage from "./LazyImage";
import { memo } from "react";
import { ProdottoType } from "../../types";
import BarcodeDisplay from "./BarcodeDisplay";
import CategoryTag from "./category_tag";
import {
    Image as ImageIcon,
    Package,
    Droplets,
    Calendar,
    Badge,
    Info
} from "lucide-react";

const marchiIcons: Record<string, string> = {
    prodotto_di_montagna: "/logo-Prodotto-di-Montagna.jpg",
    senza_ammollo: "/senza ammollo.jpg",
    senza_cereali: "/senza cereali.jpg",
    riso_italiano: "/riso italiano.jpg",
    varieta_antica: "/varieta.antica.jpg",
    macinato_a_pietra: "/macinata a pietra.jpg",
    decorticato_a_pietra: "/decorticato a pietra.jpg",
    perlato_a_pietra: "/perlato a pietra.jpg",
};

const marchiLabels: Record<string, string> = {
    prodotto_di_montagna: "Prodotto di Montagna",
    senza_ammollo: "Senza Ammollo",
    senza_cereali: "Senza Cereali",
    riso_italiano: "Riso Italiano",
    varieta_antica: "Varietà Antica",
    macinato_a_pietra: "Macinato a Pietra",
    decorticato_a_pietra: "Decorticato a Pietra",
    perlato_a_pietra: "Perlato a Pietra",
    pianificabile_superiore: "Panificabile Superiore",
};

// Helper per ottimizzare le immagini Sanity per la stampa PDF
const getOptimizedImageUrl = (url: string, forPrint: boolean): string => {
    if (!forPrint || !url) return url;

    // Sanity CDN URLs supportano query parameters per l'ottimizzazione (imgix)
    if (url.includes('cdn.sanity.io')) {
        try {
            const u = new URL(url);

            // Override (non append) per evitare duplicati tipo ?w=2000&w=300
            // e per rendere davvero più leggero il PDF.
            const printWidth = 560;
            const printQuality = 55;

            // Importante: NON facciamo crop lato CDN (es. entropy) perché può “spostare”
            // il soggetto. Il crop lo gestiamo in pagina con object-fit/object-position.
            u.searchParams.set('w', String(printWidth));
            u.searchParams.delete('h');
            u.searchParams.delete('fit');
            u.searchParams.delete('crop');
            u.searchParams.set('q', String(printQuality));
            u.searchParams.set('auto', 'format');
            u.searchParams.set('dpr', '1');

            return u.toString();
        } catch (err) {
            return url;
        }
    }

    return url;
};

const CatalogCard = memo(function CatalogCard({
    product,
    viewMode = "compact",
    isPrint = false,
    forceEagerLoad = false,
    isCompactLayout = false,
}: {
    product: ProdottoType;
    viewMode?: "compact" | "detailed";
    isPrint?: boolean;
    forceEagerLoad?: boolean;
    isCompactLayout?: boolean;
}) {
    let slug = JSON.parse(JSON.stringify(product.slug)).current;

    const mostraLoghi = true;

    const hasImage =
        product.immagini &&
        product.immagini.length > 0 &&
        product.immagini[0]?.image;
    const rawImageUrl = hasImage ? product.immagini[0].image : null;
    // Usa URL ottimizzato per la stampa PDF
    const imageUrl = rawImageUrl ? getOptimizedImageUrl(rawImageUrl, forceEagerLoad) : null;

    const generateAltText = () => {
        if (hasImage && product.immagini[0].alt) {
            return product.immagini[0].alt;
        }
        const categoryName = product.categoria || "";
        const productName = product.nome;
        return `${productName} biorazionale dell'Azienda Agricola Il Pichello - ${categoryName} dall'Appennino Reggiano`;
    };

    const imageAlt = generateAltText();

    const activeMarchi = product.marchi
        ? Object.entries(product.marchi)
            .filter(([, value]) => value === true)
            .map(([key]) => key)
            .sort((a, b) => {
                if (a === "prodotto_di_montagna") return -1;
                if (b === "prodotto_di_montagna") return 1;
                return 0;
            })
        : [];

    const hasSpecifications = (product.umidita !== null && product.umidita !== undefined) || !!product.scadenza || !!product.pezzi;

    if (!slug) return null;

    const eanSet = new Set<string>();
    const formatsWithEan: ProdottoType['formati'] = [];
    const formatsWithoutEan: ProdottoType['formati'] = [];

    if (product.formati) {
        product.formati.forEach(formato => {
            if (formato.codice_ean && !eanSet.has(formato.codice_ean)) {
                formatsWithEan.push(formato);
                eanSet.add(formato.codice_ean);
            } else {
                formatsWithoutEan.push(formato);
            }
        });
    }

    const FormatsAndEan = (
        <div className="w-full">
            <div className={`bg-gray-100 rounded-lg border border-gray-200/80 h-min flex flex-col ${forceEagerLoad ? 'p-1' : 'p-2'}`}>
                <h4 className={`font-semibold text-gray-800 flex items-center ${forceEagerLoad ? 'text-[8px] mb-0.5' : 'text-xs mb-2'}`}>
                    <Package className={forceEagerLoad ? 'h-2 w-2 mr-0.5 text-gray-500' : 'h-3 w-3 mr-1 text-gray-500'} />
                    Formati & EAN
                </h4>
                <div className={`flex-1 overflow-y-auto ${forceEagerLoad ? 'space-y-0.5' : 'space-y-1'}`}>
                    {product.formati && product.formati.length > 0 ? (
                        <>
                            <div className={`grid gap-1 ${formatsWithEan.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                                {formatsWithEan.map((formato, index) => (
                                    <div key={`ean-${index}`} className={`bg-white border border-gray-300 rounded ${forceEagerLoad ? 'p-0.5 text-[8px]' : 'p-1.5 text-xs'}`}>
                                        <div className={`font-semibold text-gray-800 ${forceEagerLoad ? 'mb-0' : 'mb-1'}`}>{formato.formato}</div>
                                        <div className="scale-90 origin-left w-full overflow-hidden">
                                            <BarcodeDisplay
                                                value={formato.codice_ean!}
                                                productName={product.nome}
                                                format={formato.formato}
                                                compact={true}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {formatsWithoutEan.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {formatsWithoutEan.map((formato, index) => (
                                        <div key={`no-ean-${index}`} className={`bg-white border border-gray-300 rounded flex-1 text-center ${forceEagerLoad ? 'p-0.5 text-[8px]' : 'p-1.5 text-xs'}`}>
                                            <div className="font-semibold text-gray-800">{formato.formato}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className={forceEagerLoad ? 'text-[8px] text-gray-600' : 'text-xs text-gray-600'}>Formato standard</div>
                    )}
                </div>
            </div>
        </div>
    );

    const CardContent = (
        <div className={`items-stretch bg-white rounded-lg ${isPrint ? '' : 'shadow-sm'} border border-gray-200 overflow-hidden break-inside-avoid flex flex-col md:flex-row flex-1
            ${isPrint ? "print:rounded-none print:shadow-none print:border print:border-gray-300" : "min-h-[180px] hover:shadow-lg hover:border-orange-200 hover:ring-1 hover:ring-orange-100 transition-all duration-300"}
            ${forceEagerLoad ? 'p-1 gap-1 h-full' : isPrint ? 'p-1 gap-2 h-full' : 'p-2 gap-2'}`}>

            {/* Product Image */}
            <div className={`self-stretch ${forceEagerLoad ? (isCompactLayout ? 'w-[40%]' : 'w-[22%] md:w-[22%]') : 'w-full md:w-1/3'}`}>
                <div className={`w-full h-full md:h-full overflow-hidden rounded-lg ring-1 ring-orange-100 relative ${forceEagerLoad ? 'min-h-[100px]' : 'min-h-[140px]'}`}>
                    {imageUrl ? (
                        forceEagerLoad ? (
                            // Per PDF: usa tag img nativo con URL Sanity ottimizzato
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={imageUrl}
                                alt={imageAlt}
                                className="catalog-product-image absolute inset-0 w-full h-full"
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    width: '100%',
                                    height: '100%'
                                }}
                                loading="eager"
                            />
                        ) : (
                            <Image
                                fill
                                src={imageUrl}
                                alt={imageAlt}
                                sizes="(max-width: 768px) 50vw, 33vw"
                                className="catalog-product-image object-cover"
                                style={{ objectFit: 'cover' }}
                            />
                        )
                    ) : (
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-orange-100 via-red-50 to-orange-50 flex items-center justify-center">
                            <ImageIcon className="w-10 h-10 text-orange-300" />
                        </div>
                    )}
                </div>
            </div>

            {/* Product Info */}
            <div className={`flex-1 min-w-0 flex flex-col ${forceEagerLoad ? (isCompactLayout ? 'w-[60%]' : 'md:w-[35%]') : 'md:w-1/3'}`}>
                <div className={forceEagerLoad ? 'mb-0.5' : 'mb-2'}>
                    <h3 className={`font-bold text-gray-900 ${forceEagerLoad ? 'text-[13px] leading-tight' : 'text-lg'} ${!isPrint && "group-hover:text-primary transition-colors"}`}>
                        {product.nome}
                    </h3>
                    {product.categoria_slug?.current === 'pasta-di-semola-di-grano-duro' && (
                        <div className={forceEagerLoad ? 'scale-90 origin-left' : ''}>
                            <CategoryTag category={product.categoria} />
                        </div>
                    )}
                </div>

                {hasSpecifications && (
                    <div className={`bg-gray-50 rounded-lg border border-gray-200/80 ${forceEagerLoad ? 'p-1 mb-0.5' : 'p-2 mb-2'}`}>
                        <h4 className={`font-semibold text-gray-800 flex items-center ${forceEagerLoad ? 'text-[8px] mb-0.5' : 'text-xs mb-2'}`}>
                            <Info className={forceEagerLoad ? 'h-2 w-2 mr-0.5 text-gray-500' : 'h-3 w-3 mr-1 text-gray-500'} />
                            Specifiche
                        </h4>
                        <div className={forceEagerLoad ? 'space-y-0.5 text-[8px]' : 'space-y-1 text-xs'}>
                            {product.umidita !== null && product.umidita !== undefined && (
                                <div className={`flex items-center ${forceEagerLoad ? 'gap-1' : 'gap-2'}`}>
                                    <Droplets className={forceEagerLoad ? 'h-2 w-2 text-gray-500' : 'h-3 w-3 text-gray-500'} />
                                    <span className="text-gray-600">Umidità:</span>
                                    <span className="font-semibold text-gray-800">{product.umidita}%</span>
                                </div>
                            )}
                            {product.scadenza && (
                                <div className={`flex items-center ${forceEagerLoad ? 'gap-1' : 'gap-2'}`}>
                                    <Calendar className={forceEagerLoad ? 'h-2 w-2 text-gray-500' : 'h-3 w-3 text-gray-500'} />
                                    <span className="text-gray-600">Scadenza:</span>
                                    <span className="font-semibold text-gray-800">{product.scadenza}</span>
                                </div>
                            )}
                            {product.pezzi && (
                                <div className={`flex items-center ${forceEagerLoad ? 'gap-1' : 'gap-2'}`}>
                                    <Package className={forceEagerLoad ? 'h-2 w-2 text-gray-500' : 'h-3 w-3 text-gray-500'} />
                                    <span className="text-gray-600">Pezzi/conf.:</span>
                                    <span className="font-semibold text-gray-800">{product.pezzi}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Formati spostati qui se layout compatto */}
                {isCompactLayout && (
                    <div className="mb-0.5">
                        {FormatsAndEan}
                    </div>
                )}

                {/* Ingredienti per categoria Zuppe */}
                {product.categoria === 'Zuppe' && product.ingredienti && (
                    <div className={forceEagerLoad ? 'mt-1 mb-0.5' : 'mb-2'}>
                        <div
                            className={`text-gray-700 ${forceEagerLoad ? 'text-[7px]' : 'text-[10px]'}`}
                            style={{ lineHeight: '1.1' }}
                        >
                            <span className="font-semibold">Ingredienti:</span> {product.ingredienti}
                        </div>
                    </div>
                )}

                {activeMarchi.length > 0 && (
                    mostraLoghi ? (
                        <div className={`mt-auto flex flex-wrap justify-start items-center m-0 ${forceEagerLoad ? 'gap-1' : 'gap-2'}`}>
                            {activeMarchi.map((marchio) => (
                                marchiIcons[marchio] && (
                                    forceEagerLoad ? (
                                        // Per PDF: usa tag img nativo per i loghi con contenitore più grande e padding
                                        <div
                                            key={marchio}
                                            className="flex-shrink-0 flex items-center justify-center"
                                            style={{
                                                width: '42px',
                                                height: '42px',
                                                padding: '2px'
                                            }}
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={marchiIcons[marchio]}
                                                alt={marchiLabels[marchio]}
                                                className="catalog-logo-image"
                                                style={{
                                                    maxWidth: '100%',
                                                    maxHeight: '100%',
                                                    width: 'auto',
                                                    height: 'auto',
                                                    objectFit: 'contain'
                                                }}
                                                loading="eager"
                                            />
                                        </div>
                                    ) : (
                                        <Image
                                            key={marchio}
                                            src={marchiIcons[marchio]}
                                            alt={marchiLabels[marchio]}
                                            width={60}
                                            height={60}
                                            className="catalog-logo-image object-contain"
                                        />
                                    )
                                )
                            ))}
                        </div>
                    ) : (
                        <div className="bg-amber-50 p-2 rounded-lg border border-amber-200/50 mt-auto">
                            <h4 className="font-semibold text-gray-800 text-xs mb-1 flex items-center">
                                <Badge className="h-3 w-3 mr-1 text-gray-500" />
                                Certificazioni
                            </h4>
                            <div className="flex flex-wrap gap-1">
                                {activeMarchi.map((marchio) => (
                                    <div key={marchio} className="flex items-center bg-white px-1.5 py-0.5 rounded border border-amber-200 text-xs">
                                        {marchiLabels[marchio]}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                )}
            </div>

            {/* Commercial Data - Mostrato qui solo se NON è layout compatto */}
            {!isCompactLayout && (
                <div className={`flex-1 flex flex-col md:w-[43%] ${forceEagerLoad ? 'gap-1' : 'gap-2'}`}>
                    {FormatsAndEan}

                    {product.valori_nutrizionali && (
                        <div className="w-full">
                            <div className={`bg-gray-100 rounded-lg border border-gray-200/80 h-full flex flex-col ${forceEagerLoad ? 'p-1' : 'p-2'}`}>
                                <h4 className={`font-semibold text-gray-800 flex items-center ${forceEagerLoad ? 'text-[8px] mb-0.5' : 'text-xs mb-2'}`}>
                                    <Info className={forceEagerLoad ? 'h-2 w-2 mr-0.5 text-gray-500' : 'h-3 w-3 mr-1 text-gray-500'} />
                                    Valori Nutrizionali (100g)
                                </h4>
                                <div className={`text-gray-700 bg-white rounded border border-gray-300 leading-tight flex-1 overflow-y-auto ${forceEagerLoad ? 'text-[7px] p-0.5' : 'text-[10px] p-1.5'}`}>
                                    {product.valori_nutrizionali.split(' - ').map((value, index) => (
                                        <div key={index}>{value.trim()}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    if (isPrint) {
        return CardContent;
    }

    if (viewMode === "detailed") {
        const linkProps = forceEagerLoad ? { target: "_blank", rel: "noopener noreferrer" } : {};
        return (
            <Link href={`/prodotti/${slug}`} className="group h-full flex flex-col" prefetch={false} {...linkProps}>
                {CardContent}
            </Link>
        );
    }

});

export const CatalogCardSkeleton = memo(function CatalogCardSkeleton({
    viewMode = "compact"
}: {
    viewMode?: "compact" | "detailed";
}) {
    if (viewMode === "detailed") {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse min-h-[280px]">
                <div className="flex flex-col md:flex-row h-full p-4 gap-4">
                    <div className="w-full md:w-1/3 h-48 md:h-auto bg-gray-200 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1 flex flex-col space-y-3">
                        <div className="space-y-2">
                            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        </div>
                        <div className="bg-gray-100 p-3 rounded-lg space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                        </div>
                        <div className="flex flex-1 flex-col gap-4">
                            <div className="w-full bg-gray-100 p-4 rounded-lg space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-8 bg-gray-200 rounded"></div>
                                <div className="h-8 bg-gray-200 rounded"></div>
                            </div>
                            <div className="w-full bg-gray-100 p-4 rounded-lg space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-16 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse h-full">
            <div className="aspect-square bg-gray-200"></div>
            <div className="p-4 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
        </div>
    );
});

export default CatalogCard;
