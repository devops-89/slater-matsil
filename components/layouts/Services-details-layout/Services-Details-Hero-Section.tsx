"use client";

import { Box, Typography, Container } from "@mui/material";
import React from "react";
import heroImage from "@/services/details/practice-details-hero.jpg";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { usePageData } from "@/store/usePageData";
import { getValidImageUrl } from "@/utils/mappers/commonMapper";
import { getUpdatedDetails } from "@/utils/storeUpdater";
import { useParams } from "next/navigation";
import { generateSlug } from "@/utils/mappers/servicesMapper";

interface ServicesDetailsHeroSectionProps {
  apiData?: any;
  slug?: string;
}

const ServicesDetailsHeroSection = ({ apiData, slug: propSlug }: ServicesDetailsHeroSectionProps) => {
  const params = useParams();
  const rawSlug = ((propSlug || (params?.slug as string) || "") as string).trim();
  const { details: storeDetails } = usePageData();
  const details = apiData ? getUpdatedDetails("services", apiData) : storeDetails;
  
  const serviceAreas =
    details?.homepage?.service_area?.section_Data ||
    details?.servicesPage?.service_areas?.section_Data ||
    [];

  const normalize = (s: string) => {
    return (s || "")
      .toLowerCase()
      .trim()
      .replace(/[/\\_]+/g, "-")
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const currentService = serviceAreas.find((item: any) => {
    const itemSlug = (item.slug || "").trim();
    const titleSlug = generateSlug(item.title || "");
    return (
      itemSlug === rawSlug ||
      titleSlug === rawSlug ||
      normalize(itemSlug) === normalize(rawSlug) ||
      normalize(titleSlug) === normalize(rawSlug)
    );
  });

  const heroData = details?.servicesPage?.heroSection;
  const customHeroImg =
    currentService?.heroImageDownloadUrl ||
    currentService?.heroImg ||
    currentService?.heroImageUrl;

  const bgImg = customHeroImg
    ? getValidImageUrl(customHeroImg)
    : heroData?.img
    ? getValidImageUrl(heroData.img)
    : heroImage.src;

  return (
    <div>
      <Container>
        <Box
          style={{ backgroundImage: `url(${bgImg})` }}
          sx={{
            height: "80vh",
            borderRadius: "20px",
            backgroundPosition: "center 20%",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingLeft: { xs: "24px", md: "60px" },
              background: "rgba(0, 0, 0, 0.35)",
            }}
          >
            <Box sx={{ maxWidth: "550px" }}>
              <Box
                sx={{
                  backgroundColor: COLORS.PRIMARY_BLUE,
                  padding: "12px 24px",
                  borderRadius: "999px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "56px",
                  marginBottom: "24px",
                }}
              >
                <Typography
                  sx={{
                    color: COLORS.WHITE,
                    fontFamily: adelle.style.fontFamily,
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: 400,
                    lineHeight: "24px",
                    letterSpacing: "-0.54px",
                  }}
                >
                  A RANGE OF PRACTICE AREAS
                </Typography>
              </Box>

              <Typography
                sx={{
                  color: COLORS.WHITE,
                  fontFamily: tradeGothic.style.fontFamily,
                  fontSize: { xs: 36, md: 48 },
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                Global intellectual{" "}
                <Box
                  component="span"
                  sx={{
                    color: COLORS.PRIMARY_GREEN,
                  }}
                >
                  property
                </Box>{" "}
                services
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default ServicesDetailsHeroSection;
