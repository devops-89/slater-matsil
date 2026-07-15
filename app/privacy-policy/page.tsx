import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Slater Matsil | Privacy Policy",
  description: "Read the privacy policy of Slater Matsil to understand how we collect, use, and protect your information.",
};

export default function Page() {
  return <ClientPage />;
}
