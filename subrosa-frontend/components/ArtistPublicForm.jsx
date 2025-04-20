// components/ArtistPublicForm.jsx
import React, { useState, useEffect } from 'react';
import '../styles/inscription-artiste.css';
import PopupMessage from "../components/PopupMessage";
import axios from "axios";

const ArtistPublicForm = ({ artistId = null, existingData, onCancel, onSubmit, mode }) => {
  const [formData, setFormData] = useState({
    username: '', password: '', name: '', birthdate: '',
    country_location: '', city_location: '', style: '',
    technical_skills: '', bio: '', email: '', phone: '',
    website: '', facebook: '', instagram: '', linkedin: '',
    twitter: '', old_exhibitions: [], future_exhibitions: [],
    interviews: '', isApproved: false, status: 'pending', newsletter: false
  });

  const [expoInput, setExpoInput] = useState('');
  const [futureExpoInput, setFutureExpoInput] = useState('');
  const [files, setFiles] = useState([null]);
  const [alts, setAlts] = useState(['']);
  const [popup, setPopup] = useState(null);

  const getSafeValue = (val) => (typeof val === 'string' ? val : '');

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/artists/${artistId}`, {
          withCredentials: true
        });
        const artist = response.data;
  
        if (!artist || Object.keys(artist).length === 0) {
          setPopup({
            type: 'error',
            message: "❌ Artiste introuvable ou vide."
          });
          return;
        }
  
        setFormData({
          username: artist.username || '', password: '',
          name: artist.name || '', birthdate: artist.birthdate || '',
          country_location: artist.country_location || '', city_location: artist.city_location || '', style: artist.style || '',
          technical_skills: artist.technical_skills || '', bio: artist.bio || '', email: artist.email || '', phone: artist.phone || '',
          website: artist.website || '', facebook: artist.facebook || '', instagram: artist.instagram || '', linkedin: artist.linkedin || '',
          twitter: artist.twitter || '', old_exhibitions: artist.old_exhibitions || [], future_exhibitions: artist.future_exhibitions || [],
          interviews: artist.interviews || '', isApproved: artist.isApproved || false, status: artist.status || 'pending', newsletter: artist.newsletter || false
        });
  
      } catch (err) {
        console.error("Erreur chargement artiste :", err);
        setPopup({
          type: 'error',
          message: `❌ Erreur chargement artiste (${err.response?.status || 'inconnue'})`
        });
      }
    };
  
    if (artistId) {
      fetchArtist();
    } else if (existingData) {
      setFormData({
        username: existingData.username || '', password: '',
        name: existingData.name || '', birthdate: existingData.birthdate || '',
        country_location: existingData.country_location || '', city_location: existingData.city_location || '', style: existingData.style || '',
        technical_skills: existingData.technical_skills || '', bio: existingData.bio || '', email: existingData.email || '', phone: existingData.phone || '',
        website: existingData.website || '', facebook: existingData.facebook || '', instagram: existingData.instagram || '', linkedin: existingData.linkedin || '',
        twitter: existingData.twitter || '', old_exhibitions: existingData.old_exhibitions || [], future_exhibitions: existingData.future_exhibitions || [],
        interviews: existingData.interviews || '', isApproved: existingData.isApproved || false, status: existingData.status || 'pending', newsletter: existingData.newsletter || false
      });
    }
  }, [artistId, existingData]);
  

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleAddExhibition = () => {
    if (expoInput.trim()) {
      setFormData({ ...formData, old_exhibitions: [...formData.old_exhibitions, expoInput] });
      setExpoInput('');
    }
  };

  const handleAddFutureExhibition = () => {
    if (futureExpoInput.trim()) {
      setFormData({ ...formData, future_exhibitions: [...formData.future_exhibitions, futureExpoInput] });
      setFutureExpoInput('');
    }
  };

  const handleDynamicImageUpload = (index, file) => {
    if (!file) return;
    const updatedFiles = [...files];
    updatedFiles[index] = file;
    if (files.length < 20 && index === files.length - 1) {
      updatedFiles.push(null);
      setAlts((prev) => [...prev, '']);
    }
    setFiles(updatedFiles);
  };

  const handleAltChange = (index, value) => {
    const newAlts = [...alts];
    newAlts[index] = value;
    setAlts(newAlts);
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = [...files];
    const updatedAlts = [...alts];
    updatedFiles.splice(index, 1);
    updatedAlts.splice(index, 1);
    setFiles(updatedFiles.length ? updatedFiles : [null]);
    setAlts(updatedAlts.length ? updatedAlts : ['']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach(val => form.append(key, val));
      } else {
        form.append(key, formData[key]);
      }
    });
    files.forEach((file, index) => {
      if (file) {
        form.append('images', file);
        form.append('alts', alts[index] || '');
      }
    });
    try {
      const url = artistId ? `http://localhost:5000/api/artists/${artistId}` : 'http://localhost:5000/api/uploads/full-create';
      const method = artistId ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        body: form,
        credentials: 'include'
      });
      const data = await response.json();
      if (response.ok) {
        setPopup({
          type: 'success',
          message: artistId ? '✅ Modifications enregistrées avec succès !' : '✅ Artiste ajouté avec succès !'
        });
        setFormData({
          username: '', password: '', name: '', birthdate: '',
          country_location: '', city_location: '', style: '',
          technical_skills: '', bio: '', email: '', phone: '',
          website: '', facebook: '', instagram: '', linkedin: '',
          twitter: '', old_exhibitions: [], future_exhibitions: [],
          interviews: '', isApproved: false, status: 'pending', newsletter: false
        });
        setFiles([null]);
        setAlts(['']);
        setExpoInput('');
        setFutureExpoInput('');
      } else {
        setPopup({ type: 'error', message: `❌ Erreur : ${data.error || 'Erreur inconnue'}` });
      }
    } catch (err) {
      setPopup({ type: 'error', message: '❌ Erreur serveur lors de l’envoi du formulaire.' });
    }
  };

  return (
    <div className="container">
      {popup && <PopupMessage type={popup.type} message={popup.message} onClose={() => setPopup(null)} />}
      <form onSubmit={handleSubmit}>
      <h2>{mode === 'admin-edit' ? "Modification d'un artiste" : "Inscription Artiste SUB ROSA"}</h2>
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

        <label>Biographie :</label>
        <textarea className="animated-input" placeholder="500 caractères maximum" name="bio" value={getSafeValue(formData.bio)} onChange={handleChange} />

        <label>Style artistique :</label>
            <select
            name="style"
            value={getSafeValue(formData.style)} 
            onChange={handleChange}               
            className="animated-input">
              
                  <option value="">Choisir un style</option>
                  <option value="photographie">photographie</option>
                  <option value="peinture">peinture</option>
                  <option value="sculpture">sculpture</option>
                  <option value="illustration">illustration</option>
                  <option value="plasticien">plasticien</option>
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

        <hr />
      <h3 style={{ marginTop: '2rem', textAlign: 'center' }}>Ajout des œuvres (max 20)</h3>

      <div className="upload-grid">
        {files.map((file, index) => (
          <div className="upload-box" key={index}>
            {file && (
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                title="Supprimer cette image"
              >
                ❌
              </button>
            )}

            {file ? (
              <img src={URL.createObjectURL(file)} alt="Aperçu" />
            ) : (
              <div className="preview-placeholder">Aperçu</div>
            )}

            <input
              className="animated-input"
              type="file"
              accept="image/*"
              onChange={(e) => handleDynamicImageUpload(index, e.target.files[0])}
            />

            <input
              className="animated-input"
              type="text"
              placeholder="Description de la photo  ==> ex: Photo de l'artiste Ben H ou photo de l'œuvre nomée 'La Nuit' de l'artiste Ben H"
              value={alts[index]}
              onChange={(e) => handleAltChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      
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
          {onCancel && <button type="button" className="button secondary" onClick={onCancel}>❌ Annuler</button>}
        </div>

        {popup && <PopupMessage type={popup.type} message={popup.message} onClose={() => setPopup(null)} />}
      </form>
    </div>
  );
};

export default ArtistPublicForm;
