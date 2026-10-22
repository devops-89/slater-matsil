import InsightsLayout from "@/components/layouts/insights-layout/Index";
import StoreInitializer from "@/components/providers/StoreInitializer";
import type { Metadata } from "next";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Slater Matsil | Insights",
  description: "Read our latest articles, news, and insights on patent law, intellectual property trends, and legal updates.",
};

async function getInsightsData() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/api/pages/7`, { cache: "no-store" }).catch(() => null);
    const data = res ? await res.json().catch(() => null) : null;
    return { data7: data?.data?.data || data?.data };
  } catch (error) {
    return { data7: null };
  }
}

const Insights = async () => {
  const apiData = await getInsightsData();
  return (
    <>
      <StoreInitializer pageType="insights" apiData={apiData} />
      <InsightsLayout apiData={apiData} />
    </>
  );
};

export default Insights;
