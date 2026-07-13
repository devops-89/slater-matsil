import type { Metadata } from "next";
import ServicesDetailsLayout from "@/components/layouts/Services-details-layout";
import { Box } from "@mui/material";
import React from "react";
import { SERVICES_DETAILS } from "@/public/data/generic-array";

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const service = SERVICES_DETAILS.find((item) => item.slug === slug);

  if (!service) {
    return {
      title: "Service Details | Slater Matsil",
      description: "Explore our intellectual property legal services.",
    };
  }

  const desc = service.data?.[0]?.description || "Explore our intellectual property legal services.";
  return {
    title: `${service.title} | Slater Matsil`,
    description: desc.length > 155 ? `${desc.slice(0, 155)}...` : desc,
  };
}

const ServicesDetails = () => {
  return (
    <Box>
      <ServicesDetailsLayout />
    </Box>
  );
};

export default ServicesDetails;
