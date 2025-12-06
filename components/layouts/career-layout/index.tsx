"use client";
import { Box } from "@mui/material";
import React from "react";
import HeroSection from "./Hero-section";
import WhyWorkWithus from "./Why-work-with-us";
import OpenRoles from "./Open-Roles";
import InsightsSection from "@/components/widgets/Insights-section";

const CareerLayout = () => {
  return (
    <div>
      <Box>
        <HeroSection />
        <WhyWorkWithus />
        <OpenRoles />
        <InsightsSection />
      </Box>
    </div>
  );
};

export default CareerLayout;
