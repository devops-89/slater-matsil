"use client";
import { COLORS } from "@/utils/enum";
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import FooterList from "./Footer-List";
import { usePageData } from "@/store/usePageData";
import Link from "next/link";
import { tradeGothic } from "@/utils/fonts";
import Image from "next/image";
import logo from "@/logo/big-logo.png";
const Footer = () => {
  const { details } = usePageData();
  return (
    <Box sx={{ backgroundColor: COLORS.PRIMARY_BLUE, height: "100%", py: 10 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {details?.homepage?.footerData?.footer_links.map((val, i) => (
            <Grid size={2} key={i}>
              <FooterList DATA={val.DATA} HEADING={val.HEADING} />
            </Grid>
          ))}
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
