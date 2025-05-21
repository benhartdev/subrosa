import React from "react";
import styles from "./PendingStatusBanner.module.css"

const PendingStatusBanner = ({ username }) => {
  return (
    <div className={styles.pendingBanner}>
      <p>
        Bonjour <strong>{username}</strong>, votre compte artiste est en cours de validation.
        <br />
        Vous serez notifié par email une fois votre profil accepté ou refusé.
      </p>
    </div>
  );
};

export default PendingStatusBanner;
