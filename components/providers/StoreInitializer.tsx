"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePageData } from "@/store/usePageData";
import { WEBSITE_DATA } from "@/public/data/website-data";
import { getUpdatedDetails } from "@/utils/storeUpdater";
import Script from "next/script";

type StoreInitializerProps = {
  pageType: "home" | "about" | "professionals" | "insights" | "services" | "leadership" | "practiceGroups" | "careers" | "blogs" | "contact" | "who-we-serve";
  apiData: any;
};

// Keep track of whether the client has done its first initial load
let isClientInitialized = false;

export default function StoreInitializer({ pageType, apiData }: StoreInitializerProps) {
  const initialized = useRef(false);
  
  if (!initialized.current) {
    if (typeof window === 'undefined') {
      usePageData.setState({ details: getUpdatedDetails(pageType, apiData) });
    }
    initialized.current = true;
  }

  useLayoutEffect(() => {
    usePageData.setState({ details: getUpdatedDetails(pageType, apiData) });
    (window as any).__PAGE_TYPE__ = pageType;
    (window as any).__API_DATA__ = apiData;
  }, [pageType, apiData]);

  return (
    <div 
      suppressHydrationWarning 
      dangerouslySetInnerHTML={{
        __html: typeof window === 'undefined' ? `<script>window.__PAGE_TYPE__ = "${pageType}"; window.__API_DATA__ = ${JSON.stringify(apiData || null).replace(/</g, '\\u003c')};</script>` : ""
      }}
    />
  );
}
