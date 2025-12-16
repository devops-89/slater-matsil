import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Container, Stack, Typography } from "@mui/material";
import Form from "./components/Form";
import { usePageData } from "@/store/usePageData";

const ContactForm = () => {
  const { details } = usePageData();
  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Stack alignItems={"center"} spacing={2}>
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Typography
              sx={{
                fontSize: 50,
                fontWeight: 700,
                fontFamily: tradeGothic.style.fontFamily,
                lineHeight: "72px",
                color: COLORS.PRIMARY_BLUE,
                textAlign: "center",
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
                  width: 600,
                  borderRadius: 8,
                  //   margin: "auto",
                },
              }}
            >
              {details?.contactPage?.form_section?.heading1}{" "}
              <Typography
                component={"span"}
                sx={{
                  color: COLORS.BLACK,
                  fontSize: 50,
                  fontFamily: tradeGothic.style.fontFamily,
                  fontWeight: 700,
                  lineHeight: "72px",
                }}
              >
                {details?.contactPage?.form_section?.heading2}
              </Typography>
            </Typography>
          </Box>
        </Stack>

        <Typography
          sx={{
            fontSize: 24,
            fontFamily: adelle.style.fontFamily,
            width: 860,
            margin: "auto",
            color: COLORS.TEXT_PRIMARY_4,
            textAlign: "center",
            fontWeight: 400,
            lineHeight: "36px",
            mt: 2,
          }}
        >
          {details?.contactPage?.form_section?.description}
        </Typography>

        <Box sx={{ mt: 8 }}>
          <Form />
        </Box>
      </Container>
    </Box>
  );
};

export default ContactForm;
