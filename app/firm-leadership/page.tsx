import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Slater Matsil | Firm Leadership",
  description:
    "Meet the experienced leadership team and partners guiding our boutique intellectual property law practice.",
};

export default function Page() {
  return <ClientPage />;
}
