"use client";
import React from "react";
import HeroServicesSection from "./Hero-services-section";
import WhyChooseUs from "./Why-Choose-Us";
import UnParalleledLegalService from "./Unparalleled-legal-services";
import OurserviceFramework from "./Our-service-framework";

const ServicesLayout = () => {
  return (
    <div>
      <HeroServicesSection />
      <WhyChooseUs />
      <UnParalleledLegalService />
      <OurserviceFramework />
    </div>
  );
};

export default ServicesLayout;
