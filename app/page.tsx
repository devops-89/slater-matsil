import type { Metadata } from "next";
import HomeLayout from "../components/layouts/home";
import StoreInitializer from "../components/providers/StoreInitializer";
import { WEBSITE_DATA } from "@/public/data/website-data";
import { mapBackendToHomepageState } from "@/utils/pageDataMapper";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Slater Matsil | Intellectual Property Law Firm",
  description: "Slater Matsil is a premier intellectual property law firm specializing in patent prosecution, litigation, and strategic counseling.",
};

async function getHomeData() {
  try {
    const [res1, res3] = await Promise.all([
      fetch("http://3.92.74.11/api/pages/1", { cache: "no-store" }).catch(() => null),
      fetch("http://3.92.74.11/api/pages/3", { cache: "no-store" }).catch(() => null)
    ]);
    
    const data1 = res1 ? await res1.json().catch(() => null) : null;
    const data3 = res3 ? await res3.json().catch(() => null) : null;
    
    return { data1: data1?.data?.data || data1?.data, data3: data3?.data?.data || data3?.data };
  } catch (error) {
    return { data1: null, data3: null };
  }
}

export default async function Home() {
  const apiData = await getHomeData();
  return (
    <>
      <StoreInitializer pageType="home" apiData={apiData} />
      <HomeLayout apiData={apiData} />
    </>
  );
}
