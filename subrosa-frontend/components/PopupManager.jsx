'use client';
import { useEffect } from 'react';
import styles from './PopupManager.module.css';

const showPopup = (message, isError = false) => {
  const overlay = document.createElement('div');
  overlay.className = styles["popup-overlay"];

  const popup = document.createElement('div');
  popup.className = isError ? styles["popup-error"] : styles["popup-success"];
  popup.innerText = message;

  document.body.appendChild(overlay);
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
    overlay.remove();
  }, 6000);
};

// On attache la fonction globalement
if (typeof window !== 'undefined') {
  window.showGlobalPopup = showPopup;
}

const PopupManager = () => {
  // Ce composant ne fait rien d’autre que déclarer la fonction globale
  useEffect(() => {}, []);
  return null;
};

export default PopupManager;
