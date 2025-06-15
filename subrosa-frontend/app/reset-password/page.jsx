'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import styles from './ResetPassword.module.css';


const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (newPassword !== confirmPassword) {
    setError("Les mots de passe ne correspondent pas.");
    return;
    }
  
    try {
      const res = await axios.post('http://localhost:5000/api/auth/reset-password', {
        token,
        newPassword
      });

      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la réinitialisation.");
    }
  };

  return (
    <div className={styles.mainContent}>
     <div className={styles.containerReset}>
      <h1 className={styles.title}>Réinitialisé le mot de passe</h1>
      <div className={styles.resetBox}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
           <label className={styles.label}>Nouveau mot de passe</label>
               <div className={styles.inputWrapper}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className={styles.input}
                        placeholder="********"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className={styles.eyeButton}
                        onClick={() => setShowPassword(prev => !prev)}
                    >
                         👁
                    </button>
                    </div>
                    <label className={styles.label}>Confirmer le mot de passe</label>
                    <div className={styles.inputWrapper}>
                    <input
                        type={showConfirm ? 'text' : 'password'}
                        className={styles.input}
                        placeholder="********"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className={styles.eyeButton}
                        onClick={() => setShowConfirm(prev => !prev)}
                    >
                         👁
                    </button>
                    </div>
          </div>
          <button type="submit" className={styles.button}>Valider</button>
        </form>

        {message && <p className={`${styles.message} ${styles.success}`}>{message}</p>}
        {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
      </div>
    </div>
    </div>
  );
};

export default ResetPasswordPage;