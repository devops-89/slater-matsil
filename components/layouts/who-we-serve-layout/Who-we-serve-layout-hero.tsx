import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import hero_img from "@/who-we-serve/hero-img.jpg";
import { usePageData } from "@/store/usePageData";
const WhoWeServeLayoutHero = () => {
  const { details } = usePageData();
  return (
    <div>
      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Grid container alignItems={"center"}>
            <Grid size={6}>
              <Box
                sx={{
                  backgroundColor: COLORS.PRIMARY_BLUE,
                  borderRadius: "999px",
                  width: "231px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: adelle.style.fontFamily,
                  fontSize: 18,
                  fontWeight: 400,
                  lineHeight: "24px",
                  letterSpacing: "-0.54px",
                  color: COLORS.WHITE,
                  textTransform: "uppercase",
                }}
              >
                {details?.whoWeServePage?.whoWeServepageHeroSection?.title}
              </Box>
              <Typography
                sx={{
                  color: COLORS.PRIMARY_BLUE,
                  fontSize: 50,
                  fontFamily: tradeGothic.style.fontFamily,
                  fontWeight: 700,
                  lineHeight: "90px",
                  // letterSpacing: "-2px",
                }}
              >
                {details?.whoWeServePage?.whoWeServepageHeroSection?.heading1}{" "}
                <Typography
                  component={"span"}
                  sx={{
                    color: COLORS.PRIMARY_GREEN,
                    fontSize: 50,
                    fontFamily: tradeGothic.style.fontFamily,
                    fontWeight: 700,
                  }}
                >
                  {
                    details?.whoWeServePage?.whoWeServepageHeroSection
                      ?.spanHeading1
                  }
                </Typography>{" "}
                and{" "}
                <Typography
                  component={"span"}
                  sx={{
                    color: COLORS.PRIMARY_GREEN,
                    fontSize: 50,
                    fontFamily: tradeGothic.style.fontFamily,
                    fontWeight: 700,
                  }}
                >
                  {
                    details?.whoWeServePage?.whoWeServepageHeroSection
                      ?.spanHeading2
                  }
                </Typography>
              </Typography>
            </Grid>
            <Grid size={6}>
              {details?.whoWeServePage?.whoWeServepageHeroSection?.img && (
                <Image
                  src={details?.whoWeServePage?.whoWeServepageHeroSection?.img}
                  alt=""
                  style={{ width: "100%", height: "auto", borderRadius: 20 }}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default WhoWeServeLayoutHero;
