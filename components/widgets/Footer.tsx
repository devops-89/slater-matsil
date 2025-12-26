"use client";
import { COLORS } from "@/utils/enum";
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
      value: details?.homepage?.footerData?.contactData?.email,
    },
    {
      name: "Phone",
      value: details?.homepage?.footerData?.contactData?.phoneNumber,
    },
    {
      name: "Address",
      value: details?.homepage?.footerData?.contactData?.address,
    },
  ];
  return (
    <Box sx={{ backgroundColor: COLORS.PRIMARY_BLUE, height: "100%", py: 10 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {details?.homepage?.footerData?.footer_links.map((val, i) => (
            <Grid size={{ lg: 2, xs: 6 }} key={i}>
              <FooterList DATA={val.DATA} HEADING={val.HEADING} />
            </Grid>
          ))}
          <Grid size={{ lg: 3, xs: 12 }}>
            <Typography
              sx={{
                color: COLORS.WHITE,
                fontSize: 16,
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                lineHeight: "26px",
              }}
            >
              Insights & Updates
            </Typography>
            <Typography
              sx={{
                color: COLORS.FOOTER_TEXT_COLOR,
                fontSize: 16,
                fontFamily: adelle.style.fontFamily,
                fontWeight: 400,
                lineHeight: "26px",
                opacity: 0.5,
                py: 2,
              }}
            >
              Stay updated with industry insights and professional
              opportunities.
            </Typography>

            <TextField
              sx={{
                ...TEXTFIELD_STYLES,
                backgroundColor: COLORS.WHITE,
                mt: 3,
              }}
              fullWidth
              placeholder="Email Address"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        sx={{
                          padding: "14px ",
                          borderRadius: "56px",
                          backgroundColor: COLORS.PRIMARY_BLUE,
                          color: COLORS.WHITE,
                          boxShadow: "0 3px 12px 0 rgba(74, 58, 255, 0.18)",
                          fontFamily: adelle.style.fontFamily,
                          fontWeight: 600,
                          lineHeight: "16px",
                          fontSize: 12,
                        }}
                      >
                        Subscribe
                      </Button>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
          <Grid size={{ lg: 3, xs: 12 }}>
            <Typography
              sx={{
                color: COLORS.WHITE,
                fontSize: 16,
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                lineHeight: "26px",
                mb: 1,
              }}
            >
              Contact Us
            </Typography>
            {contactData.map((val, i) => (
              <Typography
                sx={{
                  fontSize: 16,
                  fontFamily: adelle.style.fontFamily,
                  fontWeight: 600,
                  lineHeight: "31px",
                  color: COLORS.FOOTER_TEXT_COLOR,
                }}
                key={i}
              >
                {val.name} :{" "}
                <Typography
                  component="span"
                  sx={{
                    fontSize: 16,
                    fontFamily: adelle.style.fontFamily,
                    fontWeight: 400,
                    lineHeight: "31px",
                    color: COLORS.FOOTER_TEXT_COLOR,
                  }}
                >
                  {val.value}
                </Typography>
              </Typography>
            ))}
          </Grid>
        </Grid>
        <Divider sx={{ borderColor: "", my: 5 }} />

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={2}
        >
          {details?.homepage?.footerData?.social_links.map((val, i) => (
            <IconButton
              key={i}
              sx={{ color: COLORS.WHITE, border: "1px solid #D0DAF5" }}
            >
              <val.icon />
            </IconButton>
          ))}
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={4}
          sx={{ my: 3 }}
        >
          {details?.homepage?.footerData?.privacy_pages?.map((val, i) => (
            <Link href={val.href || ""} style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  color: COLORS.FOOTER_TEXT_COLOR,
                  fontSize: 14,
                  fontWeight: 700,
                  lineHeight: "26px",
                  fontFamily: tradeGothic.style.fontFamily,
                }}
                key={i}
              >
                {val.title}
              </Typography>
            </Link>
          ))}
        </Stack>

        <Box>
          <Image
            src={details?.homepage?.footerData?.logo || logo}
            alt=""
            style={{ width: "100%", height: "100%" }}
          />
        </Box>

        <Typography
          sx={{
            color: COLORS.WHITE,
            textAlign: "center",
            fontSize: 16,
            fontFamily: tradeGothic.style.fontFamily,
            fontWeight: 400,
            lineHeight: "26px",
            mt: 5,
          }}
        >
          {details?.homepage?.footerData?.copyRightText}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
