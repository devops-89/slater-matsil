"use client";
import { Box, Container } from "@mui/material";
import React from "react";
import InsightsHeroSection from "./Insisghts-hero-section";
import InsightsTabSection from "./Insights-tab-section";
import QuickLinks from "./Quick-Links";

const InsightsLayout = () => {
  return (
    <Box>
      <InsightsHeroSection />

      <InsightsTabSection />
      {/* <QuickLinks /> */}
    </Box>
  );
};

export default InsightsLayout;
