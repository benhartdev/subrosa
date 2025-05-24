import GalleryPage from "../../components/GalleryPage";


export default function GalerieRoute({ searchParams }) {
  const param = searchParams.type || "works";

  const config = {
    artist: {
      title: "Nos artistes",
      fieldsToShow: ["title", "style"],
      type: "artist",
    },
    works: {
      title: "Nos œuvres",
      fieldsToShow: ["title", "medium", "artistName"],
      type: "works",
    },
    photographie: {
      title: "Photographies",
      fieldsToShow: ["title", "medium", "artistName"],
      type: "works",
      subtype: "Photographie",
    },
    peinture: {
      title: "Peintures",
      fieldsToShow: ["title", "medium", "artistName"],
      type: "works",
      subtype: "Peinture",
    },
    sculpture: {
      title: "Sculptures",
      fieldsToShow: ["title", "medium", "artistName"],
      type: "works",
      subtype: "Sculpture",
    },
    illustration: {
      title: "Illustrations",
      fieldsToShow: ["title", "medium", "artistName"],
      type: "works",
      subtype: "Illustration",
    },
    edition_art: {
      title: "Éditions d’art",
      fieldsToShow: ["title", "medium", "artistName"],
      type: "works",
      subtype: "Edition d'art",
    },
    nouveaute: {
      title: "Nouveautés",
      fieldsToShow: ["title", "medium", "artistName"],
      type: "latest",
    },
  };

  const { title, fieldsToShow, type, subtype } = config[param] || config["works"];

  return <GalleryPage type={type} subtype={subtype} title={title} fieldsToShow={fieldsToShow} />;
}
