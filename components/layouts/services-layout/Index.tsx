import React from "react";
import HeroServicesSection from "./Hero-services-section";
import WhyChooseUs from "./Why-Choose-Us";
import UnParalleledLegalService from "./Unparalleled-legal-services";
import OurserviceFramework from "./Our-service-framework";
import ServiceAreas from "@/components/widgets/Service-Areas";
import NeedAssistance from "./Need-Assistance";

const ServicesLayout = ({ apiData }: { apiData?: any }) => {
  return (
    <div>
      <div data-aos="fade-in" suppressHydrationWarning>
        <HeroServicesSection apiData={apiData} />
      </div>
      <div data-aos="fade-up" suppressHydrationWarning>
        <WhyChooseUs />
      </div>
      <div data-aos="fade-up" suppressHydrationWarning>
        <UnParalleledLegalService />
      </div>
      <div data-aos="fade-up" suppressHydrationWarning>
        <OurserviceFramework />
      </div>
      <ServiceAreas />
      <div data-aos="zoom-in">
        <NeedAssistance />
      </div>
    </div>
  );
};

export default ServicesLayout;
