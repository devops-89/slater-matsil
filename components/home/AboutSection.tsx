"use client";
import React from "react";
import Image from "next/image";
import { Box, Grid, Typography, Button } from "@mui/material";
import AboutImage from "@/public/images/home/about.png";
import Signature from "@/public/images/home/signature.png";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
const AboutSection = () => {
  return (
    <Box
      component="section"
      sx={{ py: { xs: 6, md: 10 }, px: { xs: 6, md: 10 } }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* Left: image */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography
            sx={{
              color: "#72B52B",
              fontSize: 14,
              lineHeight: 1.05,
              mb: 2,
              fontFamily: "var(--font-adelle)",
            }}
          >
            ABOUT SLATERMATSIL
          </Typography>
          <Typography
            sx={{
              color: "#0B4E5B",
              fontWeight: 700,
              fontSize: 42,
              lineHeight: 1.05,
              mb: 2,
              fontFamily: "var(--font-tradegothic)",
            }}
          >
            Fluent in technology.
            <br />
            proven in law.
          </Typography>
          <Box
          // sx={{
          //   borderRadius: 3,
          //   overflow: "hidden",
          //   width: "100%",
          //   boxShadow: 3,
          // }}
          >
            <Image
              src={AboutImage}
              alt="Team working together"
              style={{ width: "100%", height: "auto", display: "block" }}
              priority
            />
          </Box>
        </Grid>

        {/* Right: content */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Box sx={{ pr: { md: 4 } }}>
            <Typography
              sx={{
                color: "#727272",
                mb: 3,
                fontSize: 27,
                fontFamily: "var(--font-adelle)",
              }}
            >
              Slater Matsil is a collaboration of technology-minded individuals
              who practice intellectual property law. We understand that IP
              rights are, first and foremost, working assets that must support
              and advance our clients' business objectives. We maintain this
              client-centric perspective, whether we are discussing technology
              with inventors in the design room, developing IP strategies with
              management in the board room, or advocating for our clients'
              rights in the courtroom.
            </Typography>

            <Button
              variant="outlined"
              sx={{
                borderRadius: 4,
                px: 2,
                py: 1,
                textTransform: "none",
                mr: 3,
                border: "1px solid #063232",
                color: "#063232",
                fontFamily: "var(--font-adelle)",
                fontSize: 16,
                // "&:hover": { backgroundColor: "#0B4E5B" },
              }}
            >
              More About
              <ArrowRightAltIcon fontSize="small" sx={{ ml: 1 }} />
            </Button>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                mt: 4,
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography sx={{ fontSize: 36, fontWeight: 700 }}>
                  18
                </Typography>
                <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                  Years of <br /> Pro Experiences
                </Typography>
              </Box>

              <Box sx={{ flexGrow: 1 }} />

              <Box sx={{ textAlign: "right" }}>
                <Box sx={{ mb: 0.5 }}>
                  <Image
                    src={Signature}
                    alt="Signature"
                    width={140}
                    height={40}
                  />
                </Box>
                <Typography
                  sx={{
                    fontSize: 16,
                    color: "#000",
                    fontFamily: "var(--font-adelle)",
                  }}
                >
                  Founder & Senior Lawyer
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default AboutSection;
