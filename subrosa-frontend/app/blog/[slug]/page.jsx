import blogData from "../../../data/blogData";
import styles from "./BlogPost.module.css";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import LightboxGallery from "../../../components/LightboxGallery";

// ✅ Requis par Next.js pour les routes dynamiques statiques
export async function generateStaticParams() {
  return blogData.map((post) => ({ slug: post.slug }));
}

// ✅ PAGE - déclaration `async` OBLIGATOIRE avec accès à `params.slug`
export default async function BlogPostPage({ params }) {
  const { slug } = await Promise.resolve(params);

  const post = blogData.find((item) => item.slug === slug);
  if (!post) return notFound();

  const leftImages = [
    "/images/blog/BLOG_LEFT_expo_ferite_1.jpg",
    "/images/blog/BLOG_LEFT_expo_ferite_2.jpg",
    "/images/blog/BLOG_LEFT_expo_ferite_3.jpg",
  ];
  const rightImages = [
    "/images/blog/BLOG_RIGHT_expo_ferite_4.jpg",
    "/images/blog/BLOG_RIGHT_expo_ferite_5.jpg",
    "/images/blog/BLOG_RIGHT_expo_ferite_6.jpg",
  ];

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.meta}>Par {post.authors.map((a) => a.name).join(", ")}</p>
        <img src={post.img} alt={post.title} className={styles.image} />
      </div>

      <div className={styles.articleGrid}>
        <aside className={styles.sideColumn}>
          <LightboxGallery images={leftImages} />
        </aside>

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

        <aside className={styles.sideColumn}>
          <LightboxGallery images={rightImages} />
        </aside>
      </div>
    </>
  );
}
