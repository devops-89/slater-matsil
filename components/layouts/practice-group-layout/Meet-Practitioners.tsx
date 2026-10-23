"use client";
import { usePageData } from "@/store/usePageData";
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
const MeetPractitioners = ({ data }: { data: any }) => {
  const { details } = usePageData();
  return (
    <Box sx={{ mt: 10 }}>
      <Container maxWidth={"lg"}>
        <Typography
          sx={{
            color: COLORS.PRIMARY_BLUE,
            fontSize: { lg: 30, xs: 24 },
            fontFamily: tradeGothic.style.fontFamily,
            fontWeight: 700,
            letterSpacing: "-2px",
            lineHeight: { lg: "55px", xs: "24px" },
            ml: 1,
            position: "relative",
            display: "inline-block",
            zIndex: 1,
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: { lg: "10px", xs: "8px" },
              left: "-4px",
              right: "-8px",
              height: { lg: "20px", xs: "16px" },
              backgroundColor: COLORS.PRIMARY_GREEN,
              opacity: 0.4,
              zIndex: -1,
              transform: "rotate(-1deg)",
              borderRadius: 2,
            },
          }}
        >
          {details?.practiceGroupPage?.meetPractitioners?.title}:
        </Typography>
        <Grid container>
          {data && (
            <Grid size={{ lg: 9, xs: 12 }}>
              <List>
                {data.map(
                  (
                    val: {
                      primary: string;
                      secondary?: string;
                      isHeader?: boolean;
                    },
                    i: number,
                  ) => {
                    if (val.isHeader) {
                      return (
                        <Typography
                          key={i}
                          sx={{
                            fontSize: { lg: 20, xs: 16 },
                            fontFamily: tradeGothic.style.fontFamily,
                            fontWeight: 700,
                            color: COLORS.PRIMARY_BLUE,
                            mt: i === 0 ? 0 : 4,
                            mb: 2,
                            textTransform: "uppercase",
                          }}
                        >
                          {val.primary}
                        </Typography>
                      );
                    }
                    return (
                      <ListItem
                        key={i}
                        sx={{ alignItems: "flex-start" }}
                        disablePadding
                      >
                        <ListItemAvatar sx={{ mt: 2, minWidth: 30 }}>
                          <Circle
                            sx={{ color: COLORS.PRIMARY_BLUE, fontSize: 10 }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={val?.primary}
                          secondary={val?.secondary}
                          slotProps={{
                            primary: {
                              sx: {
                                fontSize: { lg: 24, xs: 20 },
                                fontFamily: tradeGothic.style.fontFamily,
                                fontWeight: 500,
                                lineHeight: { lg: "40px", xs: "20px" },
                                color: COLORS.PRIMARY_BLUE,
                              },
                            },
                            secondary: {
                              sx: {
                                fontSize: { lg: 16, xs: 14 },
                                fontFamily: tradeGothic.style.fontFamily,
                                fontWeight: 500,
                                lineHeight: { lg: "30px", xs: "20px" },
                                color: COLORS.TEXT_PRIMARY_4,
                                textAlign: "justify",
                              },
                            },
                          }}
                        />
                      </ListItem>
                    );
                  },
                )}
              </List>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};
export default MeetPractitioners;
