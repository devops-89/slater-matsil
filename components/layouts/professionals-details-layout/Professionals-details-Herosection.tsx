"use client";
import vCardsJs from "vcards-js";
import contact from "@/icons/contact-card.svg";
import print from "@/icons/print.svg";
import { useProfessionalDetailsData } from "@/store/useProfessionalDetails";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";

const ProfessionalsDetailsHeroSection = () => {
  const { data } = useProfessionalDetailsData();
  const heroImg = data?.professionals_Details_HeroSection?.img;

  const handleSaveContact = async () => {
    const res = await fetch("/api/vcard", {
      method: "POST",
      body: JSON.stringify({
        firstName:
          data?.professionals_Details_HeroSection?.vCardData?.firstName,
        lastName: data?.professionals_Details_HeroSection?.vCardData?.lastName,
        email:
          data?.professionals_Details_HeroSection?.vCardData?.electronicMail,
        phone:
          data?.professionals_Details_HeroSection?.vCardData?.telephoneNumber,
        address: data?.professionals_Details_HeroSection?.vCardData?.address,
      }),
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${data?.professionals_Details_HeroSection?.vCardData?.firstName}_${data?.professionals_Details_HeroSection?.vCardData?.lastName}.vcf`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: COLORS.PRIMARY_BLUE,
          width: "40%",
          height: "80vh",
          my: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundPosition: "right",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          ml: "auto",
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          top: "62%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid size={6} sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{
                  fontSize: 60,
                  fontFamily: tradeGothic.style.fontFamily,
                  fontWeight: 700,
                  lineHeight: "98px",
                  color: COLORS.PRIMARY_BLUE,
                }}
              >
                {data?.professionals_Details_HeroSection?.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: 25,
                  fontFamily: adelle.style.fontFamily,
                  fontWeight: 600,
                  lineHeight: "32px",
                  color: COLORS.TEXT_TERTIARY,
                }}
              >
                {data?.professionals_Details_HeroSection?.email}
              </Typography>
              <Typography
                sx={{
                  fontSize: 25,
                  fontFamily: adelle.style.fontFamily,
                  fontWeight: 600,
                  lineHeight: "32px",
                  color: COLORS.TEXT_TERTIARY,
                }}
              >
                {data?.professionals_Details_HeroSection?.phoneNumber}
              </Typography>

              <Box
                sx={{
                  mt: "auto",
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 20,
                    fontFamily: adelle.style.fontFamily,
                    fontWeight: 600,
                    lineHeight: "26px",
                    color: COLORS.TEXT_TERTIARY,
                  }}
                >
                  Print Profile & Save Contact
                </Typography>

                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={2}
                  justifyContent={"flex-start"}
                >
                  <IconButton onClick={handleSaveContact}>
                    <Image src={contact} alt="" />
                  </IconButton>
                  <IconButton onClick={handlePrint}>
                    <Image src={print} alt="" />
                  </IconButton>
                </Stack>
              </Box>
            </Grid>
            <Grid size={6}>
              {heroImg && (
                <Image
                  src={heroImg}
                  alt=""
                  style={{ width: "100%", height: 500 }}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default ProfessionalsDetailsHeroSection;
