"use client";
import React from "react";
import "../styles/photography.css";

export default function PhotoGallery() {
  const galleryItems = [
    {
      title: "POMPIDOO",
      price: <span style={{ fontFamily: 'Arial, sans-serif' }}>
      2 500 &euro;
    </span>,
      image:
        "https://cdn.builder.io/api/v1/image/assets/6b3112d6797947108e0e370d8b352087/aef065d4a7808a7758f170c53d9feb68668def98?placeholderIfAbsent=true",
    },
    {
      title: "ALIVE",
      price: <span style={{ fontFamily: 'Arial, sans-serif' }}>
      3 500 &euro;
    </span>,
      image:
        "https://cdn.builder.io/api/v1/image/assets/6b3112d6797947108e0e370d8b352087/7f1a05e6080e9385d7ef9b3266a3e3a64bf68ea2?placeholderIfAbsent=true",
    },
    {
      title: "INDIAN EXPRESS #1",
      price: <span style={{ fontFamily: 'Arial, sans-serif' }}>
      4 500 &euro;
    </span>,
      image:
        "https://cdn.builder.io/api/v1/image/assets/6b3112d6797947108e0e370d8b352087/e76284068d9561e4d52c6af861180e10a3f82805?placeholderIfAbsent=true",
    },
    {
      title: "INDIAN EXPRESS #2",
      price: <span style={{ fontFamily: 'Arial, sans-serif' }}>
      4 500 &euro;
    </span>,
      image:
        "https://cdn.builder.io/api/v1/image/assets/6b3112d6797947108e0e370d8b352087/81d302423a5cd55dd4cf697394aa2abe586f1604?placeholderIfAbsent=true",
    },
    {
      title: "INDIAN GAME",
      price: <span style={{ fontFamily: 'Arial, sans-serif' }}>
      6 500 &euro;
    </span>,
      image:
        "https://cdn.builder.io/api/v1/image/assets/6b3112d6797947108e0e370d8b352087/72bfd697fb6d6f36c434f383d422d66e03365bd5?placeholderIfAbsent=true",
    },
    {
      title: "SAGESSE",
      price: <span style={{ fontFamily: 'Arial, sans-serif' }}>
      2 500 &euro;
    </span>,
      image:
        "https://cdn.builder.io/api/v1/image/assets/6b3112d6797947108e0e370d8b352087/dc9213e3706cce097cf32c3c4dc4c94367fd328b?placeholderIfAbsent=true",
    },
  ];

  return (
    <div className="galleryContainer">
      <div className="catalogueTitle">CATALOGUE</div>
      <div className="photographieTitle">PHOTOGRAPHIE</div>

      <div className="galleryGrid" role="list">
        {galleryItems.map((item, index) => (
          <div key={index} className="galleryItem" role="listitem">
            <img
              src={item.image}
              className="galleryImage"
              alt={item.title}
              loading="lazy"
            />
            <div className="itemTitle">{item.title}</div>
            <div className="divider" />
            <div className="itemPrice">{item.price}</div>
            {/* <button className="addToCartButton">
              AJOUTER AU PANIER
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
}
