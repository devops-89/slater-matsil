"use client";

import HeadingStar from "@/components/widgets/Heading-star";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { getValidImageUrl } from "@/utils/mappers/commonMapper";
import { Box, Container, Grid, Typography } from "@mui/material";
import { Balance, LockOutlined, SchoolOutlined, Verified } from "@mui/icons-material";
import Image from "next/image";
import React from "react";

const APPROACH_ICONS = [
  <Verified key={0} sx={{ color: COLORS.PRIMARY_GREEN, fontSize: 26 }} />,
  <SchoolOutlined key={1} sx={{ color: COLORS.PRIMARY_GREEN, fontSize: 26 }} />,
  <Balance key={2} sx={{ color: COLORS.PRIMARY_GREEN, fontSize: 26 }} />,
  <LockOutlined key={3} sx={{ color: COLORS.PRIMARY_GREEN, fontSize: 26 }} />,
];

const AiApproach = () => {
  const { details } = usePageData();
  const approach = details?.aiPage?.approachSection;
  const imageSrc = getValidImageUrl(approach?.img);

  const defaultItems = [
    {
      title: "Our practitioners decide.",
      description:
        "A practitioner who understands both the technology and the law reviews every draft application and every Office Action response. That practitioner is accountable for the final work, just as they would be for work done entirely by hand.",
    },
    {
      title: "Technical depth comes first.",
      description:
        "Half of our patent professionals hold advanced technical degrees. Our tools organize information. Our practitioners bring the technical and legal judgment that turns it into strong patents.",
    },
    {
      title: "Built around our professional obligations.",
      description:
        "Our workflows are designed to meet our duties to clients and to the USPTO, including the duty of candor and the requirement that a practitioner review and stand behind every filing.",
    },
    {
      title: "Confidential by design.",
      description:
        "Protecting client information shapes how we build, select, and use every tool, from the first design decision through daily practice.",
    },
  ];

  const items = approach?.items?.length ? approach.items : defaultItems;

  return (
    <Box
      sx={{
        py: { lg: 10, md: 8, xs: 6 },
        backgroundColor: COLORS.WHITE,
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          <HeadingStar title={approach?.sectionTitle || "OUR PRINCIPLES"} />
          <Typography
            variant="h2"
            sx={{
              fontSize: { lg: 38, md: 32, xs: 26 },
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 700,
              color: COLORS.PRIMARY_BLUE,
              mt: 2,
              mb: 1.5,
            }}
          >
            {approach?.heading || "How We Approach AI"}
          </Typography>
          <Typography
            sx={{
              fontSize: { lg: 17, xs: 15 },
              fontFamily: adelle.style.fontFamily,
              color: COLORS.TEXT_PRIMARY,
              maxWidth: 820,
              lineHeight: 1.6,
            }}
          >
            {approach?.description ||
              "Human judgment and technical excellence remain the heart of our practice. Our practitioners leverage artificial intelligence to organize, analyze, and accelerate, but every decision and strategy is made by experienced patent attorneys and agents."}
          </Typography>
        </Box>

        <Grid container spacing={{ lg: 6, xs: 4 }} alignItems="center">
          <Grid size={{ lg: 7, xs: 12 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {items.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: COLORS.OFF_WHITE,
                    border: "1px solid rgba(13, 95, 110, 0.08)",
                    transition: "all 0.25s ease",
                    display: "flex",
                    gap: 2.5,
                    alignItems: "flex-start",
                    "&:hover": {
                      borderColor: COLORS.PRIMARY_GREEN,
                      boxShadow: "0 8px 24px rgba(13, 95, 110, 0.08)",
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "12px",
                      backgroundColor: COLORS.WHITE,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    }}
                  >
                    {APPROACH_ICONS[index % APPROACH_ICONS.length]}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      sx={{
                        fontFamily: tradeGothic.style.fontFamily,
                        fontSize: { lg: 19, xs: 17 },
                        fontWeight: 700,
                        color: COLORS.PRIMARY_BLUE,
                        mb: 0.8,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: adelle.style.fontFamily,
                        fontSize: { lg: 15, xs: 14 },
                        color: COLORS.TEXT_PRIMARY,
                        lineHeight: "24px",
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid size={{ lg: 5, xs: 12 }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: { lg: 520, md: 460, xs: 340 },
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(13, 95, 110, 0.16)",
                border: "1px solid rgba(13, 95, 110, 0.1)",
              }}
            >
              {imageSrc && (
                <Image
                  src={imageSrc}
                  alt="Slater Matsil Practitioners & AI"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 900px) 100vw, 40vw"
                />
              )}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(13, 95, 110, 0.02) 0%, rgba(13, 95, 110, 0.6) 100%)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 24,
                  left: 24,
                  right: 24,
                  backgroundColor: "rgba(13, 95, 110, 0.9)",
                  backdropFilter: "blur(8px)",
                  borderRadius: 3,
                  p: 2.5,
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: COLORS.WHITE,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: tradeGothic.style.fontFamily,
                    fontSize: 28,
                    fontWeight: 700,
                    color: COLORS.PRIMARY_LIGHT_GREEN,
                    lineHeight: 1,
                  }}
                >
                  50%
                </Typography>
                <Typography
                  sx={{
                    fontFamily: tradeGothic.style.fontFamily,
                    fontSize: 14,
                    fontWeight: 600,
                    color: COLORS.WHITE,
                    mt: 0.5,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Hold Advanced Technical Degrees
                </Typography>
                <Typography
                  sx={{
                    fontFamily: adelle.style.fontFamily,
                    fontSize: 12,
                    color: COLORS.FOOTER_TEXT_COLOR,
                    mt: 0.5,
                    lineHeight: 1.4,
                  }}
                >
                  Ph.D. & Master's trained patent professionals delivering unmatched depth in software, semiconductors, and deep tech.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AiApproach;
