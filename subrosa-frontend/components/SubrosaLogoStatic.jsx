import React from "react";
import styles from "./SubrosaLogoStatic.module.css";
import Link from "next/link";

const SubrosaLogoStatic = () => {
  return (
    <div className={styles.logoWrapper}>
      <Link href="/">
        <img
        src="/images/gallerie_SUB_logo2_fond_noir.png"
        alt="Logo SUB ROSA"
        className={styles.logoImage}
        />
      </Link>
    </div>
  );
};

export default SubrosaLogoStatic;