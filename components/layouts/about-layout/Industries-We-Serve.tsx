"use client";
import { CAREER_HOME_DATA } from "@/public/data/generic-array";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { ArrowForward } from "@mui/icons-material";
import {
  Box,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

const IndustriesWeServe = () => {
  const { details } = usePageData();
  const rawCards = details?.aboutPage?.industriesWeServe?.cards;
  const cards = rawCards && rawCards.length > 0 ? rawCards : CAREER_HOME_DATA;

  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container spacing={{ lg: 10, xs: 4 }}>
          <Grid size={{ lg: 4, xs: 12 }}>
            <Stack
              direction={{ lg: "column", xs: "row" }}
              spacing={{ lg: 0, xs: 2 }}
            >
              <Typography
                sx={{
                  color: COLORS.PRIMARY_BLUE,
                  fontSize: { lg: 50, xs: 30 },
                  fontWeight: { lg: 700, xs: 500 },
                  lineHeight: { lg: "55px", xs: "35px" },
                  letterSpacing: "-3px",
                  fontFamily: tradeGothic.style.fontFamily,
                }}
              >
                {details?.aboutPage?.industriesWeServe?.heading1}
              </Typography>
              <Typography
                sx={{
                  color: COLORS.BLACK,
                  fontSize: { lg: 50, xs: 30 },
                  fontFamily: tradeGothic.style.fontFamily,
                  fontWeight: { lg: 700, xs: 500 },
                  letterSpacing: "-2px",
                  lineHeight: { lg: "55px", xs: "35px" },
                  ml: 1,
                  position: "relative",
                  zIndex: 1,
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "10px",
                    left: "-4px",
                    right: "-8px",
                    height: { lg: "20px", xs: "10px" },
                    backgroundColor: COLORS.PRIMARY_GREEN,
                    opacity: 0.4,
                    zIndex: -1,
                    transform: "rotate(-2deg)",
                    width: { lg: 250, xs: 150 },
                    borderRadius: "20px",
                  },
                }}
              >
                {details?.aboutPage?.industriesWeServe?.heading2}
              </Typography>
            </Stack>
            <Typography
              sx={{
                fontFamily: adelle.style.fontFamily,
                fontSize: { lg: 20, xs: 15 },
                textAlign: "justify",
                fontWeight: 300,
                lineHeight: { lg: "30px", xs: "25px" },
                mt: 3,
              }}
            >
              {details?.aboutPage?.industriesWeServe?.description}
            </Typography>
          </Grid>
          <Grid size={{ lg: 8, xs: 12 }}>
            <Grid container spacing={4}>
              {(details?.aboutPage?.industriesWeServe?.section_data || []).map(
                (val: any, i: number) => (
                  <Grid size={{ lg: 4, xs: 6 }} key={i}>
                    <List>
                      {val.dataList.map((item: any, index: number) => (
                        <ListItem key={index} disablePadding>
                          <ListItemText
                            primary={item.label}
                            slotProps={{
                              primary: {
                                fontSize: { lg: 20, xs: 15 },
                                fontFamily: adelle.style.fontFamily,
                                color: COLORS.PRIMARY_BLUE,
                                fontWeight: 700,
                                lineHeight: { lg: "45px", xs: "25px" },
                                textTransform: "capitalize",
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                ),
              )}
            </Grid>
          </Grid>
        </Grid>

        {/* Feature Cards under Industries We Serve */}
        <Box sx={{ mt: { lg: 8, xs: 5 } }}>
          <Grid container spacing={4}>
            {cards.map((val: any, i: number) => {
              const bgUrl =
                val.imageDownloadUrl ||
                (typeof val.img === "string" ? val.img : val.img?.src) ||
                val.imageUrl ||
                "";
              return (
                <Grid
                  suppressHydrationWarning
                  size={{ lg: 4, xs: 12 }}
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 150}
                >
                  <Link href={val.href || "#"} style={{ textDecoration: "none", display: "block" }}>
                    <Box
                      sx={{
                        backgroundImage: `url(${bgUrl})`,
                        height: "400px",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        width: { lg: 350, xs: "100%" },
                        borderRadius: 4,
                        position: "relative",
                        overflow: "hidden",
                        transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                        cursor: "pointer",
                        border: "1px solid transparent",
                        "&:hover": {
                          transform: "translateY(-10px)",
                          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                          border: `1px solid ${COLORS.PRIMARY_BLUE}`,
                          "& .overlay-box": {
                            background:
                              "linear-gradient(to top, rgba(13,95,110,0.9), rgba(0,0,0,0))",
                            paddingBottom: "20px",
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
                            backgroundColor: "rgba(255,255,255,0.2)",
                            color: COLORS.WHITE,
                            transition: "all 0.3s ease",
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
              );
            })}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default IndustriesWeServe;
