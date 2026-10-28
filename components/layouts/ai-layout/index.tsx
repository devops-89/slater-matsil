"use client";

import React from "react";
import { Box } from "@mui/material";
import AiHero from "./Ai-Hero";
import AiMatters from "./Ai-Matters";
import AiApproach from "./Ai-Approach";
import AiTools from "./Ai-Tools";
import AiChoice from "./Ai-Choice";
import AiQuestions from "./Ai-Questions";

interface AiLayoutProps {
  apiData?: any;
}

const AiLayout = ({ apiData }: AiLayoutProps) => {
  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      <div data-aos="fade-in">
        <AiHero apiData={apiData} />
      </div>
      <div data-aos="fade-up">
        <AiMatters />
      </div>
      <div data-aos="fade-up">
        <AiApproach />
      </div>
      <div data-aos="fade-up">
        <AiTools />
      </div>
      <div data-aos="fade-up">
        <AiChoice />
      </div>
      <div data-aos="fade-up">
        <AiQuestions />
      </div>
    </Box>
  );
};

export default AiLayout;
