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
  const [isReadOnly, setIsReadOnly] = useState(true);

  const [formData, setFormData] = useState({
    username: '', password: '', confirmPassword: '',
    email: '', confirmEmail: '',
    firstName: '', lastName: '', address: '', city: '', country: '', postalCode: '', phone: '',
    name: '', birthdate: '', country_location: '', city_location: '', style: '',
    technical_skills: '', bio: '',
    website: '', facebook: '', instagram: '', linkedin: '', twitter: '',
    old_exhibitions: [], future_exhibitions: [],
    interview: { question1: '', question2: '', question3: '' },
    isApproved: false, status: 'pending', newsletter: false
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
  const newValue = type === 'checkbox' ? checked : value;

  

  // Si c’est un champ imbriqué dans interview
  if (name.startsWith("interview.")) {
    const questionKey = name.split(".")[1];

    setFormData((prevData) => ({
      ...prevData,
      interview: {
        ...prevData.interview,
        [questionKey]: newValue,
      },
    }));
    return;
  }
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

  const handleDeleteOldExhibition = (indexToRemove) => {
  setFormData((prev) => ({
    ...prev,
    old_exhibitions: prev.old_exhibitions.filter((_, index) => index !== indexToRemove),
  }));
};

const handleDeleteFutureExhibition = (indexToRemove) => {
  setFormData((prev) => ({
    ...prev,
    future_exhibitions: prev.future_exhibitions.filter((_, index) => index !== indexToRemove),
  }));
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
  if (formData.password.length < 8) {
  setPopup({ type: 'error', message: '❌ Le mot de passe doit contenir au moins 8 caractères.' });
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
        console.log("FORMDATA À ENVOYER", formData);
            await axios.post('http://localhost:5000/api/users/register', formData, {
              headers: {
                'Content-Type': 'application/json'
              }
            });
        setPopup({ type: 'success', message: '✅ Utilisateur inscrit avec succès.' });
        return;
      }

      const form = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
      if (["confirmPassword", "confirmEmail"].includes(key)) return;

      if (key === "interview") {
        // ⬅️ Cas spécial : on stringifie manuellement
        form.append("interview", JSON.stringify(value));
      }
      else if (Array.isArray(value) && typeof value[0] !== 'object') {
        value.forEach(val => form.append(key, val));
      } else if (Array.isArray(value) && typeof value[0] === 'object') {
        form.append(key, JSON.stringify(value));
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

              // ⚠️ Essaye de parser seulement si c’est bien du JSON
        let data = {};
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          data = { error: await response.text() }; // fallback texte brut (ex: "Too many requests")
        }

      if (response.ok) {
        setPopup({ type: 'success', message: '✅ Formulaire soumis avec succès !' });
        if (!isAdmin) {
          setTimeout(() => {
            router.push('/ajout-oeuvre');
          }, 1500);
        }
      } else {
        setPopup({ type: 'error', message: `❌ Erreur : ${data.error || data.message || 'Inconnue'}` });
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
        <p className={styles.formNotice}>Les champs marqués d’un astérisque (*) sont requis.</p>
        <form readOnly={isReadOnly} autoComplete="off" onSubmit={handleSubmit} noValidate className={styles.form + ' ' + styles[type]}>
          <h2 className={styles.formTitle}>
            {isUser && 'Inscription Utilisateur'}
            {isArtist && !isAdmin && 'Inscription Artiste'}
            {isAdmin && 'Modification Artiste'}
          </h2>
          {/* Champs leurs pour contourner l'auto-completion */}
          <input type="text" name="fake-username" autoComplete="username" style={{ display: 'none' }} />
          <input type="password" name="fake-password" autoComplete="new-password" style={{ display: 'none' }} />
         
          <label className={styles.labelForm}>Nom d'utilisateur <span className={styles.required}>*</span></label>
            <input className={styles.inputForm} name="username" value={getSafeValue(formData.username)} onChange={handleChange} required />

      {!isAdmin && (
        <>
          <label className={styles.labelForm}>Mot de passe <span className={styles.required}>* ( 8 caractères minimum )</span></label>
          <input
            className={styles.inputForm}
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={getSafeValue(formData.password)}
            onChange={handleChange}
            minLength={8}
          />

          <label className={styles.labelForm}>Confirmation du mot de passe <span className={styles.required}>*</span></label>
          <input
            className={styles.inputForm}
            type="password"
            name="confirmPassword"
            placeholder="Confirmez votre mot de passe"
            value={getSafeValue(formData.confirmPassword)}
            onChange={handleChange}
            minLength={8}
            onPaste={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
          />
        </>
      )}


          <label className={styles.labelForm}>Email  <span className={styles.required}>*</span></label>
          <input className={styles.inputForm} type="email" name="email" value={getSafeValue(formData.email)} onChange={handleChange} />

          <label className={styles.labelForm}>Confirmation email  <span className={styles.required}>*</span></label>
          <input className={styles.inputForm} type="email" name="confirmEmail" placeholder="Confirmez votre email" value={formData.confirmEmail} onChange={handleChange} />

          {isUser && (
            <>
              <label className={styles.labelForm}>Nom  <span className={styles.required}>*</span></label>
              <input className={styles.inputForm} name="lastName" value={getSafeValue(formData.lastName)} onChange={handleChange} required/>   
               <label className={styles.labelForm}>Prénom  <span className={styles.required}>*</span></label>
              <input className={styles.inputForm} name="firstName" value={getSafeValue(formData.firstName)} onChange={handleChange} required/>
              <label className={styles.labelForm}>Adresse :</label>
              <input className={styles.inputForm} name="address" value={getSafeValue(formData.address)} onChange={handleChange} />
              <label className={styles.labelForm}>Code postal :</label>
              <input className={styles.inputForm} name="postalCode" value={getSafeValue(formData.postalCode)} onChange={handleChange} />
              <label className={styles.labelForm}>Ville :</label>
              <input className={styles.inputForm} name="city_location" value={getSafeValue(formData.city_location)} onChange={handleChange} />
              <label className={styles.labelForm}>Pays :</label>
              <input className={styles.inputForm} name="country_location" value={getSafeValue(formData.country_location)} onChange={handleChange} />
              <label className={styles.labelForm}>Téléphone  <span className={styles.required}>*</span></label>
              <input className={styles.inputForm} name="phone" value={getSafeValue(formData.phone)} onChange={handleChange} />
            </>
          )}

          {isArtist && (
            <>
              <label className={styles.labelForm}>Prénom / Nom :</label>
              <input className={styles.inputForm} name="name" value={getSafeValue(formData.name)} onChange={handleChange} required />

              <label className={styles.labelForm}>Date de naissance  <span className={styles.required}>*</span></label>
              <input className={styles.inputForm} type="date" name="birthdate" value={formData.birthdate ? formData.birthdate.slice(0, 10) : ''} onChange={handleChange} required />

              <label className={styles.labelForm}>Pays :</label>
              <input className={styles.inputForm} name="country_location" value={getSafeValue(formData.country_location)} onChange={handleChange} />

              <label className={styles.labelForm}>Ville :</label>
              <input className={styles.inputForm} name="city_location" value={getSafeValue(formData.city_location)} onChange={handleChange} />

              <label className={styles.labelForm}>Style artistique <span className={styles.required}>*</span></label>
            
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
                  <textarea maxLength={2000} className={styles.inputForm}  placeholder="2000 caractères maximum" name="bio" value={getSafeValue(formData.bio)} onChange={handleChange} />
              <label className={styles.labelForm}>Comment êtes-vous devenu artiste ?</label>
                  <textarea maxLength={200} className={styles.inputForm} name="interview.question1" placeholder="200 caractères maximum" value={getSafeValue(formData.interview.question1)} onChange={handleChange} />
              <label className={styles.labelForm}>Comment définiriez-vous votre univers ?</label>
                  <textarea maxLength={200} className={styles.inputForm} name="interview.question2" placeholder="200 caractères maximum" value={getSafeValue(formData.interview.question2)} onChange={handleChange} />
              <label className={styles.labelForm}>Quel artiste (mort ou vivant) aimeriez-vous rencontrer ?</label>
                  <textarea maxLength={200} className={styles.inputForm} name="interview.question3" placeholder="200 caractères maximum" value={getSafeValue(formData.interview.question3)} onChange={handleChange} />

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
                  <ul className={styles.exposPassees}>
                    {formData.old_exhibitions.map((expo, i) => (
                      <li key={i} className={styles.expoItem}>
                        {expo}
                        <button type="button" className={styles.deleteExpoButton} onClick={() => handleDeleteOldExhibition(i)}>❌</button>
                      </li>
                    ))}
                  </ul>

              <label className={styles.labelForm}>Expositions futures :</label>
                <div className={styles.inputExpo}>
                  <input className={styles.inputForm} placeholder="Décembre 2025 : Expo Nina's,  Galerie Sub rosa, Paris, France" value={futureExpoInput} onChange={(e) => setFutureExpoInput(e.target.value)} />
                  <button className={styles.buttonExpo} type="button" onClick={(e) => handleAddExhibition('future')}>Ajouter</button>
                </div>
                  <ul className={styles.exposFutures}>
                    {formData.future_exhibitions.map((expo, i) => (
                      <li key={i} className={styles.expoItem}>
                        {expo}
                        <button type="button" className={styles.deleteExpoButton} onClick={() => handleDeleteFutureExhibition(i)}>❌</button>
                      </li>
                    ))}
                  </ul>

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
            <button type="submit" className={styles.submitButton}>Enregistrer</button>
            {onCancel && <button type="button" className={styles.cancelButton} onClick={onCancel}>❌ Annuler</button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountForm;
