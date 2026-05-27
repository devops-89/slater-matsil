import React, { useEffect } from "react";
import { Box, Container, Grid } from "@mui/material";
import WhoWeServeLayoutHero from "@/components/layouts/who-we-serve-layout/Who-we-serve-layout-hero";
import WhoWeServeAbout from "@/components/layouts/who-we-serve-layout/Who-we-serve-layout-about";
import QuoteCard from "@/components/layouts/who-we-serve-layout/components/Quote-Card";
import WhoServeTabSection from "@/components/layouts/who-we-serve-layout/components/Who-serve-tab-section";
import Navbar from "@/components/widgets/navbar";
import Footer from "@/components/widgets/Footer";
import { useRouter } from "next/navigation";

export const renderDesktopPreview = (children: React.ReactNode) => (
  <Box id="preview-container" sx={{ position: "relative", transform: "translate(0, 0)", width: "100%", height: "100%", overflowY: "auto", overflowX: "hidden", backgroundColor: "#FFFFFF", scrollBehavior: 'smooth' }}>
    {children}
  </Box>
);

export function WhoWeServePagePreviews({ activeSection, websiteData }: any) {
  const router = useRouter();
  const details = websiteData;

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
        const validEditors = ['home', 'about-us', 'services', 'practice-groups', 'firm-professionals', 'firm-leadership', 'insights', 'blogs', 'careers', 'contact-us', 'who-we-serve'];
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
        <WhoWeServeLayoutHero />
      </Box>
      <Box id="preview-section-1">
        <WhoWeServeAbout />
        <Container maxWidth="lg">
          <Grid container sx={{ mt: 6 }}>
            <Grid size={{ lg: 9, xs: 12 }} mx="auto">
              <QuoteCard
                quote={details?.whoWeServePage?.whoWeServeAboutSection?.quoteCardData?.quote || ""}
                author={details?.whoWeServePage?.whoWeServeAboutSection?.quoteCardData?.author || ""}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box id="preview-section-2">
        <React.Suspense fallback={<div>Loading...</div>}>
          <WhoServeTabSection />
        </React.Suspense>
      </Box>
      <Footer />
    </Box>
  );

  return renderDesktopPreview(content);
}
