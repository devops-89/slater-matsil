import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
const PracticeGroupsHeroSection = () => {
  const { details } = usePageData();

  const data = details?.practiceGroupPage?.practiceGroup_hero_section;
  return (
    <div>
      <Box>
        <Container maxWidth="lg">
          <Grid container alignItems={"center"}>
            <Grid size={6}>
              <Box
                sx={{
                  backgroundColor: COLORS.PRIMARY_BLUE,
                  p: "12px 24px",
                  width: "fit-content",
                  color: COLORS.WHITE,
                  textTransform: "uppercase",
                  borderRadius: "40px",
                  fontFamily: adelle.style.fontFamily,
                  fontSize: 18,
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
                  fontSize: 40,
                  color: COLORS.PRIMARY_BLUE,
                  fontFamily: tradeGothic.style.fontFamily,
                  fontWeight: 700,
                  lineHeight: "84px",
                  mt: 3,
                }}
              >
                {data?.heading}
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography
                sx={{
                  fontSize: 20,
                  color: COLORS.TEXT_PRIMARY_4,
                  fontFamily: adelle.style.fontFamily,
                  fontWeight: 400,
                  lineHeight: "37px",
                  mt: 3,
                }}
              >
                {data?.description1}
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid size={7}>
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
            <Grid size={5}>
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
          </Grid>
          <Typography
            sx={{
              fontSize: 25,
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 700,
              lineHeight: "58px",
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
