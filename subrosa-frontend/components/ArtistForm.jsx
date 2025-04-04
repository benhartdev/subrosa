import React, { useState } from 'react';
import axios from 'axios';

const ArtistForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    Id: '',
    birthdate: '',
    country_location: '',
    city_location: '',
    style: '',
    technical_skills: '',
    bio: '',
    email: '',
    phone: '',
    website: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    twitter: '',
    old_exhibitions: [],
    future_exhibitions: [],
    interviews:'',
    isApproved:false,
    status:'',
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
        username: '',
        password: '',
        name: '',
        Id: '',
        birthdate: '',
        country_location: '',
        city_location: '',
        style: '',
        technical_skills: '',
        bio: '',
        email: '',
        phone: '',
        website: '',
        facebook: '',
        instagram: '',
        linkedin: '',
        twitter: '',
        old_exhibitions: [],
        future_exhibitions: [],
        interviews:'',
        isApproved:false,
        status:'',
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
    
      <label>Nom d'utilisateur :</label>
      <input name="username" value={formData.username} onChange={handleChange} required />
    
      <label>Mot de passe :</label>
      <input type="password" name="password" value={formData.password} onChange={handleChange} required />
    
      <label>Nom :</label>
      <input name="name" value={formData.name} onChange={handleChange} required />
    
      <label>Date de naissance (jj/mm/aaaa) :</label>
      <input name="birthdate" value={formData.birthdate} onChange={handleChange} placeholder="31/12/1980" />
    
      <label>Pays :</label>
      <input name="country_location" value={formData.country_location} onChange={handleChange}  />
    
      <label>Ville :</label>
      <input name="city_location" value={formData.city_location} onChange={handleChange}  />
    
      <label>Discipline artistique :</label>
      <select name="style" value={formData.style} onChange={handleChange} >
        <option value="">-- Choisir --</option>
        <option value="peinture">Peinture</option>
        <option value="photographie">Photographie</option>
        <option value="sculpture">Sculpture</option>
        <option value="illustration">Illustration</option>
        <option value="autre">Autre</option>
      </select>
    
      <label>Compétences techniques :</label>
      <input name="technical_skills" value={formData.technical_skills} onChange={handleChange}  />
    
      
    
      <label>Biographie :</label>
      <textarea name="bio" value={formData.bio} onChange={handleChange} />
    
      <label>Email :</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />
    
      <label>Téléphone :</label>
      <input name="phone" value={formData.phone} onChange={handleChange} />
    
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
    
      <label>Interview (optionnelle) :</label>
      <textarea name="interviews" value={formData.interviews} onChange={handleChange} />
    
      
    
      <button type="submit">Soumettre</button>
    
    </form>
      );
    };

export default ArtistForm;
