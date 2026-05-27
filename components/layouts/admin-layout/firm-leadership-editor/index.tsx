import React from 'react';
import { Box, Typography } from "@mui/material";
import { adelle } from "@/utils/fonts";
import { useRouter } from "next/navigation";

import Navbar from "@/components/widgets/navbar";
import Footer from "@/components/widgets/Footer";
import FirmLeadershipForms from "./FirmLeadershipForms";
import FirmLeadershipPreview from "./FirmLeadershipPreview";

export const renderDesktopPreview = (children: React.ReactNode) => (
  <Box sx={{ position: "relative", transform: "translate(0, 0)", width: "100%", height: "100%", overflowY: "auto", overflowX: "hidden", backgroundColor: "#FFFFFF" }}>
    {children}
  </Box>
);

export const FirmLeadershipPageForms = ({ activeSection, websiteData, updateFirmLeadershipPage }: any) => {
  return <FirmLeadershipForms activeSection={activeSection} websiteData={websiteData} updateFirmLeadershipPage={updateFirmLeadershipPage} />;
};

export const FirmLeadershipPagePreviews = ({ activeSection, websiteData }: any) => {
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
        const path = href.startsWith('/') ? href.slice(1) : href;
        const validEditors = ['home', 'about-us', 'services', 'practice-groups', 'firm-professionals', 'firm-leadership', 'insights'];
        if (validEditors.includes(path)) {
          router.push(`/pages/${path}`);
        } else if (href === '/') {
          router.push('/pages/home');
        } else {
          router.push(href);
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
      <FirmLeadershipPreview activeSection={activeSection} websiteData={websiteData} />
      <Footer />
    </Box>
  );

  return renderDesktopPreview(content);
};
