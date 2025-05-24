"use client";
import React, { useState } from "react";
import styles from "./Newsletter.module.css";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      return window?.showGlobalPopup?.("Veuillez entrer un email.", true);
    }

    try {
      const res = await fetch("http://localhost:5000/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await res.json();

      if (res.ok) {
        window?.showGlobalPopup?.(data.message || "Inscription Newsletter réussie.");
        setEmail(""); // reset input
      } else {
        window?.showGlobalPopup?.(data.message || "Erreur lors de l'inscription.", true);
      }
    } catch (err) {
      console.error("Erreur newsletter :", err);
      window?.showGlobalPopup?.("Erreur réseau ou serveur.", true);
    }
  };

  return (
    <div id="newsletter" className={styles.newsletterContainer}>
      <label className={styles.newsletterLabel} htmlFor="email">
        INSCRIPTION NEWSLETTER
      </label>
      <div className={styles.newsletter}>
        <input
          type="email"
          className={styles.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre adresse mail"
        />
        <button className={styles.subscribeBtn} onClick={handleSubscribe}>
          OK
        </button>
      </div>
    </div>
  );
}
