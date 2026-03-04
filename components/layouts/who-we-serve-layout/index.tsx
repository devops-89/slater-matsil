"use client";
import { Box, Container, Grid, Stack } from "@mui/material";
import React from "react";
import WhoWeServeLayoutHero from "./Who-we-serve-layout-hero";
import WhoWeServeAbout from "./Who-we-serve-layout-about";
import QuoteCard from "./components/Quote-Card";
import { usePageData } from "@/store/usePageData";
import WhoServeTabSection from "./components/Who-serve-tab-section";

const WhoWeServelayout = () => {
  const { details } = usePageData();
  return (
    <Box>
      <div data-aos="fade-in">
        <WhoWeServeLayoutHero />
      </div>
      <div data-aos="fade-up">
        <WhoWeServeAbout />
      </div>
      <Container maxWidth="lg" data-aos="zoom-in">
        <Grid container sx={{ mt: 6 }}>
          <Grid size={{ lg: 9, xs: 12 }} mx="auto">
            <QuoteCard
              quote={
                details?.whoWeServePage?.whoWeServeAboutSection?.quoteCardData
                  ?.quote || ""
              }
              author={
                details?.whoWeServePage?.whoWeServeAboutSection?.quoteCardData
                  ?.author || ""
              }
            />
          </Grid>
        </Grid>
      </Container>
      <div data-aos="fade-up">
        <WhoServeTabSection />
      </div>
    </Box>
  );
};

export default WhoWeServelayout;
