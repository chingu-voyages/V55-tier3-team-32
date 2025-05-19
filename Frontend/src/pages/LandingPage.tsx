import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CryptoIcons from "../components/CryptoIcons";



const LandingPage: React.FC = () => {
  


  return (
    <div className="w-full bg-[#1a1a17] flex flex-col min-h-screen overflow-hidden relative">
     
      
     
      <Navbar />
      <HeroSection />
      <CryptoIcons />
      

    </div>
  );
};

export default LandingPage;

