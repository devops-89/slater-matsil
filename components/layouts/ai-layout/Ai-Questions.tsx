"use client";

import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { ArrowForward, EmailOutlined } from "@mui/icons-material";
import Link from "next/link";
import React from "react";

const AiQuestions = () => {
  const { details } = usePageData();
  const questions = details?.aiPage?.questionsSection;

  const heading = questions?.heading || "Questions?";
  const description =
    questions?.description ||
    "To learn how we use AI on your matters, talk to your Slater Matsil attorney or write to info@slatermatsil.com.";
  const email = questions?.email || "info@slatermatsil.com";
  const buttonText = questions?.buttonText || "Contact Our Team";
  const buttonLink = questions?.buttonLink || "/contact";

  return (
    <Box sx={{ py: { lg: 10, md: 8, xs: 6 }, backgroundColor: COLORS.WHITE }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            p: { lg: 7, md: 5, xs: 3.5 },
            borderRadius: 4,
            backgroundColor: COLORS.PRIMARY_BLUE,
            color: COLORS.WHITE,
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(13, 95, 110, 0.25)",
          }}
        >
          {/* Subtle decorative circles */}
          <Box
            sx={{
              position: "absolute",
              top: -80,
              right: -80,
              width: 260,
              height: 260,
              borderRadius: "50%",
              backgroundColor: "rgba(114, 181, 43, 0.12)",
              pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -60,
              left: -60,
              width: 220,
              height: 220,
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              pointerEvents: "none",
            }}
          />

          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems={{ xs: "flex-start", md: "center" }}
            justifyContent="space-between"
            spacing={4}
            sx={{ position: "relative", zIndex: 1 }}
          >
            <Box sx={{ maxWidth: 680 }}>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: tradeGothic.style.fontFamily,
                  fontSize: { lg: 38, md: 32, xs: 26 },
                  fontWeight: 700,
                  color: COLORS.WHITE,
                  mb: 1.5,
                }}
              >
                {heading}
              </Typography>
              <Typography
                sx={{
                  fontFamily: adelle.style.fontFamily,
                  fontSize: { lg: 18, xs: 15 },
                  color: COLORS.FOOTER_TEXT_COLOR,
                  lineHeight: 1.6,
                  mb: 2,
                }}
              >
                {description}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 1 }}>
                <EmailOutlined sx={{ color: COLORS.PRIMARY_LIGHT_GREEN, fontSize: 22 }} />
                <a
                  href={`mailto:${email}`}
                  style={{
                    color: COLORS.PRIMARY_LIGHT_GREEN,
                    fontFamily: tradeGothic.style.fontFamily,
                    fontWeight: 700,
                    fontSize: 18,
                    textDecoration: "underline",
                    letterSpacing: "0.5px",
                  }}
                >
                  {email}
                </a>
              </Box>
            </Box>

            <Box sx={{ flexShrink: 0 }}>
              <Link href={buttonLink} style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  endIcon={<ArrowForward />}
                  sx={{
                    backgroundColor: COLORS.PRIMARY_GREEN,
                    color: COLORS.WHITE,
                    fontFamily: tradeGothic.style.fontFamily,
                    fontWeight: 700,
                    fontSize: 16,
                    px: 4,
                    py: 1.6,
                    borderRadius: "50px",
                    textTransform: "none",
                    boxShadow: "0 8px 24px rgba(114, 181, 43, 0.4)",
                    "&:hover": {
                      backgroundColor: "#5e9b21",
                    },
                  }}
                >
                  {buttonText}
                </Button>
              </Link>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default AiQuestions;
