import { Box, Container, Grid, Stack } from "@mui/material";
import React from "react";
import dynamic from "next/dynamic";
import WhoWeServeLayoutHero from "./Who-we-serve-layout-hero";

const WhoWeServeAbout = dynamic(() => import("./Who-we-serve-layout-about"));
const QuoteCard = dynamic(() => import("./components/Quote-Card"));
const WhoServeTabSection = dynamic(() => import("./components/Who-serve-tab-section"));
import { getUpdatedDetails } from "@/utils/storeUpdater";
import { WEBSITE_DATA } from "@/public/data/website-data";

const WhoWeServelayout = ({ apiData }: { apiData?: any }) => {
  const details = apiData ? getUpdatedDetails("who-we-serve", apiData) : WEBSITE_DATA;

  return (
    <Box>
      <div data-aos="fade-in">
        <WhoWeServeLayoutHero apiData={apiData} />
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
        <React.Suspense fallback={<div>Loading...</div>}>
          <WhoServeTabSection />
        </React.Suspense>
      </div>
    </Box>
  );
};

export default WhoWeServelayout;
