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
    const pageRes = await fetch("http://3.92.74.11/api/pages/5", { next: { revalidate: 60 } }).catch(() => null);
    const pageData = pageRes ? await pageRes.json().catch(() => null) : null;

    const profsRes = await fetch("http://3.92.74.11/api/users/all?role=PROFESSIONAL&limit=6&page=1", { next: { revalidate: 60 } }).catch(() => null);
    const profsData = profsRes ? await profsRes.json().catch(() => null) : null;

    const users = profsData?.data?.data?.users || profsData?.data?.users || [];
    const total = profsData?.data?.data?.meta?.total || profsData?.data?.meta?.total || 0;

    return { 
      data5: pageData?.data?.data || pageData?.data,
      initialProfessionals: users,
      initialTotal: total
    };
  } catch (error) {
    return { data5: null, initialProfessionals: [], initialTotal: 0 };
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
