"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Box,
  Stack,
  IconButton,
  Button,
  Container,
  Typography,
  Grid,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Menu, ArrowDropDown, Close } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import logo from "@/public/images/logo/logo.png";
import Link from "next/link";
import { adelle, tradeGothic } from "@/utils/fonts";
import { FOOTER_DATA, HEADER_DATA } from "@/public/data/generic-array";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isPreview = pathname?.includes("/pages") || pathname?.includes("/manage-");

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const getEditorHref = (href: string) => {
    if (!isPreview) return href || "#";

    if (!href || href === "#" || href === "/") return "/pages/home";
    
    const parts = href.split("/");
    const baseRoute = parts[1]; // e.g. "services" from "/services/patent-prosecution"
    
    // If it's a detail page link like /services/patent-prosecution, do not rewrite to the editor page
    if (parts.length > 2 && parts[2]) {
      return href;
    }

    const hasEditorPage = [
      "home", "about-us", "services", "practice-groups", "firm-professionals", 
      "firm-leadership", "insights", "blogs", "careers", "contact-us", 
      "who-we-serve", "privacy-policy", "terms-of-use", "disclaimer"
    ].includes(baseRoute);

    if (hasEditorPage) {
      // e.g. if the original url is /firm-professionals, the editor page is /pages/firm-professionals
      // Note: for firm-professionals specifically, the user has /manage-professionals and /pages/firm-professionals.
      // But the generic one is /pages/[slug]. Let's stick to /pages/baseRoute.
      return `/pages/${baseRoute}`;
    }
    return href;
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: COLORS.HEADER_BG,
          height: 100,
          display: "flex",
          alignItems: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Link href={getEditorHref("/")}>
              <Image src={logo} alt="Slater Matsil logo" priority />
            </Link>
            <Stack
              direction="row"
              alignItems="center"
              onClick={handleMenuToggle}
              sx={{ cursor: "pointer" }}
            >
              <IconButton sx={{ p: 0.5 }}>
                {menuOpen ? (
                  <Close sx={{ color: COLORS.PRIMARY_BLUE }} />
                ) : (
                  <Menu sx={{ color: COLORS.PRIMARY_BLUE }} />
                )}
              </IconButton>
              <Typography
                sx={{
                  mt: 0.6,
                  color: COLORS.PRIMARY_GREEN,
                  textTransform: "uppercase",
                  fontFamily: adelle.style.fontFamily,
                  fontSize: 18,
                  fontWeight: 400,
                  lineHeight: 1,
                }}
              >
                {menuOpen ? "CLOSE" : "MENU"}
              </Typography>
            </Stack>
            {/* <Box
              sx={{
                textTransform: "none",
                backgroundColor: COLORS.PRIMARY_BLUE,
                color: COLORS.WHITE,
                borderRadius: 1,
                px: 2.5,
                py: 0.75,
                "&:hover": { backgroundColor: COLORS.PRIMARY_BLUE },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontFamily: adelle.style.fontFamily,
                  fontSize: 14,
                  lineHeight: "32px",
                  fontWeight: 400,
                }}
              >
                English
              </Typography>
              <ArrowDropDown />
            </Box> */}
          </Stack>
        </Container>
      </Box>

      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: isPreview ? 0 : "50%",
          transform: isPreview
            ? (menuOpen ? "scaleX(1)" : "scaleX(0)")
            : (menuOpen ? "translateX(-50%) scaleX(1)" : "translateX(-50%) scaleX(0)"),
          width: isPreview ? "100%" : "100vw",
          height: isPreview ? "100%" : "100vh",
          backgroundColor: COLORS.WHITE,
          zIndex: menuOpen ? 9 : -1,
          transition:
            "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease",
          transformOrigin: isPreview ? "center" : "center center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <Container maxWidth="lg">
          <Grid container>
            {HEADER_DATA.map((val, i) => (
              <Grid size={4} key={i}>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontFamily: tradeGothic.style.fontFamily,
                    fontWeight: 700,
                    textAlign: "center",
                  }}
                >
                  {val.HEADING}
                </Typography>
                <List>
                  {val.DATA?.map((item, index) => (
                    <Link
                      key={index}
                      href={getEditorHref(item.href || "#")}
                      style={{ textDecoration: "none", color: "inherit" }}
                      onClick={handleMenuToggle}
                    >
                      <ListItemButton
                        sx={{ width: "fit-content", margin: "auto" }}
                      >
                        <ListItemText
                          primary={item.text}
                          slotProps={{
                            primary: {
                              sx: {
                                fontFamily: tradeGothic.style.fontFamily,
                                fontWeight: 400,
                                textAlign: "center",
                              },
                            },
                          }}
                        />
                      </ListItemButton>
                    </Link>
                  ))}
                </List>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Navbar;
