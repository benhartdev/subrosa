// /components/GalleryPage.jsx
"use client";

import React from "react";
import Gallery from "../components/Gallery";
import DoubleBorderContainer from "../components/DoubleBorderContainer";
import { useGalleryData } from "../hooks/useGalleryData";
import styles from "./GalleryPage.module.css";

export default function GalleryPage({ type, subtype, title, fieldsToShow }) {
  const { items, loading } = useGalleryData(type, subtype);
  const pageTitle = type === 'artiste' ? 'Nos artistes' :
                  type === 'oeuvre' ? 'Nos oeuvres' :
                  type === 'photographie' ? 'Photographies' :
                  type === 'peinture' ? 'Peintures' :
                  type === 'sculpture' ? 'Sculptures' :
                  type === 'illustration' ? 'Illustrations' :
                  type === 'edition_art' ? 'Éditions d’art' :
                  type === 'nouveaute' ? 'Nouveautés' : title;
                    
  return (
    <main className={styles.artistPage}>
        <DoubleBorderContainer title={pageTitle}>
              {items.length === 0 && !loading ? (
                  <p style={{ color: "#999", textAlign: "center", marginTop: "2rem" }}>
                      Aucun élément à afficher.</p>
                          ) : (
                            <Gallery
                              items={items}
                              loading={loading}
                              fieldsToShow={fieldsToShow}
                              type={type}
                            />
                          )}
       </DoubleBorderContainer>
    </main>
  );
}
