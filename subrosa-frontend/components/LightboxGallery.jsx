"use client";
import { useState, useEffect } from "react";
import styles from "./LightboxGallery.module.css";

export default function LightboxGallery({ images, externalTriggerRef = null }) {
  const [currentIndex, setCurrentIndex] = useState(null);

  const open = (index) => setCurrentIndex(index);
  const close = () => setCurrentIndex(null);
  const prev = () => setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  const next = () => setCurrentIndex((currentIndex + 1) % images.length);

  // Expose l'ouverture externe
  useEffect(() => {
    if (externalTriggerRef && typeof externalTriggerRef.current === "object") {
      externalTriggerRef.current.open = open;
    }
  }, [externalTriggerRef]);

  return (
    <>
      <div className={styles.column}>
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`img-${idx}`}
            className={styles.thumbnail}
            onClick={() => open(idx)}
          />
        ))}
      </div>

      {currentIndex !== null && (
        <div className={styles.overlay} onClick={close}>
          <div className={styles.viewer} onClick={(e) => e.stopPropagation()}>
            <button onClick={prev} className={`${styles.nav} ${styles.left}`}>&lt;</button>
            <img src={images[currentIndex]} alt="fullscreen" className={styles.image} />
            <button onClick={next} className={`${styles.nav} ${styles.right}`}>&gt;</button>
            <button onClick={close} className={styles.close}>×</button>
          </div>
        </div>
      )}
    </>
  );
}
