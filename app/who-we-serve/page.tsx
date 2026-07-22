import type { Metadata } from "next";
import ClientPage from "./ClientPage";
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Slater Matsil | Who We Serve",
  description: "We represent large multinational companies, emerging businesses, and academic institutions in securing and leveraging intellectual property.",
};

export default function Page() {
  return <ClientPage />;
}
