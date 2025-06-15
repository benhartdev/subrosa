'use client';
import { useState } from 'react';
import axios from 'axios';
import styles from './ForgotPassword.module.css';

export default function MotDePasseOublie() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la demande.");
    }
  };

  return (
    <div className={styles.containerReset}>
      <h1 className={styles.title}>Réinitialisation du mot de passe</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Votre adresse email"
          value={email}
          className={styles.input}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit" className={styles.button}>Soumettre</button>
      </form>
      {message && <p style={{ color: 'limegreen' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
