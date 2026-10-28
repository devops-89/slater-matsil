"use client";

import HeadingStar from "@/components/widgets/Heading-star";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { getValidImageUrl } from "@/utils/mappers/commonMapper";
import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { DoNotDisturbOnOutlined, SecurityOutlined, ShieldOutlined } from "@mui/icons-material";
import Image from "next/image";
import React from "react";

const CHOICE_ICONS = [
  <DoNotDisturbOnOutlined key={0} sx={{ fontSize: 32, color: COLORS.PRIMARY_GREEN }} />,
  <SecurityOutlined key={1} sx={{ fontSize: 32, color: COLORS.PRIMARY_GREEN }} />,
];

const AiChoice = () => {
  const { details } = usePageData();
  const choice = details?.aiPage?.choiceSection;
  const imageSrc = getValidImageUrl(choice?.img);

  const defaultItems = [
    {
      title: "You decide.",
      description:
        "You may ask that we not use AI tools on your matters. Tell us, and we will honor that request.",
    },
    {
      title: "Your information is protected.",
      description:
        "The outside providers we use do not acquire ownership of your information and are contractually prohibited from using it to train their models.",
    },
  ];

  const items = choice?.items?.length ? choice.items : defaultItems;

  return (
    <Box
      sx={{
        py: { lg: 10, md: 8, xs: 6 },
        backgroundColor: COLORS.OFF_WHITE,
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ lg: 6, xs: 4 }} alignItems="center">
          <Grid size={{ lg: 6, xs: 12 }}>
            <Box sx={{ mb: 3 }}>
              <HeadingStar title={choice?.sectionTitle || "AUTONOMY & SECURITY"} />
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
                {choice?.heading || "Your Matters, Your Choice"}
              </Typography>
              <Typography
                sx={{
                  fontSize: { lg: 17, xs: 15 },
                  fontFamily: adelle.style.fontFamily,
                  color: COLORS.TEXT_PRIMARY,
                  lineHeight: 1.6,
                }}
              >
                {choice?.description ||
                  "Client trust and confidentiality govern everything we do. We offer absolute transparency into our processes and full client agency over the use of AI on any matter."}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {items.map((item, index) => (
                <Card
                  key={index}
                  sx={{
                    borderRadius: 3,
                    backgroundColor: COLORS.WHITE,
                    border: "1px solid rgba(13, 95, 110, 0.08)",
                    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.04)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: COLORS.PRIMARY_GREEN,
                      boxShadow: "0 12px 28px rgba(13, 95, 110, 0.1)",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, md: 3.5 }, display: "flex", gap: 2.5, alignItems: "flex-start" }}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: "14px",
                        backgroundColor: COLORS.PRIMARY_BLUE_LIGHT,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {CHOICE_ICONS[index % CHOICE_ICONS.length]}
                    </Box>
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontFamily: tradeGothic.style.fontFamily,
                          fontSize: { lg: 21, xs: 19 },
                          fontWeight: 700,
                          color: COLORS.PRIMARY_BLUE,
                          mb: 1,
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
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>

          <Grid size={{ lg: 6, xs: 12 }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: { lg: 460, md: 400, xs: 290 },
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: "0 20px 45px rgba(13, 95, 110, 0.16)",
                border: "1px solid rgba(13, 95, 110, 0.1)",
              }}
            >
              {imageSrc && (
                <Image
                  src={imageSrc}
                  alt="Client Confidentiality and Data Protection"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              )}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(13, 95, 110, 0.1) 0%, rgba(13, 95, 110, 0.65) 100%)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 24,
                  left: 24,
                  right: 24,
                  backgroundColor: "rgba(255, 255, 255, 0.94)",
                  backdropFilter: "blur(12px)",
                  borderRadius: 3,
                  p: 2.5,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                  <ShieldOutlined sx={{ color: COLORS.PRIMARY_GREEN, fontSize: 24 }} />
                  <Typography
                    sx={{
                      fontFamily: tradeGothic.style.fontFamily,
                      fontSize: 16,
                      fontWeight: 700,
                      color: COLORS.PRIMARY_BLUE,
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    Contractually Protected
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontFamily: adelle.style.fontFamily,
                    fontSize: 13,
                    color: COLORS.TEXT_PRIMARY,
                    lineHeight: 1.5,
                  }}
                >
                  Outside AI providers never acquire ownership of client data and are legally prohibited from using client disclosures or filings to train commercial models.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AiChoice;
