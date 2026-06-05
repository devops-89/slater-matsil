"use client";

import { PageControllers } from "@/api/pageControllers";
import { useLoading } from "@/components/providers/LoadingProvider";
import { WEBSITE_DATA } from "@/public/data/website-data";
import { usePageData } from "@/store/usePageData";
import { mapBackendToHomepageState } from "@/utils/pageDataMapper";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import InsightsSection from "../../widgets/Insights-section";
import ServiceAreas from "../../widgets/Service-Areas";
import AboutSection from "./AboutSection";
import { Box } from "@mui/material";
import ContactSection from "./ContactSection";
import HeroSection3 from "./HeroSection3";
import MetricsSection from "./MetricsSection";
import Whoweserve from "./Who-We-Serve";

const HomeLayout = () => {
  const { setDetails } = usePageData();
  const { startLoading, stopLoading } = useLoading();

  const pathname = usePathname();
  const hasFetched = useRef(false);

  useEffect(() => {
    const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/pages') || pathname.startsWith('/manage-');
    if (isAdminRoute) return;

    let isMounted = true;
    const fetchHomeData = async () => {
      try {
        startLoading();

        const [res1, res3] = await Promise.all([
          PageControllers.getPublicPageById(1).catch(e => ({ data: { data: null } })),
          PageControllers.getPublicPageById(3).catch(e => ({ data: { data: null } }))
        ]);

        const pageData1 = res1.data?.data?.data || res1.data?.data;
        const pageData3 = res3.data?.data?.data || res3.data?.data;

        if (isMounted) {
          let updatedHomepage = WEBSITE_DATA.homepage;
          if (pageData1) {
            updatedHomepage = mapBackendToHomepageState(pageData1, updatedHomepage);
          }
          if (pageData3) {
            const { newServiceArea } = require("@/utils/pageDataMapper").mapBackendToServicesPageState(pageData3, WEBSITE_DATA.servicesPage, updatedHomepage.service_area);
            updatedHomepage.service_area = newServiceArea;
          }
          const mergedWebsiteData = { ...WEBSITE_DATA, homepage: updatedHomepage };
          setDetails(mergedWebsiteData as any);
        }
      } catch (error) {
        console.error("Error fetching home page data", error);
      } finally {
        if (isMounted) stopLoading();
      }
    };
    
    fetchHomeData();

    return () => {
      if (isMounted) {
        // If unmounted before fetch finishes, we didn't stop loading
        stopLoading();
      }
      isMounted = false; 
    };
  }, [setDetails, startLoading, stopLoading, pathname]);

  return (
    <Box sx={{ overflowX: "hidden", width: "100%" }}>
      {/* <HeroSection /> */}
      {/* <HeroSection2 /> */}
      {/* <SliderHeroSection /> */}
      <HeroSection3 />
      <AboutSection />
      <MetricsSection />
      <ServiceAreas limit={6} />
      <Whoweserve />
      <InsightsSection />
      <ContactSection />
    </Box>
  );
};

export default HomeLayout;
