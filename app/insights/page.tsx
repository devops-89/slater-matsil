import type { Metadata } from "next";
import InsightsLayout from "@/components/layouts/insights-layout/Index";
import React from "react";
import StoreInitializer from "@/components/providers/StoreInitializer";
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Slater Matsil | Insights",
  description: "Read our latest articles, news, and insights on patent law, intellectual property trends, and legal updates.",
};

async function getInsightsData() {
  try {
    const res = await fetch("http://3.92.74.11/api/pages/7", { next: { revalidate: 60 } }).catch(() => null);
    const data = res ? await res.json() : null;
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
      <InsightsLayout />
    </>
  );
};

export default Insights;