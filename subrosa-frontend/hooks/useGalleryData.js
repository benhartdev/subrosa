// 2. useGalleryData.js
"use client";
import { useEffect, useState } from "react";

export function useGalleryData(type, subtype = "") {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = "http://localhost:5000/api/";
    if (type === "works") url += `works?type=${subtype}`;
    if (type === "artist") url += "artists";
    if (type === "blog") url += "blogs"; // à créer plus tard

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
  const array = Array.isArray(data) ? data : Object.values(data);

  const formatted = array.map((item) => {
    if (type === "works") {
      return {
        id: item._id,
        title: item.title,
        image: item.images?.[0]?.url?.startsWith("http")
          ? item.images[0].url
          : `http://localhost:5000${item.images[0].url}`,
        artistName: item.artistId?.name || item.artistId?.username,
        price: item.price,
        link: `/oeuvre/${item._id}`,
      };
    }
          if (type === "artist") {
            return {
              id: item._id,
              name: item.name,
              image: item.artistImages?.[0]?.url,
              specialty: item.style,
              link: `/artiste/${item._id}`,
            };
          }
          if (type === "blog") {
            return {
              id: item._id,
              title: item.title,
              image: item.image,
              excerpt: item.excerpt,
              link: `/blog/${item._id}`,
            };
          }
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
