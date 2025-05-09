"use client";
import React from "react";
import "../../styles/photography.css";
import Gallery from "../../components/Gallery";
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function PhotographyPage() {
  const { items, loading } = useGalleryData("works", "photographie");

  return (
    <div className="photographyPage">
      <Header />
      <Gallery items={items} loading={loading} type="works" />
      <Footer />
    </div>
  );
}
