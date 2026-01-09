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

const CatalogCard = memo(function CatalogCard({
    product,
    viewMode = "compact",
    isPrint = false,
    forceEagerLoad = false,
}: {
    product: ProdottoType;
    viewMode?: "compact" | "detailed";
    isPrint?: boolean;
    forceEagerLoad?: boolean;
}) {
    let slug = JSON.parse(JSON.stringify(product.slug)).current;

    const mostraLoghi = true;

    const hasImage =
        product.immagini &&
        product.immagini.length > 0 &&
        product.immagini[0]?.image;
    const imageUrl = hasImage ? product.immagini[0].image : null;

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

    const CardContent = (
        <div className={` items-stretch bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden break-inside-avoid flex flex-col md:flex-row
            ${isPrint ? "print:rounded-none print:shadow-none print:border print:border-gray-300" : "min-h-[280px] hover:shadow-lg hover:border-orange-200 hover:ring-1 hover:ring-orange-100 transition-all duration-300"}
            ${isPrint ? 'p-1 gap-2 h-full' : 'p-2 gap-2'}`}>

            {/* Product Image */}
            <div className="w-full md:w-1/3 self-stretch">
                <div className="w-full h-full md:h-full overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 ring-1 ring-orange-100 relative flex items-center justify-center">
                    {imageUrl ? (
                        <Image
                            fill
                            src={imageUrl}
                            alt={imageAlt}
                            sizes="(max-width: 768px) 50vw, 33vw"
                            className="object-cover h-full w-full"
                            style={{ objectFit: 'cover' }}
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-orange-100 via-red-50 to-orange-50 flex items-center justify-center">
                            <ImageIcon className="w-10 h-10 text-orange-300" />
                        </div>
                    )}
                </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0 flex flex-col md:w-1/3">
                <div className="mb-2">
                    <h3 className={`text-base font-bold text-gray-900 ${!isPrint && "group-hover:text-primary transition-colors"}`}>
                        {product.nome}
                    </h3>
                    <CategoryTag category={product.categoria} />
                </div>

                {hasSpecifications && (
                    <div className="bg-gray-50 p-2 rounded-lg mb-2 border border-gray-200/80">
                        <h4 className="font-semibold text-gray-800 text-xs mb-2 flex items-center">
                            <Info className="h-3 w-3 mr-1 text-gray-500" />
                            Specifiche Tecniche
                        </h4>
                        <div className="space-y-1 text-xs">
                            {product.umidita !== null && product.umidita !== undefined && (
                                <div className="flex items-center gap-2">
                                    <Droplets className="h-3 w-3 text-gray-500" />
                                    <span className="text-gray-600">Umidità:</span>
                                    <span className="font-semibold text-gray-800">{product.umidita}%</span>
                                </div>
                            )}
                            {product.scadenza && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-3 w-3 text-gray-500" />
                                    <span className="text-gray-600">Scadenza:</span>
                                    <span className="font-semibold text-gray-800">{product.scadenza}</span>
                                </div>
                            )}
                            {product.pezzi && (
                                <div className="flex items-center gap-2">
                                    <Package className="h-3 w-3 text-gray-500" />
                                    <span className="text-gray-600">Pezzi/conf.:</span>
                                    <span className="font-semibold text-gray-800">{product.pezzi}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeMarchi.length > 0 && (
                    mostraLoghi ? (
                        <div className="mt-auto flex flex-wrap gap-2 justify-start items-center m-0">
                            {activeMarchi.map((marchio) => (
                                marchiIcons[marchio] && (
                                    <Image
                                        src={marchiIcons[marchio]}
                                        alt={marchiLabels[marchio]}
                                        width={60}
                                        height={60}
                                        className="object-contain"
                                    />
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

            {/* Commercial Data */}
            <div className="flex-1 flex flex-col gap-2 md:w-1/3">
                <div className="w-full">
                    <div className="bg-gray-100 p-2 rounded-lg border border-gray-200/80 h-min flex flex-col">
                        <h4 className="font-semibold text-gray-800 text-xs mb-2 flex items-center">
                            <Package className="h-3 w-3 mr-1 text-gray-500" />
                            Formati & EAN
                        </h4>
                        <div className="flex-1 space-y-1 overflow-y-auto">
                            {product.formati && product.formati.length > 0 ? (
                                <>
                                    {formatsWithEan.map((formato, index) => (
                                        <div key={`ean-${index}`} className="bg-white border border-gray-300 p-1.5 rounded text-xs">
                                            <div className="font-semibold text-gray-800 mb-1">{formato.formato}</div>
                                            <BarcodeDisplay
                                                value={formato.codice_ean!}
                                                productName={product.nome}
                                                format={formato.formato}
                                                compact={true}
                                            />
                                        </div>
                                    ))}
                                    {formatsWithoutEan.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                            {formatsWithoutEan.map((formato, index) => (
                                                <div key={`no-ean-${index}`} className="bg-white border border-gray-300 p-1.5 rounded text-xs flex-1 text-center">
                                                    <div className="font-semibold text-gray-800">{formato.formato}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-xs text-gray-600">Formato standard</div>
                            )}
                        </div>
                    </div>
                </div>

                {product.valori_nutrizionali && (
                    <div className="w-full">
                        <div className="bg-gray-100 p-2 rounded-lg border border-gray-200/80 h-full flex flex-col">
                            <h4 className="font-semibold text-gray-800 text-xs mb-2 flex items-center">
                                <Info className="h-3 w-3 mr-1 text-gray-500" />
                                Valori Nutrizionali (100g)
                            </h4>
                            <div className="text-[10px] text-gray-700 bg-white p-1.5 rounded border border-gray-300 leading-tight flex-1 overflow-y-auto">
                                {product.valori_nutrizionali.split(' - ').map((value, index) => (
                                    <div key={index}>{value.trim()}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    if (isPrint) {
        return CardContent;
    }

    if (viewMode === "detailed") {
        const linkProps = forceEagerLoad ? { target: "_blank", rel: "noopener noreferrer" } : {};
        return (
            <Link href={`/prodotti/${slug}`} className="group block" prefetch={false} {...linkProps}>
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
