"use client";
import React from "react";
import HeroServicesSection from "./Hero-services-section";
import WhyChooseUs from "./Why-Choose-Us";
import UnParalleledLegalService from "./Unparalleled-legal-services";
import OurserviceFramework from "./Our-service-framework";
import ServiceAreas from "@/components/widgets/Service-Areas";
import NeedAssistance from "./Need-Assistance";

const ServicesLayout = () => {
  return (
    <div>
      <HeroServicesSection />
      <WhyChooseUs />
      <UnParalleledLegalService />
      <OurserviceFramework />
      <ServiceAreas />
      <NeedAssistance />
    </div>
  );
};

export default ServicesLayout;
