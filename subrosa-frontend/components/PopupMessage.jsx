"use client";

import React, { useEffect, useState } from "react";
import styles from "./PopupMessage.module.css";

const PopupMessage = ({ message, type = "info", onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        if (typeof onClose === "function") onClose();
      }, 300); // délai pour laisser la transition se terminer
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`${styles.popupMessage} ${styles[type]} ${
        visible ? styles.show : styles.hide
      }`}
    >
      <p>{message}</p>
    </div>
  );
};

PopupMessage.defaultProps = {
  onClose: () => {},
};

export default PopupMessage;
