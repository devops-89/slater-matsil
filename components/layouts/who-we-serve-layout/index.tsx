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
      <WhoWeServeLayoutHero />
      <WhoWeServeAbout />
      <Container maxWidth="lg">
        <Grid container sx={{ mt: 6 }}>
          <Grid size={9} mx="auto">
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
      <WhoServeTabSection />
    </Box>
  );
};

export default WhoWeServelayout;
