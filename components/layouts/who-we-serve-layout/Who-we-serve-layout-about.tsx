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
    <Box sx={{ py: 10 }}>
      <Box>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid size={6}>
              <Typography
                sx={{
                  fontSize: 35,
                  fontWeight: 700,
                  fontFamily: tradeGothic.style.fontFamily,
                  textTransform: "capitalize",
                  lineHeight: "58px",
                  color: COLORS.PRIMARY_BLUE,
                  mb: 20,
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
            <Grid size={6}>
              <StarBox bgColor={COLORS.PRIMARY_GREEN} />
              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: 500,
                  fontFamily: adelle.style.fontFamily,
                  textTransform: "capitalize",
                  color: COLORS.PRIMARY_BLUE,
                  mt: 2,
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
