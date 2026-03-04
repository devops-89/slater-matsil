"use client";
import { Box } from "@mui/material";
import React from "react";
import InsightsHeroSection from "./Insisghts-hero-section";
import InsightsTabSection from "./Insights-tab-section";

const InsightsLayout = () => {
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
