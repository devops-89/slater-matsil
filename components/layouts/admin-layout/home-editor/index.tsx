import Navbar from "@/components/widgets/navbar";
import HeroSection3 from "@/components/layouts/home/HeroSection3";
import AboutSection from "@/components/layouts/home/AboutSection";
import MetricsSection from "@/components/layouts/home/MetricsSection";
import ServiceAreas from "@/components/widgets/Service-Areas";
import Whoweserve from "@/components/layouts/home/Who-We-Serve";
import InsightsSection from "@/components/widgets/Insights-section";
import ContactSection from "@/components/layouts/home/ContactSection";
import Footer from "@/components/widgets/Footer";

import { HeroCombined } from "./HeroCombined";
import { AboutEditor } from "./AboutEditor";
import { MetricsEditor } from "./MetricsEditor";
import { WhoWeServeEditor } from "./WhoWeServeEditor";

import slider4 from "@/home/slider/slider4.webp";
import slider5 from "@/home/slider/slider5.webp";
import slider6 from "@/home/slider/slider6.webp";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Save } from "@mui/icons-material";
import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from 'react';






export const renderDesktopPreview = (children: React.ReactNode) => (
  <Box sx={{ position: "relative", transform: "translate(0, 0)", width: "100%", height: "100%", overflowY: "auto", overflowX: "hidden", backgroundColor: "#FFFFFF" }}>
    {children}
  </Box>
);

export const HomePageForms = ({ activeSection, websiteData, updateHomepage, onDeleteMedia }: any) => {
  switch (activeSection) {
    case 0:
      return <HeroCombined banners={websiteData.homepage.heroSection} onChange={(newData: any) => updateHomepage('heroSection', newData)} onDeleteMedia={onDeleteMedia} />;
    case 1:
      return <AboutEditor data={websiteData.homepage.aboutSection} onChange={(newData: any) => updateHomepage('aboutSection', newData)} />;
    case 2:
      return <MetricsEditor data={websiteData.homepage.our_metrics} onChange={(newData: any) => updateHomepage('our_metrics', newData)} />;
    case 3:
      return <WhoWeServeEditor data={websiteData.homepage.who_we_serve} onChange={(newData: any) => updateHomepage('who_we_serve', newData)} />;
    default:
      return <Typography sx={{ fontFamily: adelle.style.fontFamily }}>Select a section to edit.</Typography>;
  }
};



export const HomePagePreviews = ({ activeSection, websiteData }: any) => {
  const router = useRouter();

  React.useEffect(() => {
    if (activeSection !== false && activeSection >= 0) {
      const element = document.getElementById(`preview-section-${activeSection}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [activeSection]);

  // Intercept clicks on links in the preview and route to the corresponding admin page
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
        
        if (href.startsWith('#')) {
            // Allow anchor scroll within the preview
            return;
        }

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

  // Render the full page by stacking all real components
  const content = (
    <Box 
      sx={{ display: 'flex', flexDirection: 'column' }} 
      className="admin-preview-container"
      onClickCapture={handlePreviewClick}
    >
      <style>{`
        .admin-preview-container [data-aos] {
          opacity: 1 !important;
          transform: none !important;
        }
      `}</style>
      <Navbar />
      <Box id="preview-section-0">
        <HeroSection3 />
      </Box>
      <Box id="preview-section-1">
        <AboutSection />
      </Box>
      <Box id="preview-section-2">
        <MetricsSection />
      </Box>
      <Box>
        <ServiceAreas limit={6} />
      </Box>
      <Box id="preview-section-3">
        <Whoweserve />
      </Box>
      <Box>
        <InsightsSection />
      </Box>
      <Box>
        <ContactSection />
      </Box>
      <Footer />
    </Box>
  );

  return renderDesktopPreview(content);
};
