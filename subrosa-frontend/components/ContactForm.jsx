"use client";
import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert("Message envoyé avec succès !");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Erreur lors de l'envoi du message.");
      }
    } catch (error) {
      console.error("Erreur de soumission :", error);
      alert("Une erreur est survenue.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
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
          />
        </div>
      </div>
      <div className="button-group">
        <button type="submit" className="submit-button">
          ENVOYER
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
