"use client";
import { Box } from "@mui/material";
import React from "react";
import HeroSection from "./Hero-section";
import WhyWorkWithus from "./Why-work-with-us";
import OpenRoles from "./Open-Roles";
import InsightsSection from "@/components/widgets/Insights-section";

const CareerLayout = ({ onImageLoad }: { onImageLoad?: () => void }) => {
  return (
    <div>
      <Box>
        <div data-aos="fade-in" suppressHydrationWarning>
          <HeroSection onImageLoad={onImageLoad} />
        </div>
        <div data-aos="fade-up" suppressHydrationWarning>
          <WhyWorkWithus />
        </div>
        <div data-aos="fade-up" suppressHydrationWarning>
          <OpenRoles />
        </div>
        <InsightsSection />
      </Box>
    </div>
  );
};

export default CareerLayout;
