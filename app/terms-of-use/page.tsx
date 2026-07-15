import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Slater Matsil | Terms of Use",
  description: "Read the terms and conditions for using the Slater Matsil website.",
};

export default function Page() {
  return <ClientPage />;
}
