"use client";
import React from "react";
import styles from "./about.module.css";
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className={styles.aboutContainer}>

      <h1 className={styles.aboutTitle}>QUI SOMMES-NOUS</h1>

      <p className={styles.aboutDescription}>
        Galerie SUB ROSA ART est une galerie d'art contemporain en ligne
        co-fondée par les 3 associés ci-dessous en 2025. Bien plus qu'un simple
        site web, notre volonté est d'organiser régulièrement des événements
        physiques : expositions, salons, visites d'ateliers, collaborations
        entreprises… Nous accompagnons nos artistes dans leur développement
        artistique et commercial, et sommes novateurs dans nos liens avec les
        entreprises. Un showroom permanent permet d'accueillir clients, artistes
        et entreprises dans le bel immeuble historique de l'AFEC, .
        <br /> souhaite partager sa sélection d'artistes, leur univers et leurs
        valeurs humaines aux curieux, collectionneurs et entreprises.Galerie SUB
        ROSA ART doit être « au cœur de la cité ».
      </p>

      <h2 className={styles.teamTitle}>NOTRE EQUIPE</h2>

      <div className="divider" />

      <div className={styles.teamSection}>
        <div className={styles.teamGrid}>
          <div className={styles.teamMemberPhoto}>
            <Image src="/images/moi.jpg" className={styles.memberImage} alt="Team Member" width={1920} height={1080}/>
            <div className={styles.memberRole}>
              Son rôle au sein de SUB ROSA ART :• responsable du volet « Artiste
              en entreprise »• gestion des relations artistes/galerie•
              conseiller auprès des artistes
            </div>
          </div>

          <div className={styles.teamMemberInfo}>
            <div className={styles.memberDescription}>
              Benjamin Hoffelé alias Ben H<br />
              <br />
              FORMATION & PARCOURS<br />
              De formation scientifique, Benjamin s'est
              rapidement rapproché de l'univers artistique en devenant
              photographe en 2013. Il a occupé différents postes dans les
              métiers de l'ingenieurie concernant les moteurs a combustion
              internes pour se concentrer à partir de 2013 sur le developpement
              de son art ainsi que la mise en valeurs d'objets d'art.
              <br />
              <br />
              PASSION<br />
              C'est sa passion pour la photo et la peinture qui lui ont
              permis sa rencontre avec Caterina Varchetta. Benjamin s'amuse dès
              qu'il peut à travailler des techniques de photographie et à en
              découvrir de nouvelles, expérimenter toujours des matières, des
              couleurs et des supports pour tendre vers un art pluriel dans
              lequel les artistes et les rencontres avec les artistes occupent
              une place importante.
              <br />
              <br />
              ENVIES<br />
              S'occuper des artistes, les accompagner comme ils le
              méritent. Les faire connaître auprès des amateurs d'art mais aussi
              des entreprises parce que les artistes ont un rôle important à
              jouer dans notre société et donc dans nos entreprises à travers le
              regard qu'ils peuvent nous apporter.
            </div>
          </div>
        </div>
      </div>

      <div className="divider" />
      <div className={styles.teamSection}>
        <div className={styles.teamGrid}>
          <div className={styles.teamMemberPhoto}>
          <Image src="/images/SAYAH.png" className={styles.memberImage} alt="Team Member" width={1920} height={1080}/>            <div className={styles.memberRole}>
              Son rôle au sein de SUB ROSA ART :• responsable du volet « Artiste
              en entreprise »• gestion des relations artistes/galerie•
              conseiller auprès des artistes
            </div>
          </div>

          <div className={styles.teamMemberInfo}>
            <div className={styles.memberDescription}>
              Sayah EL YATIM<br />
              <br />
              FORMATION & PARCOURS<br />
              
              De formation scientifique, Benjamin s'est
              rapidement rapproché de l'univers artistique en devenant
              photographe en 2013. Il a occupé différents postes dans les
              métiers de l'ingenieurie concernant les moteurs a combustion
              internes pour se concentrer à partir de 2013 sur le developpement
              de son art ainsi que la mise en valeurs d'objets d'art.
              <br />
              <br />
              PASSION<br />
              C'est sa passion pour la photo et la peinture qui lui ont
              permis sa rencontre avec Caterina Varchetta. Benjamin s'amuse dès
              qu'il peut à travailler des techniques de photographie et à en
              découvrir de nouvelles, expérimenter toujours des matières, des
              couleurs et des supports pour tendre vers un art pluriel dans
              lequel les artistes et les rencontres avec les artistes occupent
              une place importante.
              <br />
              <br />
              ENVIES<br /> 
              S'occuper des artistes, les accompagner comme ils le
              méritent. Les faire connaître auprès des amateurs d'art mais aussi
              des entreprises parce que les artistes ont un rôle important à
              jouer dans notre société et donc dans nos entreprises à travers le
              regard qu'ils peuvent nous apporter.
            </div>
          </div>
        </div>
      </div>
      <div className="divider" />
      <div className={styles.teamSection}>
        <div className={styles.teamGrid}>
          <div className={styles.teamMemberPhoto}>
          <Image src="/images/Ze.png" className={styles.memberImage} alt="Team Member" width={1920} height={1080}/>            <div className={styles.memberRole}>
              Son rôle au sein de SUB ROSA ART :• responsable du volet « Artiste
              en entreprise »• gestion des relations artistes/galerie•
              conseiller auprès des artistes
            </div>
          </div>

          <div className={styles.teamMemberInfo}>
            <div className={styles.memberDescription}>
              ZÉ La menace<br />
              <br />
              FORMATION & PARCOURS<br />
              De formation scientifique, Benjamin s'est
              rapidement rapproché de l'univers artistique en devenant
              photographe en 2013. Il a occupé différents postes dans les
              métiers de l'ingenieurie concernant les moteurs a combustion
              internes pour se concentrer à partir de 2013 sur le developpement
              de son art ainsi que la mise en valeurs d'objets d'art.
              <br />
              <br />
              PASSION<br />
              C'est sa passion pour la photo et la peinture qui lui ont
              permis sa rencontre avec Caterina Varchetta. Benjamin s'amuse dès
              qu'il peut à travailler des techniques de photographie et à en
              découvrir de nouvelles, expérimenter toujours des matières, des
              couleurs et des supports pour tendre vers un art pluriel dans
              lequel les artistes et les rencontres avec les artistes occupent
              une place importante.
              <br />
              <br />
              ENVIES<br /> 
              S'occuper des artistes, les accompagner comme ils le
              méritent. Les faire connaître auprès des amateurs d'art mais aussi
              des entreprises parce que les artistes ont un rôle important à
              jouer dans notre société et donc dans nos entreprises à travers le
              regard qu'ils peuvent nous apporter.
            </div>
          </div>
        </div>
      </div>
      <div className="divider" />
      
    </div>
  );
};

export default AboutPage;
