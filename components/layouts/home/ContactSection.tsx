import star from "@/common/heading-star.png";
import contactImage from "@/home/contact_table.webp";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import ContactForm from "./components/Contact-Form";
const ContactSection = () => {
  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Grid container spacing={10}>
          <Grid size={{ lg: 6, xs: 12 }} data-aos="fade-up">
            <ContactForm />
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }} data-aos="fade-down">
            {/* <Typography
              sx={{
                color: COLORS.LABEL_COLOR,
                fontFamily: adelle.style.fontFamily,
                fontSize: { lg: 16, xs: 14 },
                fontWeight: 400,
                lineHeight: "26px",
              }}
            >
            </Typography> */}

            <Box sx={{ mt: 3, position: "relative" }}>
              {/* <Image
                src={contactImage}
                alt=""
                style={{
                  width: "100%",
                  height: "400px",
                  borderRadius: "20px",
                  objectFit: "contain",
                  backgroundColor: "#f9f9f9",
                }}
              /> */}

              <Image
                src={contactImage}
                alt=""
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "20px",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactSection;
