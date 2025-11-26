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
const AboutLayout = () => {
  // const {}

  return (
    <div>
      <AboutHerosection />
      <DrivingInnovation />
      <RedefiningPatent />
      <InsightsInnovation />
      <Award />
      <IndustriesWeServe />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {CAREER_HOME_DATA.map((val, i) => (
            <Grid size={4}>
              <Box
                sx={{
                  backgroundImage: `url(${val.img.src})`,
                  height: "400px",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  width: 350,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  p: 2,
                  borderRadius: 4,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: tradeGothic.style.fontFamily,
                    color: COLORS.WHITE,
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  {val.title}
                </Typography>
                <IconButton sx={{ color: COLORS.WHITE, mt: 3 }}>
                  <ArrowForward />
                </IconButton>
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
