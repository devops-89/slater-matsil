import type { Metadata } from "next";
import ClientPage from "./ClientPage";
import StoreInitializer from "@/components/providers/StoreInitializer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Slater Matsil | Firm Leadership",
  description:
    "Meet the experienced leadership team and partners guiding our boutique intellectual property law practice.",
};

async function getLeadershipData() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/api/pages/6`, { cache: "no-store" }).catch(() => null);
    const data = res ? await res.json().catch(() => null) : null;
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
