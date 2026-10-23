import { Box } from "@mui/material";
import React from "react";
import InsightsHeroSection from "./Insisghts-hero-section";
import InsightsTabSection from "./Insights-tab-section";

const InsightsLayout = ({ apiData }: { apiData?: any }) => {
  return (
    <Box>
      <div data-aos="fade-in">
        <InsightsHeroSection apiData={apiData} />
      </div>
      <div data-aos="fade-up">
        <InsightsTabSection />
      </div>
    </Box>
  );
};

export default InsightsLayout;
