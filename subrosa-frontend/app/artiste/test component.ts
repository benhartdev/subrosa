"use client";import React from "react";
import ArtistDetails from "../../components/ArtistDetails";
import styles from "../../styles/artistSolo.css";

const ArtistPage = () => {
  return (
    <div className="artist-page">
      <div className="artist-container">
        <ArtistDetails
          country="France"
          city="Colombes"
          birthYear="1964"
          techniques="Encre et acrylique sur toile et impression Sérigraphie sur papier"
        />
      </div>
    </div>
iv>
</section>


      <Footer />
    </main>
  );
};

export default ArtistPage;
