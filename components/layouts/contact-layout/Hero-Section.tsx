import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Circle } from "@mui/icons-material";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";

const HeroSection = () => {
  return (
    <Box>
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: "#ECF8F8",
          p: 8,
          borderRadius: "32px",
        }}
      >
        <Box>
          <Grid container>
            <Grid size={6}>
              <Typography
                sx={{
                  fontSize: 72,
                  fontFamily: tradeGothic.style.fontFamily,
                  color: COLORS.PRIMARY_BLUE,
                  lineHeight: "72px",
                  fontWeight: 700,
                }}
              >
                Contact Us
              </Typography>
              <Typography
                sx={{
                  color: COLORS.TEXT_PRIMARY_4,
                  fontFamily: adelle.style.fontFamily,
                  fontSize: 24,
                  fontWeight: 600,
                  lineHeight: "36px",
                  mt: 3,
                }}
              >
                Your innovations deserve global protection — let’s start the
                conversation.
              </Typography>

              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <Circle sx={{ color: COLORS.PRIMARY_BLUE, width: 10 }} />
                <Box
                  sx={{
                    backgroundColor: COLORS.PRIMARY_BLUE,
                    width: 100,
                    height: 5,
                    borderRadius: "5px",
                  }}
                ></Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
