import type { Metadata } from "next";
import ServicesLayout from "@/components/layouts/services-layout/Index";
import React from "react";

export const metadata: Metadata = {
  title: "Slater Matsil | Services",
  description: "Explore our intellectual property services, including patent prosecution, litigation support, portfolio management, and strategic counseling.",
};

const Services = () => {
  return (
    <div>
      <ServicesLayout />
    </div>
  );
};

export default Services;
