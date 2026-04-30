"use client";

import InsightsSection from "../../widgets/Insights-section";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import HeroSection from "./HeroSection";
import MetricsSection from "./MetricsSection";
import ServiceAreas from "../../widgets/Service-Areas";
import Whoweserve from "./Who-We-Serve";
import HeroSection2 from "./HeroSection2";
import SliderHeroSection from "./SliderHeroSection";
import HeroSection3 from "./HeroSection3";

const HomeLayout = () => {
  return (
    <div>
      {/* <HeroSection /> */}
      {/* <HeroSection2 /> */}
      {/* <SliderHeroSection /> */}
      <HeroSection3 />
      <AboutSection />
      <MetricsSection />
      <ServiceAreas limit={6} />
      <Whoweserve />
      <InsightsSection />
      <ContactSection />
    </div>
  );
};

export default HomeLayout;
