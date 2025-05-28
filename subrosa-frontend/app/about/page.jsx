"use client";
import React from "react";
import styles from "./about.module.css";
import Image from 'next/image';
import SubrosaLogoStatic from "../../components/SubrosaLogoStatic";

const AboutPage = () => {
  return (
    <div className={styles.aboutContainer}>
        <div className={styles.logoOverlay}>
               <SubrosaLogoStatic />
       </div>
      <h1 className={styles.aboutTitle}>QUI&nbsp;SOMMES-NOUS</h1>

      <p className={styles.aboutDescription}>
        Galerie&nbsp;SUB&nbsp;ROSA&nbsp;ART est une gallerie d'art contemporain en ligne
        co-fondée par les 3 associés ci-dessous en 2025. Bien plus qu'un simple
        site web, notre volonté est d'organiser régulièrement des événements
        physiques : expositions, salons, visites d'ateliers, collaborations
        entreprises…</p> 
        <p className={styles.aboutDescription}>
        Nous accompagnons nos artistes dans leur développement
        artistique et commercial, et sommes novateurs dans nos liens avec les
        entreprises. Un showroom permanent permet d'accueillir clients, artistes
        et entreprises dans le bel immeuble historique de l'AFEC.
        Galerie SUB ROSA ART</p>
        <p className={styles.aboutDescription}>
        souhaite partager sa sélection d'artistes, leur univers et leurs
        valeurs humaines aux curieux, collectionneurs et entreprises.Galerie SUB
        ROSA ART doit être « au cœur de la cité ».
      </p>
          <hr className={styles.customSaparator} />
      <h2 className={styles.teamTitle}>NOTRE EQUIPE</h2>

      

      <div className={styles.teamSection}>
        <div className={styles.teamGrid}>
          <div className={styles.teamMemberPhoto}>
            <Image src="/images/moi_carre.jpg" className={styles.memberImage} alt="Team Member" width={800} height={800}/>
            <div className={styles.memberRole}>
              Son&nbsp;rôle au&nbsp;sein&nbsp;de SUB&nbsp;ROSA&nbsp;ART : responsable du volet « Artiste
              en entreprise » gestion des relations artistes/galerie
              conseiller auprès des artistes
            </div>
          </div>

          <div className={styles.teamMemberInfo}>
            <div className={styles.memberDescription}>
               <div className={styles.memberTitle}>BENJAMIN&nbsp;HOFFELÉ</div>
              
              <div className={styles.descriptionTitle}>FORMATION&nbsp;&&nbsp;PARCOURS</div>
              
              <p>De&nbsp;formation scientifique, Ben H s'est
              rapidement rapproché de l'univers artistique en devenant
              photographe en 2013. Il a occupé différents postes dans les
              métiers de l'ingenieurie concernant les moteurs a combustion
              internes pour se concentrer à partir de 2013 sur le developpement
              de son art ainsi que la mise en valeurs d'objets d'art.</p>
              
              <div className={styles.descriptionTitle}>PASSION</div>
              
              <p>C'est&nbsp;sa&nbsp;passion pour la photo et la peinture qui lui ont
              permis sa rencontre avec Caterina Varchetta. Ben H s'amuse dès
              qu'il peut à travailler des techniques de photographie et à en
              découvrir de nouvelles, expérimenter toujours des matières, des
              couleurs et des supports pour tendre vers un art pluriel dans
              lequel les artistes et les rencontres avec les artistes occupent
              une place importante.</p>
              
              <div className={styles.descriptionTitle}>ENVIES</div>
              
              <p>S'occuper&nbsp;des&nbsp;artistes, les accompagner comme ils le
              méritent. Les faire connaître auprès des amateurs d'art mais aussi
              des entreprises parce que les artistes ont un rôle important à
              jouer dans notre société et donc dans nos entreprises à travers le
              regard qu'ils peuvent nous apporter.</p>
            </div>
          </div>
        </div>
      </div>

      <hr className={styles.customSaparator} />
      <div className={styles.teamSection}>
        <div className={styles.teamGrid}>
          <div className={styles.teamMemberPhoto}>
          <Image src="/images/say_carre.jpg" className={styles.memberImage} alt="Team Member" width={1920} height={1080}/>            
          <div className={styles.memberRole}>
              Son&nbsp;rôle au sein de SUB&nbsp;ROSA&nbsp;ART : responsable du volet « Artiste
              en entreprise » gestion des relations artistes/galerie
              conseiller auprès des artistes
            </div>
          </div>

          <div className={styles.teamMemberInfo}>
            <div className={styles.memberDescription}>
              <div className={styles.memberTitle}>SAYAH&nbsp;EL&nbsp;YATIM</div>
              
              <div className={styles.descriptionTitle}>FORMATION&nbsp;&&nbsp;PARCOURS</div>
              
              <p>De&nbsp;formation scientifique, Ben H s'est
              rapidement rapproché de l'univers artistique en devenant
              photographe en 2013. Il a occupé différents postes dans les
              métiers de l'ingenieurie concernant les moteurs a combustion
              internes pour se concentrer à partir de 2013 sur le developpement
              de son art ainsi que la mise en valeurs d'objets d'art.</p>
              
              <div className={styles.descriptionTitle}>PASSION</div>
              
              <p>C'est&nbsp;sa&nbsp;passion pour la photo et la peinture qui lui ont
              permis sa rencontre avec Caterina Varchetta. Ben H s'amuse dès
              qu'il peut à travailler des techniques de photographie et à en
              découvrir de nouvelles, expérimenter toujours des matières, des
              couleurs et des supports pour tendre vers un art pluriel dans
              lequel les artistes et les rencontres avec les artistes occupent
              une place importante.</p>
              
              <div className={styles.descriptionTitle}>ENVIES</div>
              
              <p>S'occuper&nbsp;des&nbsp;artistes, les accompagner comme ils le
              méritent. Les faire connaître auprès des amateurs d'art mais aussi
              des entreprises parce que les artistes ont un rôle important à
              jouer dans notre société et donc dans nos entreprises à travers le
              regard qu'ils peuvent nous apporter.</p>
            </div>
          </div>
        </div>
      </div>
      <hr className={styles.customSaparator} />
      <div className={styles.teamSection}>
        <div className={styles.teamGrid}>
          <div className={styles.teamMemberPhoto}>
          <Image src="/images/Ze_carre.jpg" className={styles.memberImage} alt="Team Member" width={1920} height={1080}/>            <div className={styles.memberRole}>
              Son&nbsp;rôle au sein de SUB&nbsp;ROSA&nbsp;ART : responsable du volet « Artiste
              en entreprise » gestion des relations artistes/galerie
              conseiller auprès des artistes
            </div>
          </div>

          <div className={styles.teamMemberInfo}>
            <div className={styles.memberDescription}>
              <div className={styles.memberTitle}>ZÉ&nbsp;LA&nbsp;MENTALE</div>
              <div className={styles.descriptionTitle}>FORMATION&nbsp;&&nbsp;PARCOURS</div>
              
              <p>De&nbsp;formation scientifique, Ben H s'est
              rapidement rapproché de l'univers artistique en devenant
              photographe en 2013. Il a occupé différents postes dans les
              métiers de l'ingenieurie concernant les moteurs a combustion
              internes pour se concentrer à partir de 2013 sur le developpement
              de son art ainsi que la mise en valeurs d'objets d'art.</p>
              
              <div className={styles.descriptionTitle}>PASSION</div>
              
              <p>C'est&nbsp;sa&nbsp;passion pour la photo et la peinture qui lui ont
              permis sa rencontre avec Caterina Varchetta. Ben H s'amuse dès
              qu'il peut à travailler des techniques de photographie et à en
              découvrir de nouvelles, expérimenter toujours des matières, des
              couleurs et des supports pour tendre vers un art pluriel dans
              lequel les artistes et les rencontres avec les artistes occupent
              une place importante.</p>
              
              <div className={styles.descriptionTitle}>ENVIES</div>
              
              <p>S'occuper&nbsp;des&nbsp;artistes, les accompagner comme ils le
              méritent. Les faire connaître auprès des amateurs d'art mais aussi
              des entreprises parce que les artistes ont un rôle important à
              jouer dans notre société et donc dans nos entreprises à travers le
              regard qu'ils peuvent nous apporter.</p>
            </div>
          </div>
        </div>
      </div>
     
      
    </div>
  );
};

export default AboutPage;
