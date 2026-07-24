"use client";
import { PageControllers } from "@/api/pageControllers";
import ContactLayout from "@/components/layouts/contact-layout";
import { useLoading } from "@/components/providers/LoadingProvider";
import { WEBSITE_DATA } from "@/public/data/website-data";
import { usePageData } from "@/store/usePageData";
import { usePathname } from "next/navigation";
import { useEffect } from "react";



const ContactUs = () => {
  const { setDetails } = usePageData();
  const { startLoading, stopLoading } = useLoading();
  const pathname = usePathname();

  useEffect(() => {
    // Data is now fetched via SSR in page.tsx and initialized via StoreInitializer
  }, []);

  return (
    <div>
      <ContactLayout />
    </div>
  );
};

export default ContactUs;
