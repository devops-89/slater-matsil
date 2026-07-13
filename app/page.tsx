import type { Metadata } from "next";
import HomeLayout from "../components/layouts/home";

export const metadata: Metadata = {
  title: "Slater Matsil | Intellectual Property Law Firm",
  description: "Slater Matsil is a premier intellectual property law firm specializing in patent prosecution, litigation, and strategic counseling.",
};

export default function Home() {
  return (
    <>
      <HomeLayout />
    </>
  );
}
