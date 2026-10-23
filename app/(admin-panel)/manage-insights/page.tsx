import InsightsAdminLayout from "@/components/layouts/admin-layout/InsightsAdminLayout";
import axios from "axios";

export const revalidate = 60;

export default async function ManageInsightsPage() {
  let initialInsights = [];
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await axios.get(`${backendUrl}/api/insights/all?limit=1000`);
    initialInsights = res.data?.data?.insights || res.data?.data?.data?.insights || [];
  } catch (error) {
    console.error("Failed to fetch SSR insights", error);
  }

  return <InsightsAdminLayout initialInsights={initialInsights} />;
}
