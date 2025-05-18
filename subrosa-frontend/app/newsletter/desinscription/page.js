'use client';
import styles from './desinscription.module.css';
import SubrosaLogo from '../../../components/SubrosaLogo';

const DesinscriptionPage = () => {
  return (
    <div className={styles.container}>
      <SubrosaLogo />
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
