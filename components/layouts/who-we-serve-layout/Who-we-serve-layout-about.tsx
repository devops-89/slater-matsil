import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { usePageData } from "@/store/usePageData";
import { adelle, tradeGothic } from "@/utils/fonts";
import Image from "next/image";
import { COLORS } from "@/utils/enum";
import StarBox from "@/components/widgets/common/Star-box";

const WhoWeServeAbout = () => {
  const { details } = usePageData();

  return (
    <Box sx={{ py: { lg: 10, xs: 5 } }}>
      <Box>
        <Container maxWidth="lg">
          <Grid container spacing={{ lg: 4, xs: 2 }}>
            <Grid size={{ lg: 6, xs: 12 }}>
              <Typography
                sx={{
                  fontSize: { lg: 35, xs: 25 },
                  fontWeight: 700,
                  fontFamily: tradeGothic.style.fontFamily,
                  textTransform: "capitalize",
                  lineHeight: { lg: "58px", xs: "30px" },
                  color: COLORS.PRIMARY_BLUE,
                  mb: { lg: 20, xs: 5 },
                }}
              >
                {
                  details?.whoWeServePage?.whoWeServeAboutSection
                    ?.leftSideDescription
                }
              </Typography>
              {details?.whoWeServePage?.whoWeServeAboutSection?.img && (
                <Image
                  src={details?.whoWeServePage?.whoWeServeAboutSection?.img}
                  alt={""}
                  style={{ width: "100%", height: "auto" }}
                />
              )}
            </Grid>
            <Grid size={{ lg: 6, xs: 12 }}>
              <StarBox bgColor={COLORS.PRIMARY_GREEN} />
              <Typography
                sx={{
                  fontSize: { lg: 20, xs: 15 },
                  fontWeight: 500,
                  fontFamily: adelle.style.fontFamily,
                  textTransform: "capitalize",
                  color: COLORS.PRIMARY_BLUE,
                  mt: { lg: 2, xs: 2 },
                }}
              >
                {
                  details?.whoWeServePage?.whoWeServeAboutSection
                    ?.rightSideDescription
                }
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default WhoWeServeAbout;
