import type { Metadata } from "next";
import AboutLayout from "@/components/layouts/about-layout";
import StoreInitializer from "@/components/providers/StoreInitializer";
import { WEBSITE_DATA } from "@/public/data/website-data";
import React from "react";
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Slater Matsil | About Us",
  description: "Learn about Slater Matsil, a pure-play intellectual property firm built by a collaborative team of attorneys and technical specialists.",
};

async function getAboutData() {
  try {
    const res = await fetch("http://3.92.74.11/api/pages/2", { next: { revalidate: 60 } }).catch(() => null);
    const data = res ? await res.json() : null;
    
    return { data2: data?.data?.data || data?.data };
  } catch (error) {
    return { data2: null };
  }
}

export default async function Aboutus() {
  const apiData = await getAboutData();
  return (
    <div>
      <StoreInitializer pageType="about" apiData={apiData} />
      <AboutLayout />
    </div>
  );
}
