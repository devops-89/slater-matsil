"use client";
import CareerLayout from "@/components/layouts/career-layout";
import React, { useEffect } from "react";
import { usePageData } from "@/store/usePageData";
import { useLoading } from "@/components/providers/LoadingProvider";
import { usePathname } from "next/navigation";
import { PageControllers } from "@/api/pageControllers";
import { WEBSITE_DATA } from "@/public/data/website-data";

const Career = () => {
  const { setDetails } = usePageData();
  const { startLoading, stopLoading } = useLoading();
  const pathname = usePathname();

  useEffect(() => {
    const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/pages') || pathname.startsWith('/manage-');
    if (isAdminRoute) return;

    let isMounted = true;
    const fetchCareersData = async () => {
      try {
        startLoading();

        let pageData = null;
        try {
          const res = await PageControllers.getPublicPageById(9).catch(e => ({ data: { data: null } }));
          pageData = res.data?.data?.data || res.data?.data;
        } catch (e) {
          console.error("Failed to fetch public page by ID 9", e);
        }
        
        if (pageData && isMounted) {
          const updatedCareersPage = require("@/utils/pageDataMapper").mapBackendToCareersState(pageData, WEBSITE_DATA.careerPage);
          const currentDetails = usePageData.getState().details || WEBSITE_DATA;
          setDetails({ ...currentDetails, careerPage: updatedCareersPage } as any);

          if (!updatedCareersPage?.heroSection?.img) {
            stopLoading();
          }
        } else if (isMounted) {
          stopLoading();
        }
      } catch (error) {
        console.error("Error fetching careers data", error);
        if (isMounted) stopLoading();
      }
    };
    
    fetchCareersData();

    return () => {
      if (isMounted) stopLoading();
      isMounted = false;
    };
  }, [setDetails, startLoading, stopLoading, pathname]);

  return (
    <div>
      <CareerLayout onImageLoad={stopLoading} />
    </div>
  );
};

export default Career;
