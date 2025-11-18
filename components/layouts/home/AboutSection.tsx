"use client";
import React from "react";
import Image from "next/image";
import { Box, Grid, Typography, Button } from "@mui/material";
import AboutImage from "@/public/images/home/about.png";
import Signature from "@/public/images/home/signature.png";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { adelle, tradeGothic, inter } from "@/utils/fonts";
import FlowerImage from "@/public/images/home/Image.png";
import { COLORS } from "@/utils/enum";
const AboutSection = () => {
  return (
    <Box
      component="section"
      sx={{ py: { xs: 6, md: 10 }, px: { xs: 6, md: 10 } }}
    >
      <Grid container spacing={6} alignItems="center">
        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 2 }}>
            <Box
              sx={{
                backgroundColor: "#72B52B",
                width: 24,
                height: 24,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Image src={FlowerImage} alt="flower image" />
            </Box>

            <Typography
              sx={{
                color: COLORS.PRIMARY_GREEN,
                fontSize: 14,
                fontFamily: adelle.style.fontFamily,
              }}
            >
              ABOUT SLATERMATSIL
            </Typography>
          </Box>

          <Typography
            sx={{
              color: COLORS.PRIMARY_BLUE,
              fontWeight: 700,
              fontSize: 42,
              lineHeight: 1.05,
              mb: 2,
              fontFamily: tradeGothic.style.fontFamily,
            }}
          >
            Fluent in technology.
            <br />
            proven in law.
          </Typography>
          <Box>
            <Image
              src={AboutImage}
              alt="Team working together"
              style={{ width: "100%", height: "auto", display: "block" }}
              priority
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Box>
            <Typography
              sx={{
                color: "#727272",
                mb: 3,
                fontSize: 27,
                fontFamily: adelle.style.fontFamily,
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
                fontFamily: adelle.style.fontFamily,
                fontSize: 16,
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
              <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Box sx={{ position: "relative", display: "inline-block" }}>
                  <Typography
                    sx={{
                      fontSize: 80,
                      fontWeight: 700,
                      fontFamily: inter.style.fontFamily,
                      color: "#FFF",
                      lineHeight: "80px",
                      textShadow: `
                  -2px -2px 0 #063232,
                  2px -2px 0 #063232,
                  -2px  2px 0 #063232,
                  2px  2px 0 #063232
                 `,
                    }}
                  >
                    18
                  </Typography>
                  <Box
                    sx={{
                      position: "absolute",
                      top: -10,
                      right: -24,
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      backgroundColor: COLORS.PRIMARY_GREEN,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFF",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    +
                  </Box>
                </Box>
                <Box
                  sx={{
                    fontSize: 24,

                    color: "#063232",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontFamily: tradeGothic.style.fontFamily,
                    }}
                  >
                    Years of
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontFamily: tradeGothic.style.fontFamily,
                    }}
                  >
                    Pro Experiences
                  </Typography>
                </Box>
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
                    color: "black",
                    fontFamily: adelle.style.fontFamily,
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
