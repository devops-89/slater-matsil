"use client";

import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import HeroSection from "./HeroSection";
import InsightsSection from "./Insights-section";
import MetricsSection from "./MetricsSection";
import ServiceAreas from "./Service-Areas";
import Whoweserve from "./Who-We-Serve";

const HomeLayout = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <MetricsSection />
      <ServiceAreas />
      <Whoweserve />
      {/* <InsightsSection /> */}
      <ContactSection />
    </div>
  );
};

export default HomeLayout;
