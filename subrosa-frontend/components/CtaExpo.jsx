'use client';
import styles from './CtaExpo.module.css';

const CtaExpo = ({ onClick }) => {
  return (
    <div className={styles.ctaMinimal}>
      <a href="#" className={styles.link} onClick={onClick}>
        → Voir l'exposition
      </a>
    </div>
  );
};

export default CtaExpo;
