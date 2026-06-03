
import Navbar from "@/components/widgets/navbar";
import Footer from "@/components/widgets/Footer";
import AboutHerosection from "@/components/layouts/about-layout/About-Herosection";
import DrivingInnovation from "@/components/layouts/about-layout/Driving-innovation";
import RedefiningPatent from "@/components/widgets/Redefining-Patent";
import InsightsInnovation from "@/components/layouts/about-layout/Insights-innovation";
import Award from "@/components/layouts/about-layout/Award";
import WhoweServe from "@/components/layouts/about-layout/Who-we-serve";
import IndustriesWeServe from "@/components/layouts/about-layout/Industries-We-Serve";
import InsightsSection from "@/components/widgets/Insights-section";

import { AboutUsHeroEditor } from "./AboutUsHeroEditor";
import { AboutUsInnovationEditor } from "./AboutUsInnovationEditor";
import { AboutUsPatentSuccessEditor } from "./AboutUsPatentSuccessEditor";
import { AboutUsInsightsAndAwardsEditor } from "./AboutUsInsightsAndAwardsEditor";
import { AboutUsWhoWeServeEditor } from "./AboutUsWhoWeServeEditor";
import { AboutUsIndustriesEditor } from "./AboutUsIndustriesEditor";

import React from 'react';
import { Box, Button, Stack, TextField, Typography, Card, Grid } from "@mui/material";
import { Save } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { useRouter } from "next/navigation";







export const renderDesktopPreview = (children: React.ReactNode) => (
  <Box sx={{ position: "relative", transform: "translate(0, 0)", width: "100%", height: "100%", overflowY: "auto", overflowX: "hidden", backgroundColor: "#FFFFFF" }}>
    {children}
  </Box>
);

export const AboutUsForms = ({ activeSection, websiteData, updateAboutPage, onDeleteMedia }: any) => {
  switch (activeSection) {
    case 0: return <AboutUsHeroEditor data={websiteData.aboutPage.heroSection} onChange={(newData: any) => updateAboutPage('heroSection', newData)} onDeleteMedia={onDeleteMedia} />;
    case 1: return <AboutUsInnovationEditor data={websiteData.aboutPage.drivingInnovationEverywhere} onChange={(newData: any) => updateAboutPage('drivingInnovationEverywhere', newData)} onDeleteMedia={onDeleteMedia} />;
    case 2: return <AboutUsPatentSuccessEditor data={websiteData.aboutPage.REDEFINING_PATENT_SUCCESS} onChange={(newData: any) => updateAboutPage('REDEFINING_PATENT_SUCCESS', newData)} />;
    case 3: return <AboutUsInsightsAndAwardsEditor insightsData={websiteData.aboutPage.innovationInsights} awardsData={websiteData.aboutPage.AWARDSPROPS} updateAboutPage={updateAboutPage} onDeleteMedia={onDeleteMedia} />;
    case 4: return <AboutUsWhoWeServeEditor data={websiteData.aboutPage.who_we_serve_props} onChange={(newData: any) => updateAboutPage('who_we_serve_props', newData)} />;
    case 5: return <AboutUsIndustriesEditor data={websiteData.aboutPage.industriesWeServe} onChange={(newData: any) => updateAboutPage('industriesWeServe', newData)} />;
    default: return <Typography sx={{ fontFamily: adelle.style.fontFamily }}>Select a section to edit.</Typography>;
  }
};

export const AboutUsPreviews = ({ activeSection }: any) => {
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
      <Box id="preview-section-0"><AboutHerosection /></Box>
      <Box id="preview-section-1"><DrivingInnovation /></Box>
      <Box id="preview-section-2"><RedefiningPatent /></Box>
      <Box id="preview-section-3">
        <InsightsInnovation />
        <Award />
      </Box>
      <Box id="preview-section-4"><WhoweServe /></Box>
      <Box id="preview-section-5"><IndustriesWeServe /></Box>
      <Box id="preview-section-6"><InsightsSection /></Box>
      <Footer />
    </Box>
  );

  return renderDesktopPreview(content);
};
