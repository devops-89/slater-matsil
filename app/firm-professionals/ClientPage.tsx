"use client";
import { PageControllers } from "@/api/pageControllers";
import ProfessionalsLayout from "@/components/layouts/professionals-layout/Index";
import { useLoading } from "@/components/providers/LoadingProvider";
import { WEBSITE_DATA } from "@/public/data/website-data";
import { usePageData } from "@/store/usePageData";
import { usePathname } from "next/navigation";
import { useEffect } from "react";



const FirmProfessionals = () => {
  const { setDetails } = usePageData();
  const { startLoading, stopLoading } = useLoading();
  const pathname = usePathname();

  useEffect(() => {
    // Data is now fetched server-side in page.tsx and populated via StoreInitializer.
    // No need to fetch client-side or trigger global loaders anymore!
  }, [pathname]);

  return (
    <div>
      <ProfessionalsLayout />
    </div>
  );
};

export default FirmProfessionals;
