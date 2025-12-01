import { Box } from "@mui/material";
import React from "react";
import HeroSection from "./Hero-section";
import WhyWorkWithus from "./Why-work-with-us";

const CareerLayout = () => {
  return (
    <div>
      <Box>
        <HeroSection />
        <WhyWorkWithus />
      </Box>
    </div>
  );
};

export default CareerLayout;
