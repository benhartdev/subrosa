import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ArtistSoloPage from "../components/ArtistSoloPage";
import axios from "axios";

async function getArtist(slug) {
  const res = await axios.get(`http://localhost:5000/api/artists/${slug}`);
  return res.data;
}

export default async function ArtistPage({ params }) {
  const artist = await getArtist(params.slug);

  return (
    <>
      <Header />
      <ArtistSoloPage artist={artist} />
      <Footer />
    </>
  );
}
