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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async e => {
  e.preventDefault();
  setError(null);
  setMessage(null);
  setIsSubmitted(false);

  if (newPassword !== confirmPassword) {
    setError("Les mots de passe ne correspondent pas.");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        newPassword,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Mot de passe modifié avec succès !");
      setIsSubmitted(true); // bloque le bouton
      setTimeout(() => {
        window.location.href = "/login"; // redirection après succès
      }, 3000);
    } else {
      // 🔁 Cas spécifique : ancien mot de passe réutilisé
      if (data.message === "Le nouveau mot de passe doit être différent de l’ancien.") {
        setError(data.message);
        return; // Ne redirige pas, et ne bloque pas le bouton
      }

      // 🚨 Cas générique : autre erreur
      setError(data.message || "Erreur inconnue");
    }
  } catch (err) {
    setError("Erreur lors de la réinitialisation.");
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
              <button
              type="submit" className={styles.button} disabled={isSubmitted}>{isSubmitted ? "✔️ Réussi" : "Valider"}
            </button>
        </form>

        {message && <p className={`${styles.message} ${styles.success}`}>{message}</p>}
        {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
      </div>
    </div>
    </div>
  );
};

export default ResetPasswordPage;