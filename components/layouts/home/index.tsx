"use client";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";

const InsightsSection = dynamic(() => import("../../widgets/Insights-section"), { ssr: false });
const ServiceAreas = dynamic(() => import("../../widgets/Service-Areas"), { ssr: false });
const MetricsSection = dynamic(() => import("./MetricsSection"));
const Whoweserve = dynamic(() => import("./Who-We-Serve"), { ssr: false });
const ContactSection = dynamic(() => import("./ContactSection"), { ssr: false });

const AboutSection = dynamic(() => import("./AboutSection"));
import HeroSection3 from "./HeroSection3";


const HomeLayout = ({ apiData }: { apiData?: any }) => {

  return (
    <Box sx={{ overflowX: "hidden", width: "100%" }}>
      {/* <HeroSection /> */}
      {/* <HeroSection2 /> */}
      {/* <SliderHeroSection /> */}
      <HeroSection3 apiData={apiData} />
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
