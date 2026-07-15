import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Slater Matsil | Careers",
  description: "Join our team of experienced intellectual property attorneys, patent agents, and technical specialists.",
};

export default function Page() {
  return <ClientPage />;
}
