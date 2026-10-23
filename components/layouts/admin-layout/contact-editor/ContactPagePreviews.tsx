
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import HeroSection from "@/components/layouts/contact-layout/Hero-Section";
import ContactForm from "@/components/layouts/contact-layout/Contact-Form";
import FindUsHere from "@/components/layouts/contact-layout/Find-Us-Here";
import Followus from "@/components/layouts/contact-layout/Follow-us";
import Map from "@/components/layouts/contact-layout/Map";
import Navbar from "@/components/widgets/navbar";
import Footer from "@/components/widgets/Footer";
import { useRouter } from "next/navigation";

export const renderDesktopPreview = (children: React.ReactNode) => (
  <Box id="preview-container" sx={{ position: "relative", transform: "translate(0, 0)", width: "100%", height: "100%", overflowY: "auto", overflowX: "hidden", backgroundColor: "#FFFFFF", scrollBehavior: 'smooth' }}>
    {children}
  </Box>
);

export function ContactPagePreviews({ activeSection, websiteData }: any) {
  const router = useRouter();

  useEffect(() => {
    if (activeSection !== false) {
      const element = document.getElementById(`preview-section-${activeSection}`);
      const container = document.getElementById('preview-container');
      if (element && container) {
        container.scrollTo({
          top: element.offsetTop - 50,
          behavior: 'smooth'
        });
      }
    }
  }, [activeSection]);

  const handlePreviewClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a');
    if (anchor) {
      e.preventDefault();
      e.stopPropagation();
      const href = anchor.getAttribute('href');
      if (href) {
        if (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) {
          window.open(href, '_blank');
          return;
        }
        if (href.startsWith('#')) return;

        if (href.startsWith('/services/')) {
          router.push(href);
          return;
        }

        const path = href.startsWith('/') ? href.slice(1) : href;
        const validEditors = ['home', 'about-us', 'services', 'practice-groups', 'professionals', 'leadership', 'insights', 'blogs', 'careers', 'contact'];
        if (validEditors.includes(path)) {
          router.push(`/pages/${path}`);
        } else if (href === '/') {
          router.push('/pages/home');
        } else if (href.startsWith('pages/')) {
          router.push(`/${href}`);
        } else {
          router.push(href.startsWith('/') ? href : `/${href}`);
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
      <Box id="preview-section-0">
        <HeroSection />
      </Box>
      <Box id="preview-section-1">
        <ContactForm />
      </Box>
      <Box id="preview-section-2">
        <FindUsHere />
      </Box>
      <Box id="preview-section-3">
        <Followus />
      </Box>
      <Box id="preview-section-4">
        <Map />
      </Box>
      <Footer />
    </Box>
  );

  return renderDesktopPreview(content);
}
