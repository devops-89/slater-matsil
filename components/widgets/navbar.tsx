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

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
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
            <Link href="/">
              <Image src={logo} alt="Slater Matsil logo" priority />
            </Link>
            <Stack direction="row" alignItems="center">
              <IconButton onClick={handleMenuToggle}>
                {menuOpen ? (
                  <Close sx={{ color: COLORS.PRIMARY_BLUE }} />
                ) : (
                  <Menu sx={{ color: COLORS.PRIMARY_BLUE }} />
                )}
              </IconButton>
              <Typography
                sx={{
                  color: COLORS.PRIMARY_GREEN,
                  textTransform: "uppercase",
                  fontFamily: adelle.style.fontFamily,
                  fontSize: 18,
                  fontWeight: 400,
                  lineHeight: "32px",
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
          left: "50%",
          transform: menuOpen
            ? "translateX(-50%) scaleX(1)"
            : "translateX(-50%) scaleX(0)",
          width: "100vw",
          height: "100vh",
          backgroundColor: COLORS.WHITE,
          zIndex: menuOpen ? 9 : -1,
          transition:
            "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease",
          transformOrigin: "center center",
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
                      href={item.href || "#"}
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
