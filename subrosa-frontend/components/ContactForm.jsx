"use client";
import React, { useState } from "react";
import SablierLoader from "./SablierLoader";


const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null); // success | emailFail | error
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
      {/* Overlay avec sablier si loading */}
      {loading && <SablierLoader />}

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="input-field">
          <input
            type="text"
            name="name"
            placeholder="Votre nom (obligatoire)"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="input-field">
          <input
            type="email"
            name="email"
            placeholder="Votre email (obligatoire)"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="textarea-field">
          <div className="textarea-wrapper">
            <textarea
              name="message"
              placeholder="Votre message"
              value={formData.message}
              onChange={handleChange}
              className="form-textarea"
              required
            />
          </div>
        </div>
        <div className="button-group">
          <button type="submit" className="submit-button" disabled={loading}>
            ENVOYER
          </button>
        </div>
      </form>

      {/* Message juste après le formulaire */}
      {status && (
        <div className="form-feedback-wrapper">
          {status === "success" && (
            <p className="form-feedback success">
              ✅ Votre message a bien été envoyé.
            </p>
          )}
          {status === "emailFail" && (
            <p className="form-feedback warning">
              ⚠️ Message enregistré, mais l’e-mail n’a pas pu être envoyé.
            </p>
          )}
          {status === "error" && (
            <p className="form-feedback error">
              ❌ Une erreur est survenue. Veuillez réessayer.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default ContactForm;
