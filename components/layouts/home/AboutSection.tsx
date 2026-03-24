"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Box, Grid, Typography, Button, Container } from "@mui/material";
import AboutImage from "@/public/images/home/about-us.jpg";
import Signature from "@/public/images/home/signature.png";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { adelle, tradeGothic, inter } from "@/utils/fonts";
import FlowerImage from "@/public/images/home/Image.png";
import { COLORS } from "@/utils/enum";
import HeadingStar from "@/components/widgets/Heading-star";
import { usePageData } from "@/store/usePageData";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutSection = () => {
  const { details } = usePageData();

  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center ">
          <Grid size={{ xs: 12, lg: 6 }} data-aos="fade-right">
            <HeadingStar title="About Slatermatsil" />

            <Typography
              sx={{
                color: COLORS.PRIMARY_BLUE,
                fontWeight: 700,
                fontSize: 35,
                my: 2,
                fontFamily: tradeGothic.style.fontFamily,
              }}
            >
              Fluent in technology. Proven in law.
            </Typography>
            <Box>
              <Image
                src={AboutImage}
                alt="Team working together"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: 20,
                }}
                priority
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }} data-aos="fade-left">
            <Box>
              <Typography
                sx={{
                  color: COLORS.TEXT_PRIMARY,
                  mb: 3,
                  fontSize: 20,
                  fontFamily: adelle.style.fontFamily,
                }}
              >
                {details?.homepage?.aboutSection?.description}
              </Typography>
              <Link href={details?.homepage?.aboutSection?.ctaButton?.link || "/about-us"}>
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
                  {details?.homepage?.aboutSection?.ctaButton?.text}
                  <ArrowRightAltIcon fontSize="small" sx={{ ml: 1 }} />
                </Button>
              </Link>

              <Box
                data-aos="fade-up"
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
                      {details?.homepage?.aboutSection?.experience?.years}
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
                      {details?.homepage?.aboutSection?.experience?.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontFamily: tradeGothic.style.fontFamily,
                      }}
                    >
                      {details?.homepage?.aboutSection?.experience?.subTitle}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default AboutSection;
