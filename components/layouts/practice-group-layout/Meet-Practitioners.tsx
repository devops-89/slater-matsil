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

const MeetPractitioners = () => {
  const { details } = usePageData();
  return (
    <Box sx={{ mt: 10 }}>
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
          {details?.practiceGroupPage?.meetPractitioners?.title}:
        </Typography>
        <Grid container>
          <Grid size={9}>
            <List>
              {details?.practiceGroupPage?.meetPractitioners?.data.map(
                (val, i) => (
                  <ListItem sx={{ alignItems: "flex-start" }}>
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
                )
              )}
            </List>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MeetPractitioners;
