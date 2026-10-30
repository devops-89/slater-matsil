"use client";

import { useRef } from "react";
import { useInsightDetails } from "@/store/useInsightDetails";

type InsightDetailsStoreInitializerProps = {
  apiData: any;
};

export default function InsightDetailsStoreInitializer({ apiData }: InsightDetailsStoreInitializerProps) {
  const initialized = useRef(false);

  if (!initialized.current) {
    useInsightDetails.setState({ data: apiData });
    initialized.current = true;
  }

  return null;
}
