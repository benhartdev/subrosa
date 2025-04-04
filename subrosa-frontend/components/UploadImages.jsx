import React, { useState } from 'react';
import '../styles/UploadImages.css';

const UploadImages = ({ artistId }) => {
  const [files, setFiles] = useState([null, null, null, null, null, null]);
  const [alts, setAlts] = useState(['', '', '', '', '', '']);
  const [message, setMessage] = useState('');

  const handleFileBoxChange = (index, file) => {
    const updatedFiles = [...files];
    updatedFiles[index] = file;
    setFiles(updatedFiles);
  };

  const handleAltChange = (index, value) => {
    const newAlts = [...alts];
    newAlts[index] = value;
    setAlts(newAlts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedFiles = files.filter(file => file !== null);
    if (!selectedFiles.length) return;

    const formData = new FormData();
    selectedFiles.forEach(file => formData.append('images', file));
    selectedFiles.forEach((file, index) => {
      const altValue = alts[index] || '';
      formData.append('alts', altValue);
    });

    try {
      const response = await fetch(`http://localhost:5000/api/uploads/upload-multiple/${artistId}`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('✅ Upload réussi !');
        setFiles([null, null, null, null, null, null]);
        setAlts(['', '', '', '', '', '']);
      } else {
        setMessage(`❌ Erreur : ${data.error}`);
      }
    } catch (err) {
      setMessage('❌ Erreur lors de l’envoi des fichiers.');
    }
  };

  return (
    <div className="upload-container">
      <h2 className="upload-title">Ajout d'œuvres SUB ROSA</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <div key={index} className="upload-item">
            {files[index] ? (
              <img
                src={URL.createObjectURL(files[index])}
                alt="preview"
                className="upload-preview"
              />
            ) : (
              <div className="upload-preview placeholder">Aperçu</div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileBoxChange(index, e.target.files[0])}
              className="upload-input"
            />
            <input
              type="text"
              placeholder="Texte alternatif (alt)"
              value={alts[index] || ''}
              onChange={(e) => handleAltChange(index, e.target.value)}
              className="upload-alt"
            />
          </div>
        ))}

        <button type="submit" className="upload-button">
          ENVOYER LES IMAGES
        </button>

        {message && <p className="upload-message">{message}</p>}
      </form>
    </div>
  );
};

export default UploadImages;