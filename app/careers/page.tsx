import type { Metadata } from "next";
import CareerLayout from "@/components/layouts/career-layout";
import React from "react";

export const metadata: Metadata = {
  title: "Slater Matsil | Careers",
  description: "Join our team of experienced intellectual property attorneys, patent agents, and technical specialists.",
};

const Career = () => {
  return (
    <div>
      <CareerLayout />
    </div>
  );
};

export default Career;
