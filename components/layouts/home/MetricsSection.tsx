"use client";
import React, { JSX } from "react";
import { Box, Grid, Typography, Button, Container } from "@mui/material";
import Image from "next/image";
import { adelle, tradeGothic } from "@/utils/fonts";
import FlowerImage from "@/public/images/home/Image.png";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { COLORS } from "@/utils/enum";
import HeadingStar from "@/components/widgets/Heading-star";
import { usePageData } from "@/store/usePageData";
import { Mail } from "@mui/icons-material";
import MetricsCard from "../../widgets/common/Metrics-Card";

const MetricsSection: React.FC = (): JSX.Element => {
  const { details } = usePageData();
  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid size={{ lg: 6, xs: 12 }}>
            <HeadingStar
              title={details?.homepage?.our_metrics?.sectionTitle || ""}
            />

            <Typography
              sx={{
                color: COLORS.PRIMARY_BLUE,
                fontSize: { lg: 35, xs: 25 },
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                letterSpacing: "-2px",
                lineHeight: "55px",
                mb: 2,
                mt: 2,
              }}
            >
              {details?.homepage?.our_metrics?.heading?.title}
              <Typography
                component={"span"}
                sx={{
                  color: COLORS.BLACK,
                  fontSize: { lg: 35, xs: 25 },
                  fontFamily: tradeGothic.style.fontFamily,
                  fontWeight: 700,
                  letterSpacing: "-2px",
                  lineHeight: "55px",
                  ml: 1,
                  position: "relative",
                  zIndex: 1,
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "8px",
                    left: "-4px",
                    right: "-8px",
                    height: "14px",
                    backgroundColor: COLORS.PRIMARY_GREEN,
                    opacity: 0.4,
                    zIndex: -1,
                    transform: "rotate(-2deg)",
                  },
                }}
              >
                {details?.homepage?.our_metrics?.heading?.subTitle}
              </Typography>
            </Typography>

            <Typography
              sx={{
                color: COLORS.TEXT_PRIMARY,
                fontSize: { lg: 20, xs: 15 },
                fontWeight: 400,
                fontFamily: adelle.style.fontFamily,
                lineHeight: { lg: "30px", xs: "20px" },
                textAlign: "justify",
                mt: 2,
              }}
            >
              {details?.homepage?.our_metrics?.description}
            </Typography>
            <Button
              endIcon={<MailOutlineIcon />}
              sx={{
                backgroundColor: COLORS.PRIMARY_BLUE,
                color: COLORS.WHITE,
                borderRadius: "50px",
                boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.10)",
                padding: { lg: "22px 32.23px 18px 26px", xs: "22px" },
                textTransform: "uppercase",
                height: "61px",
                fontFamily: adelle.style.fontFamily,
                fontSize: 16,
                mt: 2,
              }}
            >
              {details?.homepage?.our_metrics?.ctaButton}
            </Button>
          </Grid>

          <Grid size={{ lg: 6, xs: 12 }}>
            <Grid container spacing={8}>
              {details?.homepage?.our_metrics?.metricsData.map((val, i) => (
                <Grid size={{ lg: 6, xs: 6 }} key={i}>
                  <MetricsCard title={val.title} count={val.count} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default MetricsSection;
