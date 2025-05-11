// 2. useGalleryData.js
"use client";
import { useEffect, useState } from "react";

export function useGalleryData(type, subtype = "") {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = "http://localhost:5000/api/";
    if (type === "works") {
          url += `works${subtype ? `?type=${subtype}` : ""}`;
  } else if (type === "latest") {
          url += "works/latest";
  }
    if (type === "artist") url += "artists";
    if (type === "blog") url += "blogs"; // à créer plus tard

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("🔎 Données brutes reçues dans useGalleryData:", data);     // 🔍 AJOUT ICI
  console.log("🔍 Premier artiste :", data?.[0]);        

        
  const array = Array.isArray(data) ? data : Object.values(data);

  const formatted = array.map((item) => {
         // === WORKS ===
    if (type === "works"|| type === "latest") {
      const imageUrl = item.images?.[0]?.url;
      return {
              id: item._id,  // Pour React ou d'autres composants
              title: item.title || "Sans titre",
              slug: item.slug,
              medium: item.medium,
              dimensions: item.dimensions,
              type: item.type,
              price: item.price,
              description: item.description,
              artistName: item.artistId?.username || item.artistId?.name || "Artiste inconnu",
              image: imageUrl?.startsWith("http")
                ? imageUrl
                : imageUrl ? `http://localhost:5000${imageUrl}` : "/placeholder.jpg",
              images: item.images,
              _id: item._id, // Pour le composant Gallery et pour MongoDB (API, routes, PUT/DELETE)
            };
          }

        else if (type === "latest") url += "works/latest";

         // === ARTISTS ===
        if (type === "artist") {
          const imageUrl = item.artistImages?.[0]?.url;
            return {
             id: item._id,
              name: item.name,
              username: item.username,
              slug: item.slug,
              image: imageUrl?.startsWith("http")
                ? imageUrl
                : imageUrl ? `http://localhost:5000${imageUrl}` : "/placeholder.jpg",
              style: item.style,
              _id: item._id,
            };
          }
          // === BLOGS === (à implémenter)
        if (type === "blog") {
            return {
              id: item._id,
              title: item.title,
              image: item.image,
              excerpt: item.excerpt,
              link: `/blog/${item._id}`,
            };
          }
        return item;
        });
        
        setItems(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement galerie :", err);
        setLoading(false);
      });
  }, [type, subtype]);

  return { items, loading };
}
