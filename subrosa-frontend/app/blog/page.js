"use client";

import DoubleBorderContainer from "../../components/DoubleBorderContainer";
import MainContent from "../../components/MainContent";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function BlogPage() {
  return (
   
     <>
      <Header />
      <main>
        <DoubleBorderContainer title="...">
          <MainContent />
        </DoubleBorderContainer>
      </main>
      <Footer />
    </>
  );
}