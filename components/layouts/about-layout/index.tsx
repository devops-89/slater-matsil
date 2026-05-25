"use client";
import InsightsSection from "@/components/widgets/Insights-section";
import { CAREER_HOME_DATA } from "@/public/data/generic-array";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { ArrowForward } from "@mui/icons-material";
import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import RedefiningPatent from "../../widgets/Redefining-Patent";
import AboutHerosection from "./About-Herosection";
import Award from "./Award";
import DrivingInnovation from "./Driving-innovation";
import IndustriesWeServe from "./Industries-We-Serve";
import InsightsInnovation from "./Insights-innovation";
import WhoweServe from "./Who-we-serve";
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
            <Grid
              suppressHydrationWarning
              size={{ lg: 4, xs: 12 }}
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 150}
            >
              <Link href={val.href} style={{ textDecoration: "none", display: "block" }}>
              <Box
                sx={{
                  backgroundImage: `url(${val.img.src})`,
                  height: "400px",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  width: { lg: 350, xs: "100%" },

                  borderRadius: 4,
                  // pb: 1, // Removed to allow full gradient
                  position: "relative",
                  overflow: "hidden", // Important for cleaner borders and rounded edges on zoom
                  transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                  cursor: "pointer",
                  border: "1px solid transparent",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                    border: `1px solid ${COLORS.PRIMARY_BLUE}`,
                    "& .overlay-box": {
                      background:
                        "linear-gradient(to top, rgba(13,95,110,0.9), rgba(0,0,0,0))", // PRIMARY_BLUE dark
                      paddingBottom: "20px", // Subtle lift feeling for content
                    },
                    "& .arrow-icon": {
                      transform: "translateX(5px) scale(1.1)",
                      backgroundColor: COLORS.WHITE,
                      color: COLORS.PRIMARY_BLUE,
                    },
                    "& .card-title": {
                      transform: "translateY(-5px)",
                    },
                  },
                }}
              >
                <Box
                  className="overlay-box"
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    height: "100%",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1))",
                    px: 3,
                    pb: 2,
                    borderRadius: 4,
                    transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                  }}
                >
                  <Typography
                    className="card-title"
                    sx={{
                      fontFamily: tradeGothic.style.fontFamily,
                      color: COLORS.WHITE,
                      fontSize: 22,
                      fontWeight: 700,
                      lineHeight: "28px",
                      maxWidth: "200px",
                      transition: "transform 0.3s ease",
                      textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    {val.title}
                  </Typography>
                    <IconButton
                      className="arrow-icon"
                      sx={{
                        color: COLORS.WHITE,
                        backgroundColor: "rgba(255,255,255,0.1)",
                        backdropFilter: "blur(5px)",
                        mt: 0,
                        transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                        "&:hover": {
                          backgroundColor: COLORS.WHITE,
                          color: COLORS.PRIMARY_BLUE,
                        },
                      }}
                    >
                      <ArrowForward />
                    </IconButton>
                </Box>
              </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
      <InsightsSection />
    </div>
  );
};

export default AboutLayout;
