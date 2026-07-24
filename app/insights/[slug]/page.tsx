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

import { notFound } from "next/navigation";
import { mapBackendToInsightDetailState } from "@/utils/pageDataMapper";
import InsightDetailsStoreInitializer from "@/components/providers/InsightDetailsStoreInitializer";

async function getInsightData(slug: string) {
  if (isNaN(Number(slug))) return null;
  try {
    const res = await fetch(`http://3.92.74.11/api/insights/${slug}`, { next: { revalidate: 60 } }).catch(() => null);
    const data = res ? await res.json() : null;
    const apiInsight = data?.data?.data || data?.data;
    if (apiInsight) {
      return mapBackendToInsightDetailState(apiInsight);
    }
    return null;
  } catch (error) {
    console.error("Error fetching insight data", error);
    return null;
  }
}

export default async function InsightDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const apiData = await getInsightData(slug);

  if (!apiData) {
    notFound();
  }

  return (
    <Box>
      <InsightDetailsStoreInitializer apiData={apiData} />
      <InsightsDetailsLayout />
    </Box>
  );
}
