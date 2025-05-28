// components/SubrosaLogo.jsx
import Image from 'next/image';
import Link from 'next/link';
import styles from './SubrosaLogo.module.css';

export default function SubrosaLogo({ variant }) {
  const logoClass =
    variant === 'inscription' ? styles.logoOverlayInscription : styles.logoOverlay;

  return (
     <div className={logoClass}>
      <div className={styles.logoContainer}>
        <Image
          src="/images/gallerie_SUB_logo2_fond_noir.png"
          alt="Logo SUB ROSA"
          width={440}
          height={260}
          className={styles.logo}
        />

        <Link href="/" legacyBehavior>
          <a className={styles.clickZone1}></a>
        </Link>
        <Link href="/" legacyBehavior>
          <a className={styles.clickZone2}></a>
        </Link>
      </div>
    </div>
  );
}