import React from "react";
import Hero from "../components/landing/Hero.jsx";
import Features from "../components/landing/Features.jsx";
import Steps from "../components/landing/Steps.jsx";
import Testimonials from "../components/landing/Testimonal.jsx";
import Banner from "../components/landing/Banner.jsx";
import Pricing from "../components/landing/Pricing.jsx";
import FAQ from "../components/landing/FAQ.jsx";
import "./styles/landing.css";

const Landing = () => {
  return (
    <div className="home-container">
      <Hero />
      <Features />
      <Steps />
      <Testimonials />
      <Banner />
      <Pricing />
      <FAQ />
    </div>
  );
};

export default Landing;
