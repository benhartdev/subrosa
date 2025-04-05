import React, { useState } from 'react';
import '../styles/inscription-artiste.css';

const ArtistFullForm = () => {
  const [formData, setFormData] = useState({
    username: '', password: '', name: '', birthdate: '',
    country_location: '', city_location: '', style: '',
    technical_skills: '', bio: '', email: '', phone: '',
    website: '', facebook: '', instagram: '', linkedin: '',
    twitter: '', old_exhibitions: [], future_exhibitions: [],
    interviews: '', isApproved: false, status: ''
  });

  const [expoInput, setExpoInput] = useState('');
  const [futureExpoInput, setFutureExpoInput] = useState('');
  const [files, setFiles] = useState([null]);
  const [alts, setAlts] = useState(['']);
  const [message, setMessage] = useState('');

  // ✅ Fonction utilitaire sécurisée
  const getSafeValue = (val) => (typeof val === 'string' ? val : '');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
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

    // Champs texte
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach(val => form.append(key, val));
      } else {
        form.append(key, formData[key]);
      }
    });

    // Fichiers et leurs alt
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
          interviews: '', isApproved: false, status: ''
        });
        setFiles([null, null, null, null, null, null]);
        setAlts(['', '', '', '', '', '']);
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
    <form onSubmit={handleSubmit}>
      <h2>Inscription Artiste SUB ROSA</h2>

      <label>Nom d'utilisateur :</label>
      <input name="username" value={getSafeValue(formData.username)} onChange={handleChange} required />

      <label>Mot de passe :</label>
      <input type="password" name="password" value={getSafeValue(formData.password)} onChange={handleChange} required />

      <label>Nom et prénom :</label>
      <input name="name" value={getSafeValue(formData.name)} onChange={handleChange} required />

      <label>Date de naissance :</label>
      <input name="birthdate" value={getSafeValue(formData.birthdate)} onChange={handleChange} />

      <label>Pays :</label>
      <input name="country_location" value={getSafeValue(formData.country_location)} onChange={handleChange} />

      <label>Ville :</label>
      <input name="city_location" value={getSafeValue(formData.city_location)} onChange={handleChange} />

      <label>Discipline artistique :</label>
      <select name="style" value={getSafeValue(formData.style)} onChange={handleChange}>
        <option value="">-- Choisir --</option>
        <option value="peinture">Peinture</option>
        <option value="photographie">Photographie</option>
        <option value="sculpture">Sculpture</option>
        <option value="illustration">Illustration</option>
        <option value="autre">Autre</option>
      </select>

      <label>Compétences techniques :</label>
      <input name="technical_skills" value={getSafeValue(formData.technical_skills)} onChange={handleChange} />

      <label>Biographie :</label>
      <textarea name="bio" value={getSafeValue(formData.bio)} onChange={handleChange} />

      <label>Email :</label>
      <input type="email" name="email" value={getSafeValue(formData.email)} onChange={handleChange} required />

      <label>Téléphone :</label>
      <input name="phone" value={getSafeValue(formData.phone)} onChange={handleChange} />

      <label>Site web :</label>
      <input name="website" value={getSafeValue(formData.website)} onChange={handleChange} />

      <label>Facebook :</label>
      <input name="facebook" value={getSafeValue(formData.facebook)} onChange={handleChange} />

      <label>Instagram :</label>
      <input name="instagram" value={getSafeValue(formData.instagram)} onChange={handleChange} />

      <label>LinkedIn :</label>
      <input name="linkedin" value={getSafeValue(formData.linkedin)} onChange={handleChange} />

      <label>Twitter :</label>
      <input name="twitter" value={getSafeValue(formData.twitter)} onChange={handleChange} />

      <label>Expositions passées :</label>
      <input type="text" value={getSafeValue(expoInput)} onChange={(e) => setExpoInput(e.target.value)} />
      <button type="button" onClick={handleAddExhibition}>Ajouter</button>
      <ul>{formData.old_exhibitions.map((expo, i) => <li key={i}>{expo}</li>)}</ul>

      <label>Expositions futures :</label>
      <input type="text" value={getSafeValue(futureExpoInput)} onChange={(e) => setFutureExpoInput(e.target.value)} />
      <button type="button" onClick={handleAddFutureExhibition}>Ajouter</button>
      <ul>{formData.future_exhibitions.map((expo, i) => <li key={i}>{expo}</li>)}</ul>

      <label>Interview (optionnelle) :</label>
      <textarea name="interviews" value={getSafeValue(formData.interviews)} onChange={handleChange} />

      <hr />
      <h3 style={{ marginTop: '2rem', textAlign: 'center' }}>Ajout des œuvres (max 20)</h3>

      <div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '1rem',
  marginBottom: '2rem'
}}>
  {files.map((file, index) => (
    <div key={index} style={{ background: '#f8f8f8', borderRadius: '8px', padding: '1rem', position: 'relative' }}>

      {/* 🔴 Le bouton de suppression (affiché si une image est présente) */}
      {file && (
        <button
          type="button"
          onClick={() => handleRemoveImage(index)}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'transparent',
            border: 'none',
            fontSize: '1.2rem',
            cursor: 'pointer',
            color: '#c00'
          }}
          title="Supprimer cette image"
        >
          ❌
        </button>
      )}

      {file ? (
        <img
          src={URL.createObjectURL(file)}
          alt="Aperçu"
          style={{ width: '100%', borderRadius: '8px', marginBottom: '0.5rem' }}
        />
      ) : (
        <div style={{
          width: '100%',
          height: '150px',
          backgroundColor: '#e0e0e0',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#777',
          marginBottom: '0.5rem'
        }}>
          Aperçu
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleDynamicImageUpload(index, e.target.files[0])}
        style={{ marginBottom: '0.5rem' }}
      />

      <input
        type="text"
        placeholder="Texte alternatif (alt)"
        value={alts[index]}
        onChange={(e) => handleAltChange(index, e.target.value)}
        style={{
          width: '100%',
          padding: '0.4rem',
          borderRadius: '6px',
          border: '1px solid #ccc'
        }}
      />
    </div>
  ))}
</div>





      <button type="submit">Soumettre</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ArtistFullForm;
