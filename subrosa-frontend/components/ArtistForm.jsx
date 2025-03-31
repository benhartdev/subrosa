import React, { useState } from 'react';
import axios from 'axios';

const ArtistForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    Id: '',
    date_of_birth: '',
    country_location: '',
    city_location: '',
    craft: '',
    technical_skills: '',
    bio: '',
    description: '',
    email: '',
    number: '',
    website: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    twitter: '',
    old_exhibitions: [],
    future_exhibitions: [],
  });

  const [expoInput, setExpoInput] = useState('');
  const [futureExpoInput, setFutureExpoInput] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleAddExhibition = () => {
    if (expoInput.trim()) {
      setFormData({...formData, old_exhibitions: [...formData.old_exhibitions, expoInput]});
      setExpoInput('');
    }
  };

  const handleAddFutureExhibition = () => {
    if (futureExpoInput.trim()) {
      setFormData({...formData, future_exhibitions: [...formData.future_exhibitions, futureExpoInput]});
      setFutureExpoInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/public/artists', formData);
      alert("Artiste ajouté avec succès !");
      setFormData({
        name: '', Id: '', date_of_birth: '', country_location: '', city_location: '',
        craft: '', technical_skills: '', bio: '', description: '', email: '', number: '',
        website: '', facebook: '', instagram: '', linkedin: '', twitter: '',
        old_exhibitions: [], future_exhibitions: []
      });
    } catch (error) {
        console.error("Erreur complète :", error);
        if (error.response) {
          console.error("Données retournées par le serveur :", error.response.data);
          alert(`Erreur : ${error.response.data.message || 'Erreur inconnue'}`);
        } else {
          alert("Erreur inconnue lors de l'enregistrement.");
         } }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Formulaire d'inscription artiste</h2>

      <label>Nom :</label>
      <input name="name" value={formData.name} onChange={handleChange} required />

      <label>ID (optionnel) :</label>
      <input name="Id" value={formData.Id} onChange={handleChange} />

      <label>Date de naissance :</label>
      <input name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} />

      <label>Pays :</label>
      <input name="country_location" value={formData.country_location} onChange={handleChange} />

      <label>Ville :</label>
      <input name="city_location" value={formData.city_location} onChange={handleChange} />

      <label>Discipline artistique :</label>
      <input name="craft" value={formData.craft} onChange={handleChange} />

      <label>Compétences techniques :</label>
      <input name="technical_skills" value={formData.technical_skills} onChange={handleChange} />

      <label>Description :</label>
      <textarea name="description" value={formData.description} onChange={handleChange} />

      <label>Biographie :</label>
      <textarea name="bio" value={formData.bio} onChange={handleChange} />

      <label>Email :</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} />

      <label>Téléphone :</label>
      <input name="number" value={formData.number} onChange={handleChange} />

      <label>Site web :</label>
      <input name="website" value={formData.website} onChange={handleChange} />

      <label>Facebook :</label>
      <input name="facebook" value={formData.facebook} onChange={handleChange} />

      <label>Instagram :</label>
      <input name="instagram" value={formData.instagram} onChange={handleChange} />

      <label>LinkedIn :</label>
      <input name="linkedin" value={formData.linkedin} onChange={handleChange} />

      <label>Twitter :</label>
      <input name="twitter" value={formData.twitter} onChange={handleChange} />

      <hr />

      <label>Expositions passées :</label>
      <input
        type="text"
        value={expoInput}
        onChange={(e) => setExpoInput(e.target.value)}
        placeholder="Nom de l'exposition"
      />
      <button type="button" onClick={handleAddExhibition}>Ajouter</button>
      <ul>{formData.old_exhibitions.map((expo, i) => <li key={i}>{expo}</li>)}</ul>

      <label>Expositions futures :</label>
      <input
        type="text"
        value={futureExpoInput}
        onChange={(e) => setFutureExpoInput(e.target.value)}
        placeholder="Nom de l'exposition"
      />
      <button type="button" onClick={handleAddFutureExhibition}>Ajouter</button>
      <ul>{formData.future_exhibitions.map((expo, i) => <li key={i}>{expo}</li>)}</ul>

      <button type="submit">Soumettre</button>
    </form>
  );
};

export default ArtistForm;
