const blogData = [
  {
  title: "Ferite di luce",
  description: "Une exposition lumineuse et poignante signée Benjamin Hoffele et Caterina Varchetta.",
  tag: "Exposition",
  img: "/images/BLOG_expo_BenH_Cat.jpg",
  slug: "ferite-di-luce",
  authors: [{ name: "Benjamin Hoffele" }, { name: "Caterina Varchetta" }],
  artists: ["Ben H", "Cat"],
  galleries: {
    left:  ["/images/blog/BLOG_LEFT_expo_ferite_1.jpg",
            "/images/blog/BLOG_LEFT_expo_ferite_2.jpg",
            "/images/blog/BLOG_LEFT_expo_ferite_3.jpg",],
    right: ["/images/blog/BLOG_RIGHT_expo_ferite_4.jpg",
            "/images/blog/BLOG_RIGHT_expo_ferite_5.jpg",
            "/images/blog/BLOG_RIGHT_expo_ferite_6.jpg",]
  },
  content: `
### Ferite di luce  
**Galerie du Forez – 1er juin 2024 – Nuit Blanche de l’Art Contemporain**

_Ferite di luce_ ("blessures de lumière") est une exposition à deux voix, un regard croisé entre **photographie** et **peinture**.  
Elle réunit le travail de **Benjamin Hoffele**, photographe, et **Caterina Varchetta**, artiste plasticienne, autour d’un dialogue visuel sensible et profond.

> "Je plonge dans ses tableaux pour en extraire une nouvelle lumière. Une œuvre sur une œuvre." – Benjamin Hoffele

Les œuvres peintes de Caterina, sombres, texturées, silencieuses, deviennent matière photographique.  
Benjamin y entre littéralement, cadre, détaille, découpe, éclaire.  
Les images dialoguent. L’une révèle, l’autre absorbe. Le geste pictural rencontre le regard photographique.

La scénographie propose un cheminement à travers ce face-à-face :  
chaque photographie prolonge une peinture, chaque peinture appelle une nouvelle image.  
Ce n’est ni un simple accrochage, ni une documentation : c’est une **expérience d’immersion croisée**, un échange lent et profond entre deux langages artistiques.

---

### À propos des artistes

**Benjamin Hoffele** : Photographe français, il explore les œuvres comme des paysages mentaux. Son approche lente, physique, cherche à révéler ce qui se cache sous la surface.

**Caterina Varchetta** : Artiste italienne, elle travaille la matière, les pigments et les strates comme autant de couches de mémoire. Ses toiles sont des terrains de silence et de tension.

---

_L’exposition a eu lieu à la Galerie du Forez lors de la Nuit Blanche de l’Art Contemporain, le 1er juin 2024._
`},
  {
    img: "https://picsum.photos/800/450?random=2",
    tag: "Artiste Origamiste",
    title: "Junior Fritz Jacquet",
    description:
      "Découvrez les principales fonctionnalités de notre dernière version produit, qui aident les entreprises à atteindre leurs objectifs...",
    authors: [{ name: "Erica Johns", avatar: "/static/images/avatar/6.jpg" }],
    slug: "le-titre-en-slug", // SLUG page individuelle
    artists: ["Junior Fritz Jacquet", "Ben H"],
    galleries: null, // Pas de galerie
    intro: "Article en cours d'ecriture",
    content: ""
  },
  {
    img: "https://picsum.photos/800/450?random=3",
    tag: "Design",
    title: "Concevoir pour l'avenir : tendances et perspectives",
    description:
      "Restez en avance grâce aux dernières tendances et analyses en design...",
    authors: [{ name: "Benjamin Hoffelé", avatar: "/static/images/avatar/7.jpg" }],
    slug: "le-titre-en-slug", // SLUG page individuelle
    galleries: null, // Pas de galerie
    content: ""
  },
  {
    img: "https://picsum.photos/800/450?random=4",
    tag: "Design",
    title: "Concevoir pour l'avenir : tendances et perspectives",
    description:
      "Restez en avance grâce aux dernières tendances et analyses en design...",
    authors: [{ name: "Benjamin Hoffelé", avatar: "/static/images/avatar/8.jpg" }],
    slug: "le-titre-en-slug", // SLUG page individuelle
    galleries: null, // Pas de galerie
    content: ""
  },
  {
    img: "https://picsum.photos/800/450?random=5",
    tag: "Design",
    title: "Concevoir pour l'avenir : tendances et perspectives",
    description:
      "Restez en avance grâce aux dernières tendances et analyses en design...",
    authors: [{ name: "Sayah El Yatim", avatar: "/static/images/avatar/1.jpg" }],
    slug: "le-titre-en-slug", // SLUG page individuelle
    galleries: null, // Pas de galerie
    content: ""
  },
  {
    img: "https://picsum.photos/800/450?random=6",
    tag: "Design",
    title: "Concevoir pour l'avenir : tendances et perspectives",
    description:
      "Restez en avance grâce aux dernières tendances et analyses en design...",
    authors: [{ name: "Audrey Lamarque", avatar: "/static/images/avatar/3.jpg" }],
    slug: "le-titre-en-slug", // SLUG page individuelle
    galleries: null, // Pas de galerie
    content: ""
  },
  {
    img: "https://picsum.photos/800/450?random=7",
    tag: "Design",
    title: "Concevoir pour l'avenir : tendances et perspectives",
    description:
      "Restez en avance grâce aux dernières tendances et analyses en design...",
    authors: [{ name: "Clara Lefevre", avatar: "/static/images/avatar/5.jpg" }],
    slug: "le-titre-en-slug", // SLUG page individuelle
    galleries: null, // Pas de galerie
    content: ""
  },
  {
    img: "https://picsum.photos/800/450?random=8",
    tag: "Design",
    title: "Concevoir pour l'avenir : tendances et perspectives",
    description:
      "Restez en avance grâce aux dernières tendances et analyses en design...",
    authors: [{ name: "Jury du titre Afec", avatar: "/static/images/avatar/11.jpg" }],
    slug: "le-titre-en-slug", // SLUG page individuelle
    galleries: null, // Pas de galerie
    content: ""
  },
];

export default blogData;
