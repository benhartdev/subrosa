
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/PendingArtistsPage.css';

const PendingArtistsPage = () => {
  const [pendingArtists, setPendingArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/artists/pending');
        setPendingArtists(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des artistes en attente :', error);
        setLoading(false);
      }
    };
    fetchPending();
  }, []);

  const updateStatus = async (id, status) => {
    const confirm = window.confirm(`Confirmer le changement de statut vers "${status}" ?`);
    if (!confirm) return;

    try {
      await axios.put(`http://localhost:5000/api/admin/artists/${id}/status`, { status });
      setPendingArtists(prev => prev.filter(artist => artist._id !== id));
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut :', error);
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="pending-container">
      <h1 id="artist-pending">🎨 Artistes en attente de validation</h1>
      {pendingArtists.length === 0 ? (
        <p>Aucun artiste en attente</p>
      ) : (
        <div className="table-wrapper">
          <table className="pending-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingArtists.map(artist => (
                <tr key={artist._id}>
                  <td>{artist.name}</td>
                  <td>{artist.email}</td>
                  <td>{artist.status}</td>
                  <td>
                    <button className="validate-btn" onClick={() => updateStatus(artist._id, 'validated')}>Valider</button>
                    <button className="reject-btn" onClick={() => updateStatus(artist._id, 'rejected')}>Rejeter</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingArtistsPage;
