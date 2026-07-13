import type { Metadata } from "next";
import AboutLayout from "@/components/layouts/about-layout";
import React from "react";

export const metadata: Metadata = {
  title: "Slater Matsil | About Us",
  description: "Learn about Slater Matsil, a pure-play intellectual property firm built by a collaborative team of attorneys and technical specialists.",
};

const Aboutus = () => {
  return (
    <div>
      <AboutLayout />
    </div>
  );
};

export default Aboutus;
