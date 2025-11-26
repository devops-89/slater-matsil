import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

const IndustriesWeServe = () => {
  const { details } = usePageData();
  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container spacing={10}>
          <Grid size={4}>
            <Typography
              sx={{
                color: COLORS.PRIMARY_BLUE,
                fontSize: 50,
                fontWeight: 700,
                lineHeight: "55px",
                letterSpacing: "-3px",
                fontFamily: tradeGothic.style.fontFamily,
              }}
            >
              {details?.aboutPage?.industriesWeServe?.heading1}
            </Typography>
            <Typography
              sx={{
                color: COLORS.BLACK,
                fontSize: 50,
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
                  width: 250,
                },
              }}
            >
              {details?.aboutPage?.industriesWeServe?.heading2}
            </Typography>
            <Typography
              sx={{
                fontFamily: adelle.style.fontFamily,
                fontSize: 20,
                textAlign: "justify",
                fontWeight: 300,
                lineHeight: "30px",
                mt: 3,
              }}
            >
              {details?.aboutPage?.industriesWeServe?.description}
            </Typography>
          </Grid>
          <Grid size={8}>
            <Grid container spacing={4}>
              {details?.aboutPage?.industriesWeServe?.section_data.map(
                (val, i) => (
                  <Grid size={4} key={i}>
                    <List>
                      {val.dataList.map((item, index) => (
                        <ListItem key={index} disablePadding>
                          <ListItemText
                            primary={item.label}
                            slotProps={{
                              primary: {
                                fontSize: 20,
                                fontFamily: adelle.style.fontFamily,
                                color: COLORS.PRIMARY_BLUE,
                                fontWeight: 700,
                                lineHeight: "45px",
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                )
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default IndustriesWeServe;
