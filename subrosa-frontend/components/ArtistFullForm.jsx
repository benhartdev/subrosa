// VERSION MODIFIÉE POUR MODE ADMIN-EDIT

import React, { useState, useEffect } from 'react';
import '../styles/inscription-artiste.css';
import PopupMessage from "../components/PopupMessage";

const ArtistFullForm = ({ existingData = {}, onSubmit, onCancel, mode = "create" }) => {
  const [formData, setFormData] = useState({
    username: '', password: '', name: '', birthdate: '',
    country_location: '', city_location: '', style: '',
    technical_skills: '', bio: '', email: '', phone: '',
    website: '', facebook: '', instagram: '', linkedin: '',
    twitter: '', old_exhibitions: [], future_exhibitions: [],
    interviews: '', isApproved: false, status: '', newsletter: false
  });
  const [popup, setPopup] = useState(null);

  const [expoInput, setExpoInput] = useState('');
  const [futureExpoInput, setFutureExpoInput] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (existingData && Object.keys(existingData).length > 0) {
      setFormData((prev) => ({ ...prev, ...existingData }));
    }
  }, [existingData]);

  const getSafeValue = (val) => (typeof val === 'string' ? val : '');

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'style' ? value.toLowerCase() : (type === 'checkbox' ? checked : value),
    });
  };

  const handleAddExhibition = (e, type) => {
    e.preventDefault();
    if (type === 'old' && expoInput.trim()) {
      setFormData({ ...formData, old_exhibitions: [...formData.old_exhibitions, expoInput.trim()] });
      setExpoInput('');
    }
    if (type === 'future' && futureExpoInput.trim()) {
      setFormData({ ...formData, future_exhibitions: [...formData.future_exhibitions, futureExpoInput.trim()] });
      setFutureExpoInput('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = mode === 'admin-edit'
      ? { ...formData, _id: existingData._id }
      : formData;
    onSubmit(payload, e);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>{mode === 'admin-edit' ? "" : "Inscription Artiste SUB ROSA"}</h2>

        <div className="form-row">
          <div className="half">
            <label>Nom d'utilisateur :</label>
            <input className="animated-input" name="username" value={getSafeValue(formData.username)} onChange={handleChange} required={mode !== 'admin-edit'} />
          </div>
          <div className="half">
            <label>Mot de passe :</label>
            <input className="animated-input" type="password" name="password" value={getSafeValue(formData.password)} onChange={handleChange} required={mode !== 'admin-edit'} />
          </div>
        </div>

        <div className="form-row">
          <div className="half">
            <label>Nom complet :</label>
            <input className="animated-input" name="name" value={getSafeValue(formData.name)} onChange={handleChange} required={mode !== 'admin-edit'} />
          </div>
          <div className="half">
            <label>Date de naissance :</label>
            <input className="animated-input" name="birthdate" value={getSafeValue(formData.birthdate)} onChange={handleChange} />
          </div>
        </div>

        <label>Bio :</label>
        <textarea className="animated-input" name="bio" value={getSafeValue(formData.bio)} onChange={handleChange} />

        <label>Style artistique :</label>
  <select
  name="style"
  value={getSafeValue(formData.style)}  
  onChange={handleChange}             
  className="animated-input"
>
  <option value="">Choisir un style</option>
  <option value="photographie">photographie</option>
  <option value="peinture">peinture</option>
  <option value="sculpture">sculpture</option>
  <option value="illustration">illustration</option>
  <option value="autre">autre</option>
  
</select>

        <label>Compétences techniques :</label>
        <input className="animated-input" name="technical_skills" value={getSafeValue(formData.technical_skills)} onChange={handleChange} />

        <label>Email :</label>
        <input className="animated-input" type="email" name="email" value={getSafeValue(formData.email)} onChange={handleChange} required={mode !== 'admin-edit'} />

        <label>Téléphone :</label>
        <input className="animated-input" name="phone" value={getSafeValue(formData.phone)} onChange={handleChange} />

        <label>Pays :</label>
        <input className="animated-input" name="country_location" value={getSafeValue(formData.country_location)} onChange={handleChange} />

        <label>Ville :</label>
        <input className="animated-input" name="city_location" value={getSafeValue(formData.city_location)} onChange={handleChange} />

        <label>Site web :</label>
        <input className="animated-input" name="website" value={getSafeValue(formData.website)} onChange={handleChange} />

        <label>Réseaux sociaux :</label>
        <input className="animated-input" placeholder="Facebook" name="facebook" value={getSafeValue(formData.facebook)} onChange={handleChange} />
        <input className="animated-input" placeholder="Instagram" name="instagram" value={getSafeValue(formData.instagram)} onChange={handleChange} />
        <input className="animated-input" placeholder="LinkedIn" name="linkedin" value={getSafeValue(formData.linkedin)} onChange={handleChange} />
        <input className="animated-input" placeholder="Twitter" name="twitter" value={getSafeValue(formData.twitter)} onChange={handleChange} />

        <label>Interviews / Presse :</label>
        <textarea className="animated-input" name="interviews" value={getSafeValue(formData.interviews)} onChange={handleChange} />

        <label>Expositions passées :</label>
        <div className="expo-input">
          <input className="animated-input" value={expoInput} onChange={(e) => setExpoInput(e.target.value)} />
          <button onClick={(e) => handleAddExhibition(e, 'old')}>Ajouter</button>
        </div>
        <ul>{formData.old_exhibitions.map((expo, i) => <li key={i}>{expo}</li>)}</ul>

        <label>Expositions futures :</label>
        <div className="expo-input">
          <input className="animated-input" value={futureExpoInput} onChange={(e) => setFutureExpoInput(e.target.value)} />
          <button onClick={(e) => handleAddExhibition(e, 'future')}>Ajouter</button>
        </div>
        <ul>{formData.future_exhibitions.map((expo, i) => <li key={i}>{expo}</li>)}</ul>

        <label>
          <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange} /> Recevoir la newsletter
        </label>

        <label>
          <input type="checkbox" name="isApproved" checked={formData.isApproved} onChange={handleChange} /> Approuvé par l'admin ?
        </label>

        {mode === "admin-edit" && (
  <>
    <label>Statut :</label>
    <select name="status" value={formData.status} onChange={handleChange}>
      <option value="">Choisir...</option>
      <option value="pending">En attente</option>
      <option value="validated">Validé</option>
      <option value="rejected">Rejeté</option>
    </select>
  </>
)}

        <div className="buttonGroup">
          <button type="submit" className="button primary">💾 Enregistrer</button>
          {onCancel && <button type="button" className="button secondary" onClick={onCancel} style={{ border: "1px solid #ffffff" }}>❌ Annuler</button>}
        </div>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default ArtistFullForm;
