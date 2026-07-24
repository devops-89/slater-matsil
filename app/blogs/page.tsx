import type { Metadata } from "next";
import BlogLayout from "@/components/layouts/blog-layout/Index";
import React from "react";
import StoreInitializer from "@/components/providers/StoreInitializer";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Slater Matsil | Blog",
  description: "Read our latest articles, news, and insights on patent law, intellectual property trends, and legal updates.",
};

async function getBlogsData() {
  try {
    const res = await fetch("http://3.92.74.11/api/pages/8", { next: { revalidate: 60 } }).catch(() => null);
    const data = res ? await res.json() : null;
    return { data8: data?.data?.data || data?.data };
  } catch (error) {
    return { data8: null };
  }
}

export default async function BlogPage() {
  const apiData = await getBlogsData();
  return (
    <>
      <StoreInitializer pageType="blogs" apiData={apiData} />
      <BlogLayout />
    </>
  );
}
