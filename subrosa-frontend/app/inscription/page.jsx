"use client";

import { useSearchParams } from "next/navigation";
import AccountForm from "../../components/AccountForm";
import styles from "../../components/AccountForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette, faUser } from "@fortawesome/free-solid-svg-icons";
import SubrosaLogo from "../../components/SubrosaLogo";


import { useEffect } from "react";

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
    <div className={styles.formPageWrapper}>
      
      {type === "artist" && <AccountForm type="artist" />}
      {type === "user" && <AccountForm type="user" />}
      {!type && (
        <>
          <div className={styles.inscriptionChoice}>
            
            <h2>Quel type d'inscription souhaitez-vous ?</h2>
            <div className={styles.buttonGroup}>
              <a href="/inscription?type=artist" className={styles.inscriptionBtn}>
                 <FontAwesomeIcon icon={faPalette} className={styles.icon} /> Je suis un artiste
              </a>
              <a href="/inscription?type=user" className={styles.inscriptionBtn}>
                 <FontAwesomeIcon icon={faUser} className={styles.icon} /> Je suis un utilisateur
              </a>
            </div>
          </div>

          {/* ✅ Ajout d’un espace uniquement si aucun type sélectionné */}
          <div style={{ minHeight: "calc(100vh - 800px)" }}></div>
        </>
      )}
    </div>
  );
}

