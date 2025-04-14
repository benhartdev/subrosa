import React, { useEffect } from "react";
import "../styles/popup.css";

const PopupMessage = ({ message, type = "info", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Fermeture auto après 3s
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`popup-message ${type}`}>
      <p>{message}</p>
    </div>
  );
};

export default PopupMessage;
