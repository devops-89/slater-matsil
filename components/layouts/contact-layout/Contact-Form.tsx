import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import Form from "./components/Form";
import { usePageData } from "@/store/usePageData";

const ContactForm = () => {
  const { details } = usePageData();
  return (
    <Box sx={{ py: { lg: 10, xs: 5 } }}>
      <Container maxWidth="lg">
        <Stack alignItems={"center"} spacing={2}>
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Typography
              sx={{
                fontSize: { lg: 50, xs: 30 },
                fontWeight: 700,
                fontFamily: tradeGothic.style.fontFamily,
                lineHeight: { lg: "72px", xs: "30px" },
                color: COLORS.PRIMARY_BLUE,
                textAlign: "center",
                position: "relative",
                zIndex: 1,
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "10px",
                  left: { lg: "-4px", xs: "auto" },
                  right: "-8px",
                  height: { lg: "20px", xs: "10px" },
                  backgroundColor: COLORS.PRIMARY_GREEN,
                  opacity: 0.4,
                  zIndex: -1,
                  transform: "rotate(-2deg)",
                  width: { lg: 600, xs: "100%" },
                  borderRadius: 8,
                  margin: { lg: 0, xs: "auto" },
                },
              }}
            >
              {details?.contactPage?.form_section?.heading1}{" "}
              <Typography
                component={"span"}
                sx={{
                  color: COLORS.BLACK,
                  fontSize: { lg: 50, xs: 30 },
                  fontFamily: tradeGothic.style.fontFamily,
                  fontWeight: 700,
                  lineHeight: { lg: "72px", xs: "30px" },
                }}
              >
                {details?.contactPage?.form_section?.heading2}
              </Typography>
            </Typography>
          </Box>
        </Stack>

        <Typography
          sx={{
            fontSize: { lg: 24, xs: 16 },
            fontFamily: adelle.style.fontFamily,
            width: { lg: 860, xs: "100%" },
            margin: "auto",
            color: COLORS.TEXT_PRIMARY_4,
            textAlign: "center",
            fontWeight: 400,
            lineHeight: { lg: "36px", xs: "24px" },
            mt: 2,
          }}
        >
          {details?.contactPage?.form_section?.description}
        </Typography>

        <Box sx={{ mt: 8 }}>
          <Grid container>
            <Grid size={{ lg: 10, xs: 12 }} margin="auto">
              <Form />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactForm;
