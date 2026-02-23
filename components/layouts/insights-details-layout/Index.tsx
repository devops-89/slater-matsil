"use client";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { INSIGHTS_DETAILS_DATA } from "@/public/data/insights-details-data";
import { useInsightDetails } from "@/store/useInsightDetails";
import InsightsDetailsHeroSection from "./InsightsDetailsHeroSection";
import InsightsDetailsTabBar from "./InsightsDetailsTabBar";
import InsightsDetailsContentSection from "./InsightsDetailsContentSection";

const InsightsDetailsLayout = () => {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState(0); // 0 = About, 1 = Lawyer Rankings
  const { setInsightDetailsData, clearInsightDetailsData, data } =
    useInsightDetails();

  useEffect(() => {
    const insight = INSIGHTS_DETAILS_DATA.find((item) => item.slug === slug);
    if (!insight) {
      notFound();
      return;
    }
    setInsightDetailsData(insight);
    return () => {
      clearInsightDetailsData();
    };
  }, [slug, setInsightDetailsData, clearInsightDetailsData]);

  if (!data) return null;

  return (
    <Box sx={{ bgcolor: "white", minHeight: "100vh" }}>
      <InsightsDetailsHeroSection />
      <InsightsDetailsTabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <InsightsDetailsContentSection activeTab={activeTab} />
    </Box>
  );
};

export default InsightsDetailsLayout;
