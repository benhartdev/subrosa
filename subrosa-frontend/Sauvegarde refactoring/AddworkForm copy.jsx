'use client';

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
        const res = await fetch('http://localhost:5000/api/auth/check', {
          credentials: 'include',
        });
        if (!res.ok) throw new Error("Session expirée");
  
        const data = await res.json();
        if (data.user.role === 'artist' || data.user.role === 'admin') {
          setUser(data.user);
          if (data.user.role === 'artist') {
            setFormData(prev => ({ ...prev, artistId: data.user._id }));
          }
        } else {
          setUser(false);
        }
      } catch (err) {
        console.warn("⛔ Session non valide ou expirée");
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
    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'dimensions') {
        Object.entries(value).forEach(([dimKey, dimVal]) => {
          form.append(`dimensions[${dimKey}]`, dimVal);
        });
      } else {
        form.append(key, value);
      }
    });

    images.forEach((img, index) => {
      if (img.file) {
        form.append('images', img.file);
        form.append(`altText[${index}]`, img.altText);
      }
    });

    try {
      console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}/works/artist/add`);
      console.log("📤 artistId envoyé dans le POST :", formData.artistId);
      const response = await fetch(`http://localhost:5000/works/artist/add`, {
        method: 'POST',
        body: form,
        credentials: 'include',
      });
      console.log('API URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
      const data = await response.json();
      if (response.ok) {
        setMessage('✅ Œuvre soumise avec succès');
        setSubmittedArtworks([data, ...submittedArtworks]);
        // Réinitialisation
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
        setMessage(`${data.message}`);
      }
    } catch (error) {
      setMessage('❌ Erreur de connexion serveur.');
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
    <div className="add-artwork-container">
  {message && <p className="status-message">{message}</p>}

  <form onSubmit={handleSubmit} encType="multipart/form-data">
    <input type="hidden" name="artistId" value={formData.artistId} />

      <div className="form-row">
      <div className="form-group">
        <label htmlFor="type">Type d’œuvre</label>
        <select name="type" required value={formData.type} onChange={handleChange}>
          <option value="">-- Choisissez --</option>
          <option value="photo">Photographie</option>
          <option value="sculpture">Sculpture</option>
          <option value="peinture">Peinture</option>
          <option value="illustration">Illustration</option>
        </select>
      </div>
    
      <div className="form-group">
        <label>Titre</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Date de création</label>
        <input type="date" name="creation_date" value={formData.creation_date} onChange={handleChange} required />
      </div>
    </div>

    <label>Description</label>
    <textarea name="description" value={formData.description} onChange={handleChange} rows={3} required />

    <div className="form-row">
      <div className="form-group">
        <label>Technique / Support</label>
        <input type="text" name="medium" value={formData.medium} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Prix</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Devise</label>
        <select name="currency" value={formData.currency} onChange={handleChange}>
          <option value="€">€</option>
          <option value="$">$</option>
        </select>
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label>Quantité en stock</label>
        <input type="number" name="in_stock" value={formData.in_stock} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Statut</label>
        <select name="status" value={formData.status} onChange={handleChange} required>
          <option value="available">Disponible</option>
          <option value="sold">Vendu</option>
          <option value="reserved">Réservé</option>
        </select>
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label>Couleurs dominantes</label>
        <input type="text" name="dominant_colors" value={formData.dominant_colors} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Thèmes</label>
        <input type="text" name="themes" value={formData.themes} onChange={handleChange} required />
      </div>
    </div>

    <fieldset>
      <legend>Dimensions (en {formData.dimensions.unit})</legend>
      <div className="form-row">
        <div className="form-group">
          <label>Hauteur</label>
          <input type="number" name="height" value={formData.dimensions.height} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Largeur</label>
          <input type="number" name="width" value={formData.dimensions.width} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Profondeur (optionnel)</label>
          <input type="number" name="depth" value={formData.dimensions.depth} onChange={handleChange} />
        </div>
        <div className="form-group">
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
        <div key={index} className="image-upload-block">
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
    <div className="submitted-gallery">
      <h2>Œuvres récemment ajoutées :</h2>
      <div className="gallery-grid">
        {submittedArtworks.map((art, idx) => (
          <div key={idx} className="gallery-card">
            <img
            className="preview-image"
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
