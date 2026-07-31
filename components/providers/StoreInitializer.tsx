"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePageData } from "@/store/usePageData";
import { WEBSITE_DATA } from "@/public/data/website-data";
import { getUpdatedDetails } from "@/utils/storeUpdater";

type StoreInitializerProps = {
  pageType: "home" | "about" | "professionals" | "insights" | "services" | "leadership" | "practiceGroups" | "careers" | "blogs" | "contact" | "who-we-serve";
  apiData: any;
};

// Keep track of whether the client has done its first initial load
let isClientInitialized = false;

export default function StoreInitializer({ pageType, apiData }: StoreInitializerProps) {
  const initialized = useRef(false);
  
  // SSR execution
  if (!initialized.current) {
    if (typeof window === 'undefined') {
      usePageData.setState({ details: getUpdatedDetails(pageType, apiData) });
    }
    initialized.current = true;
  }

  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? (
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PAGE_TYPE__ = "${pageType}"; window.__API_DATA__ = ${JSON.stringify(apiData || null).replace(/</g, '\\u003c')};`
          }}
        />
      ) : null}
    </div>
  );
}
