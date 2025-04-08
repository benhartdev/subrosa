"use client";
import React from "react";
import ContactForm from "../../components/ContactForm";
import "../../styles/contact.css";
import Link from 'next/link';
import Header from "../../components/Header";
import Footer from '../../components/Footer';

export default function ContactPage() {
  return (
    <main>
      <Header />
    <div className="contact-container">
      <h1 className="contact-title">CONTACTEZ-NOUS</h1>
      
      <div className="contact-info">
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
          className="contact-link"
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
    <Footer />
    </main>
  );
}
