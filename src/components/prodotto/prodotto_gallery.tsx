"use client";

import { useState } from "react";
import styles from "./productGallery.module.css";
import utils from "./utils.module.css";
import { Immagine } from "../../../types";

export default function ProdottoGallery({ images }: { images: Immagine[] }) {
  const [showLightbox, setShowLightbox] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  // Handle slider buttons click
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
    <div className="flex-1 w-[500px]">
      <div
        className="cursor-pointer mb-4 flex justify-center"
        onClick={() => setShowLightbox(true)}
      >
        <img
          src={images[imgIndex].image}
          alt="gallery-cover-image "
          className="aspect-square object-cover w-96 h-96 rounded-2xl"
        />
      </div>
      <ul
        className={`${styles.productThumbnails} ${utils.flex} justify-center`}
      >
        {images.map((element: Immagine, index: number) => (
          <li
            key={index}
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
              className="aspect-square object-cover w-24 h-24"
            />
          </li>
        ))}
      </ul>

      {/* <Lightbox
        showLightbox={showLightbox}
        imgIndex={imgIndex}
        images={images}
        setImgIndex={setImgIndex}
        onClose={() => setShowLightbox(false)}
      /> */}

      <div
        className={styles.productGallerySlider}
        style={{ transform: `translateX(-${imgIndex * 100}%)` }}
      >
        {images.map((element: any, index: any) => (
          <img
            key={element.id}
            src={element.image}
            alt={`Product Image ${index}`}
          />
        ))}
      </div>
      <button className={`${styles.btnSliderPrev}`} onClick={goToPrevSlide}>
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
      <button className={`${styles.btnSliderNext}`} onClick={goToNextSlide}>
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
    </div>
  );
}
