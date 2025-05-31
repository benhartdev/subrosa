"use client";
import { useState } from "react";
import styles from "./ImageGalleryModal.module.css";

export default function ImageGalleryModal({ images }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  const openModal = (index) => {
    setCurrentIdx(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const goPrev = () => setCurrentIdx((currentIdx - 1 + images.length) % images.length);
  const goNext = () => setCurrentIdx((currentIdx + 1) % images.length);

  return (
    <>
      <div className={styles.gallery}>
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`gallery-${idx}`}
            className={styles.thumbnail}
            onClick={() => openModal(idx)}
          />
        ))}
      </div>

      {isOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className={styles.closeBtn}>×</button>
            <button onClick={goPrev} className={styles.navBtn + " " + styles.left}>&lt;</button>
            <img src={images[currentIdx]} alt="Zoom" className={styles.fullImage} />
            <button onClick={goNext} className={styles.navBtn + " " + styles.right}>&gt;</button>
          </div>
        </div>
      )}
    </>
  );
}
