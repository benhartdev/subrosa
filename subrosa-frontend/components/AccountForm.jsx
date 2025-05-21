// components/AccountForm.jsx
import React, { useState, useEffect } from 'react';
import styles from './AccountForm.module.css';
import PopupMessage from "./PopupMessage";
import axios from "axios";
import { useRouter } from "next/navigation";

const AccountForm = ({ type = "artist", artistId = null, existingData = {}, onCancel }) => {
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
      setFormData((prev) => ({
        ...prev,
        ...existingData,
        password: '', confirmPassword: '',
        email: existingData.email || '',
        confirmEmail: existingData.email || ''
      }));
    }
  }, [existingData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
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
    if (formData.password !== formData.confirmPassword) {
      setPopup({ type: 'error', message: '❌ Les mots de passe ne correspondent pas.' });
      return false;
    }
    if (formData.email !== formData.confirmEmail) {
      setPopup({ type: 'error', message: '❌ Les emails ne correspondent pas.' });
      return false;
    }
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
      Object.keys(formData).forEach((key) => {
        if (["confirmPassword", "confirmEmail"].includes(key)) return;
        const value = formData[key];
        if (Array.isArray(value)) {
          value.forEach(val => form.append(key, val));
        } else {
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
      {popup && <PopupMessage type={popup.type} message={popup.message} onClose={() => setPopup(null)} />}
      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit} className={styles.form + ' ' + styles[type]}>
          <h2 className={styles.formTitle}>
            {isUser && 'Inscription Utilisateur'}
            {isArtist && !isAdmin && 'Inscription Artiste'}
            {isAdmin && 'Modification Artiste'}
          </h2>

          <label>Nom d'utilisateur</label>
          <input name="username" value={formData.username} onChange={handleChange} required />

          <label>Mot de passe</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />

          <label>Confirmation du mot de passe</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Confirmation email</label>
          <input type="email" name="confirmEmail" value={formData.confirmEmail} onChange={handleChange} required />

          {isUser && (
            <>
              <label>Prénom</label>
              <input name="firstName" value={formData.firstName} onChange={handleChange} />
              <label>Nom</label>
              <input name="lastName" value={formData.lastName} onChange={handleChange} />
              <label>Adresse</label>
              <input name="address" value={formData.address} onChange={handleChange} />
              <label>Code postal</label>
              <input name="postalCode" value={formData.postalCode} onChange={handleChange} />
              <label>Ville</label>
              <input name="city" value={formData.city} onChange={handleChange} />
              <label>Pays</label>
              <input name="country" value={formData.country} onChange={handleChange} />
              <label>Téléphone</label>
              <input name="phone" value={formData.phone} onChange={handleChange} />
            </>
          )}

          {isArtist && (
            <>
              <label>Nom complet</label>
              <input name="name" value={formData.name} onChange={handleChange} />
              <label>Date de naissance</label>
              <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />
              <label>Pays</label>
              <input name="country_location" value={formData.country_location} onChange={handleChange} />
              <label>Ville</label>
              <input name="city_location" value={formData.city_location} onChange={handleChange} />
              <label className={styles.label}>Style artistique :</label>
              <select
                name="style"
                value={getSafeValue(formData.style)}
                onChange={handleChange}
                className={styles.input}
              >
                <option value="">Choisir un style</option>
                <option value="Photographe">Photographe</option>
                <option value="Peintre">Peintre</option>
                <option value="Sculpteur">Sculpteur</option>
                <option value="Illustrateur">Illustrateur</option>
                <option value="Plasticien">Plasticien</option>
                <option value="Autre">Autre</option>
              </select>
              <label>Compétences techniques</label>
              <input name="technical_skills" value={formData.technical_skills} onChange={handleChange} />
              <label>Biographie</label>
              <textarea name="bio" value={formData.bio} onChange={handleChange} />
              <label>Interviews</label>
              <textarea name="interviews" value={formData.interviews} onChange={handleChange} />

              <label>Facebook</label>
              <input name="facebook" value={formData.facebook} onChange={handleChange} />
              <label>Instagram</label>
              <input name="instagram" value={formData.instagram} onChange={handleChange} />
              <label>LinkedIn</label>
              <input name="linkedin" value={formData.linkedin} onChange={handleChange} />
              <label>Twitter</label>
              <input name="twitter" value={formData.twitter} onChange={handleChange} />

              <label>Expositions passées</label>
              <input value={expoInput} onChange={(e) => setExpoInput(e.target.value)} />
              <button type="button" onClick={() => handleAddExhibition('old')}>Ajouter</button>
              <ul>{formData.old_exhibitions.map((expo, i) => <li key={i}>{expo}</li>)}</ul>

              <label>Expositions futures</label>
              <input value={futureExpoInput} onChange={(e) => setFutureExpoInput(e.target.value)} />
              <button type="button" onClick={() => handleAddExhibition('future')}>Ajouter</button>
              <ul>{formData.future_exhibitions.map((expo, i) => <li key={i}>{expo}</li>)}</ul>

              {isAdmin && (
                <>
                  <label>Statut</label>
                  <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="pending">En attente</option>
                    <option value="validated">Validé</option>
                    <option value="rejected">Rejeté</option>
                  </select>

                  <label>
                    <input type="checkbox" name="isApproved" checked={formData.isApproved} onChange={handleChange} /> Approuvé ?
                  </label>
                </>
              )}
            </>
          )}

          <label>
            <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange} /> S’inscrire à la newsletter
          </label>

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
