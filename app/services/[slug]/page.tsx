import type { Metadata } from "next";
import ServicesDetailsLayout from "@/components/layouts/Services-details-layout";
import StoreInitializer from "@/components/providers/StoreInitializer";
import { Box } from "@mui/material";
import React from "react";
import { generateSlug } from "@/utils/mappers/servicesMapper";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

async function getServicesData() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/api/pages/3`, { cache: "no-store" }).catch(() => null);
    const data = res ? await res.json().catch(() => null) : null;
    return { data3: data?.data?.data || data?.data };
  } catch (error) {
    return { data3: null };
  }
}

const normalize = (s: string) => {
  return (s || "")
    .toLowerCase()
    .trim()
    .replace(/[/\\_]+/g, "-")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const rawSlug = resolvedParams.slug;
  const apiData = await getServicesData();
  const sections = apiData?.data3?.sections || [];
  const serviceAreaSection = sections.find((s: any) => s.sectionKey === "service_areas");
  const sectionData: any[] = serviceAreaSection?.data?.section_Data || [];

  const service = sectionData.find((item: any) => {
    const itemSlug = (item.slug || "").trim();
    const titleSlug = generateSlug(item.title || "");
    return (
      itemSlug === rawSlug ||
      titleSlug === rawSlug ||
      normalize(itemSlug) === normalize(rawSlug) ||
      normalize(titleSlug) === normalize(rawSlug)
    );
  });

  if (!service) {
    return {
      title: "Services | Slater Matsil",
      description: "Explore our intellectual property legal services.",
    };
  }

  const desc =
    service.description ||
    service.detailsData?.[0]?.description ||
    "Explore our intellectual property legal services.";

  return {
    title: `${service.title} | Slater Matsil`,
    description: desc.length > 155 ? `${desc.slice(0, 155)}...` : desc,
  };
}

const ServicesDetails = async ({ params }: Props) => {
  const resolvedParams = await params;
  const apiData = await getServicesData();

  return (
    <>
      <StoreInitializer pageType="services" apiData={apiData} />
      <Box>
        <ServicesDetailsLayout slug={resolvedParams.slug} apiData={apiData} />
      </Box>
    </>
  );
};

export default ServicesDetails;
