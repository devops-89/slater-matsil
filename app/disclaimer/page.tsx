"use client";
import { PageControllers } from "@/api/pageControllers";
import { useLoading } from "@/components/providers/LoadingProvider";
import { WEBSITE_DATA } from "@/public/data/website-data";
import { usePageData } from "@/store/usePageData";
import type { Metadata } from "next";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
export const metadata: Metadata = {
  title: "Slater Matsil | Disclaimer",
  description: "Important legal disclaimers and information regarding the use of the Slater Matsil website.",
};

const Disclaimer = () => {
  const { details, setDetails } = usePageData();
  const { startLoading, stopLoading } = useLoading();
  const pathname = usePathname();

  useEffect(() => {
    const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/pages') || pathname.startsWith('/manage-');
    if (isAdminRoute) return;

    let isMounted = true;
    const fetchDisclaimerData = async () => {
      try {
        startLoading();

        let pageData = null;
        try {
          const res = await PageControllers.getPublicPageById(14).catch(e => ({ data: { data: null } }));
          pageData = res.data?.data?.data || res.data?.data;
        } catch (e) {
          console.error("Failed to fetch public page by ID 14", e);
        }
        
        if (pageData && isMounted) {
          const updatedDisclaimer = require("@/utils/pageDataMapper").mapBackendToLegalPageState(pageData, WEBSITE_DATA.disclaimer, "disclaimer_content");
          const mergedWebsiteData = { ...WEBSITE_DATA, disclaimer: updatedDisclaimer };
          setDetails(mergedWebsiteData as any);
        }
      } catch (error) {
        console.error("Error fetching disclaimer data", error);
      } finally {
        if (isMounted) stopLoading();
      }
    };
    
    fetchDisclaimerData();

    return () => {
      if (isMounted) stopLoading();
      isMounted = false;
    };
  }, [setDetails, startLoading, stopLoading, pathname]);

  const data = details?.disclaimer;

  if (!data) return null;

};

export default Disclaimer;
