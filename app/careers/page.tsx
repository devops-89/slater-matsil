import type { Metadata } from "next";
import CareerLayout from "@/components/layouts/career-layout";
import StoreInitializer from "@/components/providers/StoreInitializer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Slater Matsil | Careers",
  description: "Join our team of experienced intellectual property attorneys, patent agents, and technical specialists.",
};

async function getCareersData() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/api/pages/9`, { cache: "no-store" }).catch(() => null);
    const data = res ? await res.json().catch(() => null) : null;
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
