"use client";
import { PageControllers } from "@/api/pageControllers";
import { useLoading } from "@/components/providers/LoadingProvider";
import { WEBSITE_DATA } from "@/public/data/website-data";
import { usePageData } from "@/store/usePageData";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import TermsLayout from "@/components/layouts/terms-layout";


const TermsOfUse = () => {
  const { details, setDetails } = usePageData();
  const { startLoading, stopLoading } = useLoading();
  const pathname = usePathname();

  useEffect(() => {
    const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/pages') || pathname.startsWith('/manage-');
    if (isAdminRoute) return;

    let isMounted = true;
    const fetchTermsOfUseData = async () => {
      try {
        startLoading();

        let pageData = null;
        try {
          const res = await PageControllers.getPublicPageById(13).catch(e => ({ data: { data: null } }));
          pageData = res.data?.data?.data || res.data?.data;
        } catch (e) {
          console.error("Failed to fetch public page by ID 13", e);
        }
        
        if (pageData && isMounted) {
          const updatedTermsOfUse = require("@/utils/pageDataMapper").mapBackendToLegalPageState(pageData, WEBSITE_DATA.termsOfUse, "termsOfUse_content");
          const mergedWebsiteData = { ...WEBSITE_DATA, termsOfUse: updatedTermsOfUse };
          setDetails(mergedWebsiteData as any);
        }
      } catch (error) {
        console.error("Error fetching terms of use data", error);
      } finally {
        if (isMounted) stopLoading();
      }
    };
    
    fetchTermsOfUseData();

    return () => {
      if (isMounted) stopLoading();
      isMounted = false;
    };
  }, [setDetails, startLoading, stopLoading, pathname]);

  const data = details?.termsOfUse;

  if (!data) return null;

  return (
    <div>
      <TermsLayout />
    </div>
  );
};

export default TermsOfUse;
