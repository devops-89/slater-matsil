import React from "react";
import { Box } from "@mui/material";
import Navbar from "@/components/widgets/navbar";
import Footer from "@/components/widgets/Footer";
import PrivacyPolicy from "@/app/privacy-policy/ClientPage";
import TermsOfUse from "@/app/terms-of-use/ClientPage";
import Disclaimer from "@/app/disclaimer/ClientPage";
import { useParams, useRouter } from "next/navigation";

export const renderDesktopPreview = (children: React.ReactNode) => (
  <Box
    sx={{
      position: "relative",
      transform: "translate(0, 0)",
      width: "100%",
      height: "100%",
      overflowY: "auto",
      overflowX: "hidden",
      backgroundColor: "#FFFFFF",
    }}
  >
    {children}
  </Box>
);

export function LegalPagesPreviews() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  const handlePreviewClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest("a");
    if (!anchor) return;

    e.preventDefault();
    e.stopPropagation();

    const href = anchor.getAttribute("href");
    if (!href || href.startsWith("#")) return;

    if (
      href.startsWith("http") ||
      href.startsWith("mailto") ||
      href.startsWith("tel")
    ) {
      window.open(href, "_blank");
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
      "privacy-policy",
      "terms-of-use",
      "disclaimer",
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
  };

  const renderLegalPage = () => {
    if (slug === "privacy-policy") return <PrivacyPolicy />;
    if (slug === "terms-of-use") return <TermsOfUse />;
    return <Disclaimer />;
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
      <Box id="preview-section-0">{renderLegalPage()}</Box>
      <Footer />
    </Box>
  );

  return renderDesktopPreview(content);
}
