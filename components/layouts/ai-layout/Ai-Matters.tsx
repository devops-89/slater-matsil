"use client";

import HeadingStar from "@/components/widgets/Heading-star";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { AutoAwesome, CheckCircleOutline, LightbulbOutlined, Speed } from "@mui/icons-material";
import React from "react";

const CARD_ICONS = [
  <LightbulbOutlined key={0} sx={{ fontSize: 32, color: COLORS.PRIMARY_GREEN }} />,
  <Speed key={1} sx={{ fontSize: 32, color: COLORS.PRIMARY_GREEN }} />,
  <CheckCircleOutline key={2} sx={{ fontSize: 32, color: COLORS.PRIMARY_GREEN }} />,
];

const AiMatters = () => {
  const { details } = usePageData();
  const matters = details?.aiPage?.mattersSection;

  const defaultItems = [
    {
      title: "More attorney time on strategy.",
      description:
        "Our tools take on the first pass of reading, organizing, and cross-checking. That gives our practitioners more time for claim strategy, persuasive arguments to examiners, and your business goals.",
    },
    {
      title: "More thorough prosecution.",
      description:
        "Every rejection is checked against your claim language and the cited references. When we recommend a path forward, it rests on a complete picture.",
    },
    {
      title: "Fewer errors at filing.",
      description:
        "Custom checks catch inconsistencies and formalities issues before they become problems at the USPTO.",
    },
  ];

  const items = matters?.items?.length ? matters.items : defaultItems;

  return (
    <Box
      sx={{
        py: { lg: 10, md: 8, xs: 6 },
        backgroundColor: COLORS.OFF_WHITE,
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 3, md: 5 }, textAlign: { xs: "left", md: "center" } }}>
          <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "center" }, mb: 2 }}>
            <HeadingStar title={matters?.sectionTitle || "CLIENT VALUE"} />
          </Box>
          <Typography
            variant="h2"
            sx={{
              fontSize: { lg: 38, md: 32, xs: 26 },
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 700,
              color: COLORS.PRIMARY_BLUE,
              mb: 1.5,
            }}
          >
            {matters?.heading || "What This Means for Your Matters"}
          </Typography>
          <Typography
            sx={{
              fontSize: { lg: 17, xs: 15 },
              fontFamily: adelle.style.fontFamily,
              color: COLORS.TEXT_PRIMARY,
              maxWidth: 720,
              mx: { xs: 0, md: "auto" },
              lineHeight: 1.6,
            }}
          >
            {matters?.description ||
              "Our tools handle the labor-intensive first pass of reading, cross-referencing, and structural checking, empowering our practitioners to direct their focus where it delivers maximum client impact."}
          </Typography>
        </Box>

        <Grid container spacing={{ lg: 4, xs: 3 }}>
          {items.map((item, index) => (
            <Grid size={{ lg: 4, md: 4, xs: 12 }} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  backgroundColor: COLORS.WHITE,
                  border: "1px solid rgba(13, 95, 110, 0.08)",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.04)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 16px 36px rgba(13, 95, 110, 0.12)",
                    borderColor: COLORS.PRIMARY_GREEN,
                    "& .card-accent-bar": {
                      backgroundColor: COLORS.PRIMARY_GREEN,
                    },
                  },
                }}
              >
                <Box
                  className="card-accent-bar"
                  sx={{
                    height: "4px",
                    width: "100%",
                    backgroundColor: COLORS.PRIMARY_BLUE,
                    transition: "background-color 0.3s ease",
                  }}
                />
                <CardContent sx={{ p: { xs: 3, md: 4 }, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: "14px",
                        backgroundColor: COLORS.PRIMARY_BLUE_LIGHT,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {CARD_ICONS[index % CARD_ICONS.length]}
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: tradeGothic.style.fontFamily,
                        fontSize: 28,
                        fontWeight: 700,
                        color: "rgba(13, 95, 110, 0.15)",
                      }}
                    >
                      0{index + 1}
                    </Typography>
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: tradeGothic.style.fontFamily,
                      fontSize: { lg: 21, xs: 19 },
                      fontWeight: 700,
                      color: COLORS.PRIMARY_BLUE,
                      mb: 1.5,
                      lineHeight: "28px",
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
                      flexGrow: 1,
                    }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AiMatters;
