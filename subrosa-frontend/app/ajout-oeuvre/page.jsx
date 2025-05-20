"use client";

import AddworkForm from "../../components/AddworkForm";
import styles from "../../components/addWorkForm.module.css";

export default function AjouterOeuvrePage() {
  return (
    <main className={styles.ajoutOeuvrePage}>
      <div className={styles.ajoutOeuvreSubrosa}>
        <h1 className={styles.titreArtistForm}>Ajouter une œuvre</h1>
        <AddworkForm />
      </div>
    </main>
  );
}

