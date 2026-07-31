"use client";

import { PageControllers } from "@/api/pageControllers";
import { useLoading } from "@/components/providers/LoadingProvider";
import { WEBSITE_DATA } from "@/public/data/website-data";
import { usePageData } from "@/store/usePageData";
import { mapBackendToHomepageState } from "@/utils/pageDataMapper";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const InsightsSection = dynamic(() => import("../../widgets/Insights-section"), { ssr: true });
const ServiceAreas = dynamic(() => import("../../widgets/Service-Areas"), { ssr: true });
const MetricsSection = dynamic(() => import("./MetricsSection"), { ssr: true });
const Whoweserve = dynamic(() => import("./Who-We-Serve"), { ssr: true });
const ContactSection = dynamic(() => import("./ContactSection"), { ssr: true });

const AboutSection = dynamic(() => import("./AboutSection"), { ssr: true });
import HeroSection3 from "./HeroSection3";

const HomeLayout = () => {
  const { setDetails } = usePageData();
  const { startLoading, stopLoading } = useLoading();

  const pathname = usePathname();
  const hasFetched = useRef(false);

  useEffect(() => {
    // Data is now fetched via SSR in page.tsx and initialized via StoreInitializer
  }, []);

  return (
    <Box sx={{ overflowX: "hidden", width: "100%" }}>
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
    </Box>
  );
};

export default HomeLayout;
