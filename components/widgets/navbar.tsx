"use client";

import React from "react";
import Image from "next/image";
import { Box, Stack, IconButton, Button, Container } from "@mui/material";
import { Menu, ArrowDropDown } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import logo from "@/public/images/logo/logo.png";

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
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          {/* Left: Menu icon */}
          <IconButton edge="start" aria-label="menu">
            <Menu />
          </IconButton>

          {/* Center: Logo */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Image src={logo} alt="Slater Matsil logo" priority />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              minWidth: 120,
            }}
          >
            <Button
              variant="contained"
              endIcon={<ArrowDropDown />}
              aria-haspopup="menu"
              sx={{
                textTransform: "none",
                backgroundColor: "#0D5F6E",
                color: "#fff",
                borderRadius: 1,
                px: 2.5,
                py: 0.75,
                fontSize: 14,
                "&:hover": { backgroundColor: "#0B4E5B" },
              }}
            >
              English
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;
