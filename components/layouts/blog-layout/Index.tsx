"use client";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import InsightsHeroSection from "../insights-layout/Insisghts-hero-section";
import BlogSection from "./Blog-section";
import { usePageData } from "@/store/usePageData";
import { useLoading } from "@/components/providers/LoadingProvider";
import { usePathname } from "next/navigation";
import { PageControllers } from "@/api/pageControllers";
import { WEBSITE_DATA } from "@/public/data/website-data";

const BlogLayout = () => {
  const { setDetails } = usePageData();
  const { startLoading, stopLoading } = useLoading();
  const pathname = usePathname();

  useEffect(() => {
    const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/pages') || pathname.startsWith('/manage-');
    if (isAdminRoute) return;

    let isMounted = true;
    const fetchBlogData = async () => {
      try {
        startLoading();

        let pageData = null;
        try {
          const res = await PageControllers.getPublicPageById(8).catch(e => ({ data: { data: null } }));
          pageData = res.data?.data?.data || res.data?.data;
        } catch (e) {
          console.error("Failed to fetch public page by ID 8", e);
        }
        
        if (pageData && isMounted) {
          const updatedBlogsPage = require("@/utils/pageDataMapper").mapBackendToBlogsState(pageData, WEBSITE_DATA.insightsPage);
          const mergedWebsiteData = { ...WEBSITE_DATA, insightsPage: updatedBlogsPage };
          setDetails(mergedWebsiteData as any);
        }
      } catch (error) {
        console.error("Error fetching blogs data", error);
      } finally {
        stopLoading();
      }
    };
    
    fetchBlogData();

    return () => {
      if (isMounted) stopLoading();
      isMounted = false;
    };
  }, [pathname, setDetails, startLoading, stopLoading]);

  return (
    <Box>
      <InsightsHeroSection />
      <BlogSection />
    </Box>
  );
};

export default BlogLayout;
