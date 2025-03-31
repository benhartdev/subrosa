'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { generateToken, login, logout } from '../../services/authService';
import '../../styles/admin.css';


export default function AdminPage() {
  const [artists, setArtists] = useState([]);
  const [pendingArtists, setPendingArtists] = useState([]);
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Authentification
  const handleGenerateToken = async () => {
    const token = await generateToken();
    setToken(token);
    setMessage('Token généré avec succès. Vous pouvez maintenant vous connecter.');
  };

  const handleLogin = async () => {
    try {
        const response = await login(token);
        setMessage(response.message || 'Connexion échouée.');
      } catch (error) {
        console.error(error);
        setMessage("Erreur de connexion.");
      }
    fetchAllArtists();
    fetchPendingArtists();
  };

  const handleLogout = async () => {
    const response = await logout();
    setMessage(response.message);
    setArtists([]);
    setPendingArtists([]);
  };

  // API
  const fetchAllArtists = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/artists/all', {
        withCredentials: true,
      });
      setArtists(response.data);
    } catch (error) {
      console.error('Erreur (CRUD) :', error);
    }
  };

  const fetchPendingArtists = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/artists/pending', {
        withCredentials: true,
      });
      setPendingArtists(response.data);
    } catch (error) {
      console.error('Erreur (en attente) :', error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/artists/${id}/status`, { status }, {
        withCredentials: true,
      });
      setPendingArtists((prev) => prev.filter((a) => a._id !== id));
      fetchAllArtists();
    } catch (error) {
      console.error('Erreur updateStatus :', error);
    }
  };

  useEffect(() => {
    fetchAllArtists();
    fetchPendingArtists();
    setLoading(false);
  }, []);

  return (
    <div className="admin-container">

  {/* Section Auth */}
  <section className="admin-section">
    <h2>🔐 Connexion admin</h2>
    <input
      type="text"
      placeholder="Collez ici votre token"
      value={token}
      onChange={(e) => setToken(e.target.value)}
      style={{ padding: '0.5rem', marginRight: '1rem', borderRadius: '6px' }}
    />
    <div className="admin-buttons" style={{ marginTop: '1rem' }}>
      <button onClick={handleLogin} className="validate">Connexion</button>
      <button onClick={handleLogout} className="disconnect">Déconnexion</button>
      <button onClick={handleGenerateToken}>Générer un token</button>
    </div>
    {message && <p style={{ color: 'black', marginTop: '1rem' }}>{message}</p>}
  </section>

  {/* Section artistes en attente */}
  <section className="admin-section">
    <h2>🎨 Artistes à valider</h2>
    <ul className="admin-list">
      {pendingArtists.map((artist) => (
        <li key={artist._id}>
          <strong>{artist.name}</strong> - {artist.email}
          <div className="admin-buttons" style={{ marginTop: '0.5rem' }}>
            <button className="validate" onClick={() => updateStatus(artist._id, 'validated')}>✅ Valider</button>
            <button className="reject" onClick={() => updateStatus(artist._id, 'rejected')}>❌ Rejeter</button>
          </div>
        </li>
      ))}
    </ul>
  </section>

  {/* Section tous les artistes */}
  <section className="admin-section">
    <h2>📋 Tous les artistes (CRUD)</h2>
    <ul className="admin-list">
      {artists.map((artist) => (
        <li key={artist._id}>
          <strong>{artist.name}</strong> ({artist.email}) - <em>{artist.status}</em>
        </li>
      ))}
    </ul>
  </section>
</div>

  );
}
