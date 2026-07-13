import type { Metadata } from "next";
import TermsLayout from "@/components/layouts/terms-layout";
import React from "react";

export const metadata: Metadata = {
  title: "Slater Matsil | Terms of Use",
  description: "Read the terms and conditions for using the Slater Matsil website.",
};

const TermsOfUsePage = () => {
  return (
    <div>
      <TermsLayout />
    </div>
  );
};

export default TermsOfUsePage;