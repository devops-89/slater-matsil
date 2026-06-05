"use client";
import React from "react";
import HeroServicesSection from "./Hero-services-section";
import WhyChooseUs from "./Why-Choose-Us";
import UnParalleledLegalService from "./Unparalleled-legal-services";
import OurserviceFramework from "./Our-service-framework";
import ServiceAreas from "@/components/widgets/Service-Areas";
import NeedAssistance from "./Need-Assistance";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { PageControllers } from "@/api/pageControllers";
import { useLoading } from "@/components/providers/LoadingProvider";
import { WEBSITE_DATA } from "@/public/data/website-data";
import { mapBackendToServicesPageState } from "@/utils/pageDataMapper";
import { usePageData } from "@/store/usePageData";

const ServicesLayout = () => {
  const { details, setDetails } = usePageData();
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
          const currentDetails = usePageData.getState().details || WEBSITE_DATA;
          const mergedWebsiteData = {
            ...currentDetails, // Preserve other state
            servicesPage: newServicesPage,
            homepage: {
              ...currentDetails.homepage, // Preserve homepage state
              service_area: newServiceArea
            }
          };
          setDetails(mergedWebsiteData as any);

          if (!newServicesPage?.heroSection?.img) {
            stopLoading();
          }
        } else if (isMounted) {
          stopLoading();
        }
      } catch (error) {
        console.error("Error fetching services page data", error);
      } finally {
        if (isMounted) stopLoading();
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
      <div data-aos="fade-in" suppressHydrationWarning>
        <HeroServicesSection />
      </div>
      <div data-aos="fade-up" suppressHydrationWarning>
        <WhyChooseUs />
      </div>
      <div data-aos="fade-up" suppressHydrationWarning>
        <UnParalleledLegalService />
      </div>
      <div data-aos="fade-up" suppressHydrationWarning>
        <OurserviceFramework />
      </div>
      <ServiceAreas data={details?.homepage?.service_area?.section_Data} />
      <div data-aos="zoom-in">
        <NeedAssistance />
      </div>
    </div>
  );
};

export default ServicesLayout;
