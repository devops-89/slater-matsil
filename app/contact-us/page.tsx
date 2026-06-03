"use client";
import ContactLayout from "@/components/layouts/contact-layout";
import React, { useEffect } from "react";
import { usePageData } from "@/store/usePageData";
import { useLoading } from "@/components/providers/LoadingProvider";
import { usePathname } from "next/navigation";
import { PageControllers } from "@/api/pageControllers";
import { WEBSITE_DATA } from "@/public/data/website-data";

const ContactUs = () => {
  const { setDetails } = usePageData();
  const { startLoading, stopLoading } = useLoading();
  const pathname = usePathname();

  useEffect(() => {
    const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/pages') || pathname.startsWith('/manage-');
    if (isAdminRoute) return;

    let isMounted = true;
    const fetchContactData = async () => {
      try {
        startLoading();

        let pageData = null;
        try {
          const res = await PageControllers.getPublicPageById(10).catch(e => ({ data: { data: null } }));
          pageData = res.data?.data?.data || res.data?.data;
        } catch (e) {
          console.error("Failed to fetch public page by ID 10", e);
        }
        
        if (pageData && isMounted) {
          const updatedContactPage = require("@/utils/pageDataMapper").mapBackendToContactState(pageData, WEBSITE_DATA.contactPage);
          const currentDetails = usePageData.getState().details || WEBSITE_DATA;
          setDetails({ ...currentDetails, contactPage: updatedContactPage } as any);

          if (!updatedContactPage?.heroSection?.img) {
            stopLoading();
          }
        } else if (isMounted) {
          stopLoading();
        }
      } catch (error) {
        console.error("Error fetching contact data", error);
        if (isMounted) stopLoading();
      }
    };
    
    fetchContactData();

    return () => {
      if (isMounted) stopLoading();
      isMounted = false;
    };
  }, [setDetails, startLoading, stopLoading, pathname]);

  return (
    <div>
      <ContactLayout onImageLoad={stopLoading} />
    </div>
  );
};

export default ContactUs;
