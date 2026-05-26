import React from 'react';
import { Box, Typography } from "@mui/material";
import { adelle } from "@/utils/fonts";
import { useRouter } from "next/navigation";

import Navbar from "@/components/widgets/navbar";
import Footer from "@/components/widgets/Footer";
import HeroServicesSection from "@/components/layouts/services-layout/Hero-services-section";
import WhyChooseUs from "@/components/layouts/services-layout/Why-Choose-Us";
import UnParalleledLegalService from "@/components/layouts/services-layout/Unparalleled-legal-services";
import OurserviceFramework from "@/components/layouts/services-layout/Our-service-framework";
import ServiceAreas from "@/components/widgets/Service-Areas";
import NeedAssistance from "@/components/layouts/services-layout/Need-Assistance";

import { ServicesHeroEditor } from "./ServicesHeroEditor";
import { ServicesStrengthEditor } from "./ServicesStrengthEditor";
import { ServicesUnparalleledEditor } from "./ServicesUnparalleledEditor";
import { ServicesFrameworkEditor } from "./ServicesFrameworkEditor";

export const renderDesktopPreview = (children: React.ReactNode) => (
  <Box sx={{ width: "100%", height: "100%", overflowY: "auto", overflowX: "hidden", backgroundColor: "#FFFFFF" }}>
    {children}
  </Box>
);

export const ServicesPageForms = ({ activeSection, websiteData, updateServicesPage }: any) => {
  switch (activeSection) {
    case 0: return <ServicesHeroEditor data={websiteData.servicesPage.heroSection} onChange={(newData: any) => updateServicesPage('heroSection', newData)} />;
    case 1: return <ServicesStrengthEditor data={websiteData.servicesPage.why_choose_strength_props} onChange={(newData: any) => updateServicesPage('why_choose_strength_props', newData)} />;
    case 2: return <ServicesUnparalleledEditor data={websiteData.servicesPage.unparalleled_props} onChange={(newData: any) => updateServicesPage('unparalleled_props', newData)} />;
    case 3: return <ServicesFrameworkEditor data={websiteData.servicesPage.service_framework_props} onChange={(newData: any) => updateServicesPage('service_framework_props', newData)} />;
    default: return <Typography sx={{ fontFamily: adelle.style.fontFamily }}>Select a section to edit.</Typography>;
  }
};

export const ServicesPagePreviews = ({ activeSection, websiteData }: any) => {
  const router = useRouter();

  React.useEffect(() => {
    if (activeSection !== false && activeSection >= 0) {
      const element = document.getElementById(`preview-section-${activeSection}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [activeSection]);

  const handlePreviewClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a');
    if (anchor) {
      e.preventDefault();
      const href = anchor.getAttribute('href');
      if (href) {
        if (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) {
          window.open(href, '_blank');
          return;
        }
        if (href.startsWith('#')) return;
        if (href === '/') {
          router.push('/pages/home');
        } else {
          const path = href.startsWith('/') ? href.slice(1) : href;
          router.push(`/pages/${path}`);
        }
      }
    }
  };

  const content = (
    <Box sx={{ display: 'flex', flexDirection: 'column' }} className="admin-preview-container" onClickCapture={handlePreviewClick}>
      <style>{`
        .admin-preview-container [data-aos] {
          opacity: 1 !important;
          transform: none !important;
        }
      `}</style>
      <Navbar />
      <Box id="preview-section-0"><HeroServicesSection /></Box>
      <Box id="preview-section-1"><WhyChooseUs /></Box>
      <Box id="preview-section-2"><UnParalleledLegalService /></Box>
      <Box id="preview-section-3"><OurserviceFramework /></Box>
      <Box id="preview-section-4"><ServiceAreas data={websiteData?.homepage?.service_area?.section_Data} /></Box>
      <Box id="preview-section-5"><NeedAssistance /></Box>
      <Footer />
    </Box>
  );

  return renderDesktopPreview(content);
};
