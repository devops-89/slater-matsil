import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Navbar from "@/components/widgets/navbar";
import Footer from "@/components/widgets/Footer";
import AiHero from "@/components/layouts/ai-layout/Ai-Hero";
import AiMatters from "@/components/layouts/ai-layout/Ai-Matters";
import AiApproach from "@/components/layouts/ai-layout/Ai-Approach";
import AiTools from "@/components/layouts/ai-layout/Ai-Tools";
import AiChoice from "@/components/layouts/ai-layout/Ai-Choice";
import AiQuestions from "@/components/layouts/ai-layout/Ai-Questions";
import { useRouter } from "next/navigation";

export const renderDesktopPreview = (children: React.ReactNode) => (
  <Box
    id="preview-container"
    sx={{
      position: "relative",
      transform: "translate(0, 0)",
      width: "100%",
      height: "100%",
      overflowY: "auto",
      overflowX: "hidden",
      backgroundColor: "#FFFFFF",
      scrollBehavior: "smooth",
    }}
  >
    {children}
  </Box>
);

export function AiPagePreviews({ activeSection, websiteData }: any) {
  const router = useRouter();

  useEffect(() => {
    if (activeSection !== false) {
      const element = document.getElementById(`preview-section-${activeSection}`);
      const container = document.getElementById("preview-container");
      if (element && container) {
        container.scrollTo({
          top: element.offsetTop - 50,
          behavior: "smooth",
        });
      }
    }
  }, [activeSection]);

  const handlePreviewClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest("a");
    if (anchor) {
      e.preventDefault();
      e.stopPropagation();
      const href = anchor.getAttribute("href");
      if (href) {
        if (href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel")) {
          window.open(href, "_blank");
          return;
        }
        if (href.startsWith("#")) {
          const targetElem = document.querySelector(href);
          if (targetElem) {
            targetElem.scrollIntoView({ behavior: "smooth" });
          }
          return;
        }

        const path = href.startsWith("/") ? href.slice(1) : href;
        const validEditors = [
          "home",
          "about-us",
          "services",
          "practice-groups",
          "professionals",
          "leadership",
          "insights",
          "blogs",
          "careers",
          "contact",
          "who-we-serve",
          "ai",
        ];
        if (validEditors.includes(path)) {
          router.push(`/pages/${path}`);
        } else if (href === "/") {
          router.push("/pages/home");
        } else if (href.startsWith("pages/")) {
          router.push(`/${href}`);
        } else {
          router.push(href.startsWith("/") ? href : `/${href}`);
        }
      }
    }
  };

  const content = (
    <Box
      sx={{ display: "flex", flexDirection: "column" }}
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
        <AiHero />
      </Box>
      <Box id="preview-section-1">
        <AiMatters />
      </Box>
      <Box id="preview-section-2">
        <AiApproach />
      </Box>
      <Box id="preview-section-3">
        <AiTools />
      </Box>
      <Box id="preview-section-4">
        <AiChoice />
      </Box>
      <Box id="preview-section-5">
        <AiQuestions />
      </Box>
      <Footer />
    </Box>
  );

  return renderDesktopPreview(content);
}
