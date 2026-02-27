"use client";
import HeadingStar from "@/components/widgets/Heading-star";
import { COLORS } from "@/utils/enum";
import { SERVICES_DETAILS_DATA_PROPS } from "@/utils/types";
import { adelle, tradeGothic } from "@/utils/fonts";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import lightLogo from "@/home/slater-matsil-logo-light.png";
import Image from "next/image";
import global from "@/icons/globe.svg";
import building from "@/icons/building.svg";
import location from "@/icons/location.svg";
import globeOutline from "@/icons/earth.svg";
import QuickLinksCard from "@/components/widgets/common/Quick-Links-Card";
import { Circle } from "@mui/icons-material";
import { useParams } from "next/navigation";
import { SERVICES_DETAILS } from "@/public/data/generic-array";
const QuickLinksDetails = () => {
  const QUICk_LINKS_DATA = [
    {
      img: building,
      title: "United States Patent and Trademark Office",
    },
    {
      img: global,
      title: "Japan Patent Office",
    },
    {
      img: location,
      title: "Canadian Intellictual Property Office",
    },
    {
      img: globeOutline,
      title: "European Patent Office",
    },
  ];

  // const listItem = [
  //   {
  //     label: "Patent Portfolio Management",
  //   },
  //   {
  //     label:
  //       "Patent Preparation and Prosecution before the United States Patent and Trademark Office",
  //   },
  //   {
  //     label: "International Patent Applications ",
  //   },
  //   {
  //     label: "Reexaminations and Reissues",
  //   },
  //   {
  //     label: "Appeals",
  //   },
  // ];

  const { slug } = useParams();

  // console.log("params", slug);
  const [data, setData] = useState<
    SERVICES_DETAILS_DATA_PROPS | null | undefined
  >(null);

  useEffect(() => {
    const filteredData = SERVICES_DETAILS.find((item) => item.slug === slug);
    setData(filteredData);
  }, [slug]);

  return (
    <Box sx={{ py: 5 }}>
      <Container maxWidth="lg">
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box>
            <HeadingStar title="Services" />
            <Typography
              sx={{
                fontSize: 42,
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                textTransform: "capitalize",
                width: "400px",
                color: COLORS.PRIMARY_BLUE,
                mt: 2,
              }}
            >
              {data?.title}
            </Typography>
          </Box>
          <Image src={lightLogo} alt="" width={400} />
        </Stack>
      </Container>

      <Container maxWidth="lg" sx={{ pt: 5, pb: 2 }}>
        <Grid container>
          {data?.data.map((val, i) => (
            <Grid size={12} key={i}>
              <Typography
                sx={{
                  color: COLORS.TEXT_PRIMARY_4,
                  fontSize: 20,
                  fontFamily: adelle.style.fontFamily,
                  fontWeight: 400,
                  lineHeight: "34px",
                  textTransform: "none",
                  mb: 4,
                  textAlign: "justify",
                  textJustify: "inter-word",
                }}
              >
                {val.description}
              </Typography>
              <List sx={{ p: 0, mb: 4 }}>
                {val.dataList?.map((item, index) => (
                  <ListItem
                    sx={{ alignItems: "flex-start", py: 0.5, px: 0 }}
                    key={index}
                  >
                    <ListItemAvatar sx={{ minWidth: 20 }}>
                      <Circle
                        sx={{ color: COLORS.TEXT_PRIMARY_4, fontSize: 8 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.label}
                      slotProps={{
                        primary: {
                          sx: {
                            color: COLORS.TEXT_PRIMARY_4,
                            fontFamily: adelle.style.fontFamily,
                            fontSize: 20,
                            fontWeight: 400,
                            lineHeight: "28px",
                          },
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box
        sx={{
          backgroundColor: COLORS.PRIMARY_BLUE_LIGHT,
          boxShadow: "0 2.23px 2.98px 0 rgba(0, 0, 0, 0.15)",
          height: "306px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 4,
          mb: 5,
        }}
      >
        <Container maxWidth="lg">
          <Box>
            <Typography
              sx={{
                color: COLORS.PRIMARY_BLUE,
                fontSize: 28,
                fontFamily: adelle.style.fontFamily,
                fontWeight: 600,
                lineHeight: "40px",
                position: "relative",
                zIndex: 1,
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "2px",
                  left: "-4px",
                  right: "-8px",
                  height: "20px",
                  backgroundColor: COLORS.PRIMARY_GREEN,
                  opacity: 0.4,
                  zIndex: -1,
                  transform: "rotate(-2deg)",
                  width: "200px",
                  borderRadius: 8,
                  margin: "auto",
                },
                textAlign: "center",
              }}
            >
              Quick Links
            </Typography>

            <Grid container sx={{ mt: 2 }}>
              {QUICk_LINKS_DATA.map((val, i) => (
                <Grid size={3} key={i}>
                  <QuickLinksCard img={val.img} title={val.title} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default QuickLinksDetails;
