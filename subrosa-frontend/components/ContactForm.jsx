"use client";

import React, { useState } from "react";
import SablierLoader from "./SablierLoader";
import styles from "./ContactForm.module.css";
import SubrosaLogo from "./SubrosaLogo";

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
        headers: {"Content-Type": "application/json",},
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(data.emailSent ? "success" : "emailFail");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus(null), 5000); // efface le message après 5 sec
      } else {
        setStatus("error");
      }
      } catch (error) {console.error("Erreur de soumission :", error);
      setStatus("error");
      }
      setLoading(false);
      };

  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value.trimStart().slice(0, name === "message" ? 1000 : 100), // max 1000 caractères pour le message, 100 pour le nom/email
  }));
};

  return (
    <>
      {loading && <SablierLoader />}

      <div className={styles.container}>
         <div className={styles.formWrapper}>
             <div className={styles.logoOverlay}>
               <SubrosaLogo />
            </div>
                <div className={styles.contactInfo}>
                  <h2 className={styles.contactTitle}>CONTACTEZ-NOUS</h2>
                  <p>SHOWROOM GALERIE&nbsp;SUB&nbsp;ROSA&nbsp;ART</p>
                  <p>Immeuble&nbsp;des&nbsp;AFEC&nbsp;/&nbsp;2ème&nbsp;étage&nbsp;/&nbsp;Rue&nbsp;Lamennais 47000&nbsp;AGEN</p>
                  <p>Ouvert&nbsp;au&nbsp;public du&nbsp;mardi&nbsp;au&nbsp;jeudi&nbsp;10h–17h</p>
                  <p>ou sur RV au 06&nbsp;68&nbsp;10&nbsp;52&nbsp;51</p>
                  <p>
                    Artistes : la ligne téléphonique étant réservée aux clients et partenaires,<br />
                    toute demande d'intégration au site merci de cliquer&nbsp;<a href="/inscription" className={styles.signInWord}>ici</a>.<br />
                    Nous&nbsp;n'évaluons&nbsp;pas et ne vendons pas les œuvres sans dossier.
                  </p>
                </div>
                  <form onSubmit={handleSubmit} className={styles.contactForm}>
                    <div className={styles.inputField}>
                      <input
                        type="text"
                        name="name"
                        placeholder="Votre nom (obligatoire)"
                        value={formData.name}
                        onChange={handleChange}
                        className={styles.formInput}
                        maxLength={100}
                        required
                      />
                    </div>
                    <div className={styles.inputField}>
                      <input
                        type="email"
                        name="email"
                        placeholder="Votre email (obligatoire)"
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.formInput}
                        maxLength={100}
                        required
                      />
                    </div>
                    <div className={styles.textareaField}>
                      <div className={styles.textareaWrapper}>
                        <textarea
                          name="message"
                          placeholder="Votre message (1000 caractères max)"
                          value={formData.message}
                          onChange={handleChange}
                          className={styles.formTextarea}
                          maxLength={1000}
                          required
                        />
                      </div>
                    </div>
                    <div className={styles.buttonGroup}>
                      <button
                          type="submit"
                          className={styles.submitButton}
                          disabled={loading}>
                          {loading ? "ENVOI EN COURS..." : "ENVOYER"}
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
        </div>
      </div>
    </>
  );
};

export default ContactForm;