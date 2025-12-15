"use client";

import React from "react";
import Image from "next/image";
import {
  Box,
  Stack,
  IconButton,
  Button,
  Container,
  Typography,
} from "@mui/material";
import { Menu, ArrowDropDown } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import logo from "@/public/images/logo/logo.png";
import Link from "next/link";
import { adelle } from "@/utils/fonts";

const Navbar = () => {
  return (
    <Box
      sx={{
        backgroundColor: COLORS.HEADER_BG,
        height: 100,
        display: "flex",
        alignItems: "center",
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
            <IconButton>
              <Menu sx={{ color: COLORS.PRIMARY_BLUE }} />
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
              MENU
            </Typography>
          </Stack>
          <Box
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
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;
