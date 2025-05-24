import React from "react";
import { FaEnvelope } from "react-icons/fa"; // ou ton propre SVG
import styles from './ArtistMessageBadge.module.css';

const ArtistMessageBadge = ({ messageCount }) => {
  return (
    <div className={styles.messageBadgeWrapper}>
      <FaEnvelope className="envelopeIcon" />
      {messageCount > 0 && (
        <span className={styles.messageCount}>{messageCount}</span>
      )}
    </div>
  );
};

export default ArtistMessageBadge;
