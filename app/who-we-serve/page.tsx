import type { Metadata } from "next";
import ClientPage from "./ClientPage";
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Slater Matsil | Who We Serve",
  description: "We represent large multinational companies, emerging businesses, and academic institutions in securing and leveraging intellectual property.",
};

import StoreInitializer from "../../components/providers/StoreInitializer";

async function getWhoWeServeData() {
  try {
    const res = await fetch("http://3.92.74.11/api/pages/11", { next: { revalidate: 60 } }).catch(() => null);
    const data = res ? await res.json() : null;
    return { data11: data?.data?.data || data?.data };
  } catch (error) {
    return { data11: null };
  }
}

export default async function Page() {
  const apiData = await getWhoWeServeData();
  return (
    <>
      <StoreInitializer pageType="who-we-serve" apiData={apiData} />
      <ClientPage />
    </>
  );
}
