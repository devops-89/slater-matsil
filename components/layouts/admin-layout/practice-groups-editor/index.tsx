import React from 'react';
import { Box, Typography } from "@mui/material";
import { adelle } from "@/utils/fonts";
import { useRouter } from "next/navigation";

import Navbar from "@/components/widgets/navbar";
import Footer from "@/components/widgets/Footer";
import PracticeGroupsHeroSection from "@/components/layouts/practice-group-layout/Practice-groups-heroSection";
import PracticeGroupSection from "@/components/layouts/practice-group-layout/Practice-Group-Section";

import { PracticeGroupsHeroEditor } from "./PracticeGroupsHeroEditor";
import { PracticeGroupsTabsEditor } from "./PracticeGroupsTabsEditor";

export const renderDesktopPreview = (children: React.ReactNode) => (
  <Box sx={{ width: "100%", height: "100%", overflowY: "auto", overflowX: "hidden", backgroundColor: "#FFFFFF" }}>
    {children}
  </Box>
);

export const PracticeGroupsPageForms = ({ activeSection, websiteData, updatePracticeGroupsPage }: any) => {
  switch (activeSection) {
    case 0: return <PracticeGroupsHeroEditor data={websiteData.practiceGroupPage.practiceGroup_hero_section} onChange={(newData: any) => updatePracticeGroupsPage('practiceGroup_hero_section', newData)} />;
    case 1: return <PracticeGroupsTabsEditor data={websiteData.practiceGroupPage.practiceGroup_section} onChange={(newData: any) => updatePracticeGroupsPage('practiceGroup_section', newData)} />;
    default: return <Typography sx={{ fontFamily: adelle.style.fontFamily }}>Select a section to edit.</Typography>;
  }
};

export const PracticeGroupsPagePreviews = ({ activeSection, websiteData }: any) => {
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
      <Box id="preview-section-0"><PracticeGroupsHeroSection /></Box>
      <Box id="preview-section-1"><PracticeGroupSection /></Box>
      <Footer />
    </Box>
  );

  return renderDesktopPreview(content);
};
