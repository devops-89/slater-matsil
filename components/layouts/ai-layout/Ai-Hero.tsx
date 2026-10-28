"use client";

import HeadingStar from "@/components/widgets/Heading-star";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { getValidImageUrl } from "@/utils/mappers/commonMapper";
import { getUpdatedDetails } from "@/utils/storeUpdater";
import { Box, Button, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AiHero = ({ apiData }: { apiData?: any }) => {
  const { details: storeDetails } = usePageData();
  const details = apiData ? getUpdatedDetails("ai", apiData) : storeDetails;
  const isMobile = useMediaQuery("(max-width:900px)");

  const heroData = details?.aiPage?.heroSection;
  const imageSrc = getValidImageUrl(heroData?.img);

  return (
    <Box
      sx={{
        pt: { lg: 8, md: 6, xs: 4 },
        pb: { lg: 10, md: 8, xs: 5 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        {heroData?.tagTitle && (
          <Box sx={{ mb: { xs: 2, md: 3 } }}>
            <HeadingStar title={heroData.tagTitle} />
          </Box>
        )}

        <Grid container spacing={{ lg: 6, xs: 4 }} alignItems="center">
          <Grid size={{ lg: 6, xs: 12 }}>
            <Typography
              component="h1"
              sx={{
                fontSize: { lg: 46, md: 38, sm: 32, xs: 28 },
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                color: COLORS.PRIMARY_BLUE,
                lineHeight: { lg: "56px", md: "46px", xs: "36px" },
                letterSpacing: "-0.5px",
                mb: 2.5,
              }}
            >
              Fluent in Technology. Proven in Law.{" "}
              <Typography
                component="span"
                sx={{
                  color: COLORS.PRIMARY_GREEN,
                  fontSize: "inherit",
                  fontFamily: "inherit",
                  fontWeight: "inherit",
                  display: "inline",
                }}
              >
                Amplified by AI.
              </Typography>
            </Typography>

            <Typography
              sx={{
                fontSize: { lg: 22, md: 19, xs: 17 },
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 600,
                color: COLORS.TEXT_SECONDARY,
                lineHeight: { lg: "32px", xs: "26px" },
                mb: 2.5,
              }}
            >
              {heroData?.subHeading ||
                "Patent drafting and prosecution led by practitioners and strengthened by tools we built ourselves."}
            </Typography>

            <Typography
              sx={{
                fontSize: { lg: 17, xs: 15 },
                fontFamily: adelle.style.fontFamily,
                color: COLORS.TEXT_PRIMARY,
                fontWeight: 400,
                lineHeight: { lg: "28px", xs: "24px" },
                mb: 4,
                textAlign: "justify",
              }}
            >
              {heroData?.description ||
                "Since 1999, we have helped clients protect their technology in the U.S. and around the world. AI is the newest tool in that work. Our patent attorneys and agents built our tools around their own practice and the problems they solve every day. We use these tools carefully, and a practitioner remains responsible for every piece of work."}
            </Typography>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Link href="#tools" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: COLORS.PRIMARY_BLUE,
                    color: COLORS.WHITE,
                    fontFamily: tradeGothic.style.fontFamily,
                    fontWeight: 700,
                    fontSize: 15,
                    px: 3.5,
                    py: 1.3,
                    borderRadius: "50px",
                    textTransform: "none",
                    boxShadow: "0 6px 20px rgba(13, 95, 110, 0.25)",
                    "&:hover": {
                      backgroundColor: COLORS.TEXT_SECONDARY,
                    },
                  }}
                >
                  Explore Our Tools
                </Button>
              </Link>
              <Link href="/contact" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: COLORS.PRIMARY_GREEN,
                    color: COLORS.PRIMARY_BLUE,
                    fontFamily: tradeGothic.style.fontFamily,
                    fontWeight: 700,
                    fontSize: 15,
                    px: 3.5,
                    py: 1.3,
                    borderRadius: "50px",
                    textTransform: "none",
                    borderWidth: 2,
                    "&:hover": {
                      borderWidth: 2,
                      borderColor: COLORS.PRIMARY_BLUE,
                      backgroundColor: COLORS.PRIMARY_BLUE_LIGHT,
                    },
                  }}
                >
                  Talk to an Attorney
                </Button>
              </Link>
            </Box>
          </Grid>

          <Grid size={{ lg: 6, xs: 12 }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: { lg: 480, md: 420, xs: 280 },
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: "0 20px 45px rgba(13, 95, 110, 0.18)",
                border: "1px solid rgba(13, 95, 110, 0.1)",
              }}
            >
              {imageSrc && (
                <Image
                  src={imageSrc}
                  alt="Slater Matsil AI Patent Practice"
                  fill
                  priority
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              )}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(13, 95, 110, 0.05) 0%, rgba(13, 95, 110, 0.4) 100%)",
                  pointerEvents: "none",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 20,
                  left: 20,
                  right: 20,
                  backgroundColor: "rgba(255, 255, 255, 0.92)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 2.5,
                  p: 2,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  border: "1px solid rgba(255,255,255,0.6)",
                  display: { xs: "none", sm: "block" },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: tradeGothic.style.fontFamily,
                    fontWeight: 700,
                    fontSize: 14,
                    color: COLORS.PRIMARY_BLUE,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Practitioner-Led • AI-Amplified
                </Typography>
                <Typography
                  sx={{
                    fontFamily: adelle.style.fontFamily,
                    fontSize: 13,
                    color: COLORS.TEXT_PRIMARY,
                    mt: 0.5,
                  }}
                >
                  A registered patent attorney or agent reviews, validates, and remains fully accountable for every single filing.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AiHero;
