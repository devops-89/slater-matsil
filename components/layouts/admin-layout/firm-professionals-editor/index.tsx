import React from 'react';
import { Box, Typography } from "@mui/material";
import { adelle } from "@/utils/fonts";
import { useRouter } from "next/navigation";

import Navbar from "@/components/widgets/navbar";
import Footer from "@/components/widgets/Footer";
import ProfessionalLayoutSection from "@/components/layouts/professionals-layout/Professional-Section-layout";

import { FirmProfessionalsHeroEditor } from "./FirmProfessionalsHeroEditor";

export const renderDesktopPreview = (children: React.ReactNode) => (
  <Box sx={{ width: "100%", height: "100%", overflowY: "auto", overflowX: "hidden", backgroundColor: "#FFFFFF" }}>
    {children}
  </Box>
);

export const FirmProfessionalsPageForms = ({ activeSection, websiteData, updateFirmProfessionalsPage }: any) => {
  switch (activeSection) {
    case 0: return <FirmProfessionalsHeroEditor data={websiteData.firm_professionals.professionals_hero_section} onChange={(newData: any) => updateFirmProfessionalsPage('professionals_hero_section', newData)} />;
    default: return <Typography sx={{ fontFamily: adelle.style.fontFamily }}>Select a section to edit.</Typography>;
  }
};

export const FirmProfessionalsPagePreviews = ({ activeSection, websiteData }: any) => {
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
      <Box id="preview-section-0"><ProfessionalLayoutSection /></Box>
      <Footer />
    </Box>
  );

  return renderDesktopPreview(content);
};
