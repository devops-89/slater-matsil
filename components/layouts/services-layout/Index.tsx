"use client";
import React from "react";
import HeroServicesSection from "./Hero-services-section";
import dynamic from "next/dynamic";

const WhyChooseUs = dynamic(() => import("./Why-Choose-Us"), { ssr: true });
const UnParalleledLegalService = dynamic(() => import("./Unparalleled-legal-services"), { ssr: true });
const OurserviceFramework = dynamic(() => import("./Our-service-framework"), { ssr: true });
const ServiceAreas = dynamic(() => import("@/components/widgets/Service-Areas"), { ssr: true });
const NeedAssistance = dynamic(() => import("./Need-Assistance"), { ssr: true });
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
    // Data is now fetched server-side in page.tsx and populated via StoreInitializer.
    // No need to fetch client-side or trigger global loaders anymore!
  }, [pathname]);

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
