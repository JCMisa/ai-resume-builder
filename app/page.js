"use client";

import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Header from "./dashboard/_components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Gallery />
      <HowItWorks />
      <Contact />
      <Footer />
    </div>
  );
}
