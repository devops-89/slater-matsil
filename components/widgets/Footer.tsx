"use client";
import { COLORS } from "@/utils/enum";
import { FOOTER_DATA } from "@/public/data/generic-array";
import { FaLinkedinIn } from "react-icons/fa";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FooterList from "./Footer-List";
import { usePageData } from "@/store/usePageData";
import Link from "next/link";
import { adelle, tradeGothic } from "@/utils/fonts";
import Image from "next/image";
import logo from "@/logo/big-logo.png";
import { TEXTFIELD_STYLES } from "@/utils/styles";
const Footer = () => {
  const { details } = usePageData();

  const contactData = [
    {
      name: "Email",
      value: details?.homepage?.footerData?.contactData?.email || "info@slatermatsil.com",
    },
    {
      name: "Phone",
      value: details?.homepage?.footerData?.contactData?.phoneNumber || "972.732.1001",
    },
    {
      name: "Address",
      value: details?.homepage?.footerData?.contactData?.address || "17304 Preston Rd, Suite 900, Dallas, TX 75252",
    },
  ];
  return (
    <Box
      sx={{
        backgroundColor: COLORS.PRIMARY_BLUE,
        py: { xs: 6, md: 10 },
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 4, md: 8 }}
          justifyContent="space-between"
        >
          {(details?.homepage?.footerData?.footer_links?.length ? details.homepage.footerData.footer_links : FOOTER_DATA).map((val: any, i: number) => (
            <Grid size={{ md: 4.5, sm: 6, xs: 12 }} key={i}>
              <FooterList DATA={val.DATA} HEADING={val.HEADING} />
            </Grid>
          ))}
          <Grid size={{ md: 3, sm: 6, xs: 12 }}>
            <Typography
              sx={{
                color: COLORS.WHITE,
                fontSize: 18,
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                lineHeight: "26px",
                mb: 2,
              }}
            >
              Contact Us
            </Typography>
            <Stack spacing={2}>
              {contactData.map((val, i) => (
                <Box key={i}>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontFamily: tradeGothic.style.fontFamily,
                      fontWeight: 700,
                      color: COLORS.FOOTER_TEXT_COLOR,
                      opacity: 0.6,
                      mb: 0.5,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {val.name}
                  </Typography>
                  {val.name === "Email" ? (
                    <a href={`mailto:${val.value}`} style={{ textDecoration: "none" }}>
                      <Typography
                        sx={{
                          fontSize: 16,
                          fontFamily: adelle.style.fontFamily,
                          fontWeight: 400,
                          color: COLORS.WHITE,
                          lineHeight: "24px",
                          cursor: "pointer",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        {val.value}
                      </Typography>
                    </a>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: 16,
                        fontFamily: adelle.style.fontFamily,
                        fontWeight: 400,
                        color: COLORS.WHITE,
                        lineHeight: "24px",
                      }}
                    >
                      {val.value}
                    </Typography>
                  )}
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 6 }} />

        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="space-between"
          direction={{ xs: "column-reverse", md: "row" }}
        >
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Box sx={{ maxWidth: 200, mx: { xs: "auto", md: 0 } }}>
                <Image
                  src={details?.homepage?.footerData?.logo || logo}
                  alt="Slater Matsil Logo"
                  style={{ width: "100%", height: "auto" }}
                />
              </Box>
              <Divider
                orientation="vertical"
                sx={{
                  height: 50,
                  opacity: 1,
                  borderWidth: 2,
                  borderColor: COLORS.PRIMARY_GREEN,
                }}
              />
              <Typography
                sx={{
                  color: COLORS.FOOTER_TEXT_COLOR,
                  fontSize: 12,
                  fontFamily: adelle.style.fontFamily,
                  fontWeight: 400,
                  opacity: 0.6,
                  mt: 2,
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Fluent in technology. Proven in law.{" "}
              </Typography>
            </Stack>
            <Typography
              sx={{
                color: COLORS.FOOTER_TEXT_COLOR,
                fontSize: 12,
                fontFamily: adelle.style.fontFamily,
                fontWeight: 400,
                opacity: 0.6,
                mt: 2,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              {details?.homepage?.footerData?.copyRightText || "© 2016 - 2026 Slater Matsil, LLP | Dallas, TX | All Rights Reserved"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems="center"
              justifyContent={{ xs: "center", md: "flex-end" }}
              spacing={{ xs: 2, sm: 4 }}
            >
              <Stack direction="row" spacing={3}>
                {(details?.homepage?.footerData?.privacy_pages?.length ? details.homepage.footerData.privacy_pages : [
                  { title: "Terms", href: "/terms-of-use" },
                  { title: "Privacy", href: "/privacy-policy" },
                  { title: "Disclaimer", href: "/disclaimer" }
                ]).map((val: any, i: number) => (
                  <Link
                    href={val.href || ""}
                    key={i}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography
                      sx={{
                        color: COLORS.FOOTER_TEXT_COLOR,
                        fontSize: 14,
                        fontFamily: tradeGothic.style.fontFamily,
                        fontWeight: 600,
                        transition: "color 0.2s",
                        "&:hover": {
                          color: COLORS.WHITE,
                        },
                      }}
                    >
                      {val.title}
                    </Typography>
                  </Link>
                ))}
              </Stack>
              <Stack direction="row" spacing={2}>
                {(details?.homepage?.footerData?.social_links?.length ? details.homepage.footerData.social_links : [
                  { icon: FaLinkedinIn, href: "https://www.linkedin.com/company/slater-&-matsil-l-l-p-/" }
                ]).map((val: any, i: number) => (
                  <a
                    key={i}
                    href={val.href || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={val.title || "Social Media Link"}
                  >
                    <IconButton
                      sx={{
                        color: COLORS.WHITE,
                        border: `1px solid ${COLORS.FOOTER_TEXT_COLOR}`,
                        opacity: 0.8,
                        "&:hover": {
                          backgroundColor: COLORS.WHITE,
                          color: COLORS.PRIMARY_BLUE,
                          opacity: 1,
                        },
                      }}
                    >
                      <val.icon fontSize="small" />
                    </IconButton>
                  </a>
                ))}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
