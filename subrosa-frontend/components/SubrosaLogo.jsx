// components/SubrosaLogo.jsx

import Link from 'next/link';
import styles from './SubrosaLogo.module.css';

export default function SubrosaLogo({ variant }) {
  const logoClass =
    variant === 'inscription' ? styles.logoOverlayInscription : styles.logoOverlay;

  return (
     <div className={logoClass}>
      <div className={styles.logoContainer}>
        <img
          src="/images/gallerie_SUB_logo2_fond_noir.png"
          alt="Logo SUB ROSA"
          className={styles.logoImage}
        />

        <Link href="/" className={styles.clickZone1}></Link>
        <Link href="/" className={styles.clickZone2}></Link>
      </div>
    </div>
  );
}