"use client";

import InsightsSection from "../../widgets/Insights-section";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import HeroSection from "./HeroSection";
import MetricsSection from "./MetricsSection";
import ServiceAreas from "../../widgets/Service-Areas";
import Whoweserve from "./Who-We-Serve";

const HomeLayout = () => {
  return (
    <div>
      <HeroSection />
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
