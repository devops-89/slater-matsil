"use client";
import React, { useEffect, useState } from "react";
import ServicesDetailsHeroSection from "./Services-Details-Hero-Section";
import QuickLinksDetails from "./Quick-Links-Details";
import ServiceAreas from "@/components/widgets/Service-Areas";
import { usePathname } from "next/navigation";
import { PageControllers } from "@/api/pageControllers";
import { useLoading } from "@/components/providers/LoadingProvider";
import { WEBSITE_DATA } from "@/public/data/website-data";
import { mapBackendToServicesPageState } from "@/utils/pageDataMapper";
import { usePageData } from "@/store/usePageData";
import { getUpdatedDetails } from "@/utils/storeUpdater";

interface ServicesDetailsLayoutProps {
  slug?: string;
  apiData?: any;
}

const ServicesDetailsLayout = ({ slug, apiData }: ServicesDetailsLayoutProps) => {
  const { details, setDetails } = usePageData();
  const { startLoading, stopLoading } = useLoading();
  const pathname = usePathname();
  const [pageData, setPageData] = useState<any>(apiData?.data3 || null);

  // If initial apiData was passed from SSR, update state & store immediately
  useEffect(() => {
    if (apiData?.data3) {
      setPageData(apiData.data3);
      const updated = getUpdatedDetails("services", apiData);
      setDetails(updated as any);
    }
  }, [apiData, setDetails]);

  // Always fetch fresh /api/pages/3 when on details page or when slug changes
  useEffect(() => {
    const isAdminRoute =
      pathname.startsWith("/admin") ||
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/pages") ||
      pathname.startsWith("/manage-");
    if (isAdminRoute) return;

    let isMounted = true;
    const fetchServicesData = async () => {
      try {
        startLoading();
        const res = await PageControllers.getPublicPageById(3);
        const fetchedData = res.data?.data?.data || res.data?.data;
        if (fetchedData && isMounted) {
          setPageData(fetchedData);
          const { newServicesPage, newServiceArea } =
            mapBackendToServicesPageState(
              fetchedData,
              WEBSITE_DATA.servicesPage,
              WEBSITE_DATA.homepage.service_area,
            );
          const mergedWebsiteData = {
            ...WEBSITE_DATA,
            servicesPage: newServicesPage,
            homepage: {
              ...WEBSITE_DATA.homepage,
              service_area: newServiceArea,
            },
          };
          setDetails(mergedWebsiteData as any);
        }
      } catch (error) {
        console.error("Error fetching services details page data from pages/3", error);
      } finally {
        if (isMounted) {
          stopLoading();
        }
      }
    };

    fetchServicesData();

    return () => {
      isMounted = false;
      stopLoading();
    };
  }, [slug, pathname, setDetails, startLoading, stopLoading]);

  // Extract service areas list from fresh pageData if available
  const serviceAreasSection = pageData?.sections?.find((s: any) => s.sectionKey === "service_areas");
  const displayServiceAreas = serviceAreasSection?.data?.section_Data || details?.homepage?.service_area?.section_Data;

  return (
    <div>
      <ServicesDetailsHeroSection apiData={apiData} pageData={pageData} slug={slug} />
      <QuickLinksDetails pageData={pageData} slug={slug} />
      <ServiceAreas data={displayServiceAreas} />
    </div>
  );
};

export default ServicesDetailsLayout;
