"use client";
import ProfessionalsLayout from "@/components/layouts/professionals-layout/Index";
import React, { useEffect } from "react";
import { usePageData } from "@/store/usePageData";
import { useLoading } from "@/components/providers/LoadingProvider";
import { usePathname } from "next/navigation";
import { PageControllers } from "@/api/pageControllers";
import { WEBSITE_DATA } from "@/public/data/website-data";

const FirmProfessionals = () => {
  const { setDetails } = usePageData();
  const { startLoading, stopLoading } = useLoading();
  const pathname = usePathname();

  useEffect(() => {
    const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/pages') || pathname.startsWith('/manage-');
    if (isAdminRoute) return;

    let isMounted = true;
    const fetchPageData = async () => {
      try {
        startLoading();

        let pageData = null;
        try {
          const res = await PageControllers.getPublicPageById(5).catch(e => ({ data: { data: null } }));
          pageData = res.data?.data?.data || res.data?.data;
        } catch (e) {
          console.error("Failed to fetch public page by ID 5", e);
        }
        
        if (pageData && isMounted) {
          const updatedPage = require("@/utils/pageDataMapper").mapBackendToFirmProfessionalsState(pageData, WEBSITE_DATA.firm_professionals);
          const mergedWebsiteData = { ...WEBSITE_DATA, firm_professionals: updatedPage };
          setDetails(mergedWebsiteData as any);
        }
      } catch (error) {
        console.error("Error fetching Firm Professionals data", error);
      } finally {
        if (isMounted) stopLoading();
      }
    };
    
    fetchPageData();

    return () => {
      if (isMounted) stopLoading();
      isMounted = false;
    };
  }, [setDetails, startLoading, stopLoading, pathname]);

  return (
    <div>
      <ProfessionalsLayout />
    </div>
  );
};

export default FirmProfessionals;
