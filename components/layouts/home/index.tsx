"use client";

import { useEffect } from "react";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import HeroSection from "./HeroSection";
import InsightsSection from "./Insights-section";
import MetricsSection from "./MetricsSection";
import ServiceAreas from "./Service-Areas";
import Whoweserve from "./Who-We-Serve";
import { usePageData } from "@/store/usePageData";
import { WEBSITE_DATA } from "@/public/data/website-data";

const HomeLayout = () => {
  const { setDetails } = usePageData();
  useEffect(() => {
    setDetails(WEBSITE_DATA);
  }, []);

  return (
    <div>
      <HeroSection />
      <AboutSection />
      <MetricsSection />
      <ServiceAreas />
      <Whoweserve />
      <InsightsSection />
      <ContactSection />
    </div>
  );
};

export default HomeLayout;
