"use client";
import React from "react";
import "../../styles/photography.css";
import PhotoGallery from "../../components/PhotoGallery";
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function PhotographyPage() {
  return (
    <div className="photographyPage">
    <Header />

      <PhotoGallery />
      

      <Footer />
    </div>
  );
}
