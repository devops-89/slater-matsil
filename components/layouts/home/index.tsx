import React from "react";
import HeroSection from "./HeroSection";
import MetricsSection from "./MetricsSection";
import AboutSection from "./AboutSection";

const HomeLayout = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <MetricsSection />
    </div>
  );
};

export default HomeLayout;
