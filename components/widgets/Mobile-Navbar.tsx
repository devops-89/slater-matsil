"use client";
import logo from "@/logo/logo.png";
import { COLORS } from "@/utils/enum";
import { Box, Stack } from "@mui/material";
import Hamburger from "hamburger-react";
import Image from "next/image";
import { useState } from "react";
const MobileNavbar = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <Box>
        <Stack
          direction={"row"}
          alignItems="center"
          justifyContent="space-between"
          sx={{ p: 2 }}
        >
          <Image src={logo} alt="" width={180} />
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            color={COLORS.PRIMARY_BLUE}
            size={20}
          />
        </Stack>
      </Box>
    </div>
  );
};

export default MobileNavbar;
