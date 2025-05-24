"use client";
import React from "react";
import ContactForm from "../../components/ContactForm";
import Link from "next/link";
import styles from "./ContactPage.module.css";

export default function ContactPage() {
  return (
    <main>
      <div className={styles.contactContainer}>
        <h1 className={styles.contactTitle}>CONTACTEZ-NOUS</h1>

        <div className={styles.contactInfo}>
          SHOWROOM GALERIE SUB ROSA ART <br />
          Immeuble des AFEC / 2ème étage / Rue Lamenais 47000 AGEN
          <br />
          Ouvert au public du mardi au jeudi 10h-17h
          <br />
          ou sur RV au 06 68 10 52 51
          <br />
          Artistes : la ligne téléphonique étant réservée aux clients et
          partenaires, pour toute demande d'intégration au site merci de cliquer{" "}
          <Link
            href="/inscription-artiste"
            className={styles.contactLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            ici
          </Link>
          .<br />
          Nous n'évaluons pas et ne vendons pas les tableaux de particuliers.
        </div>

        <ContactForm />
      </div>
    </main>
  );
}
