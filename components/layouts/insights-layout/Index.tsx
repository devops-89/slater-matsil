"use client";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import InsightsHeroSection from "./Insisghts-hero-section";
import InsightsTabSection from "./Insights-tab-section";
import { usePageData } from "@/store/usePageData";
import { useLoading } from "@/components/providers/LoadingProvider";
import { usePathname } from "next/navigation";
import { PageControllers } from "@/api/pageControllers";
import { WEBSITE_DATA } from "@/public/data/website-data";

const InsightsLayout = () => {
  const { setDetails } = usePageData();
  const { startLoading, stopLoading } = useLoading();
  const pathname = usePathname();

  useEffect(() => {
    // Data is now fetched server-side in page.tsx and populated via StoreInitializer.
    // No need to fetch client-side or trigger global loaders anymore!
  }, [pathname]);

  return (
    <Box>
      <div data-aos="fade-in">
        <InsightsHeroSection />
      </div>
      <div data-aos="fade-up">
        <InsightsTabSection />
      </div>
    </Box>
  );
};

export default InsightsLayout;
