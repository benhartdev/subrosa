import React, { useEffect } from "react";
import styles from "./PopupMessage.module.css";

const PopupMessage = ({ message, type = "info", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Fermeture auto après 3s
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.popupMessage} ${styles[type]}`}>
      <p>{message}</p>
    </div>
  );
};

export default PopupMessage;
