"use client";
import React from "react";
import HeroServicesSection from "./Hero-services-section";
import WhyChooseUs from "./Why-Choose-Us";
import UnParalleledLegalService from "./Unparalleled-legal-services";
import OurserviceFramework from "./Our-service-framework";
import ServiceAreas from "@/components/widgets/Service-Areas";
import NeedAssistance from "./Need-Assistance";
import { usePageData } from "@/store/usePageData";

const ServicesLayout = () => {
  const { details } = usePageData();

  return (
    <div>
      <div data-aos="fade-in">
        <HeroServicesSection />
      </div>
      <div data-aos="fade-up">
        <WhyChooseUs />
      </div>
      <div data-aos="fade-up">
        <UnParalleledLegalService />
      </div>
      <div data-aos="fade-up">
        <OurserviceFramework />
      </div>
      <ServiceAreas data={details?.homepage?.service_area?.section_Data} />
      <div data-aos="zoom-in">
        <NeedAssistance />
      </div>
    </div>
  );
};

export default ServicesLayout;
