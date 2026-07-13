import type { Metadata } from "next";
import ProfessionalDetailsLayout from "@/components/layouts/professionals-details-layout/Index";
import { Box } from "@mui/material";
import { PROFESSIONAL_DETAILS_DATA } from "@/public/data/professionals-details-data";

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const decodedSlug = typeof slug === "string" ? decodeURIComponent(slug).toLowerCase().trim() : "";
  const professional = PROFESSIONAL_DETAILS_DATA.find(
    (item) =>
      item.slug.toLowerCase().trim() === decodedSlug ||
      item.professionals_Details_HeroSection.name.toLowerCase().trim().replace(/,/g, "").replace(/\./g, "").replace(/\s+/g, "-") === decodedSlug,
  );

  if (!professional) {
    return {
      title: "Professional Details | Slater Matsil",
      description: "Meet our intellectual property legal professionals.",
    };
  }

  const name = professional.professionals_Details_HeroSection.name;
  const title = professional.professionals_Details_HeroSection.vCardData?.job_title || "IP Legal Professional";
  return {
    title: `${name} | Slater Matsil`,
    description: `Meet ${name}, ${title} at Slater Matsil, specializing in intellectual property law, patents, and strategic counseling.`,
  };
}

const ProfessionalDetails = () => {
  return (
    <Box>
      <Box>
        <ProfessionalDetailsLayout />
      </Box>
    </Box>
  );
};

export default ProfessionalDetails;
