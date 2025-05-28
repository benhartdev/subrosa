'use client';
import styles from './Desinscription.module.css';

const DesinscriptionPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Désinscription confirmée</h1>
      <p className={styles.text}>
        Votre adresse email a bien été retirée de notre newsletter.<br />
        Merci d’avoir suivi SUB ROSA jusque-là.
      </p>
      <a href="/" className={styles.button}>Retour à l’accueil</a>
    </div>
  );
};

export default DesinscriptionPage;
