"use client";
import boxImage from "@/about/img1.png";
import InsightsSection from "@/components/widgets/Insights-section";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { ArrowForward } from "@mui/icons-material";
import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import AboutHerosection from "./About-Herosection";
import Award from "./Award";
import DrivingInnovation from "./Driving-innovation";
import IndustriesWeServe from "./Industries-We-Serve";
import InsightsInnovation from "./Insights-innovation";
import RedefiningPatent from "../../widgets/Redefining-Patent";
import { CAREER_HOME_DATA } from "@/public/data/generic-array";
import WhoweServe from "./Who-we-serve";
import Link from "next/link";
const AboutLayout = () => {
  // const {}

  return (
    <div>
      <AboutHerosection />
      <DrivingInnovation />
      <RedefiningPatent />
      <InsightsInnovation />
      <Award />
      <WhoweServe />
      <IndustriesWeServe />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {CAREER_HOME_DATA.map((val, i) => (
            <Grid size={{ lg: 4, xs: 12 }} key={i}>
              <Box
                sx={{
                  backgroundImage: `url(${val.img.src})`,
                  height: "400px",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  width: { lg: 350, xs: "100%" },

                  borderRadius: 4,
                  pb: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    // p: 2,
                    px: 2,
                    pb: 1,
                    borderRadius: 4,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: tradeGothic.style.fontFamily,
                      color: COLORS.WHITE,
                      fontSize: 18,
                      fontWeight: 700,
                    }}
                  >
                    {val.title}
                  </Typography>
                  <Link href={val.href} style={{ color: COLORS.WHITE }}>
                    <IconButton sx={{ color: COLORS.WHITE, mt: 3 }}>
                      <ArrowForward />
                    </IconButton>
                  </Link>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      <InsightsSection />
    </div>
  );
};

export default AboutLayout;
