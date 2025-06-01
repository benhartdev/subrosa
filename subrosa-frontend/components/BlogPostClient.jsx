'use client';

import { useRef } from "react";
import CtaExpo from "./CtaExpo";
import LightboxGallery from "./LightboxGallery";
import ReactMarkdown from "react-markdown";
import styles from "../app/blog/[slug]/BlogPost.module.css";

export default function BlogPostClient({ post, leftImages, rightImages }) {
  const leftRef = useRef({});
  const handleClick = (e) => {
    e.preventDefault();
    leftRef.current?.open?.(0);
  };

  return (
    <div className={styles.pageContentWrapper}>
    <div className={styles.articleGrid}>
      {leftImages.length > 0 && (
        <aside className={styles.sideColumn}>
          <CtaExpo onClick={handleClick} />
          <LightboxGallery images={leftImages} externalTriggerRef={leftRef} />
        </aside>
      )}

      <main className={styles.mainContent}>
             
              
        <ReactMarkdown
          components={{
            h2: (props) => <h2 className={styles.heading} {...props} />,
            h3: (props) => <h3 className={styles.subheading} {...props} />,
            p: (props) => <p className={styles.paragraph} {...props} />,
            blockquote: (props) => <blockquote className={styles.quote} {...props} />,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </main>
          {rightImages.length > 0 && (
            <aside className={styles.sideColumn}>
              <CtaExpo />
              <LightboxGallery images={rightImages} />
            </aside>
          )}
    </div>
     {post.intro && (
             <div className={styles.waitIntroWrapper}>
              <p className={styles.waitIntro}>{post.intro}</p>
            </div>
          )}
    </div>
  );
}
