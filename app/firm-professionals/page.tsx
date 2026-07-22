import type { Metadata } from "next";
import ClientPage from "./ClientPage";
import StoreInitializer from "@/components/providers/StoreInitializer";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Slater Matsil | Professionals",
  description: "Browse the biographies and expertise of our intellectual property attorneys, patent agents, and specialists.",
};

async function getProfessionalsData() {
  try {
    const res = await fetch("http://3.92.74.11/api/pages/5", { next: { revalidate: 60 } }).catch(() => null);
    const data = res ? await res.json() : null;
    return { data5: data?.data?.data || data?.data };
  } catch (error) {
    return { data5: null };
  }
}

export default async function Page() {
  const apiData = await getProfessionalsData();
  return (
    <>
      <StoreInitializer pageType="professionals" apiData={apiData} />
      <ClientPage />
    </>
  );
}
