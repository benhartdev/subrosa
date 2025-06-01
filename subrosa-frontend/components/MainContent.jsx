
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import cardData from "../data/blogData";
import styles from "./MainContent.module.css";

export default function MainContent({ limit }) {
  const [focusedCardIndex, setFocusedCardIndex] = useState(null);
  const [cardLimit, setCardLimit] = useState(limit || 2);

  useEffect(() => {
    if (limit) return;
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
  }, [limit]);

  return (
    <div className={styles.gridWrapper}>
       {cardData.slice(0, cardLimit).map((card, index) => {
        const isFocused = focusedCardIndex === index;
        const isBlurred = focusedCardIndex !== null && !isFocused;

        const wrapperClasses = [
          styles.cardWrapper,
          (index + 1) % 3 === 0 ? styles.fullWidthCard : "",
          isBlurred ? styles.blurredCard : "",
        ]
          .filter(Boolean)
          .join(" ");

        const cardClasses = [
          styles.customCard,
          (index + 1) % 3 === 0 ? styles.fullWidthCard : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <div
            key={index}
            className={wrapperClasses}
            onMouseEnter={() => setFocusedCardIndex(index)}
            onMouseLeave={() => setFocusedCardIndex(null)}
          >
            <Card
              className={cardClasses}
              tabIndex={0}
              sx={{
                backgroundColor: "black",
                boxShadow: "none",
                color: "white",
                border: "1px solid #bcb8b8",
                borderRadius: "0px",
                transition: "transform 1.2s ease-in-out, border-color 0.3s ease-in",
                "&:hover": {
                  zIndex: 20,
                  borderColor: "#ccc",
                  transform: "scale(1.1)",
                  transition: "transform 0.8s ease-out, border-color 0.3s ease-in",
                },
              }}
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
              <div className={styles.viewArticleWrapper}>
                <button
                  className={styles.viewArticleButton}
                  onClick={() => window.location.href = `/blog/${card.slug}`}>
                  Lire la suite...
                </button>
               </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
