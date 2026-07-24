import type { Metadata } from "next";
import ClientPage from "./ClientPage";
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Slater Matsil | Contact Us",
  description: "Contact our offices in Dallas, Texas to consult with our intellectual property legal professionals.",
};

import StoreInitializer from "../../components/providers/StoreInitializer";

async function getContactData() {
  try {
    const res = await fetch("http://3.92.74.11/api/pages/10", { next: { revalidate: 60 } }).catch(() => null);
    const data = res ? await res.json() : null;
    return { data10: data?.data };
  } catch (error) {
    return { data10: null };
  }
}

export default async function Page() {
  const apiData = await getContactData();
  return (
    <>
      <StoreInitializer pageType="contact" apiData={apiData} />
      <ClientPage />
    </>
  );
}
