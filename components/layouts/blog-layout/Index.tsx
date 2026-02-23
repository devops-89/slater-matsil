"use client";
import { Box } from "@mui/material";
import React from "react";
import InsightsHeroSection from "../insights-layout/Insisghts-hero-section";
import BlogSection from "./Blog-section";

const BlogLayout = () => {
  return (
    <Box>
      <InsightsHeroSection />
      <BlogSection />
    </Box>
  );
};

export default BlogLayout;

