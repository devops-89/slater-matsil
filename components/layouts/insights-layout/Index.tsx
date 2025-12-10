"use client";
import { Box, Container } from "@mui/material";
import React from "react";
import InsightsHeroSection from "./Insisghts-hero-section";
import InsightsTabSection from "./Insights-tab-section";

const InsightsLayout = () => {
  return (
    <Box>
      <InsightsHeroSection />
      <InsightsTabSection />
    </Box>
  );
};

export default InsightsLayout;
