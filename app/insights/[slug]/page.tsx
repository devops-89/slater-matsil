import type { Metadata } from "next";
import InsightsDetailsLayout from "@/components/layouts/insights-details-layout/Index";
import { Box } from "@mui/material";
import { INSIGHTS_DETAILS_DATA } from "@/public/data/insights-details-data";
export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const insight = INSIGHTS_DETAILS_DATA.find((item) => item.slug === slug);

  if (!insight) {
    return {
      title: "Insight Details | Slater Matsil",
      description: "Read our latest legal insights and publications.",
    };
  }

  const title = insight.hero?.guide || insight.hero?.name || "Insight Details";
  const desc = insight.contentSections?.practiceAreas?.content || "Read our latest legal insights and publications.";
  return {
    title: `${title} | Slater Matsil`,
    description: desc.length > 155 ? `${desc.slice(0, 155)}...` : desc,
  };
}

export default function InsightDetailPage() {
  return (
    <Box>
      <InsightsDetailsLayout />
    </Box>
  );
}
