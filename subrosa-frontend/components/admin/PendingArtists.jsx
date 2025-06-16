
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './PendingArtists.module.css';

const PendingArtistsPage = () => {
  const [pendingArtists, setPendingArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    const fetchPending = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/artists/pending", { withCredentials: true });
        setPendingArtists(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des artistes en attente :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPending();
  }, []);

  const updateStatus = async (id, status) => {
    const confirm = window.confirm(`Confirmer le changement de statut vers "${status}" ?`);
    if (!confirm) return;

    try {
      await axios.patch(`http://localhost:5000/api/admin/artists/${id}/approval`, { status: 'validated' }, {
        withCredentials: true // ✅ important pour la session
      });
      setPendingArtists(prev => prev.filter(artist => artist._id !== id));
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut :', error);
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className={styles.pendingContainer}>
      <h1 className={styles.artistPending}>Artistes en attente de validation</h1>
      {pendingArtists.length === 0 ? (
        <p className={styles.artistPending}>Aucun artiste en attente</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.pendingTable}>
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
                  <td data-label="Nom"><span>{artist.name}</span></td>
                  <td data-label="Email"><span>{artist.email}</span></td>
                  <td data-label="Statut"><span>{artist.status}</span></td>
                  <td data-label="Actions">
                    <button className={styles.validateBtn} onClick={() => updateStatus(artist._id, 'validated')}>
                      Valider
                    </button>
                    <button className={styles.rejectBtn} onClick={() => updateStatus(artist._id, 'rejected')}>
                      Rejeter
                    </button>
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
