"use client";
import { Box, Container, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import WhoWeServeLayoutHero from "./Who-we-serve-layout-hero";

const WhoWeServeAbout = dynamic(() => import("./Who-we-serve-layout-about"), { ssr: true });
const QuoteCard = dynamic(() => import("./components/Quote-Card"), { ssr: true });
const WhoServeTabSection = dynamic(() => import("./components/Who-serve-tab-section"), { ssr: true });
import { usePageData } from "@/store/usePageData";
import { useLoading } from "@/components/providers/LoadingProvider";
import { usePathname } from "next/navigation";
import { PageControllers } from "@/api/pageControllers";
import { WEBSITE_DATA } from "@/public/data/website-data";

const WhoWeServelayout = () => {
  const { details, setDetails } = usePageData();
  const { startLoading, stopLoading } = useLoading();
  const pathname = usePathname();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    // Data is now fetched via SSR in page.tsx and initialized via StoreInitializer
    setIsDataLoaded(true);
  }, []);

  const handleHeroImageLoad = () => {
    stopLoading();
  };

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
        <React.Suspense fallback={<div>Loading...</div>}>
          <WhoServeTabSection />
        </React.Suspense>
      </div>
    </Box>
  );
};

export default WhoWeServelayout;
