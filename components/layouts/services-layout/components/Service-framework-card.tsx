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

const ServiceFrameworkCard = ({
  heading,
  data,
}: SERVICE_FRAMEWORK_CARD_PROPS) => {
  return (
    <Box sx={{ height: "100%", display: "flex" }}>
      <Box
        sx={{
          backgroundColor: COLORS.WHITE,
          border: "1px solid #EEE",
          borderRadius: "32px",
          p: 4,
          flex: 1,
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Typography
          sx={{
            color: COLORS.BLACK,
            fontSize: { lg: 20, xs: 10 },
            fontFamily: adelle.style.fontFamily,
            fontWeight: 600,
            lineHeight: { lg: "43px", xs: "26px" },
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
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
                      fontSize: { lg: 18, xs: 18 },
                      fontFamily: adelle.style.fontFamily,
                      fontWeight: 400,
                      lineHeight: { lg: "26px", xs: "20px" },
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
