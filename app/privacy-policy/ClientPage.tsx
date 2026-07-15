"use client";
import { PageControllers } from "@/api/pageControllers";
import { useLoading } from "@/components/providers/LoadingProvider";
import { WEBSITE_DATA } from "@/public/data/website-data";
import { usePageData } from "@/store/usePageData";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import PrivacyLayout from "@/components/layouts/privacy-layout";


const PrivacyPolicyPage = () => {
  const { details, setDetails } = usePageData();
  const { startLoading, stopLoading } = useLoading();
  const pathname = usePathname();

  useEffect(() => {
    const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/pages') || pathname.startsWith('/manage-');
    if (isAdminRoute) return;

    let isMounted = true;
    const fetchPrivacyPolicyData = async () => {
      try {
        startLoading();

        let pageData = null;
        try {
          const res = await PageControllers.getPublicPageById(12).catch(e => ({ data: { data: null } }));
          pageData = res.data?.data?.data || res.data?.data;
        } catch (e) {
          console.error("Failed to fetch public page by ID 12", e);
        }
        
        if (pageData && isMounted) {
          const updatedPrivacyPolicy = require("@/utils/pageDataMapper").mapBackendToLegalPageState(pageData, WEBSITE_DATA.privacyPolicy, "privacyPolicy_content");
          const mergedWebsiteData = { ...WEBSITE_DATA, privacyPolicy: updatedPrivacyPolicy };
          setDetails(mergedWebsiteData as any);
        }
      } catch (error) {
        console.error("Error fetching privacy policy data", error);
      } finally {
        if (isMounted) stopLoading();
      }
    };
    
    fetchPrivacyPolicyData();

    return () => {
      if (isMounted) stopLoading();
      isMounted = false;
    };
  }, [setDetails, startLoading, stopLoading, pathname]);

  const data = details?.privacyPolicy;

  if (!data) return null;

  return (
    <div>
      <PrivacyLayout />
    </div>
  );
};

export default PrivacyPolicyPage;