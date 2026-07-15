import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Slater Matsil | Professionals",
  description: "Browse the biographies and expertise of our intellectual property attorneys, patent agents, and specialists.",
};
//client
export default function Page() {
  return <ClientPage />;
}
