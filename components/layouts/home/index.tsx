"use client";

import React, { useEffect } from "react";
import HeroSection from "./HeroSection";
import MetricsSection from "./MetricsSection";
import AboutSection from "./AboutSection";
import { usePageData } from "@/store/usePageData";
import { HOMEPAGE_DATA_PROPS } from "@/utils/types";
import ServiceAreas from "./Service-Areas";
import { WEBSITE_DATA } from "@/public/data/website-data";

const HomeLayout = () => {
  const { details, setDetails } = usePageData();

  useEffect(() => {
    if (WEBSITE_DATA) {
      setDetails(WEBSITE_DATA);
    }
  }, [setDetails, WEBSITE_DATA]);

  return (
    <div>
      <HeroSection />
      <AboutSection />
      <MetricsSection />
      <ServiceAreas />
    </div>
  );
};

export default HomeLayout;
