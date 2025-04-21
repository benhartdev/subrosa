'use client';

import React, { useEffect, useState } from 'react';
import '../styles/addworkForm.css';

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
    },
  });

  const [images, setImages] = useState([{ file: null, altText: '' }]);
  const [submittedArtworks, setSubmittedArtworks] = useState([]);
  const [message, setMessage] = useState('');

  // Récupération de l'artiste connecté
  useEffect(() => {
    const storedArtist = JSON.parse(localStorage.getItem('artist'));
    console.log('🎨 artiste connecté:', storedArtist);
    if (storedArtist && storedArtist._id) {
      setFormData(prev => ({
        ...prev,
        artistId: storedArtist._id
      }));
    }else {
      console.warn("⚠️ Aucun artiste trouvé dans le localStorage");
    }
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

  const addImageField = () => {
    if (images.length < 10) {
      setImages([...images, { file: null, altText: '' }]);
    }
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
        });
        setImages([{ file: null, altText: '' }]);
      } else {
        setMessage(`❌ Erreur : ${data.message} (${data.details || 'Erreur inconnue'})`);
      }
    } catch (error) {
      setMessage('❌ Erreur de connexion serveur.');
    }
  };

  return (
    <div className="add-artwork-container">
      <h2>Soumettre une œuvre</h2>
      {message && <p className="status-message">{message}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="hidden" name="artistId" value={formData.artistId} />

        <label>Titre</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} rows={3} required />

        <label>Date de création</label>
        <input type="date" name="creation_date" value={formData.creation_date} onChange={handleChange} required />

        <label>Technique / Support</label>
        <input type="text" name="medium" value={formData.medium} onChange={handleChange} required />

        <label>Prix</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />

        <label>Devise</label>
        <select name="currency" value={formData.currency} onChange={handleChange}>
          <option value="€">€</option>
          <option value="$">$</option>
        </select>

        <label>Quantité en stock</label>
        <input type="number" name="in_stock" value={formData.in_stock} onChange={handleChange} required />

        <label>Statut</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="available">Disponible</option>
          <option value="sold">Vendu</option>
          <option value="reserved">Réservé</option>
        </select>

        <label>Couleurs dominantes</label>
        <input type="text" name="dominant_colors" value={formData.dominant_colors} onChange={handleChange} />

        <label>Thèmes</label>
        <input type="text" name="themes" value={formData.themes} onChange={handleChange} />

        <fieldset>
          <legend>Dimensions (en {formData.dimensions.unit})</legend>
          <label>Hauteur</label>
          <input type="number" name="height" value={formData.dimensions.height} onChange={handleChange} required />
          <label>Largeur</label>
          <input type="number" name="width" value={formData.dimensions.width} onChange={handleChange} required />
          <label>Profondeur (optionnel)</label>
          <input type="number" name="depth" value={formData.dimensions.depth} onChange={handleChange} />
          <label>Unité</label>
          <select name="unit" value={formData.dimensions.unit} onChange={handleChange}>
            <option value="cm">cm</option>
            <option value="inch">inch</option>
          </select>
        </fieldset>

        <fieldset>
          <legend>Images</legend>
          {images.map((img, index) => (
            <div key={index} className="image-upload-block">
              <input type="file" accept="image/*" onChange={(e) => handleImageChange(index, e.target.files[0])} />
              <input
                type="text"
                placeholder="Texte alternatif"
                value={img.altText}
                onChange={(e) => handleAltTextChange(index, e.target.value)}
              />
            </div>
          ))}
          {images.length < 10 && (
            <button type="button" onClick={addImageField}>
              Ajouter une autre image
            </button>
          )}
        </fieldset>

        <button type="submit">Soumettre l'œuvre</button>
      </form>

      {submittedArtworks.length > 0 && (
        <div className="submitted-gallery">
          <h3>Œuvres récemment ajoutées :</h3>
          <div className="gallery-grid">
            {submittedArtworks.map((art, idx) => (
              <div key={idx} className="gallery-card">
                <img
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
