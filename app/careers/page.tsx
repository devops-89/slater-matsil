import type { Metadata } from "next";
import CareerLayout from "@/components/layouts/career-layout";
import StoreInitializer from "@/components/providers/StoreInitializer";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Slater Matsil | Careers",
  description: "Join our team of experienced intellectual property attorneys, patent agents, and technical specialists.",
};

async function getCareersData() {
  try {
    const res = await fetch("http://3.92.74.11/api/pages/9", { next: { revalidate: 60 } }).catch(() => null);
    const data = res ? await res.json() : null;
    return { data9: data?.data?.data || data?.data };
  } catch (error) {
    return { data9: null };
  }
}

export default async function Page() {
  const apiData = await getCareersData();
  
  return (
    <>
      <StoreInitializer pageType="careers" apiData={apiData} />
      <CareerLayout apiData={apiData} />
    </>
  );
}
