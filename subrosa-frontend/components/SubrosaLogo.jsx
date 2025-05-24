// components/SubrosaLogo.jsx
import Image from 'next/image';
import Link from 'next/link';
import styles from './SubrosaLogo.module.css';

export default function SubrosaLogo() {
  return (
    <div className={styles.logoOverlay}>
          <Image
            src="/images/gallerie_SUB_logo2_fond_noir.png"
            alt="Logo SUB ROSA"
            width={440}
            height={260}
            style={{ width: '100%', height: 'auto', pointerEvents: 'auto' }}
          />
                  {/* Zone cliquable 1 */}
              <Link href="/" passHref legacyBehavior>
                <a className={styles.clickZone1}></a>
              </Link>

              {/* Zone cliquable 2 */}
              <Link href="/" passHref legacyBehavior>
                <a className={styles.clickZone2}></a>
              </Link>
    </div>
  );
}
