import type { Metadata } from "next";
import AiLayout from "@/components/layouts/ai-layout";
import StoreInitializer from "@/components/providers/StoreInitializer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Slater Matsil | Artificial Intelligence - Patent Drafting & Prosecution",
  description:
    "Fluent in Technology. Proven in Law. Amplified by AI. Patent drafting and prosecution led by practitioners and strengthened by tools we built ourselves.",
};

async function getAiData() {
  try {
    const res = await fetch("http://3.92.74.11/api/pages/15", { cache: "no-store" }).catch(() => null);
    const data = res ? await res.json().catch(() => null) : null;
    return { dataAi: data?.data?.data || data?.data };
  } catch (error) {
    return { dataAi: null };
  }
}

export default async function AiPage() {
  const apiData = await getAiData();
  return (
    <>
      <StoreInitializer pageType="ai" apiData={apiData} />
      <AiLayout apiData={apiData} />
    </>
  );
}
