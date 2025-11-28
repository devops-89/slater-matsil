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
    <Box sx={{ position: "relative", height: "85vh", overflow: "hidden" }}>
      <Box
        sx={{
          backgroundColor: COLORS.PRIMARY_BLUE,
          width: "35%",
          height: "100%",
          position: "absolute",
          right: 0,
          top: 0,
          zIndex: 0,
        }}
      ></Box>
      <Container
        maxWidth="lg"
        sx={{ height: "100%", position: "relative", zIndex: 1 }}
      >
        <Grid
          container
          spacing={5}
          sx={{ height: "100%", alignItems: "center" }}
        >
          <Grid size={6} sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                fontSize: 60,
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                lineHeight: "1.1",
                color: COLORS.PRIMARY_BLUE,
                mb: 2,
              }}
            >
              {data?.professionals_Details_HeroSection?.name}
            </Typography>
            <Typography
              component="a"
              href={`mailto:${data?.professionals_Details_HeroSection?.email}`}
              sx={{
                fontSize: 20,
                fontFamily: adelle.style.fontFamily,
                fontWeight: 400,
                lineHeight: "32px",
                color: COLORS.PRIMARY_BLUE,
                textDecoration: "none",
                display: "block",
              }}
            >
              {data?.professionals_Details_HeroSection?.email}
            </Typography>
            <Typography
              component="a"
              href={`tel:${data?.professionals_Details_HeroSection?.phoneNumber}`}
              sx={{
                fontSize: 20,
                fontFamily: adelle.style.fontFamily,
                fontWeight: 400,
                lineHeight: "32px",
                color: COLORS.PRIMARY_BLUE,
                textDecoration: "none",
                display: "block",
                mb: 8,
              }}
            >
              {data?.professionals_Details_HeroSection?.phoneNumber}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  fontFamily: adelle.style.fontFamily,
                  fontWeight: 700,
                  lineHeight: "26px",
                  color: COLORS.PRIMARY_BLUE,
                  mb: 1,
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
                <IconButton onClick={handleSaveContact} sx={{ p: 0 }}>
                  <Image src={contact} alt="Save Contact" />
                </IconButton>
                <IconButton onClick={handlePrint} sx={{ p: 0 }}>
                  <Image src={print} alt="Print Profile" />
                </IconButton>
              </Stack>
            </Box>
          </Grid>
          <Grid
            size={6}
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {heroImg && (
              <Box
                sx={{
                  position: "relative",
                  width: "140%",
                  height: 650,
                  right: "-10%",
                }}
              >
                <Image
                  src={heroImg}
                  alt={data?.professionals_Details_HeroSection?.name || ""}
                  fill
                  style={{ objectFit: "contain", objectPosition: "bottom" }}
                  priority
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfessionalsDetailsHeroSection;
