"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import cardData from "../data/blogData"; // Vérifie bien ce chemin
import styles from "./MainContent.module.css"; // ✅ module CSS local

export default function MainContent() {
  const [focusedCardIndex, setFocusedCardIndex] = useState(null);
  const [cardLimit, setCardLimit] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardLimit(1);
      } else if (window.innerWidth >= 1600) {
        setCardLimit(3);
      } else {
        setCardLimit(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardsToShow = cardData.slice(0, cardLimit);

  return (
    <div className={styles.gridWrapper}>
      {cardsToShow.map((card, index) => (
        <Card
          key={index}
          className={`${styles.customCard} ${
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
            className={styles.cardMedia}
          />
          <CardContent className={styles.customCardContent}>
            <Typography gutterBottom variant="caption">
              {card.tag}
            </Typography>
            <Typography gutterBottom variant="h6">
              {card.title}
            </Typography>
            <Typography variant="body2" className={styles.truncatedText}>
              {card.description}
            </Typography>
            <p className={styles.blogAuthor}>
              {card.authors.map((a) => a.name).join(", ")}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
