import { COLORS } from "@/utils/enum";
import { Menu } from "@mui/icons-material";
import { Box, IconButton, Stack } from "@mui/material";
import Image from "next/image";
import React from "react";
import logo from "@/public/images/logo/logo.png";
const Navbar = () => {
  return (
    <Box sx={{ backgroundColor: COLORS.HEADER_BG, height: "100px" }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <IconButton>
          <Menu />
        </IconButton>
        <Image src={logo} alt="" />
        {/* < */}
      </Stack>
    </Box>
  );
};

export default Navbar;
