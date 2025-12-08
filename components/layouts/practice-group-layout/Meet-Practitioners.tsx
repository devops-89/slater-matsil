import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { Circle } from "@mui/icons-material";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

const MeetPractitioners = () => {
  return (
    <Box>
      <Container maxWidth={"lg"}>
        <Typography
          sx={{
            color: COLORS.PRIMARY_BLUE,
            fontSize: 30,
            fontFamily: tradeGothic.style.fontFamily,
            fontWeight: 700,
            letterSpacing: "-2px",
            lineHeight: "55px",
            ml: 1,
            position: "relative",
            zIndex: 1,
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: "10px",
              left: "-4px",
              right: "-8px",
              height: "20px",
              backgroundColor: COLORS.PRIMARY_GREEN,
              opacity: 0.4,
              zIndex: -1,
              transform: "rotate(-2deg)",
              width: 350,
              borderRadius: 2,
            },
          }}
        >
          Meet our practitioners:
        </Typography>
        <Grid container>
          <Grid size={9}>
            <List>
              <ListItem sx={{ alignItems: "flex-start" }}>
                <ListItemAvatar sx={{ mt: 2, minWidth: 30 }}>
                  <Circle sx={{ color: COLORS.PRIMARY_BLUE, fontSize: 10 }} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    "Benjamin E. Nise, J.D., B.S.E.E. , Group Leader, Partner & Patent Attorney - "
                  }
                  secondary={
                    "15 Years of design Experience in analog, RF, & Mixed Signal Integrated Circuits for the telecommunications, semiconductor, & medical device industries."
                  }
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: 24,
                        fontFamily: tradeGothic.style.fontFamily,
                        fontWeight: 700,
                        lineHeight: "40px",
                        textTransform: "capitalize",
                        color: COLORS.PRIMARY_BLUE,
                      },
                    },
                    secondary: {
                      sx: {
                        fontSize: 16,
                        fontFamily: tradeGothic.style.fontFamily,
                        fontWeight: 500,
                        lineHeight: "30px",
                        textTransform: "capitalize",
                        color: COLORS.TEXT_PRIMARY_4,
                      },
                    },
                  }}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MeetPractitioners;
