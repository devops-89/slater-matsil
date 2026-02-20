"use client";
import MetricsCard from "@/components/widgets/common/Metrics-Card";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

const RedefiningPatent = () => {
  const { details } = usePageData();

  //   console.log("details", details);
  return (
    <Box>
      <Box>
        <Container maxWidth="xl">
          <Box
            sx={{
              backgroundColor: "#ECF8F8",
              borderRadius: "16px",
              padding: { lg: "40px", xs: "10px" },
            }}
          >
            <Container>
              <Grid container alignItems={"center"}>
                <Grid size={{ lg: 6, xs: 12 }}>
                  <Grid container spacing={{ lg: 4, xs: 5 }}>
                    {details?.aboutPage?.REDEFINING_PATENT_SUCCESS?.metrics_data.map(
                      (val, i) => (
                        <Grid size={{ lg: 6, xs: 12 }} key={i}>
                          <MetricsCard title={val.title} count={val.count} />
                        </Grid>
                      ),
                    )}
                  </Grid>
                </Grid>
                <Grid size={{ lg: 6, xs: 12 }}>
                  <Typography
                    sx={{
                      fontSize: { lg: 30, xs: 17 },
                      fontFamily: tradeGothic.style.fontFamily,
                      fontWeight: 700,
                      color: COLORS.PRIMARY_BLUE,
                      mt: { lg: 0, xs: 4 },
                    }}
                  >
                    {details?.aboutPage?.REDEFINING_PATENT_SUCCESS?.heading1}
                  </Typography>
                  <Typography
                    sx={{
                      color: COLORS.BLACK,
                      fontSize: { lg: 30, xs: 17 },
                      fontFamily: tradeGothic.style.fontFamily,
                      fontWeight: 700,
                      letterSpacing: "-2px",
                      lineHeight: { lg: "55px", xs: "35px" },
                      ml: 1,
                      position: "relative",
                      zIndex: 1,
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: "10px",
                        left: "-4px",
                        right: "-8px",
                        height: { lg: "20px", xs: "10px" },
                        backgroundColor: COLORS.PRIMARY_GREEN,
                        opacity: 0.4,
                        zIndex: -1,
                        transform: "rotate(-2deg)",
                        width: { lg: 420, xs: 220 },
                        borderRadius: "20px",
                      },
                    }}
                  >
                    {details?.aboutPage?.REDEFINING_PATENT_SUCCESS?.heading2}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { lg: 18, xs: 15 },
                      fontFamily: adelle.style.fontFamily,
                      fontWeight: 400,
                      color: COLORS.TEXT_TERTIARY,
                      mt: { lg: 3, xs: 2 },
                      lineHeight: { lg: "30px", xs: "25px" },
                    }}
                  >
                    {details?.aboutPage?.REDEFINING_PATENT_SUCCESS?.description}
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default RedefiningPatent;
