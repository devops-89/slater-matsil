import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { SERVICE_FRAMEWORK_CARD_PROPS } from "@/utils/types";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

const ServiceFrameworkCard = ({
  heading,
  data,
}: SERVICE_FRAMEWORK_CARD_PROPS) => {
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: COLORS.WHITE,
          border: "1px solid #EEE",
          borderRadius: "32px",
          p: 4,
        }}
      >
        <Typography
          sx={{
            color: COLORS.BLACK,
            fontSize: 20,
            fontFamily: adelle.style.fontFamily,
            fontWeight: 600,
            lineHeight: "43px",
          }}
        >
          {heading}
        </Typography>
        <Divider
          sx={{
            width: 80,
            borderColor: COLORS.PRIMARY_BLUE,
            borderWidth: 3,
            borderRadius: "17px",
          }}
        />

        <List sx={{ mt: 2 }}>
          {data.map((val, i) => (
            <ListItem disablePadding key={i}>
              <ListItemText
                primary={val.title}
                slotProps={{
                  primary: {
                    sx: {
                      color: COLORS.TEXT_PRIMARY_4,
                      fontSize: 18,
                      fontFamily: adelle.style.fontFamily,
                      fontWeight: 400,
                      lineHeight: "26px",
                    },
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ServiceFrameworkCard;
