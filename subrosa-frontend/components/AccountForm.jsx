// components/AccountForm.jsx
import React, { useState, useEffect } from 'react';
import styles from './AccountForm.module.css';
import PopupMessage from "./PopupMessage";
import axios from "axios";
import { useRouter } from "next/navigation";
import SubrosaLogo from "./SubrosaLogo";

const AccountForm = ({ type = "artist", artistId = null, existingData = {}, onCancel, showLogo = true }) => {
  const router = useRouter();
  const isAdmin = type === "admin-edit";
  const isArtist = type === "artist" || isAdmin;
  const isUser = type === "user";

  const [formData, setFormData] = useState({
    username: '', password: '', confirmPassword: '',
    email: '', confirmEmail: '',
    firstName: '', lastName: '', address: '', city: '', country: '', postalCode: '', phone: '',
    name: '', birthdate: '', country_location: '', city_location: '', style: '',
    technical_skills: '', bio: '',
    website: '', facebook: '', instagram: '', linkedin: '', twitter: '',
    old_exhibitions: [], future_exhibitions: [],
    interviews: '', isApproved: false, status: 'pending', newsletter: false
  });

  const [expoInput, setExpoInput] = useState('');
  const [futureExpoInput, setFutureExpoInput] = useState('');
  const [popup, setPopup] = useState(null);
const getSafeValue = (val) => (typeof val === 'string' ? val : '');

 useEffect(() => {
  if (existingData && Object.keys(existingData).length > 0) {
    const newData = {
      ...existingData,
      password: '',
      confirmPassword: '',
      email: existingData.email || '',
      confirmEmail: existingData.email || '',
    };

    if (type === "admin-edit") {
      newData.password = '';
      newData.confirmPassword = '';
    }

    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  }
}, [existingData, type]);


  const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  // Nouvelle valeur pour le champ modifié
  const newValue = type === 'checkbox' ? checked : value;

  // Nouvelle copie du formData avec la valeur modifiée
  const updatedData = {
    ...formData,
    [name]: newValue,
  };

  // Logique : si on change le statut
  if (name === 'status') {
    if (value === 'validated') {
      updatedData.isApproved = true;
    } else {
      updatedData.isApproved = false;
    }
  }

  setFormData(updatedData);
};


  
  
  const handleAddExhibition = (type) => {
    if (type === 'old' && expoInput.trim()) {
      setFormData((prev) => ({ ...prev, old_exhibitions: [...prev.old_exhibitions, expoInput.trim()] }));
      setExpoInput('');
    } else if (type === 'future' && futureExpoInput.trim()) {
      setFormData((prev) => ({ ...prev, future_exhibitions: [...prev.future_exhibitions, futureExpoInput.trim()] }));
      setFutureExpoInput('');
    }
  };

  const validateForm = () => {
    console.log("validateForm →", { type, isAdmin, isArtist });

    if (!isAdmin) {
  if (!formData.password || !formData.confirmPassword) {
    setPopup({ type: 'error', message: '❌ Le mot de passe est requis.' });
    return false;
  }
  if (formData.password !== formData.confirmPassword) {
    setPopup({ type: 'error', message: '❌ Les mots de passe ne correspondent pas.' });
    return false;
  }
  if (!formData.email || !formData.confirmEmail) {
    setPopup({ type: 'error', message: '❌ Les champs email sont requis.' });
    return false;
  }
  if (formData.email !== formData.confirmEmail) {
    setPopup({ type: 'error', message: '❌ Les emails ne correspondent pas.' });
    return false;
  }
}

    console.log("validateForm", { isAdmin, password: formData.password, confirm: formData.confirmPassword });
    console.log("🧪 Render AccountForm:", { type, isAdmin });

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isUser) {
        await axios.post('http://localhost:5000/api/users/register', formData);
        setPopup({ type: 'success', message: '✅ Utilisateur inscrit avec succès.' });
        return;
      }

      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (["confirmPassword", "confirmEmail"].includes(key)) return;
         // 🔁 Si c'est un tableau de **primitifs**
  if (Array.isArray(value) && typeof value[0] !== 'object') {
    value.forEach(val => form.append(key, val));
  }
  // 🔁 Si c'est un tableau d'objets (comme images)
  else if (Array.isArray(value) && typeof value[0] === 'object') {
    form.append(key, JSON.stringify(value));
  }
  // ✅ Autre cas simple
  else {
    form.append(key, value);
  }
});

      const url = isAdmin
        ? `http://localhost:5000/api/artists/${artistId}`
        : 'http://localhost:5000/api/artists/register';
      const method = isAdmin ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: form,
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        setPopup({ type: 'success', message: '✅ Formulaire soumis avec succès !' });
        if (!isAdmin) {
          setTimeout(() => {
            router.push('/ajout-oeuvre');
          }, 1500);
        }
      } else {
        setPopup({ type: 'error', message: `❌ Erreur : ${data.error || 'Inconnue'}` });
      }
    } catch (err) {
      console.error(err);
      setPopup({ type: 'error', message: '❌ Erreur serveur lors de l’envoi.' });
    }
  };

  return (
    <div className={styles.container}>
      {showLogo && <SubrosaLogo variant="inscription" />}

      {popup && <PopupMessage type={popup.type} message={popup.message} onClose={() => setPopup(null)} />}
      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit} noValidate className={styles.form + ' ' + styles[type]}>
          <h2 className={styles.formTitle}>
            {isUser && 'Inscription Utilisateur'}
            {isArtist && !isAdmin && 'Inscription Artiste'}
            {isAdmin && 'Modification Artiste'}
          </h2>

          <label className={styles.labelForm}>Nom d'utilisateur :</label>
            <input className={styles.inputForm} name="username" value={getSafeValue(formData.username)} onChange={handleChange} required />

{!isAdmin && (
  <>
    <label className={styles.labelForm}>Mot de passe :</label>
    <input
      className={styles.inputForm}
      type="password"
      name="password"
      placeholder="Mot de passe"
      value={getSafeValue(formData.password)}
      onChange={handleChange}
      
    />

    <label className={styles.labelForm}>Confirmation du mot de passe :</label>
    <input
      className={styles.inputForm}
      type="password"
      name="confirmPassword"
      placeholder="Confirmez votre mot de passe"
      value={getSafeValue(formData.confirmPassword)}
      onChange={handleChange}
      
      onPaste={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
    />
  </>
)}


          <label className={styles.labelForm}>Email :</label>
          <input className={styles.inputForm} type="email" name="email" value={getSafeValue(formData.email)} onChange={handleChange} />

          <label className={styles.labelForm}>Confirmation email :</label>
          <input className={styles.inputForm} type="email" name="confirmEmail" placeholder="Confirmez votre email" value={formData.confirmEmail} onChange={handleChange} />

          {isUser && (
            <>
              <label className={styles.labelForm}>Nom :</label>
              <input className={styles.inputForm} name="lastName" value={getSafeValue(formData.lastName)} onChange={handleChange} required/>   
               <label className={styles.labelForm}>Prénom :</label>
              <input className={styles.inputForm} name="firstName" value={getSafeValue(formData.firstName)} onChange={handleChange} required/>
              <label className={styles.labelForm}>Adresse :</label>
              <input className={styles.inputForm} name="address" value={getSafeValue(formData.address)} onChange={handleChange} />
              <label className={styles.labelForm}>Code postal :</label>
              <input className={styles.inputForm} name="postalCode" value={getSafeValue(formData.postalCode)} onChange={handleChange} />
              <label className={styles.labelForm}>Ville :</label>
              <input className={styles.inputForm} name="city_location" value={getSafeValue(formData.city_location)} onChange={handleChange} />
              <label className={styles.labelForm}>Pays :</label>
              <input className={styles.inputForm} name="country_location" value={getSafeValue(formData.country_location)} onChange={handleChange} />
              <label className={styles.labelForm}>Téléphone :</label>
              <input className={styles.inputForm} name="phone" value={getSafeValue(formData.phone)} onChange={handleChange} />
            </>
          )}

          {isArtist && (
            <>
              <label className={styles.labelForm}>Prénom / Nom :</label>
              <input className={styles.inputForm} name="name" value={getSafeValue(formData.name)} onChange={handleChange} required />

              <label className={styles.labelForm}>Date de naissance :</label>
            <input className={styles.inputForm} type="date" name="birthdate" value={getSafeValue(formData.birthdate)} onChange={handleChange} required />

              <label className={styles.labelForm}>Pays :</label>
        <input className={styles.inputForm} name="country_location" value={getSafeValue(formData.country_location)} onChange={handleChange} />

              <label className={styles.labelForm}>Ville :</label>
        <input className={styles.inputForm} name="city_location" value={getSafeValue(formData.city_location)} onChange={handleChange} />

              <label className={styles.labelForm}>Style artistique :</label>
            <select
            name="style"
            value={getSafeValue(formData.style)} 
            onChange={handleChange}               
            className={styles.inputForm}
            required >
              
                  <option value="">Choisir un style</option>
                  <option value="Photographe">Photographe</option>
                  <option value="Peintre">Peintre</option>
                  <option value="Sculpteur">Sculpteur</option>
                  <option value="Illustrateur">Illustrateur</option>
                  <option value="Plasticien">Plasticien</option>
                  <option value="Autre">Autre</option>
            </select>

              <label className={styles.labelForm}>Compétences techniques :</label>
        <input className={styles.inputForm} name="technical_skills" placeholder="Photos plexiglas - Peinture sur toile - Fine Art etc..."value={getSafeValue(formData.technical_skills)} onChange={handleChange} />

              <label className={styles.labelForm}>Biographie :</label>
        <textarea className={styles.inputForm} placeholder="500 caractères maximum" name="bio" value={getSafeValue(formData.bio)} onChange={handleChange} />

              <label className={styles.labelForm}>Interviews / Presse :</label>
              <textarea className={styles.inputForm} name="interviews" placeholder="500 caractères maximum" value={getSafeValue(formData.interviews)} onChange={handleChange} />

              <label className={styles.labelForm}>Site web :</label>
              <input className={styles.inputForm} name="website" value={getSafeValue(formData.website)} onChange={handleChange} />

              <label className={styles.labelForm}>Réseaux sociaux :</label>
                  <input className={styles.inputForm} placeholder="Facebook" name="facebook" value={getSafeValue(formData.facebook)} onChange={handleChange} />
                  <input className={styles.inputForm} placeholder="Instagram" name="instagram" value={getSafeValue(formData.instagram)} onChange={handleChange} />
                  <input className={styles.inputForm} placeholder="LinkedIn" name="linkedin" value={getSafeValue(formData.linkedin)} onChange={handleChange} />
                  <input className={styles.inputForm} placeholder="Twitter" name="twitter" value={getSafeValue(formData.twitter)} onChange={handleChange} />

              <label className={styles.labelForm}>Expositions passées :</label>
                <div className={styles.inputExpo}>
                  <input className={styles.inputForm} placeholder="Janvier 2024 :  Salon d'Automne,  Grande Halle de la Vilette, Paris, France" value={expoInput} onChange={(e) => setExpoInput(e.target.value)} />
                  <button className={styles.buttonExpo} type="button" onClick={(e) => handleAddExhibition('old')}>Ajouter</button>
                </div>
                <ul className={styles.exposPassees}>{formData.old_exhibitions.map((expo, i) => <li key={i}>{expo}</li>)}</ul>


              <label className={styles.labelForm}>Expositions futures :</label>
                <div className={styles.inputExpo}>
                  <input className={styles.inputForm} placeholder="Décembre 2025 : Expo Nina's,  Galerie Sub rosa, Paris, France" value={futureExpoInput} onChange={(e) => setFutureExpoInput(e.target.value)} />
                  <button className={styles.buttonExpo} type="button" onClick={(e) => handleAddExhibition('future')}>Ajouter</button>
                </div>
                <ul className={styles.exposFutures}>{formData.future_exhibitions.map((expo, i) => <li key={i}>{expo}</li>)}</ul>


              {isAdmin && (
                <>
                  <label className={styles.labelForm}>Statut :</label>
                  <select className={styles.selectStatut} name="status" value={formData.status} onChange={handleChange}>
                    <option value="">Choisir...</option>
                    <option value="pending">En attente</option>
                    <option value="validated">Validé</option>
                    <option value="rejected">Rejeté</option>
                  </select>

                 
                </>
              )}
            </>
          )}

                    {isAdmin ? (
            <p className={styles.labelForm}>
              Newsletter : <strong>{formData.newsletter ? '✅ inscrit' : '❌ non inscrit'}</strong>
            </p>
          ) : (
            <div className={styles.newsletterRow}>
                <input
                  id="newsletter"
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                />
                   <label htmlFor="newsletter">Recevoir la newsletter</label>
            </div>
          )}

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>💾 Enregistrer</button>
            {onCancel && <button type="button" className={styles.cancelButton} onClick={onCancel}>❌ Annuler</button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountForm;
