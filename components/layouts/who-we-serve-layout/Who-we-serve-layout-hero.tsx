"use client";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { getUpdatedDetails } from "@/utils/storeUpdater";
const WhoWeServeLayoutHero = ({ apiData }: { apiData?: any }) => {
  const { details: storeDetails } = usePageData();
  const details = apiData ? getUpdatedDetails("who-we-serve", apiData) : storeDetails;
  return (
    <div>
      <Box sx={{ py: { lg: 10, xs: 5 } }}>
        <Container maxWidth="lg">
          <Grid container alignItems={"center"} spacing={{ lg: 0, xs: 5 }}>
            <Grid size={{ lg: 6, xs: 12 }}>
              <Box
                sx={{
                  backgroundColor: COLORS.PRIMARY_BLUE,
                  borderRadius: "999px",
                  width: { lg: "231px", xs: "180px" },
                  height: { lg: "50px", xs: "42px" },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: adelle.style.fontFamily,
                  fontSize: { lg: 18, xs: 15 },
                  fontWeight: 400,
                  lineHeight: { lg: "24px", xs: "15px" },
                  letterSpacing: "-0.54px",
                  color: COLORS.WHITE,
                  textTransform: "uppercase",
                  mb: 2,
                }}
              >
                {details?.whoWeServePage?.whoWeServepageHeroSection?.title}
              </Box>
              <Typography
                sx={{
                  color: COLORS.PRIMARY_BLUE,
                  fontSize: { lg: 50, xs: 25 },
                  fontFamily: tradeGothic.style.fontFamily,
                  fontWeight: 700,
                  lineHeight: { lg: "90px", xs: "40px" },
                }}
              >
                {details?.whoWeServePage?.whoWeServepageHeroSection?.heading1}{" "}
                <Typography
                  component={"span"}
                  sx={{
                    color: COLORS.PRIMARY_GREEN,
                    fontSize: { lg: 50, xs: 25 },
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
                    fontSize: { lg: 50, xs: 25 },
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
            <Grid size={{ lg: 6, xs: 12 }}>
              {details?.whoWeServePage?.whoWeServepageHeroSection?.img && (
                <Box sx={{ width: "100%", aspectRatio: "4/3", position: "relative" }}>
                  <Image
                    src={details?.whoWeServePage?.whoWeServepageHeroSection?.img}
                    alt=""
                    fill
                    
                    style={{ objectFit: "cover", borderRadius: 20 }}
                    priority
                  />
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default WhoWeServeLayoutHero;
