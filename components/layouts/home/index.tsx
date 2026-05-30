"use client";

import InsightsSection from "../../widgets/Insights-section";
import ServiceAreas from "../../widgets/Service-Areas";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import HeroSection3 from "./HeroSection3";
import MetricsSection from "./MetricsSection";
import Whoweserve from "./Who-We-Serve";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { PageControllers } from "@/api/pageControllers";
import { mapBackendToHomepageState } from "@/utils/pageDataMapper";
import { WEBSITE_DATA } from "@/public/data/website-data";
import { usePageData } from "@/store/usePageData";
import { useLoading } from "@/components/providers/LoadingProvider";

const HomeLayout = () => {
  const { setDetails } = usePageData();
  const { startLoading, stopLoading } = useLoading();

  const pathname = usePathname();
  const hasFetched = useRef(false);

  useEffect(() => {
    const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/pages') || pathname.startsWith('/manage-');
    if (isAdminRoute) return;
    if (hasFetched.current) return;
    hasFetched.current = true;

    let isMounted = true;
    const fetchHomeData = async () => {
      try {
        startLoading();
        const res = await PageControllers.getPublicPageById(1);
        const pageData = res.data?.data?.data || res.data?.data;
        if (pageData && isMounted) {
          const updatedHomepage = mapBackendToHomepageState(pageData, WEBSITE_DATA.homepage);
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
    <div>
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
    </div>
  );
};

export default HomeLayout;
