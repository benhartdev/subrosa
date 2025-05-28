"use client";

import DoubleBorderContainer from "../../components/DoubleBorderContainer";
import MainContent from "../../components/MainContent";
import styles from '../../components/SubrosaLogoStatic.module.css';
export default function BlogPage() {
  return (
   
     <>
      <main>
        <div className={styles.blogPageDoubleBorder}>
        <DoubleBorderContainer title="Sub&nbsp;Rosa&nbsp;Blog">
          <MainContent limit={8} />
        </DoubleBorderContainer>
        </div>
      </main>
    </>
  );
}

