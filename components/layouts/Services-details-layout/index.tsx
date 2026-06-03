"use client";
import React, { useEffect } from "react";
import ServicesDetailsHeroSection from "./Services-Details-Hero-Section";
import QuickLinksDetails from "./Quick-Links-Details";
import ServiceAreas from "@/components/widgets/Service-Areas";
import { usePathname } from "next/navigation";
import { PageControllers } from "@/api/pageControllers";
import { useLoading } from "@/components/providers/LoadingProvider";
import { WEBSITE_DATA } from "@/public/data/website-data";
import { mapBackendToServicesPageState } from "@/utils/pageDataMapper";
import { usePageData } from "@/store/usePageData";

const ServicesDetailsLayout = () => {
  const { setDetails } = usePageData();
  const { startLoading, stopLoading } = useLoading();
  const pathname = usePathname();

  useEffect(() => {
    const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/pages') || pathname.startsWith('/manage-');
    if (isAdminRoute) return;

    let isMounted = true;
    const fetchServicesData = async () => {
      try {
        startLoading();
        const res = await PageControllers.getPublicPageById(3);
        const pageData = res.data?.data?.data || res.data?.data;
        if (pageData && isMounted) {
          const { newServicesPage, newServiceArea } = mapBackendToServicesPageState(pageData, WEBSITE_DATA.servicesPage, WEBSITE_DATA.homepage.service_area);
          const mergedWebsiteData = {
            ...WEBSITE_DATA,
            servicesPage: newServicesPage,
            homepage: {
              ...WEBSITE_DATA.homepage,
              service_area: newServiceArea
            }
          };
          setDetails(mergedWebsiteData as any);
        }
      } catch (error) {
        console.error("Error fetching services details page data", error);
      } finally {
        stopLoading();
      }
    };
    
    fetchServicesData();

    return () => {
      if (isMounted) {
        stopLoading();
      }
      isMounted = false; 
    };
  }, [setDetails, startLoading, stopLoading, pathname]);

  return (
    <div>
      <ServicesDetailsHeroSection />
      <QuickLinksDetails />
      <ServiceAreas />
    </div>
  );
};

export default ServicesDetailsLayout;
