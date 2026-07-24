"use client";
import { PageControllers } from "@/api/pageControllers";
import CareerLayout from "@/components/layouts/career-layout";
import { useLoading } from "@/components/providers/LoadingProvider";
import { WEBSITE_DATA } from "@/public/data/website-data";
import { usePageData } from "@/store/usePageData";
import { usePathname } from "next/navigation";
import { useEffect } from "react";



const Career = () => {
  const { setDetails } = usePageData();
  const { startLoading, stopLoading } = useLoading();
  const pathname = usePathname();

  useEffect(() => {
    // Data is now fetched via SSR in page.tsx and initialized via StoreInitializer
  }, [setDetails, pathname]);

  return (
    <div>
      <CareerLayout />
    </div>
  );
};

export default Career;
