import React, { useState } from 'react';
import axios from 'axios';
import "../styles/inscription-artiste.css";

const UserForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
        phone: '',
        newsletter: false
      });

  

      const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({
          ...formData,
          [name]: type === 'checkbox' ? checked : value
        });
      };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', formData);
      alert("Utilisateur ajouté avec succès !");
      setFormData({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
        phone: '',
        newsletter: false
      });
    } catch (error) {
        console.error("Erreur lors de l'enregistrement :", error);
        alert("Erreur lors de l'enregistrement.");
      }
    };
  

  return (
    <div className="container">
    <form onSubmit={handleSubmit}>
    <h2>Création de compte utilisateur</h2>
    
    <label>Nom d'utilisateur :</label>
      <input name="username" value={formData.username} onChange={handleChange} required />

      <label>Mot de passe :</label>
      <input type="password" name="password" value={formData.password} onChange={handleChange} required />

      <label>Adresse email :</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />

      <label>Prénom :</label>
      <input name="firstName" value={formData.firstName} onChange={handleChange} />

      <label>Nom :</label>
      <input name="lastName" value={formData.lastName} onChange={handleChange} />

      <label>Téléphone :</label>
      <input name="phone" value={formData.phone} onChange={handleChange} />

      <label>Adresse :</label>
      <input name="address" value={formData.address} onChange={handleChange} />

      <label>Code postal :</label>
      <input name="postalCode" value={formData.postalCode} onChange={handleChange} />

      <label>Ville :</label>
      <input name="city" value={formData.city} onChange={handleChange} />

      <label>Pays :</label>
      <input name="country" value={formData.country} onChange={handleChange} />

      <div className="checkbox-container">
        <input type="checkbox" id="newsletter" name="newsletter" checked={formData.newsletter} onChange={handleChange} />
        <label htmlFor="newsletter">Je souhaite m'inscrire à la newsletter</label>
      </div>

      <button id="soumettre" type="submit">S'inscrire</button>
    </form>
    </div>
  );
};

export default UserForm;
