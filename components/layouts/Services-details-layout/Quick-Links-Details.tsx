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
import { usePageData } from "@/store/usePageData";
import { generateSlug } from "@/utils/mappers/servicesMapper";

interface QuickLinksDetailsProps {
  slug?: string;
  pageData?: any;
}

const QuickLinksDetails = ({ slug: propSlug, pageData }: QuickLinksDetailsProps) => {
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

  const params = useParams();
  const rawSlug = (propSlug || params?.slug || "") as string;

  const [data, setData] = useState<
    SERVICES_DETAILS_DATA_PROPS | null | undefined
  >(null);

  const [navigation, setNavigation] = useState<{
    prev: { slug: string; title: string } | null;
    next: { slug: string; title: string } | null;
  }>({ prev: null, next: null });

  const { details } = usePageData();
  const sections = pageData?.sections || [];
  const saSection = sections.find((s: any) => s.sectionKey === "service_areas");
  const rawServiceAreas = saSection?.data?.section_Data;
  const serviceAreasData = rawServiceAreas || details?.homepage?.service_area?.section_Data || [];

  useEffect(() => {
    if (!serviceAreasData || serviceAreasData.length === 0) return;

    const normalize = (s: string) => {
      return (s || "")
        .toLowerCase()
        .trim()
        .replace(/[/\\_]+/g, "-")
        .replace(/[^a-z0-9-]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
    };

    const targetSlug = rawSlug.trim();

    const currentIndex = serviceAreasData.findIndex((item: any) => {
      const itemSlug = (item.slug || "").trim();
      const titleSlug = generateSlug(item.title || "");
      return (
        itemSlug === targetSlug ||
        titleSlug === targetSlug ||
        normalize(itemSlug) === normalize(targetSlug) ||
        normalize(titleSlug) === normalize(targetSlug)
      );
    });

    if (currentIndex !== -1) {
      const serviceAreaItem: any = serviceAreasData[currentIndex];
      
      const detailsList =
        serviceAreaItem.detailsData && serviceAreaItem.detailsData.length > 0
          ? serviceAreaItem.detailsData
          : serviceAreaItem.description
          ? [{ description: serviceAreaItem.description }]
          : [];

      setData({
        title: serviceAreaItem.title,
        data: detailsList,
        slug: serviceAreaItem.slug || generateSlug(serviceAreaItem.title || ""),
      } as any);

      const prev: any = currentIndex > 0 ? serviceAreasData[currentIndex - 1] : null;
      const next: any =
        currentIndex < serviceAreasData.length - 1
          ? serviceAreasData[currentIndex + 1]
          : null;

      setNavigation({
        prev: prev
          ? {
              slug: prev.slug || generateSlug(prev.title || ""),
              title: prev.title,
            }
          : null,
        next: next
          ? {
              slug: next.slug || generateSlug(next.title || ""),
              title: next.title,
            }
          : null,
      });
    }
  }, [rawSlug, serviceAreasData, pageData]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const shouldScroll =
      window.location.hash === "#service-details" ||
      sessionStorage.getItem("scrollToServiceDetails") === "true";

    if (shouldScroll) {
      sessionStorage.removeItem("scrollToServiceDetails");

      const scrollToDetails = () => {
        const el = document.getElementById("service-details");
        if (el) {
          const isMobile = window.innerWidth < 900;
          const offset = isMobile ? 85 : 0;
          const rect = el.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetY = Math.max(0, rect.top + scrollTop - offset);
          window.scrollTo({
            top: targetY,
            behavior: "smooth",
          });
        }
      };

      scrollToDetails();
      const t1 = setTimeout(scrollToDetails, 100);
      const t2 = setTimeout(scrollToDetails, 350);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [rawSlug]);

  const handleNavClick = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("scrollToServiceDetails", "true");
    }
  };

  return (
    <Box id="service-details" sx={{ py: 5, scrollMarginTop: { xs: "85px", md: "0px" } }}>
      <Container maxWidth="lg">
                <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent={"space-between"}
          spacing={{ xs: 3, md: 4 }}
        >
          <Box sx={{ flex: 1, maxWidth: { md: "700px", xs: "100%" } }}>
            <HeadingStar title="Services" />
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 32, sm: 38, md: 44 },
                lineHeight: 1.25,
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                textTransform: "capitalize",
                color: COLORS.PRIMARY_BLUE,
                wordBreak: "normal",
                overflowWrap: "break-word",
                mt: 2,
              }}
            >
              {data?.title ? data.title.replace(/\/(?=[^\s])/g, "/ ") : ""}
            </Typography>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              flexShrink: 0,
              maxWidth: "360px",
            }}
          >
            <Image
              src={lightLogo}
              alt="Slater Matsil"
              width={360}
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
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
                href={`/services/${navigation.prev.slug}#service-details`}
                scroll={false}
                onClick={handleNavClick}
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
                href={`/services/${navigation.next.slug}#service-details`}
                scroll={false}
                onClick={handleNavClick}
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
