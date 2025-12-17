import React from "react";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import { tradeGothic } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { X } from "@mui/icons-material";

const Followus = () => {
  const SOCIAL_ICONS = [
    {
      icon: FaLinkedinIn,
    },
    {
      icon: FaFacebookF,
    },
    {
      icon: X,
    },
    {
      icon: FaInstagram,
    },
  ];
  return (
    <div>
      <Box>
        <Container maxWidth="lg">
          <Typography
            sx={{
              fontSize: 50,
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 700,
              color: COLORS.PRIMARY_BLUE,
            }}
          >
            Follow Us
          </Typography>

          <Stack direction="row" alignItems={"center"} spacing={2}>
            {SOCIAL_ICONS.map((val, i) => (
              <IconButton
                sx={{
                  backgroundColor: COLORS.PRIMARY_BLUE,
                  "& svg": {
                    color: COLORS.WHITE,
                  },
                }}
                key={i}
              >
                <val.icon />
              </IconButton>
            ))}
          </Stack>
        </Container>
      </Box>
    </div>
  );
};

export default Followus;
