import slaterMatsil from "@/public/images/home/slater-matsil.jpg";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { Box, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";
const Whoweserve = () => {
  const { details } = usePageData();
  return (
    <Box>
      <Grid container>
        <Grid size={6}>
          <Box
            sx={{
              backgroundImage: `url(${details?.homepage?.who_we_serve?.leftSection?.heroImage})`,
              height: "80vh",
              backgroundPosition: "center",
              backgroundSize: "cover",
              display: "flex",
              alignItems: "end",
              justifyContent: "flex-end",
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgba(236, 248, 248, 0.20)",
                backdropFilter: "blur(350px)",
                width: 280,
                height: 250,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box>
                {details?.homepage?.who_we_serve?.leftSection?.small_logo && (
                  <Image
                    src={details.homepage.who_we_serve.leftSection.small_logo}
                    alt="small logo"
                  />
                )}
                <Divider sx={{ borderColor: COLORS.WHITE, my: 2 }} />
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    textAlign: "center",
                    fontFamily: tradeGothic.style.fontFamily,
                    color: COLORS.WHITE,
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  {details?.homepage?.who_we_serve?.leftSection?.startingYear}
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    width: "155px",
                    margin: "auto",
                    mt: 2,
                    color: COLORS.WHITE,
                    fontSize: 15,
                    fontWeight: 700,
                    lineHeight: "26px",
                    fontFamily: tradeGothic.style.fontFamily,
                  }}
                >
                  {details?.homepage?.who_we_serve?.leftSection?.servicesLabel}
                </Typography>
              </Box>
            </Box>
          </Box>

          {details?.homepage?.who_we_serve?.leftSection?.big_logo && (
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Image
                src={details.homepage.who_we_serve.leftSection.big_logo}
                alt="big logo"
              />
            </Box>
          )}
        </Grid>
        <Grid size={6}>
          <Box sx={{ backgroundColor: "#ECF2F3" }}></Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Whoweserve;
