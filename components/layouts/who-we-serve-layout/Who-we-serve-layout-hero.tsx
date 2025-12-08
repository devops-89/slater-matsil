import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import hero_img from "@/who-we-serve/hero-img.jpg";
const WhoWeServeLayoutHero = () => {
  return (
    <div>
      <Box>
        <Container maxWidth="lg">
          <Grid container alignItems={"center"}>
            <Grid size={6}>
              <Box
                sx={{
                  backgroundColor: COLORS.PRIMARY_BLUE,
                  borderRadius: "999px",
                  width: "231px",
                  height: "56px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: adelle.style.fontFamily,
                  fontSize: 18,
                  fontWeight: 400,
                  lineHeight: "24px",
                  letterSpacing: "-0.54px",
                  color: COLORS.WHITE,
                }}
              >
                UNLOCK THE VALUE
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
                Our Global Reach Covers{" "}
                <Typography
                  component={"span"}
                  sx={{
                    color: COLORS.PRIMARY_GREEN,
                    fontSize: 50,
                    fontFamily: tradeGothic.style.fontFamily,
                    fontWeight: 700,
                  }}
                >
                  Industries
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
                  Countries
                </Typography>
              </Typography>
            </Grid>
            <Grid size={6}>
              <Image
                src={hero_img}
                alt=""
                style={{ width: "100%", height: "auto", borderRadius: 20 }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default WhoWeServeLayoutHero;
