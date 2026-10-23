import React from "react";
import { Box } from "@mui/material";
import BlogLayout from "@/components/layouts/blog-layout/Index";
import Navbar from "@/components/widgets/navbar";
import Footer from "@/components/widgets/Footer";
import { useRouter } from "next/navigation";

export const renderDesktopPreview = (children: React.ReactNode) => (
  <Box sx={{ position: "relative", transform: "translate(0, 0)", width: "100%", height: "100%", overflowY: "auto", overflowX: "hidden", backgroundColor: "#FFFFFF" }}>
    {children}
  </Box>
);

export function BlogsPagePreviews({ activeSection, websiteData }: any) {
  const router = useRouter();

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
        const validEditors = ['home', 'about-us', 'services', 'practice-groups', 'professionals', 'leadership', 'insights', 'blogs'];
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
        <BlogLayout />
      </Box>
      <Footer />
    </Box>
  );

  return renderDesktopPreview(content);
}
