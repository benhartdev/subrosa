"use client";
import React from "react";
import "../styles/TestimonialSection.css";

const testimonials = [
  {
    name: "Dim Burton",
    role: "Illustrateur",
    text: "”SUB ROSA m’a permis de présenter mon art à un public passionné. L’équipe est à l’écoute et très professionnelle.”",
    avatar: "/images/Dim.png",  
    stars: 4.5,
  },
  {
    name: "Caterina Varchetta",
    role: "Artiste peintre",
    text: "”Un espace raffiné et sobre, parfait pour exposer mes créations. Et pour y effectuer quelques belles ventes.”",
    avatar: "/images/CAT_avatar.png",
    stars: 5,
  },
  {
    name: "Sophie Bigot",
    role: "Marketing Specialist",
    text: "”SUB ROSA m’a permis de découvrir des artistes incroyables. J’y ai même trouvé un partenaire pour un projet d’exposition.”",
    avatar: "/images/sophie.jpg",
    stars: 5,
  },
  {
    name: "Tortue Geniale",
    role: "Marketing Specialist",
    text: "“SUB ROSA est bien plus qu’une galerie : c’est un lieu de rencontres, d’inspiration, et de reconnaissance pour les artistes émergents comme confirmés.”",
    avatar: "/images/Tortue_gé.png",
    stars: 5,
  },
];

const renderStars = (stars) => {
  const full = Math.floor(stars);
  const half = stars % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <>
      {Array(full)
        .fill()
        .map((_, i) => (
          <i key={"f" + i} className="fas fa-star" />
        ))}
      {half === 1 && <i className="fas fa-star-half-alt" />}
      {Array(empty)
        .fill()
        .map((_, i) => (
          <i key={"e" + i} className="far fa-star" />
        ))}
    </>
  );
};

const TestimonialSection = () => {
  return (
    <section className="testimonials-container">
      <h3 className="testimonials-title">Témoignages</h3>
      <p className="testimonials-description">
        Ils ont vécu l’expérience SUB ROSA. Voici ce qu’ils en disent :
      </p>
      <div className="testimonials-grid">
        {testimonials.map((t, index) => (
          <div key={index} className="testimonial-card">
            <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
            <h5 className="testimonial-name">{t.name}</h5>
            <h6 className="testimonial-role">{t.role}</h6>
            <p className="testimonial-text">“{t.text}”</p>
            <div className="testimonial-stars">{renderStars(t.stars)}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
