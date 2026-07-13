import type { Metadata } from "next";
import DisclaimerLayout from "@/components/layouts/disclaimer-layout";
import React from "react";

export const metadata: Metadata = {
  title: "Slater Matsil | Disclaimer",
  description: "Important legal disclaimers and information regarding the use of the Slater Matsil website.",
};

const DisclaimerPage = () => {
  return (
    <div>
      <DisclaimerLayout />
    </div>
  );
};

export default DisclaimerPage;
