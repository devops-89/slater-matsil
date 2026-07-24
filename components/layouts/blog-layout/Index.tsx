"use client";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import InsightsHeroSection from "../insights-layout/Insisghts-hero-section";
import BlogSection from "./Blog-section";
import { usePageData } from "@/store/usePageData";

const BlogLayout = () => {
  return (
    <Box>
      <InsightsHeroSection />
      <BlogSection />
    </Box>
  );
};

export default BlogLayout;
