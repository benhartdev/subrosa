import blogData from "../../../data/blogData";
import styles from "./BlogPost.module.css";
import { notFound } from "next/navigation";
import BlogPostClient from "../../../components/BlogPostClient";
import Link from "next/link";

// Exemple statique, sera remplacé par un fetch Mongo plus tard.
const artistList = [
  { username: "Ben H", slug: "hoffele-benjamin" },
  { username: "Cat", slug: "caterina-varchetta" },
];

function renderArtists(artists) {
  return (
    <div style={{ marginTop: "1rem", fontStyle: "italic", color: "#aaa" }}>
      Artistes de l'article :
      {artists.map((username, idx) => {
        const artist = artistList.find((a) => a.username === username);
        return artist ? (
          <span key={idx}>{" "}
              <Link
                href={`/artistes/${artist.slug}`}
                style={{ color: 'var(--color-blue)', textDecoration: 'none' }}>{artist.username}
              </Link>{idx < artists.length - 1 && " et "}
          </span>
        ) : (
          <span key={idx}> {username}{idx < artists.length - 1 && ","}</span>
        );
      })}
    </div>
  );
}


// ✅ Requis par Next.js pour les routes dynamiques statiques
export async function generateStaticParams() {
  return blogData.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }) {
  const { slug } = await Promise.resolve(params);
  const post = blogData.find((item) => item.slug === slug);
  if (!post) return notFound();

  const leftImages = post.galleries?.left || [];
  const rightImages = post.galleries?.right || [];

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.meta}>Par {post.authors.map((a) => a.name).join(", ")}</p>
        <img src={post.img} alt={post.title} className={styles.image} />
            {post.artists && renderArtists(post.artists)}
      </div>

      <BlogPostClient post={post} leftImages={leftImages} rightImages={rightImages} />
    </>
  );
}
