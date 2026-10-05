"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePageData } from "@/store/usePageData";
import { getUpdatedDetails } from "@/utils/storeUpdater";

type StoreInitializerProps = {
  pageType:
    | "home"
    | "about"
    | "professionals"
    | "insights"
    | "services"
    | "leadership"
    | "practiceGroups"
    | "careers"
    | "blogs"
    | "contact"
    | "who-we-serve";
  apiData: Record<string, unknown> | null | undefined;
};

interface WindowWithApiData extends Window {
  __PAGE_TYPE__?: string;
  __API_DATA__?: Record<string, unknown> | null;
}

// Refetch fresh API data from backend to ensure S3 presigned URLs are updated
const fetchFreshPageData = async (
  pageType: StoreInitializerProps["pageType"]
) => {
  try {
    let freshApiData: Record<string, unknown> | null = null;
    if (pageType === "home") {
      const [res1, res3] = await Promise.all([
        fetch("/backend-api/pages/1", { cache: "no-store" }).catch(() => null),
        fetch("/backend-api/pages/3", { cache: "no-store" }).catch(() => null),
      ]);
      const data1 = res1 ? await res1.json().catch(() => null) : null;
      const data3 = res3 ? await res3.json().catch(() => null) : null;
      freshApiData = {
        data1: data1?.data?.data || data1?.data,
        data3: data3?.data?.data || data3?.data,
      };
    } else {
      const pageIdMap: Record<string, number> = {
        about: 2,
        services: 3,
        practiceGroups: 4,
        professionals: 5,
        leadership: 6,
        insights: 7,
        blogs: 8,
        careers: 9,
        contact: 10,
        "who-we-serve": 11,
      };
      const pageId = pageIdMap[pageType];
      if (pageId) {
        const res = await fetch(`/backend-api/pages/${pageId}`, {
          cache: "no-store",
        }).catch(() => null);
        const data = res ? await res.json().catch(() => null) : null;
        const pageData = data?.data?.data || data?.data;

        if (pageType === "professionals") {
          const profsRes = await fetch(
            "/backend-api/users/all?role=PROFESSIONAL&limit=6&page=1",
            { cache: "no-store" }
          ).catch(() => null);
          const profsData = profsRes
            ? await profsRes.json().catch(() => null)
            : null;
          freshApiData = {
            data5: pageData,
            initialProfessionals:
              profsData?.data?.data?.users || profsData?.data?.users || [],
            initialTotal:
              profsData?.data?.data?.meta?.total ||
              profsData?.data?.meta?.total ||
              0,
          };
        } else {
          const key = `data${pageId}`;
          freshApiData = { [key]: pageData };
        }
      }
    }

    if (freshApiData) {
      usePageData.setState({
        details: getUpdatedDetails(pageType, freshApiData),
      });
      if (typeof window !== "undefined") {
        (window as WindowWithApiData).__API_DATA__ = freshApiData;
      }
    }
  } catch (error) {
    console.error("Auto-refetch error:", error);
  }
};

export default function StoreInitializer({
  pageType,
  apiData,
}: StoreInitializerProps) {
  const initialized = useRef(false);

  if (!initialized.current) {
    if (typeof window === "undefined") {
      usePageData.setState({ details: getUpdatedDetails(pageType, apiData) });
    }
    initialized.current = true;
  }

  useLayoutEffect(() => {
    usePageData.setState({ details: getUpdatedDetails(pageType, apiData) });
    (window as WindowWithApiData).__PAGE_TYPE__ = pageType;
    (window as WindowWithApiData).__API_DATA__ = apiData;
  }, [pageType, apiData]);

  useEffect(() => {
    // Refetch on tab focus or when tab becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchFreshPageData(pageType);
      }
    };

    // Auto refetch every 8 minutes to keep AWS S3 presigned URLs fresh
    const interval = setInterval(
      () => {
        fetchFreshPageData(pageType);
      },
      8 * 60 * 1000
    );

    window.addEventListener("focus", handleVisibilityChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleVisibilityChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [pageType]);

  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html:
          typeof window === "undefined"
            ? `<script>window.__PAGE_TYPE__ = "${pageType}"; window.__API_DATA__ = ${JSON.stringify(apiData || null).replace(/</g, "\\u003c")};</script>`
            : "",
      }}
    />
  );
}
