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
    // Data is now fetched server-side in page.tsx and populated via StoreInitializer.
    // No need to fetch client-side or trigger global loaders anymore!
  }, [pathname]);

  return (
    <Box>
      <div data-aos="fade-in">
        <PracticeGroupsHeroSection />
      </div>
      <div data-aos="fade-up">
        <PracticeGroupSection />
      </div>
    </Box>
  );
};

export default PracticeGroupsLayout;
