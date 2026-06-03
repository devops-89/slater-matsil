"use client";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { usePageData } from "@/store/usePageData";
import { useLoading } from "@/components/providers/LoadingProvider";
import { usePathname } from "next/navigation";
import { PageControllers } from "@/api/pageControllers";
import { WEBSITE_DATA } from "@/public/data/website-data";
import MeetPractitioners from "./Meet-Practitioners";
import PracticeGroupSection from "./Practice-Group-Section";
import PracticeGroupsHeroSection from "./Practice-groups-heroSection";

const PracticeGroupsLayout = () => {
  const { setDetails } = usePageData();
  const { startLoading, stopLoading } = useLoading();
  const pathname = usePathname();

  useEffect(() => {
    const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/pages') || pathname.startsWith('/manage-');
    if (isAdminRoute) return;

    let isMounted = true;
    const fetchPracticeGroupsData = async () => {
      try {
        startLoading();

        let practiceGroupsPageId: number | null = null;
        try {
          const allPagesRes = await PageControllers.getAllPublicPages();
          const allPages = allPagesRes.data?.data?.data || allPagesRes.data?.data || [];
          const practiceGroupsPage = allPages.find((p: any) => p.slug === "practice-groups");
          if (practiceGroupsPage) practiceGroupsPageId = practiceGroupsPage.id;
        } catch (e) {
          console.error("Failed to fetch public pages for ID lookup", e);
        }

        let pageData = null;
        if (practiceGroupsPageId) {
          const res = await PageControllers.getPublicPageById(practiceGroupsPageId).catch(e => ({ data: { data: null } }));
          pageData = res.data?.data?.data || res.data?.data;
        }
        
        if (pageData && isMounted) {
          const updatedPracticeGroupPage = require("@/utils/pageDataMapper").mapBackendToPracticeGroupsState(pageData, WEBSITE_DATA.practiceGroupPage);
          const currentDetails = usePageData.getState().details || WEBSITE_DATA;
          setDetails({ ...currentDetails, practiceGroupPage: updatedPracticeGroupPage } as any);

          if (!updatedPracticeGroupPage?.hero_section?.image) {
            stopLoading();
          }
        } else if (isMounted) {
          stopLoading();
        }
      } catch (error) {
        console.error("Error fetching practice groups data", error);
        if (isMounted) stopLoading();
      }
    };
    
    fetchPracticeGroupsData();

    return () => {
      if (isMounted) {
        stopLoading();
      }
      isMounted = false;
    };
  }, [setDetails, startLoading, stopLoading, pathname]);

  return (
    <Box>
      <div data-aos="fade-in">
        <PracticeGroupsHeroSection onImageLoad={stopLoading} />
      </div>
      <div data-aos="fade-up">
        <PracticeGroupSection />
      </div>
    </Box>
  );
};

export default PracticeGroupsLayout;
