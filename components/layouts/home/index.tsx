"use client";

import InsightsSection from "../../widgets/Insights-section";
import ServiceAreas from "../../widgets/Service-Areas";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import HeroSection3 from "./HeroSection3";
import MetricsSection from "./MetricsSection";
import Whoweserve from "./Who-We-Serve";

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
