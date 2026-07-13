import type { Metadata } from "next";
import PracticeGroupsLayout from "@/components/layouts/practice-group-layout/Index";
import React from "react";

export const metadata: Metadata = {
  title: "Slater Matsil | Practice Groups",
  description: "Learn about our technological and legal practice groups covering electrical engineering, software, biotechnology, and more.",
};

const PracticeGroups = () => {
  return (
    <div>
      <PracticeGroupsLayout />
    </div>
  );
};

export default PracticeGroups;
