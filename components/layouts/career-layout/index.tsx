import { Box } from "@mui/material";
import React from "react";
import HeroSection from "./Hero-section";
import WhyWorkWithus from "./Why-work-with-us";
import OpenRoles from "./Open-Roles";
import InsightsSection from "@/components/widgets/Insights-section";

const CareerLayout = ({ apiData }: { apiData?: any }) => {
  return (
    <div>
      <Box>
        <div suppressHydrationWarning>
          <HeroSection apiData={apiData} />
        </div>
        <div suppressHydrationWarning>
          <WhyWorkWithus />
        </div>
        <div suppressHydrationWarning>
          <OpenRoles />
        </div>
        <InsightsSection />
      </Box>
    </div>
  );
};

export default CareerLayout;
