import type { Metadata } from "next";
import InsightsLayout from "@/components/layouts/insights-layout/Index";
import React from "react";

export const metadata: Metadata = {
  title: "Slater Matsil | Insights",
  description: "Read our latest articles, news, and insights on patent law, intellectual property trends, and legal updates.",
};

const Insights = () => {
  return (
    <div>
      <InsightsLayout />
    </div>
  );
};

export default Insights;