import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import { usePageData } from "@/store/usePageData";

import globe from "@/about/globe.png";
import { tradeGothic } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";
const Award = () => {
  const { details } = usePageData();
  return (
    <Box sx={{ pb: 10 }}>
      <Container maxWidth="lg">
        <Grid container spacing={7}>
          <Grid size={{ lg: 6, xs: 12 }}>
            <Image
              src={details?.aboutPage?.AWARDSPROPS?.img || globe}
              alt=""
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            <Typography
              sx={{
                fontSize: { lg: "40px", xs: "30px" },
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                letterSpacing: "-3px",
                lineHeight: { lg: "55px", xs: "35px" },
                color: COLORS.PRIMARY_BLUE,
              }}
            >
              {details?.aboutPage?.AWARDSPROPS?.heading1}
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
                  height: "20px",
                  backgroundColor: COLORS.PRIMARY_GREEN,
                  opacity: 0.4,
                  zIndex: -1,
                  transform: "rotate(-2deg)",
                  width: { lg: 420, xs: 300 },
                  borderRadius: "20px",
                },
              }}
            >
              {details?.aboutPage?.AWARDSPROPS?.heading2}
            </Typography>
            <Grid container>
              {details?.aboutPage?.AWARDSPROPS?.awards_img.map((val, i) => (
                <Grid size={{ lg: 4, xs: 6 }} key={i}>
                  <Image
                    src={val.img}
                    alt=""
                    style={{ width: "100%", height: "auto" }}
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
