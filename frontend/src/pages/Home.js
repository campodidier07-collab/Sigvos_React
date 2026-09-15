import React from 'react';
import {
  Navbar,
  HeroSlider,
  QueEsSection,
  RolesSection,
  BeneficiosSection,
  Footer,
} from "../components/Landing";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSlider />
      <QueEsSection />
      <RolesSection />
      <BeneficiosSection />
      <Footer />
    </>
  );
}
