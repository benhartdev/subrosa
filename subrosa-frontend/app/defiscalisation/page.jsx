"use client";

import React from "react";
import styles from "./Defiscalisation.module.css";

const DefiscalisationPage = () => {
  return (
    <div className={styles.container}>
      <h1>Défiscalisation & Leasing d’œuvres d’art</h1>

      <section>
        <h2>Pourquoi investir dans l’art ?</h2>
        <p>
          L’acquisition d’œuvres d’art est un excellent moyen de soutenir la création artistique tout en valorisant l’image de votre entreprise. En plus d’embellir vos espaces professionnels, cela peut vous permettre de bénéficier d’avantages fiscaux.
        </p>
      </section>

      <section>
        <h2>Défiscalisation pour les entreprises</h2>
        <p>
          Conformément à l’article 238 bis AB du Code général des impôts, une entreprise soumise à l’IS peut déduire de son résultat imposable le prix d’achat d’œuvres originales d’artistes vivants, sur une période de 5 ans.
        </p>
        <ul>
          <li>L’œuvre doit être exposée dans un lieu accessible aux salariés ou au public.</li>
          <li>La déduction est plafonnée à 0,5 % du chiffre d’affaires annuel.</li>
        </ul>
      </section>

      <section>
        <h2>Leasing artistique</h2>
        <p>
          Le leasing d’art permet de louer une œuvre pour une durée déterminée. À la fin du contrat, l’entreprise peut acheter l’œuvre pour une valeur résiduelle.
        </p>
        <p>
          Cela permet de préserver la trésorerie tout en constituant un patrimoine artistique.
        </p>
      </section>

      <section>
        <h2>Pourquoi passer par SUB ROSA ART ?</h2>
        <ul>
          <li>Sélection personnalisée d’œuvres adaptées à vos besoins.</li>
          <li>Accompagnement juridique et fiscal.</li>
          <li>Livraison, accrochage et certificat d’authenticité fournis.</li>
        </ul>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Pour toute demande ou accompagnement sur la défiscalisation ou le leasing d’art, contactez-nous à l’adresse : <a href="mailto:contact@subrosa-art.com">contact@subrosa-art.com</a>
        </p>
      </section>
    </div>
  );
};

export default DefiscalisationPage;
