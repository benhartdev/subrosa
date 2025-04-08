"use client";
import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
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
