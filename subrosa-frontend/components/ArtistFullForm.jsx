import React, { useState } from 'react';
import '../styles/inscription-artiste.css';

const ArtistFullForm = () => {
  const [formData, setFormData] = useState({
    username: '', password: '', name: '', birthdate: '',
    country_location: '', city_location: '', style: '',
    technical_skills: '', bio: '', email: '', phone: '',
    website: '', facebook: '', instagram: '', linkedin: '',
    twitter: '', old_exhibitions: [], future_exhibitions: [],
    interviews: '', isApproved: false, status: '',newsletter: false
  });

  const [expoInput, setExpoInput] = useState('');
  const [futureExpoInput, setFutureExpoInput] = useState('');
  const [files, setFiles] = useState([null]);
  const [alts, setAlts] = useState(['']);
  const [message, setMessage] = useState('');

  const getSafeValue = (val) => (typeof val === 'string' ? val : '');

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
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
      const response = await fetch('http://localhost:5000/api/public/artists/full-create', {
        method: 'POST',
        body: form
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Artiste ajouté avec succès !');
        setFormData({
          username: '', password: '', name: '', birthdate: '',
          country_location: '', city_location: '', style: '',
          technical_skills: '', bio: '', email: '', phone: '',
          website: '', facebook: '', instagram: '', linkedin: '',
          twitter: '', old_exhibitions: [], future_exhibitions: [],
          interviews: '', isApproved: false, status: '',newsletter: false
        });
        setFiles([null]);
        setAlts(['']);
        setExpoInput('');
        setFutureExpoInput('');
      } else {
        setMessage(`❌ Erreur : ${data.error || 'Erreur inconnue'}`);
      }
    } catch (err) {
      setMessage('❌ Erreur serveur lors de l’envoi du formulaire.');
    }
  };

  return (
    <div className="container">
    <form onSubmit={handleSubmit}>
      <h2>Inscription Artiste SUB ROSA</h2>

      {/* Champs disposés en lignes doubles */}
      <div className="form-row">
        <div className="half">
          <label>Nom d'utilisateur :</label>
          <input className="animated-input" name="username" value={getSafeValue(formData.username)} onChange={handleChange} required />
        </div>
        <div className="half">
          <label>Mot de passe :</label>
          <input className="animated-input" type="password" name="password" value={getSafeValue(formData.password)} onChange={handleChange} required />
        </div>
      </div>

      <div className="form-row">
        <div className="half">
          <label>Nom et prénom :</label>
          <input className="animated-input" name="name" value={getSafeValue(formData.name)} onChange={handleChange} required />
        </div>
        <div className="half">
          <label>Date de naissance :</label>
          <input className="animated-input" name="birthdate" value={getSafeValue(formData.birthdate)} onChange={handleChange} />
        </div>
      </div>

      <div className="form-row">
        <div className="half">
          <label>Pays :</label>
          <input className="animated-input" name="country_location" value={getSafeValue(formData.country_location)} onChange={handleChange} />
        </div>
        <div className="half">
          <label>Ville :</label>
          <input className="animated-input" name="city_location" value={getSafeValue(formData.city_location)} onChange={handleChange} />
        </div>
      </div>

      <label>Discipline artistique :</label>
      <select className="animated-input" name="style" value={getSafeValue(formData.style)} onChange={handleChange}>
        <option value="">-- Choisir --</option>
        <option value="peinture">Peinture</option>
        <option value="photographie">Photographie</option>
        <option value="sculpture">Sculpture</option>
        <option value="illustration">Illustration</option>
        <option value="autre">Autre</option>
      </select>

      <label>Compétences techniques :</label>
      <input className="animated-input" name="technical_skills" value={getSafeValue(formData.technical_skills)} onChange={handleChange} />

      <label>Biographie :</label>
      <textarea className="animated-input" name="bio" value={getSafeValue(formData.bio)} onChange={handleChange} />

      <label>Email :</label>
      <input className="animated-input" type="email" name="email" value={getSafeValue(formData.email)} onChange={handleChange} required />

      <label>Téléphone :</label>
      <input className="animated-input" name="phone" value={getSafeValue(formData.phone)} onChange={handleChange} />

      <label>Site web :</label>
      <input className="animated-input" name="website" value={getSafeValue(formData.website)} onChange={handleChange} />

      <div className="form-row">
        <div className="half">
          <label>Facebook :</label>
          <input className="animated-input" name="facebook" value={getSafeValue(formData.facebook)} onChange={handleChange} />
        </div>
        <div className="half">
          <label>Instagram :</label>
          <input className="animated-input" name="instagram" value={getSafeValue(formData.instagram)} onChange={handleChange} />
        </div>
      </div>

      <div className="form-row">
        <div className="half">
          <label>Twitter :</label>
          <input className="animated-input" name="twitter" value={getSafeValue(formData.twitter)} onChange={handleChange} />
        </div>
        <div className="half">
          <label>LinkedIn :</label>
          <input className="animated-input" name="linkedin" value={getSafeValue(formData.linkedin)} onChange={handleChange} />
        </div>
      </div>

      <label>Expositions passées :</label>
      <input className="animated-input" type="text" value={getSafeValue(expoInput)} onChange={(e) => setExpoInput(e.target.value)} />
      <button type="button" onClick={handleAddExhibition}>Ajouter</button>
      <ul>{formData.old_exhibitions.map((expo, i) => <li key={i}>{expo}</li>)}</ul>

      <label>Expositions futures :</label>
      <input className="animated-input" type="text" value={getSafeValue(futureExpoInput)} onChange={(e) => setFutureExpoInput(e.target.value)} />
      <button type="button" onClick={handleAddFutureExhibition}>Ajouter</button>
      <ul>{formData.future_exhibitions.map((expo, i) => <li key={i}>{expo}</li>)}</ul>

      <label>Interview (optionnelle) :</label>
      <textarea className="animated-input" name="interviews" value={getSafeValue(formData.interviews)} onChange={handleChange} />

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
      <div className="checkbox-container">
        <input type="checkbox" id="newsletter" name="newsletter" checked={formData.newsletter} onChange={handleChange} />
        <label htmlFor="newsletter">Je souhaite m'inscrire à la newsletter</label>
      </div>
      <div style={{ textAlign: 'center' }}>
        <button type="submit">Soumettre</button>
      </div>
      {message && <p>{message}</p>}
    </form>
    </div>
  );
};

export default ArtistFullForm;
