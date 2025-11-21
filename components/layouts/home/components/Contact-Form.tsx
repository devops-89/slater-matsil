import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { Box, Typography } from "@mui/material";
import React from "react";

const ContactForm = () => {
  return (
    <Box>
      <Typography
        sx={{
          color: COLORS.PRIMARY_BLUE,
          fontSize: 30,
          fontfamily: adelle.style.fontFamily,
          fontWeight: 600,
        }}
      >
        Let's Connect
      </Typography>
    </Box>
  );
};

export default ContactForm;
