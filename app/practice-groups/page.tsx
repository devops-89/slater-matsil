import type { Metadata } from "next";
import PracticeGroupsLayout from "@/components/layouts/practice-group-layout/Index";
import React from "react";
import StoreInitializer from "@/components/providers/StoreInitializer";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Slater Matsil | Practice Groups",
  description: "Learn about our technological and legal practice groups covering electrical engineering, software, biotechnology, and more.",
};

async function getPracticeGroupsData() {
  try {
    const res = await fetch("http://3.92.74.11/api/pages/4", { next: { revalidate: 60 } }).catch(() => null);
    const data = res ? await res.json() : null;
    return { data4: data?.data?.data || data?.data };
  } catch (error) {
    return { data4: null };
  }
}

const PracticeGroups = async () => {
  const apiData = await getPracticeGroupsData();
  return (
    <>
      <StoreInitializer pageType="practiceGroups" apiData={apiData} />
      <PracticeGroupsLayout />
    </>
  );
};

export default PracticeGroups;
