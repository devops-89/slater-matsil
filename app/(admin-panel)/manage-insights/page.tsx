import InsightsAdminLayout from "@/components/layouts/admin-layout/InsightsAdminLayout";
import axios from "axios";

export const revalidate = 60;

export default async function ManageInsightsPage() {
  let initialInsights = [];
  try {
    const res = await axios.get("http://3.92.74.11/api/insights/all?limit=1000");
    initialInsights = res.data?.data?.insights || res.data?.data?.data?.insights || [];
  } catch (error) {
    console.error("Failed to fetch SSR insights", error);
  }

  return <InsightsAdminLayout initialInsights={initialInsights} />;
}
