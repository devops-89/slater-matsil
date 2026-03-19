import React from "react";
import ServicesDetailsHeroSection from "./Services-Details-Hero-Section";
import QuickLinksDetails from "./Quick-Links-Details";
import ServiceAreas from "@/components/widgets/Service-Areas";

const ServicesDetailsLayout = () => {
  return (
    <div>
      <ServicesDetailsHeroSection />
      <QuickLinksDetails />
      <ServiceAreas />
    </div>
  );
};

export default ServicesDetailsLayout;
