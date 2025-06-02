
'use client';

import styles from "./AddworkForm.module.css";
import React, { useEffect, useState } from 'react';
// import '../styles/addworkForm.css';

const AddArtwork = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    creation_date: '',
    medium: '',
    price: '',
    currency: '€',
    in_stock: '',
    status: 'available',
    dominant_colors: '',
    themes: '',
    artistId: '',
    dimensions: {
      height: '',
      width: '',
      depth: '',
      unit: 'cm',
      type: '',
    },
  });

  const [images, setImages] = useState([{ file: null, altText: '' }]);
  const [submittedArtworks, setSubmittedArtworks] = useState([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  // Récupération de l'artiste connecté
useEffect(() => {
  const verifySession = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/check", { credentials: "include", });

      const data = await res.json();
      console.log("✅ Résultat session :", data);

      if (!data.authenticated) {
        setUser(false);
        return;
      }

      const user = data.user;

      if (user.role === "artist") {
        setUser(user);
        setFormData(prev => ({ ...prev, artistId: user.id }));
      } else if (user.role === "admin") {
        setUser(user); // admin peut aussi ajouter une œuvre
      } else {
        setUser(false);
      }
    } catch (err) {
      console.error("⛔ Erreur session :", err);
      setUser(false);
    }
  };

  verifySession();
}, []);


  

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['height', 'width', 'depth', 'unit'].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        dimensions: { ...prev.dimensions, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index].file = file;
    setImages(newImages);
  };

  const handleAltTextChange = (index, altText) => {
    const newImages = [...images];
    newImages[index].altText = altText;
    setImages(newImages);
  };

 

  const handleSubmit = async (e) => {
  e.preventDefault();

  // 🔐 Sécurité : s'assurer que artistId est présent avant d’envoyer
  if (!formData.artistId && user?.role === 'artist') {
    formData.artistId = user._id;
  }

  const form = new FormData();

  // 🧱 Construction du FormData
  Object.entries(formData).forEach(([key, value]) => {
    if (key === 'dimensions') {
      Object.entries(value).forEach(([dimKey, dimVal]) => {
        form.append(`dimensions[${dimKey}]`, dimVal);
      });
    } else {
      form.append(key, value);
    }
  });

  // 🖼️ Images + altText
  images.forEach((img, index) => {
    if (img.file) {
      form.append('images', img.file);
      form.append(`altText[${index}]`, img.altText);
    }
  });

  // 🔍 Debug complet du FormData
  console.log("🧪 Données envoyées :");
  for (let pair of form.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  try {
    const response = await fetch(`http://localhost:5000/api/works/artist/add`, {
      method: 'POST',
      body: form,
      credentials: 'include',
    });

    const data = await response.json();

    if (response.ok) {
      setMessage('✅ Œuvre soumise avec succès');
      setSubmittedArtworks([data, ...submittedArtworks]);

      // 🧼 Reset des champs (on garde l’artistId actif)
      setFormData({
        title: '',
        description: '',
        creation_date: '',
        medium: '',
        price: '',
        currency: '€',
        in_stock: '',
        status: 'available',
        dominant_colors: '',
        themes: '',
        artistId: formData.artistId,
        dimensions: { height: '', width: '', depth: '', unit: 'cm' },
        type: '',
      });

      setImages([{ file: null, altText: '' }]);
    } else {
      setMessage(`❌ ${data.message || 'Erreur lors de la soumission.'}`);
    }
  } catch (error) {
    console.error('❌ Erreur fetch:', error);
    setMessage('❌ Erreur de connexion au serveur.');
  }
};


  // 🛑 Protection d’accès
  if (user === null) {
    return <p style={{ textAlign: 'center', marginTop: '30vh' }}>Chargement...</p>;
  }

  if (user === false) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30vh',
        backgroundColor: 'black'
      }}>
        <p style={{
          backgroundColor: 'black',
          color: '#900',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          fontWeight: 'bold',
        }}>
          ⛔ Accès refusé : cette page est réservée aux artistes ou administrateurs connectés.
        </p>
      </div>
    );
  }

  // ✅ Si tout va bien, on affiche le formulaire

  return (
    <div className={styles.addArtworkContainer}>
  {message && <p className={styles.statusMessage}>{message}</p>}

  <form  autoComplete="off" className={styles.formWrapper} onSubmit={handleSubmit} encType="multipart/form-data">
    <input type="hidden" name="artistId" value={formData.artistId} />

      <div className={styles.formRow}>
      <div className={styles.formGroup}>
        <label htmlFor="type">Type d’œuvre</label>
        <select name="type" required value={formData.type} onChange={handleChange}>
          <option value="">-- Choisissez --</option>
          <option value="Photographie">Photographie</option>
          <option value="Sculpture">Sculpture</option>
          <option value="Peinture">Peinture</option>
          <option value="Illustration">Illustration</option>
        </select>
      </div>
    
      <div className={styles.formGroup}>
        <label>Titre</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label>Date de création</label>
        <input type="date" name="creation_date" value={formData.creation_date} onChange={handleChange} required />
      </div>
    </div>

    <label>Description</label>
    <textarea name="description" value={formData.description} onChange={handleChange} rows={3} required />

    <div className={styles.formRow}>
      <div className={styles.formGroup}>
        <label>Technique / Support</label>
        <input type="text" name="medium" value={formData.medium} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label>Prix</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label>Devise</label>
        <select name="currency" value={formData.currency} onChange={handleChange}>
          <option value="€">€</option>
          <option value="$">$</option>
        </select>
      </div>
    </div>

    <div className={styles.formRow}>
      <div className={styles.formGroup}>
        <label>Quantité en stock</label>
        <input type="number" name="in_stock" value={formData.in_stock} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label>Statut</label>
        <select name="status" value={formData.status} onChange={handleChange} required>
          <option value="available">Disponible</option>
          <option value="sold">Vendu</option>
          <option value="reserved">Réservé</option>
        </select>
      </div>
    </div>

    <div className={styles.formRow}>
      <div className={styles.formGroup}>
        <label>Couleurs dominantes</label>
        <input type="text" name="dominant_colors" value={formData.dominant_colors} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label>Thèmes</label>
        <input type="text" name="themes" value={formData.themes} onChange={handleChange} required />
      </div>
    </div>

    <fieldset>
      <legend>Dimensions (en {formData.dimensions.unit})</legend>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label>Hauteur</label>
          <input type="number" name="height" value={formData.dimensions.height} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Largeur</label>
          <input type="number" name="width" value={formData.dimensions.width} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Profondeur (optionnel)</label>
          <input type="number" name="depth" value={formData.dimensions.depth} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Unité</label>
          <select name="unit" value={formData.dimensions.unit} onChange={handleChange}>
            <option value="cm">cm</option>
            <option value="inch">inch</option>
          </select>
        </div>
      </div>
    </fieldset>

    <fieldset>
      <legend>Images</legend>
      {images.map((img, index) => (
        <div key={index} className={styles.imageUploadBlock}>
          <input type="file" accept="image/*" onChange={(e) => handleImageChange(index, e.target.files[0])} required />
          <input
            type="text"
            placeholder="Texte alternatif"
            value={img.altText}
            onChange={(e) => handleAltTextChange(index, e.target.value)} required />
        </div>
      ))}
    </fieldset>

    <button type="submit">Soumettre l'œuvre</button>
  </form>

  {submittedArtworks.length > 0 && (
    <div className={styles.submittedGallery}>
      <h2>Œuvres récemment ajoutées :</h2>
      <div className={styles.galleryGrid}>
        {submittedArtworks.map((art, idx) => (
          <div key={idx} className={styles.galleryCard}>
            <img
            className={styles.previewImage}
              src={
                art.images?.[0]?.url?.startsWith('http')
                  ? art.images[0].url
                  : `${process.env.NEXT_PUBLIC_API_BASE_URL}${art.images[0].url}`
              }
              alt={art.images?.[0]?.altText || art.title}
            />
            <p>{art.title}</p>
          </div>
        ))}
      </div>
    </div>
  )}
</div>

  );
};

export default AddArtwork;
