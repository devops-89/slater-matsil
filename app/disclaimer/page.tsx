import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Slater Matsil | Disclaimer",
  description: "Important legal disclaimers and information regarding the use of the Slater Matsil website.",
};

export default function Page() {
  return <ClientPage />;
}
