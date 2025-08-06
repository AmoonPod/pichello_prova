"use client";

import Image from "next/image";
import { memo, useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface LazyImageProps {
    src: string;
    alt: string;
    className?: string;
    fill?: boolean;
    sizes?: string;
    priority?: boolean;
    quality?: number;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    onLoad?: () => void;
    unoptimized?: boolean;
}

const LazyImage = memo(function LazyImage({
    src,
    alt,
    className = "",
    fill = false,
    sizes,
    priority = false,
    quality = 85,
    placeholder = 'blur',
    blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==",
    onLoad,
    unoptimized = false,
}: LazyImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);

    const { ref, isIntersecting } = useIntersectionObserver({
        threshold: 0.1,
        rootMargin: '100px', // Start loading 100px before coming into view
        triggerOnce: true,
    });

    const handleLoad = () => {
        setIsLoaded(true);
        onLoad?.();
    };

    const handleError = () => {
        setIsError(true);
    };

    // Don't render the image until it's intersecting (unless priority)
    const shouldLoad = priority || isIntersecting;

    return (
        <div ref={ref} className={`relative ${className}`}>
            {shouldLoad && !isError && (
                <Image
                    src={src}
                    alt={alt}
                    fill={fill}
                    sizes={sizes}
                    priority={priority}
                    quality={quality}
                    placeholder={placeholder}
                    blurDataURL={blurDataURL}
                    className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    onLoad={handleLoad}
                    onError={handleError}
                    unoptimized={unoptimized}
                />
            )}

            {/* Loading state */}
            {shouldLoad && !isLoaded && !isError && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
            )}

            {/* Error state */}
            {isError && (
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-red-50 to-orange-50 flex items-center justify-center">
                    <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                </div>
            )}
        </div>
    );
});

export default LazyImage;
