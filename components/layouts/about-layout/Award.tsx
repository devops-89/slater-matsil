"use client";

import { usePageData } from "@/store/usePageData";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useRef } from "react";

import { clientLocations } from "@/public/data/client-locations";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ThreeEarth = dynamic(() => import("@/components/widgets/Three-Earth"), {
  ssr: false,
});

const Award = () => {
  const { details } = usePageData();


  return (
    <Box sx={{ pb: { lg: 10, xs: 5 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={7} alignItems="center">
          <Grid
            size={{ lg: 6, xs: 12 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "550px",
            }}
          >
            <ThreeEarth height="550px" />
          </Grid>

          <Grid size={{ lg: 6, xs: 12 }}>
            <Typography
              sx={{
                fontSize: { lg: "40px", xs: "25px" },
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                letterSpacing: "-3px",
                lineHeight: { lg: "55px", xs: "35px" },
                color: COLORS.PRIMARY_BLUE,
              }}
            >
              {details?.aboutPage?.AWARDSPROPS?.heading1 || "Distinction Defined By"}
            </Typography>
            <Typography
              sx={{
                color: COLORS.BLACK,
                fontSize: { lg: 35, xs: 25 },
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
                  width: { lg: 420, xs: 100 },
                  borderRadius: "20px",
                },
              }}
            >
              {details?.aboutPage?.AWARDSPROPS?.heading2 || "Dedication And Results."}
            </Typography>
            <Grid container>
              {details?.aboutPage?.AWARDSPROPS?.awards_img?.map((val: any, i: number) => (
                <Grid size={{ lg: 4, xs: 6 }} key={i}>
                  <Image
                    src={val.imageDownloadUrl || val.img}
                    alt=""
                    width={300}
                    height={300}
                    unoptimized={true}
                    style={{ width: "200px", height: "auto" }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Award;
