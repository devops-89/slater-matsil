import { Box, Typography } from "@mui/material";
import React from "react";
import heroImage from "@/services/details/practice-details-hero.jpg";
import { Container } from "@mui/material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { usePageData } from "@/store/usePageData";
import { getValidImageUrl } from "@/utils/mappers/commonMapper";
import { getUpdatedDetails } from "@/utils/storeUpdater";

const ServicesDetailsHeroSection = ({ apiData }: { apiData?: any }) => {
  const { details: storeDetails } = usePageData();
  const details = apiData ? getUpdatedDetails("services", apiData) : storeDetails;
  const heroData = details?.servicesPage?.heroSection;
  const bgImg = heroData?.img ? getValidImageUrl(heroData.img) : heroImage.src;

  return (
    <div>
      <Container>
        <Box
          style={{ backgroundImage: `url(${bgImg})` }}
          sx={{
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
              // background:
              //   "linear-gradient(270deg, rgba(0, 0, 0, 0.00) 0.02%, #000 82.38%)",
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingLeft: "60px",
              background: "rgba(0, 0, 0, 0.5)",
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
                Global intellectual{" "}
                <Box
                  component="span"
                  sx={{
                    color: COLORS.PRIMARY_GREEN,
                  }}
                >
                  property
                </Box>{" "}
                services
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default ServicesDetailsHeroSection;
