import { COLORS } from "@/utils/enum";
import { contact_field_styles, contact_field_styles_2 } from "@/utils/styles";
import { CONTACT_US_CARD_PROPS } from "@/utils/types";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const ContactCard = ({ Icon, heading, value }: CONTACT_US_CARD_PROPS) => {
  return (
    <div>
      <Box
        sx={{
          backgroundColor: COLORS.PRIMARY_BLUE_LIGHT,
          padding: "20px 41px",
          borderRadius: "16px",
          //   height: "182px",
        }}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Box
            sx={{
              backgroundColor: COLORS.PRIMARY_BLUE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 50,
              height: 50,
              borderRadius: "50%",
              color: COLORS.WHITE,
            }}
          >
            <Icon />
          </Box>
          <Box>
            <Typography sx={{ ...contact_field_styles }}>{heading}</Typography>
            <Typography sx={{ ...contact_field_styles_2 }}>{value}</Typography>
          </Box>
        </Stack>
      </Box>
    </div>
  );
};

export default ContactCard;
