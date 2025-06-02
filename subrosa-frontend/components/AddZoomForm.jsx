// ✅ Composant pour ajouter des zooms à une œuvre existante
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import styles from "./AddZoomForm.module.css"; 

export default function AddZoomForm() {
 const id = useParams().id;
  const [work, setWork] = useState(null);
  const [message, setMessage] = useState("");
  const [zoomInputs, setZoomInputs] = useState([{ file: null, altText: "" }]);

    useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:5000/api/works/${id}`, { credentials: "include" })
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data) => setWork(data))
      .catch((err) => console.error("Erreur de chargement :", err));
  }, [id]);

  const handleFileChange = (index, file) => {
    const updated = [...zoomInputs];
    updated[index].file = file;
    setZoomInputs(updated);

    // Ajouter un nouvel input si le précédent vient d’être rempli
    if (zoomInputs.length < 6 && index === zoomInputs.length - 1) {
      setZoomInputs([...updated, { file: null, altText: "" }]);
    }
  };

  const handleAltChange = (index, value) => {
    const updated = [...zoomInputs];
    updated[index].altText = value;
    setZoomInputs(updated);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();

  zoomInputs.forEach(({ file, altText }) => {
    if (file) {
      formData.append("images", file);
      formData.append("altText", altText);
    }
  });

  try {
    const response = await fetch(`http://localhost:5000/api/works/${id}/add-zoom`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("✅ Zooms ajoutés !");
      setZoomInputs([{ file: null, altText: "" }]);
    } else {
      setMessage(`Erreur : ${data.message || "Échec de l’envoi"}`);
    }
  } catch (error) {
    console.error("Erreur réseau ou serveur :", error);
    setMessage("❌ Échec de la connexion au serveur");
  }
};


  if (!work) return <p>Chargement de l'œuvre...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.AddZoomTitle}>Ajouter des zooms à : {work.title}</h2>
      <Image
  src={
    work.images?.[0]?.url?.startsWith("http")
      ? work.images[0].url
      : `http://localhost:5000${work.images[0]?.url?.startsWith("/") ? "" : "/"}${work.images[0]?.url}`
  }
  alt={work.images?.[0]?.altText || "Œuvre"}
  width={400}
  height={400}
  className={styles.mainWorkImage}
/>

      <form onSubmit={handleSubmit} className={styles.formAddZoom}>
        {zoomInputs.map((input, index) => (
          <div key={index} className={styles.preview}>
            <p>Zoom {index + 1}</p>
            {input.file && (
              <img
                src={URL.createObjectURL(input.file)}
                alt="aperçu"
                className={styles.previewImage}
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(index, e.target.files[0])}
              disabled={zoomInputs.length >= 6 && !input.file}
              className={styles.inputAddZoom}
            />
            <input
              type="text"
              placeholder="Texte alternatif"
              value={input.altText}
              onChange={(e) => handleAltChange(index, e.target.value)}
              className={styles.inputAddZoom}
            />
          </div>
        ))}

        <button
          type="submit"
          className={styles.buttonAddZoom}
          disabled={zoomInputs.filter((z) => z.file).length === 0}
        >
          Ajouter les zooms
        </button>
      </form>

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}