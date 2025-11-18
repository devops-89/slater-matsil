"use client";
import React, { JSX } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import Image from "next/image";
import { adelle, tradeGothic } from "@/utils/fonts";
import FlowerImage from "@/public/images/home/Image.png";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { COLORS } from "@/utils/enum";
type Metric = { label: string; value: string };

const METRICS: Metric[] = [
  { label: "U.S. PATENTS ISSUED", value: "24,180+" },
  { label: "COUNTRIES WE SERVE", value: "6" },
  { label: "PATENTS ISSUED TO FIRM PERSONNELS", value: "200+" },
  {
    label: "NO. OF PATENT PROFESSIONALS WITH ADV. TECHNICAL DEGREE",
    value: "50%",
  },
];

const MetricsSection: React.FC = (): JSX.Element => {
  return (
    <Box
      component="section"
      sx={{ py: { xs: 6, md: 10 }, px: { xs: 6, md: 10 } }}
    >
      <Grid container spacing={4} alignItems="center">
        <Grid size={{ xs: 12, md: 6 }}>
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
                // lineHeight: 1.05,
                fontFamily: adelle.style.fontFamily,
              }}
            >
              OUR METRICS
            </Typography>
          </Box>

          <Typography
            sx={{
              color: COLORS.PRIMARY_BLUE,
              fontWeight: 700,
              fontSize: 42,
              lineHeight: "52px",
              fontFamily: tradeGothic.style.fontFamily,
            }}
          >
            Our firm is globally connected. Internationally 
            <Box
              component="span"
              sx={{
                position: "relative",
                display: "inline-block",
                fontWeight: 700,
                px: 0.5,
                color: "#000",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 6,
                  height: "14px",
                  backgroundColor: "rgba(114, 181, 43, 0.38)",
                  transform: "skewX(-15deg)",
                  zIndex: -1,
                  borderRadius: "2px",
                }}
              />
              respected.
            </Box>
          </Typography>

          <Typography
            sx={{
              color: "#727272",
              fontWeight: 400,
              fontSize: 27,
              lineHeight: "30px",
              my: 4,
              fontFamily: adelle.style.fontFamily,
            }}
          >
            At Slater Matsil, we know what is required to invent something
            groundbreaking and we know what it takes to guard and defend your
            company’s intellectual capital.
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="contained"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                textTransform: "none",
                backgroundColor: COLORS.PRIMARY_BLUE,
                color: "#fff",
                borderRadius: 50,
                px: 2.5,
                py: 0.75,
                fontSize: 14,
                fontFamily: adelle.style.fontFamily,
              }}
            >
              LET'S TALK NOW
              <MailOutlineIcon sx={{ fontSize: 14 }} />
            </Button>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={3}>
            {METRICS.map((m, idx) => (
              <Grid size={{ xs: 6 }} key={idx}>
                <Box sx={{ p: 3, height: "100%", borderRadius: 2 }}>
                  <Typography sx={{ color: "#2D2C2B", fontSize: 16, mb: 4 }}>
                    {m.label}
                  </Typography>

                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      borderRadius: "4px",
                      padding: "2px 4px",
                      mb: 1,
                    }}
                  >
                    <ArrowUpwardIcon
                      sx={{ color: COLORS.PRIMARY_GREEN, fontSize: 30 }}
                    />
                    <Typography
                      sx={{
                        fontSize: { xs: 50, md: 32 },
                        fontWeight: 700,
                        // lineHeight: 55,
                        color: COLORS.PRIMARY_BLUE,
                      }}
                    >
                      {m.value}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default MetricsSection;
