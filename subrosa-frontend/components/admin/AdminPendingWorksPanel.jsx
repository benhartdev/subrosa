// components/AdminPendingWorksPanel.jsx
import React, { useEffect, useState } from 'react';
import '../../styles/adminPendingWorks.css';

const AdminPendingWorksPanel = () => {
  const [pendingWorks, setPendingWorks] = useState([]);

  useEffect(() => {
    const fetchPendingWorks = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/works/pending', { credentials: 'include',});
        const data = await res.json();
        console.log('⛏ Données reçues du backend :', data);
        setPendingWorks(data);
      } catch (err) {
        console.error('Erreur chargement oeuvres non validées', err);
      }
    };

    fetchPendingWorks();
  }, []);

  const handleValidate = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/works/${id}/validate`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isApproved: true }),
        credentials: 'include'
      });
      setPendingWorks(pendingWorks.filter(work => work._id !== id));
    } catch (err) {
      console.error('Erreur validation oeuvre', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/works/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      setPendingWorks(pendingWorks.filter(work => work._id !== id));
    } catch (err) {
      console.error('Erreur suppression oeuvre', err);
    }
  };

  return (
    <div className="admin-pending-works">
      <h2>Œuvres en attente de validation</h2>
      <div className="pending-gallery">
      {Array.isArray(pendingWorks) && pendingWorks.map((work) => (
          <div className="work-card" key={work._id}>
            <img
  src={`http://localhost:5000${work.images[0]?.url?.startsWith('/') ? '' : '/'}${work.images[0]?.url}`}
  alt={work.images[0]?.altText || 'Oeuvre'}
  className="work-image"
/>
            <div className="work-info">
              <h3>{work.title}</h3>
              <p><strong>Artiste :</strong> {work.artistId?.username || 'Inconnu'}</p>
              <p><strong>Description :</strong> {work.description}</p>
              <p><strong>Date de création :</strong> {work.creation_date}</p>
              <p><strong>Technique :</strong> {work.medium}</p>
              <p><strong>Dimensions :</strong> {work.dimensions?.height} x {work.dimensions?.width} x {work.dimensions?.depth || 0} {work.dimensions?.unit}</p>
              <p><strong>Prix :</strong> {work.price} {work.currency}</p>
              <p><strong>Stock :</strong> {work.in_stock ? 'Oui' : 'Non'}</p>
            </div>
            <div className="action-buttons">
              <button className="btn-validate" onClick={() => handleValidate(work._id)}>Valider</button>
              <button className="btn-delete" onClick={() => handleDelete(work._id)}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPendingWorksPanel;
