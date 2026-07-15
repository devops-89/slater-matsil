"use client";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import InsightsHeroSection from "./Insisghts-hero-section";
import InsightsTabSection from "./Insights-tab-section";
import { usePageData } from "@/store/usePageData";
import { useLoading } from "@/components/providers/LoadingProvider";
import { usePathname } from "next/navigation";
import { PageControllers } from "@/api/pageControllers";
import { WEBSITE_DATA } from "@/public/data/website-data";

const InsightsLayout = () => {
  const { setDetails } = usePageData();
  const { startLoading, stopLoading } = useLoading();
  const pathname = usePathname();

  useEffect(() => {
    const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/pages') || pathname.startsWith('/manage-');
    if (isAdminRoute) return;

    let isMounted = true;
    const fetchInsightsData = async () => {
      try {
        startLoading();

        let pageData = null;
        try {
          const res = await PageControllers.getPublicPageById(7).catch(e => ({ data: { data: null } }));
          pageData = res.data?.data?.data || res.data?.data;
        } catch (e) {
          console.error("Failed to fetch public page by ID 7", e);
        }
        
        if (pageData && isMounted) {
          const updatedInsightsPage = require("@/utils/pageDataMapper").mapBackendToInsightsState(pageData, WEBSITE_DATA.insightsPage);
          const mergedWebsiteData = { ...WEBSITE_DATA, insightsPage: updatedInsightsPage };
          setDetails(mergedWebsiteData as any);
        }
      } catch (error) {
        console.error("Error fetching insights data", error);
      } finally {
        stopLoading();
      }
    };
    
    fetchInsightsData();

    return () => {
      if (isMounted) stopLoading();
      isMounted = false;
    };
  }, [setDetails, startLoading, stopLoading, pathname]);

  return (
    <Box>
      <div data-aos="fade-in">
        <InsightsHeroSection />
      </div>
      <div data-aos="fade-up">
        <InsightsTabSection />
      </div>
    </Box>
  );
};

export default InsightsLayout;
