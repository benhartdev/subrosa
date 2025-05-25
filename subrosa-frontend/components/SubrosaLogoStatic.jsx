// SubrosaLogoStatic.jsx
import Image from 'next/image';
import styles from './SubrosaLogoStatic.module.css';

export default function SubrosaLogoStatic() {
  return (
    <div className={styles.logoWrapper}>
      <Image
        src="/images/gallerie_SUB_logo2_fond_noir.png"
        alt="Logo SUB ROSA"
        width={220}
        height={130}
        
      />
    </div>
  );
}
