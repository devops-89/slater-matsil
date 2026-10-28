import { Box } from "@mui/material";
import React, { Suspense } from "react";
import InsightsHeroSection from "../insights-layout/Insisghts-hero-section";
import BlogSection from "./Blog-section";

const BlogLayout = () => {
  return (
    <Box>
      <InsightsHeroSection />
      <Suspense fallback={null}>
        <BlogSection />
      </Suspense>
    </Box>
  );
};

export default BlogLayout;
