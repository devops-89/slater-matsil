import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Circle } from "@mui/icons-material";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
const HeroSection = () => {
  const { details } = usePageData();
  return (
    <Box>
      <Container maxWidth="lg">
        <Box
          sx={{
            backgroundColor: "#ECF8F8",
            borderRadius: "32px",
            padding: 10,
          }}
        >
          <Grid container alignItems={"center"}>
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
                {details?.contactPage?.hero_section_data?.heading}
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
                {details?.contactPage?.hero_section_data?.description}
              </Typography>

              <Stack direction={"row"} alignItems={"center"} spacing={2} mt={2}>
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
            <Grid size={6}>
              {details?.contactPage?.hero_section_data?.img && (
                <Image
                  src={details?.contactPage?.hero_section_data?.img}
                  alt=""
                  style={{ width: "100%", height: "auto" }}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
