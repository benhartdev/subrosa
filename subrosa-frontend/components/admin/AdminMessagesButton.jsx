"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelopeOpenText } from "react-icons/fa";
import styles from "./AdminMessageButton.module.css";

const AdminMessagesButton = () => {
  const router = useRouter();
  const [hasNewMessages, setHasNewMessages] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/contact");
        const data = await res.json();
        // Ici on considère que chaque message a un champ isRead (à adapter selon ta BDD)
        const newMessages = data.filter((msg) => msg.isRead === false);
        setHasNewMessages(newMessages.length > 0);
      } catch (err) {
        console.error("Erreur récupération messages", err);
      }
    };

    fetchMessages();
  }, []);

  return (
     <button
        className={`${styles.adminMessageBtn} ${hasNewMessages ? styles.newMessagesBtn : ""}`}
        onClick={() => router.push("/admin/messages")}
      >
      <FaEnvelopeOpenText className={styles.adminMessageIcon} />
      Messages
    </button>
  );
};

export default AdminMessagesButton;
