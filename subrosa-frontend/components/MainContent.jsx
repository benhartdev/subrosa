"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import cardData from "../data/blogData"; // Vérifie bien ce chemin
import "../styles/mainContent.css";

export default function MainContent() {
  const [focusedCardIndex, setFocusedCardIndex] = useState(null);
  const [cardLimit, setCardLimit] = useState(2);

 useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setCardLimit(1); // mobile : 1 seule carte
    } else if (window.innerWidth >= 1600) {
      setCardLimit(3); // très grand écran
    } else {
      setCardLimit(2); // normal : 2 cartes
    }
  };

    handleResize(); // appel initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardsToShow = cardData.slice(0, cardLimit);


  return (
    <div className="grid-wrapper">
      {cardsToShow.map((card, index) => (
        <Card
          key={index}
          className={`custom-card ${
            focusedCardIndex === index ? "Mui-focused" : ""
          }`}
          tabIndex={0}
          onFocus={() => setFocusedCardIndex(index)}
          onBlur={() => setFocusedCardIndex(null)}
        >
          <CardMedia
            component="img"
            alt={card.title}
            image={card.img}
            className="card-media"
          />
          <CardContent className="custom-card-content">
            <Typography gutterBottom variant="caption">
              {card.tag}
            </Typography>
            <Typography gutterBottom variant="h6">
              {card.title}
            </Typography>
            <Typography variant="body2" className="truncated-text">
              {card.description}
            </Typography>
            <p className="blog-author">
              {card.authors.map((a) => a.name).join(", ")}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
