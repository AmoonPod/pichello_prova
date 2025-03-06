"use client";

import { useState, useEffect } from "react";
import styles from "./productGallery.module.css";
import utils from "./utils.module.css";
import { Immagine } from "../../../types";

export default function ProdottoGallery({ images }: { images: Immagine[] }) {
  const [showLightbox, setShowLightbox] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
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
    <div className="flex-1 w-full max-w-[500px]">
      <div
        className="cursor-pointer mb-4 flex justify-center"
        onClick={() => setShowLightbox(true)}
      >
        <img
          src={images[imgIndex].image}
          alt="gallery-cover-image"
          className="aspect-square object-cover w-full sm:w-96 rounded-2xl"
        />
      </div>

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

      {/* Conditionally render slider only on non-mobile devices */}
      {!isMobile && (
        <>
          <div
            className={styles.productGallerySlider}
            style={{ transform: `translateX(-${imgIndex * 100}%)` }}
          >
            {images.map((element: Immagine, index: number) => (
              <img
                key={`slider-${index}`}
                src={element.image}
                alt={`Product Image ${index}`}
              />
            ))}
          </div>
          <button className={styles.btnSliderPrev} onClick={goToPrevSlide}>
            <svg viewBox="0 0 12 18" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11 1 3 9l8 8"
                stroke="#1D2026"
                strokeWidth="3"
                fill="none"
                fillRule="evenodd"
              />
            </svg>
          </button>
          <button className={styles.btnSliderNext} onClick={goToNextSlide}>
            <svg viewBox="0 0 13 18" xmlns="http://www.w3.org/2000/svg">
              <path
                d="m2 1 8 8-8 8"
                stroke="#1D2026"
                strokeWidth="3"
                fill="none"
                fillRule="evenodd"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
