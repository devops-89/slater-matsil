import type { Metadata } from "next";
import ClientPage from "./ClientPage";
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Slater Matsil | Contact Us",
  description: "Contact our offices in Dallas, Texas to consult with our intellectual property legal professionals.",
};

export default function Page() {
  return <ClientPage />;
}
