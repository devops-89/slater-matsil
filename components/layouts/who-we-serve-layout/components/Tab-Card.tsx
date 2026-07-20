import StarBox from "@/components/widgets/common/Star-box";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { TAB_CARD_DATA_PROPS } from "@/utils/types";
import { Box, Container, Grid, Typography } from "@mui/material";

const TabCard = ({ bigDescription, quote, data }: TAB_CARD_DATA_PROPS) => {
  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography
              sx={{
                color: COLORS.PRIMARY_BLUE,
                fontSize: { lg: 30, xs: 18 },
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 600,
                lineHeight: { lg: "42px", xs: "25px" },
                textTransform: "capitalize",
                mt: 4,
                textAlign: "justify",
              }}
            >
              {bigDescription}
            </Typography>
          </Grid>
          {quote && (
            <Grid size={{ lg: 10, xs: 12 }} margin="auto">
              <Typography
                sx={{
                  fontSize: { lg: 22, xs: 16 },
                  fontFamily: tradeGothic.style.fontFamily,
                  fontWeight: 700,
                  color: COLORS.TEXT_PRIMARY_4,
                  lineHeight: { lg: "35px", xs: "20px" },
                  textTransform: "capitalize",
                  textAlign: "center",
                  mt: 5,
                }}
              >
                {quote}
              </Typography>
            </Grid>
          )}
        </Grid>

        <Grid container spacing={3} mt={2}>
          <Grid size={{ lg: 6, xs: 12 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {data.filter((_, i) => i % 2 === 0).map((val, i) => (
                <Typography
                  key={i}
                  sx={{
                    fontSize: { lg: 24, xs: 16 },
                    fontFamily: adelle.style.fontFamily,
                    fontWeight: 500,
                    lineHeight: { lg: "30px", xs: "20px" },
                    color: COLORS.TEXT_PRIMARY_4,
                    mt: 0,
                    textAlign: "justify",
                  }}
                >
                  {val.description}
                </Typography>
              ))}
            </Box>
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {data.filter((_, i) => i % 2 !== 0).map((val, i) => (
                <Typography
                  key={i}
                  sx={{
                    fontSize: { lg: 24, xs: 16 },
                    fontFamily: adelle.style.fontFamily,
                    fontWeight: 500,
                    lineHeight: { lg: "30px", xs: "20px" },
                    color: COLORS.TEXT_PRIMARY_4,
                    mt: 0,
                    textAlign: "justify",
                  }}
                >
                  {val.description}
                </Typography>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TabCard;
