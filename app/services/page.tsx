import ServicesLayout from "@/components/layouts/services-layout/Index";
import StoreInitializer from "@/components/providers/StoreInitializer";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Slater Matsil | Services",
  description: "Explore our intellectual property services, including patent prosecution, litigation support, portfolio management, and strategic counseling.",
};

async function getServicesData() {
  try {
    const res = await fetch("http://3.92.74.11/api/pages/3", { cache: "no-store" }).catch(() => null);
    const data = res ? await res.json().catch(() => null) : null;
    return { data3: data?.data?.data || data?.data };
  } catch (error) {
    return { data3: null };
  }
}

const Services = async () => {
  const apiData = await getServicesData();
  return (
    <>
      <StoreInitializer pageType="services" apiData={apiData} />
      <ServicesLayout apiData={apiData} />
    </>
  );
};

export default Services;
