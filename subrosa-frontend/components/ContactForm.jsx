"use client";
import React, { useState } from "react";
import SablierLoader from "./SablierLoader";
import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(data.emailSent ? "success" : "emailFail");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Erreur de soumission :", error);
      setStatus("error");
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {loading && <SablierLoader />}

      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <div className={styles.inputField}>
          <input
            type="text"
            name="name"
            placeholder="Votre nom (obligatoire)"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.formInput}
          />
        </div>
        <div className={styles.inputField}>
          <input
            type="email"
            name="email"
            placeholder="Votre email (obligatoire)"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.formInput}
          />
        </div>
        <div className={styles.textareaField}>
          <div className={styles.textareaWrapper}>
            <textarea
              name="message"
              placeholder="Votre message"
              value={formData.message}
              onChange={handleChange}
              className={styles.formTextarea}
              required
            />
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            ENVOYER
          </button>
        </div>
      </form>

      {status && (
        <div className={styles.formFeedbackWrapper}>
          {status === "success" && (
            <p className={`${styles.formFeedback} ${styles.success}`}>
              ✅ Votre message a bien été envoyé.
            </p>
          )}
          {status === "emailFail" && (
            <p className={`${styles.formFeedback} ${styles.warning}`}>
              ⚠️ Message enregistré, mais l’e-mail n’a pas pu être envoyé.
            </p>
          )}
          {status === "error" && (
            <p className={`${styles.formFeedback} ${styles.error}`}>
              ❌ Une erreur est survenue. Veuillez réessayer.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default ContactForm;
