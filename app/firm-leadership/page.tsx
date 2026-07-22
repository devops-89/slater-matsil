import type { Metadata } from "next";
import ClientPage from "./ClientPage";
import StoreInitializer from "@/components/providers/StoreInitializer";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Slater Matsil | Firm Leadership",
  description:
    "Meet the experienced leadership team and partners guiding our boutique intellectual property law practice.",
};

async function getLeadershipData() {
  try {
    const res = await fetch("http://3.92.74.11/api/pages/6", { next: { revalidate: 60 } }).catch(() => null);
    const data = res ? await res.json() : null;
    return { data6: data?.data?.data || data?.data };
  } catch (error) {
    return { data6: null };
  }
}

export default async function Page() {
  const apiData = await getLeadershipData();
  return (
    <>
      <StoreInitializer pageType="leadership" apiData={apiData} />
      <ClientPage />
    </>
  );
}
