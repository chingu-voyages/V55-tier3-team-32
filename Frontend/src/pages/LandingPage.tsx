import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CryptoIcons from "../components/CryptoIcons";
import Review from "../components/Review";
import Cube from "../components/Cube";

import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";



const LandingPage: React.FC = () => {
  const location = useLocation(); 
  const [loginMessage, setLoginMessage] = useState<string | null>(null); // State for login message
 
  useEffect(() => {
    if (location.search.includes("authRequired=true")) {
      setLoginMessage("Please log in to access the requested page.");
    } else {
      setLoginMessage(null);
    }
  }, [location.search]);

  return (
    <div className="w-full bg-[#1a1a17] flex flex-col min-h-screen overflow-hidden relative">
     
      
     
      <Navbar />
      {loginMessage && (
        <div className="px-4 py-3 rounded m-7  bg-orange-400 text-white hover:bg-orange-500 transition duration-200" role="alert">
          <span className="block sm:inline"> {loginMessage}</span>
        </div>
      )}
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

