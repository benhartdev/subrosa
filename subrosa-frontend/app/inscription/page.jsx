"use client";

import { useSearchParams } from "next/navigation";
import AccountForm from "../../components/AccountForm";
import styles from "../../components/AccountForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import SubrosaLogoStatic from '../../components/SubrosaLogoStatic';

export default function InscriptionPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type"); // "artist" ou "user"

  useEffect(() => {
    document.body.classList.add("inscription-open");
    return () => {
    document.body.classList.remove("inscription-open");
    };
  }, [type]);

  return (
  <div className={`${styles.formPageWrapper} ${!type ? styles.marginBottomFix : ''}`}>

    
    {/* Affichage du formulaire s’il y a un type dans l’URL */}
    {type === "artist" && <AccountForm type="artist" showLogo={true} />}
    {type === "user" && <AccountForm type="user" showLogo={true} />}

    {/* Affichage de l’accueil inscription avec les boutons si aucun type sélectionné */}
    {!type && (
      <div className={styles.inscriptionWrapper}>
        <div className={styles.logoContainer}>
          <SubrosaLogoStatic />
        </div>

        <div className={styles.inscriptionChoice}>
          <h2>Quel type d'inscription souhaitez-vous&nbsp;?</h2>
          <div className={styles.buttonGroup}>
            <a href="/inscription?type=artist" className={styles.inscriptionBtn}>
              <FontAwesomeIcon icon={faPalette} className={styles.icon} /> Je suis un artiste
            </a>
            <a href="/inscription?type=user" className={styles.inscriptionBtn}>
              <FontAwesomeIcon icon={faUser} className={styles.icon} /> Je suis un utilisateur
            </a>
          </div>
        </div>
      </div>
    )}
  </div>
);
}

