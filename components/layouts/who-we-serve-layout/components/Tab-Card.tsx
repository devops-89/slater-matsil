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
                fontSize: { lg: 30, xs: 20 },
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 600,
                lineHeight: { lg: "42px", xs: "30px" },
                textTransform: "capitalize",
                mt: 4,
              }}
            >
              {bigDescription}
            </Typography>
          </Grid>
          <Grid size={{ lg: 10, xs: 12 }} margin="auto">
            <Typography
              sx={{
                fontSize: { lg: 22, xs: 18 },
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                color: COLORS.TEXT_PRIMARY_4,
                lineHeight: { lg: "35px", xs: "28px" },
                textTransform: "capitalize",
                textAlign: "center",
                mt: 5,
              }}
            >
              {quote}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={5} mt={4}>
          {data.map((val, i) => (
            <Grid size={{ lg: 6, xs: 12 }} key={i}>
              <StarBox bgColor={COLORS.PRIMARY_GREEN} />

              <Typography
                sx={{
                  fontSize: 24,
                  fontFamily: adelle.style.fontFamily,
                  fontWeight: 500,
                  lineHeight: "30px",
                  textTransform: "capitalize",
                  color: COLORS.TEXT_PRIMARY_4,
                  mt: 2,
                }}
              >
                {val.description}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TabCard;
