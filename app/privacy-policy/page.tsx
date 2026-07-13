import type { Metadata } from "next";
import PrivacyLayout from "@/components/layouts/privacy-layout";
import React from "react";

export const metadata: Metadata = {
  title: "Slater Matsil | Privacy Policy",
  description: "Read the privacy policy of Slater Matsil to understand how we collect, use, and protect your information.",
};

const PrivacyPolicyPage = () => {
  return (
    <div>
      <PrivacyLayout />
    </div>
  );
};

export default PrivacyPolicyPage;