import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
const PracticeGroupsHeroSection = () => {
  const { details } = usePageData();

  const data = details?.practiceGroupPage?.practiceGroup_hero_section;
  return (
    <div>
      <Box sx={{ py: { lg: 10, xs: 5 } }}>
        <Container maxWidth="lg">
          <Grid container alignItems={"center"}>
            <Grid size={{ lg: 6, xs: 12 }}>
              <Box
                sx={{
                  backgroundColor: COLORS.PRIMARY_BLUE,
                  p: { lg: "12px 24px", xs: "12px" },
                  width: "fit-content",
                  color: COLORS.WHITE,
                  textTransform: "uppercase",
                  borderRadius: "40px",
                  fontFamily: adelle.style.fontFamily,
                  fontSize: { lg: 18, xs: 12 },
                  fontWeight: 400,
                  lineHeight: "24px",
                  letterSpacing: "-0.54px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {data?.title}
              </Box>

              <Typography
                sx={{
                  fontSize: { lg: 40, xs: 24 },
                  color: COLORS.PRIMARY_BLUE,
                  fontFamily: tradeGothic.style.fontFamily,
                  fontWeight: 700,
                  lineHeight: { lg: "84px", xs: "30px" },
                  mt: 3,
                }}
              >
                {data?.heading}
              </Typography>
            </Grid>
            <Grid size={{ lg: 6, xs: 12 }}>
              <Typography
                sx={{
                  fontSize: { lg: 20, xs: 16 },
                  color: COLORS.TEXT_PRIMARY_4,
                  fontFamily: adelle.style.fontFamily,
                  fontWeight: 400,
                  lineHeight: { lg: "37px", xs: "20px" },
                  mt: 3,
                }}
              >
                {data?.description1}
              </Typography>
            </Grid>
          </Grid>

            <Grid container sx={{ mt: { lg: 0, xs: 3 } }}>
  <Grid size={{ lg: 12, xs: 12 }}>
    {data?.firstHeroImage && (
      <Image
        src={data.firstHeroImage}
        alt="hero"
        style={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
          borderRadius: "20px",
        }}
      />
    )}
  </Grid>
</Grid>
          {/* <Grid container spacing={2} sx={{ mt: { lg: 0, xs: 3 } }}>
            <Grid size={{ lg: 7, xs: 12 }}>
              {data?.firstHeroImage && (
                <Image
                  src={data?.firstHeroImage}
                  alt="firstHerosectionimg"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: "20px",
                  }}
                />
              )}
            </Grid>
            <Grid size={{ lg: 5, xs: 12 }}>
              <Stack spacing={2}>
                {data?.secondHeroImage && (
                  <Image
                    src={data?.secondHeroImage}
                    alt="secondHerosectionimg"
                    style={{
                      width: "100%",
                      height: "215px",
                      objectFit: "cover",
                      objectPosition: "center 5%",
                      borderRadius: "20px",
                    }}
                  />
                )}
                {data?.thirdHeroImage && (
                  <Image
                    src={data?.thirdHeroImage}
                    alt="thirdHerosectionimg"
                    style={{
                      width: "100%",
                      height: "215px",
                      objectFit: "cover",
                      objectPosition: "center",
                      borderRadius: "20px",
                    }}
                  />
                )}
              </Stack>
            </Grid>
          </Grid> */}
          <Typography
            sx={{
              fontSize: { lg: 25, xs: 16 },
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 700,
              lineHeight: { lg: "58px", xs: "20px" },
              mt: 5,
              textTransform: "capitalize",
              color: COLORS.PRIMARY_BLUE,
            }}
          >
            {data?.description2}
          </Typography>
        </Container>
      </Box>
    </div>
  );
};

export default PracticeGroupsHeroSection;
