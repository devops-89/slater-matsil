"use client";
import { Box } from "@mui/material";
import React from "react";
import HeroSection from "./Hero-section";
import WhyWorkWithus from "./Why-work-with-us";
import OpenRoles from "./Open-Roles";

const CareerLayout = () => {
  return (
    <div>
      <Box>
        <HeroSection />
        <WhyWorkWithus />
        <OpenRoles />
      </Box>
    </div>
  );
};

export default CareerLayout;
