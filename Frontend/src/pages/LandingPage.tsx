import React from "react";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CryptoIcons from "../components/CryptoIcons";
import Review from "../components/Review";
import Cube from "../components/Cube";

import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";



const LandingPage: React.FC = () => {
  


  return (
    <div className="w-full bg-[#1a1a17] flex flex-col min-h-screen overflow-hidden relative">
     
      
     
      <Navbar />
      <HeroSection />
      <Cube />
      <Review />
      <CryptoIcons />
     <AboutUs />
      <Footer />
    </div>
  );
};

export default LandingPage;

