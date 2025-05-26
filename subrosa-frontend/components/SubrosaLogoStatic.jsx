// SubrosaLogoStatic.jsx
import Image from 'next/image';
import styles from './SubrosaLogoStatic.module.css';
import Link from 'next/link';
export default function SubrosaLogoStatic() {
  return (
    <div className={styles.logoWrapper}>
      <Image
        src="/images/gallerie_SUB_logo2_fond_noir.png"
        alt="Logo SUB ROSA"
        width={220}
        height={130}
      />
      <Link href="/" passHref legacyBehavior>
        <a className={styles.clickZone1}></a>
      </Link>

      <Link href="/" passHref legacyBehavior>
        <a className={styles.clickZone2}></a>
      </Link>
    </div>
  );
}
