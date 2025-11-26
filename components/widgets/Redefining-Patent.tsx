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
              padding: "40px",
            }}
          >
            <Container>
              <Grid container alignItems={"center"}>
                <Grid size={6}>
                  <Grid container spacing={4}>
                    {details?.aboutPage?.REDEFINING_PATENT_SUCCESS?.metrics_data.map(
                      (val, i) => (
                        <Grid size={6} key={i}>
                          <MetricsCard title={val.title} count={val.count} />
                        </Grid>
                      )
                    )}
                  </Grid>
                </Grid>
                <Grid size={6}>
                  <Typography
                    sx={{
                      fontSize: 30,
                      fontFamily: tradeGothic.style.fontFamily,
                      fontWeight: 700,
                      color: COLORS.PRIMARY_BLUE,
                    }}
                  >
                    {details?.aboutPage?.REDEFINING_PATENT_SUCCESS?.heading1}
                  </Typography>
                  <Typography
                    sx={{
                      color: COLORS.BLACK,
                      fontSize: 30,
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
                        bottom: "10px",
                        left: "-4px",
                        right: "-8px",
                        height: "20px",
                        backgroundColor: COLORS.PRIMARY_GREEN,
                        opacity: 0.4,
                        zIndex: -1,
                        transform: "rotate(-2deg)",
                        width: 420,
                      },
                    }}
                  >
                    {details?.aboutPage?.REDEFINING_PATENT_SUCCESS?.heading2}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 18,
                      fontFamily: adelle.style.fontFamily,
                      fontWeight: 400,
                      color: COLORS.TEXT_TERTIARY,
                      mt: 3,
                      lineHeight: "30px",
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
