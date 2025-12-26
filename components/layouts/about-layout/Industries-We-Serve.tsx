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
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const IndustriesWeServe = () => {
  const { details } = usePageData();
  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container spacing={10}>
          <Grid size={{ lg: 4, xs: 12 }}>
            <Stack
              direction={{ lg: "column", xs: "row" }}
              spacing={{ lg: 0, xs: 2 }}
            >
              <Typography
                sx={{
                  color: COLORS.PRIMARY_BLUE,
                  fontSize: { lg: 50, xs: 30 },
                  fontWeight: { lg: 700, xs: 500 },
                  lineHeight: { lg: "55px", xs: "35px" },
                  letterSpacing: "-3px",
                  fontFamily: tradeGothic.style.fontFamily,
                }}
              >
                {details?.aboutPage?.industriesWeServe?.heading1}
              </Typography>
              <Typography
                sx={{
                  color: COLORS.BLACK,
                  fontSize: { lg: 50, xs: 30 },
                  fontFamily: tradeGothic.style.fontFamily,
                  fontWeight: { lg: 700, xs: 500 },
                  letterSpacing: "-2px",
                  lineHeight: { lg: "55px", xs: "35px" },
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
                    width: { lg: 250, xs: 150 },
                    borderRadius: "20px",
                  },
                }}
              >
                {details?.aboutPage?.industriesWeServe?.heading2}
              </Typography>
            </Stack>
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
          <Grid size={{ lg: 8, xs: 12 }}>
            <Grid container spacing={4}>
              {details?.aboutPage?.industriesWeServe?.section_data.map(
                (val, i) => (
                  <Grid size={{ lg: 4, xs: 6 }} key={i}>
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
