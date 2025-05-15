import LogoSubrosa from "../../components/icons/gallerie SUB logo.svg";
import GravityButton from "../../components/GravityButton";
import Image from "next/image";

export default function Home() {
  return (
    <main style={{ backgroundColor: "black" }}>
      <h1>Test Logo</h1>
      <GravityButton
  color="#e60073"
  icon={
    <Image
      src="/images/gallerie SUB logo2.png"
      alt="Logo SUB ROSA"
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
        width={500} 
        height={500}
    />
  }
/>

    </main>
  );
}