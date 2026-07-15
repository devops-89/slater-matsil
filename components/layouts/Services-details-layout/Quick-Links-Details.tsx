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
import Link from "next/link";
import { SERVICES_DETAILS } from "@/public/data/generic-array";
import { usePageData } from "@/store/usePageData";
const QuickLinksDetails = () => {
  const QUICk_LINKS_DATA = [
    {
      img: globeOutline,
      title: "The European Patent Office (EPO)",
      href: "http://www.epo.org/index.html",
    },
    {
      img: globeOutline,
      title: "The American Intellectual Property Law Association (AIPLA)",
      href: "https://www.aipla.org/",
    },
    {
      img: globeOutline,
      title: "The International Trademark Association (INTA)",
      href: "http://www.inta.org/Pages/Home.aspx",
    },
    {
      img: building,
      title: "China National Intellectual Property Administration (CNIPA)",
      href: "https://english.cnipa.gov.cn/",
    },
    {
      img: global,
      title: "The World Intellectual Property Organization (WIPO)",
      href: "http://www.wipo.int/portal/en/index.html",
    },
    {
      img: building,
      title: "The United States Patent & Trademark Office (USPTO)",
      href: "http://www.uspto.gov/",
    },
    {
      img: global,
      title: "The Japanese Patent Office (JPO)",
      href: "http://www.jpo.go.jp/",
    },
    {
      img: location,
      title: "The Canadian Intellectual Property Office (CIPO)",
      href: "http://www.ic.gc.ca/eic/site/cipointernet-internetopic.nsf/eng/Home?OpenDocument",
    },
  ];

  const { slug } = useParams();

  const [data, setData] = useState<
    SERVICES_DETAILS_DATA_PROPS | null | undefined
  >(null);

  const [navigation, setNavigation] = useState<{
    prev: { slug: string; title: string } | null;
    next: { slug: string; title: string } | null;
  }>({ prev: null, next: null });

  const { details } = usePageData();
  const serviceAreasData = details?.homepage?.service_area?.section_Data || SERVICES_DETAILS;

  useEffect(() => {
    const currentIndex = serviceAreasData.findIndex(
      (item: any) => item.slug === slug,
    );
    if (currentIndex !== -1) {
      const serviceAreaItem: any = serviceAreasData[currentIndex];
      
      setData({
        title: serviceAreaItem.title,
        data: serviceAreaItem.detailsData || [],
        slug: serviceAreaItem.slug
      } as any);

      const prev: any = currentIndex > 0 ? serviceAreasData[currentIndex - 1] : null;
      const next: any =
        currentIndex < serviceAreasData.length - 1
          ? serviceAreasData[currentIndex + 1]
          : null;

      setNavigation({
        prev: prev ? { slug: prev.slug, title: prev.title } : null,
        next: next ? { slug: next.slug, title: next.title } : null,
      });
    }
  }, [slug, serviceAreasData]);

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

      {/* Navigation Buttons */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            py: 4,
            borderTop: `1px solid ${COLORS.PRIMARY_BLUE}20`,
            borderBottom: `1px solid ${COLORS.PRIMARY_BLUE}20`,
          }}
        >
          <Box sx={{ minWidth: "200px" }}>
            {navigation.prev && (
              <Link
                href={`/services/${navigation.prev.slug}`}
                style={{ textDecoration: "none" }}
              >
                <Stack direction="column" spacing={0.5}>
                  <Typography
                    sx={{
                      color: COLORS.PRIMARY_BLUE,
                      fontSize: 14,
                      fontFamily: tradeGothic.style.fontFamily,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      opacity: 0.7,
                    }}
                  >
                    ← Previous Service
                  </Typography>
                  <Typography
                    sx={{
                      color: COLORS.PRIMARY_BLUE,
                      fontSize: 18,
                      fontFamily: adelle.style.fontFamily,
                      fontWeight: 700,
                      "&:hover": { color: COLORS.PRIMARY_GREEN },
                      transition: "color 0.3s ease",
                      textTransform: "uppercase",
                    }}
                  >
                    {navigation.prev.title}
                  </Typography>
                </Stack>
              </Link>
            )}
          </Box>
          <Box sx={{ minWidth: "200px", textAlign: "right" }}>
            {navigation.next && (
              <Link
                href={`/services/${navigation.next.slug}`}
                style={{ textDecoration: "none" }}
              >
                <Stack direction="column" spacing={0.5} alignItems="flex-end">
                  <Typography
                    sx={{
                      color: COLORS.PRIMARY_BLUE,
                      fontSize: 14,
                      fontFamily: tradeGothic.style.fontFamily,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      opacity: 0.7,
                    }}
                  >
                    Next Service →
                  </Typography>
                  <Typography
                    sx={{
                      color: COLORS.PRIMARY_BLUE,
                      fontSize: 18,
                      fontFamily: adelle.style.fontFamily,
                      fontWeight: 700,
                      "&:hover": { color: COLORS.PRIMARY_GREEN },
                      transition: "color 0.3s ease",
                      textTransform: "uppercase",
                    }}
                  >
                    {navigation.next.title}
                  </Typography>
                </Stack>
              </Link>
            )}
          </Box>
        </Stack>
      </Container>

      <Box
        sx={{
          backgroundColor: COLORS.PRIMARY_BLUE_LIGHT,
          boxShadow: "0 2.23px 2.98px 0 rgba(0, 0, 0, 0.15)",
          py: 8,
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

            <Grid container spacing={4} sx={{ mt: 4 }}>
              {QUICk_LINKS_DATA.map((val, i) => (
                <Grid size={{ lg: 3, md: 6, xs: 12 }} key={i}>
                  <QuickLinksCard
                    img={val.img}
                    title={val.title}
                    href={val.href}
                  />
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
