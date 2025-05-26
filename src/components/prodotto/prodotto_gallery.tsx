"use client";

import { useState, useEffect } from "react";
import styles from "./productGallery.module.css";
import utils from "./utils.module.css";
import { Immagine } from "../../../types";

export default function ProdottoGallery({ images }: { images: Immagine[] }) {
  const [showLightbox, setShowLightbox] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile - align with CSS breakpoint
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 880);
    handleResize(); // check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goToPrevSlide = () => {
    setImgIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setImgIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex-1 w-full max-w-[500px] relative">
      {/* Main Image - Both Desktop and Mobile */}
      <div
        className="cursor-pointer mb-4 flex justify-center"
        onClick={() => setShowLightbox(true)}
      >
        <img
          src={images[imgIndex].image}
          alt="gallery-cover-image"
          className="aspect-square object-cover w-full rounded-2xl shadow-lg"
        />
      </div>

      {/* Thumbnails - Both Desktop and Mobile */}
      <div className={`${isMobile ? "block" : "hidden sm:block"}`}>
        {/* Desktop Thumbnails */}
        {!isMobile && (
          <ul
            className={`${styles.productThumbnails} ${utils.flex} justify-center`}
          >
            {images.map((element: Immagine, index: number) => (
              <li
                key={`thumbnail-${index}`}
                className={
                  imgIndex === index
                    ? `${styles.productThumbnail} ${styles.productThumbnailActive}`
                    : styles.productThumbnail
                }
                onClick={() => setImgIndex(index)}
              >
                <img
                  src={element.image}
                  alt={`product thumbnail ${index}`}
                  className="aspect-square object-cover w-16 h-16 sm:w-24 sm:h-24 rounded"
                />
              </li>
            ))}
          </ul>
        )}

        {/* Mobile Thumbnails */}
        {isMobile && images.length > 1 && (
          <div className="flex gap-2 justify-center px-2 overflow-x-auto py-2">
            {images.map((element: Immagine, index: number) => (
              <button
                key={`mobile-thumbnail-${index}`}
                className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  imgIndex === index
                    ? "border-primary shadow-lg scale-105"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setImgIndex(index)}
              >
                <img
                  src={element.image}
                  alt={`product thumbnail ${index}`}
                  className="aspect-square object-cover w-16 h-16"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
