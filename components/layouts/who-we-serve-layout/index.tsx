"use client";
import { Box, Container, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import WhoWeServeLayoutHero from "./Who-we-serve-layout-hero";
import WhoWeServeAbout from "./Who-we-serve-layout-about";
import QuoteCard from "./components/Quote-Card";
import { usePageData } from "@/store/usePageData";
import WhoServeTabSection from "./components/Who-serve-tab-section";
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
    const isAdminRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/dashboard') || pathname?.startsWith('/pages') || pathname?.startsWith('/manage-');
    if (isAdminRoute) return;

    let isMounted = true;
    const fetchWhoWeServeData = async () => {
      try {
        startLoading();
        let pageData = null;
        try {
          const res = await PageControllers.getPublicPageById(11).catch(e => ({ data: { data: null } }));
          pageData = res?.data?.data?.data || res?.data?.data;
        } catch (e) {
          console.error("Failed to fetch public page by ID 11", e);
        }
        
        if (pageData && isMounted) {
          const updatedWhoWeServePage = require("@/utils/pageDataMapper").mapBackendToWhoWeServeState(pageData, WEBSITE_DATA.whoWeServePage);
          const currentDetails = usePageData.getState().details || WEBSITE_DATA;
          setDetails({ ...currentDetails, whoWeServePage: updatedWhoWeServePage } as any);
          
          if (!updatedWhoWeServePage?.whoWeServepageHeroSection?.img) {
             stopLoading();
          }
        } else if (isMounted) {
          stopLoading();
        }
      } catch (error) {
        console.error("Error fetching who we serve page data", error);
      } finally {
        if (isMounted) stopLoading();
        if (isMounted) setIsDataLoaded(true);
      }
    };
    
    fetchWhoWeServeData();

    return () => {
      if (isMounted) stopLoading();
      isMounted = false;
    };
  }, [setDetails, startLoading, stopLoading, pathname]);

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
