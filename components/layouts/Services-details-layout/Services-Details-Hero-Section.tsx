import { Box, Typography } from "@mui/material";
import React from "react";
import heroImage from "@/services/details/hero-image.jpg";
import { Container } from "@mui/material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
const ServicesDetailsHeroSection = () => {
  return (
    <div>
      <Container>
        <Box
          sx={{
            backgroundImage: `url(${heroImage.src})`,
            height: "80vh",
            borderRadius: "20px",
            backgroundPosition: "center 20%",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            sx={{
              background:
                "linear-gradient(270deg, rgba(0, 0, 0, 0.00) 0.02%, #000 82.38%)",
              height: "100%",
              width: "55%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingLeft: "60px",
            }}
          >
            <Box sx={{ maxWidth: "500px" }}>
              <Box
                sx={{
                  backgroundColor: COLORS.PRIMARY_BLUE,
                  padding: "12px 24px",
                  borderRadius: "999px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "56px",
                  marginBottom: "24px",
                }}
              >
                <Typography
                  sx={{
                    color: COLORS.WHITE,
                    fontFamily: adelle.style.fontFamily,
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: 400,
                    lineHeight: "24px",
                    letterSpacing: "-0.54px",
                  }}
                >
                  A RANGE OF PRACTICE AREAS
                </Typography>
              </Box>

              <Typography
                sx={{
                  color: COLORS.WHITE,
                  fontFamily: tradeGothic.style.fontFamily,
                  fontSize: { xs: 36, md: 48 },
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                Guiding Your{" "}
                <Box
                  component="span"
                  sx={{
                    color: COLORS.PRIMARY_GREEN,
                  }}
                >
                  Patent
                </Box>{" "}
                From Application to Approval
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default ServicesDetailsHeroSection;
