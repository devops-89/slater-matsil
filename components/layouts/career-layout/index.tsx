"use client";
import { Box } from "@mui/material";
import React from "react";
import HeroSection from "./Hero-section";
import dynamic from "next/dynamic";

const WhyWorkWithus = dynamic(() => import("./Why-work-with-us"), { ssr: true });
const OpenRoles = dynamic(() => import("./Open-Roles"), { ssr: true });
const InsightsSection = dynamic(() => import("@/components/widgets/Insights-section"), { ssr: true });

const CareerLayout = () => {
  return (
    <div>
      <Box>
        <div data-aos="fade-in" suppressHydrationWarning>
          <HeroSection />
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
