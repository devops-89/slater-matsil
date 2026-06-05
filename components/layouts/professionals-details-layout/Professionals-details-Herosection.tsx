"use client";
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
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";

const ProfessionalsDetailsHeroSection = ({ onImageLoad }: { onImageLoad?: () => void }) => {
  const phone = useMediaQuery("(max-width:600px)");
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
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "auto", md: "85vh", lg: "85vh" },
        height: { xs: "auto", md: "85vh", lg: "85vh" },
        overflow: "hidden",
        pt: { xs: 5, lg: 0 },
        pb: { xs: 0, lg: 0 },
      }}
    >
      <Box
        sx={{
          backgroundColor: COLORS.PRIMARY_BLUE,
          width: { xs: "100%", md: "35%", lg: "35%" },
          height: { xs: "300px", md: "100%", lg: "100%" },
          position: "absolute",
          right: 0,
          top: 0,
          zIndex: 0,
          display: { xs: "none", md: "block" },
        }}
      ></Box>
      <Container
        maxWidth="lg"
        sx={{
          height: "100%",
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          spacing={{ xs: 1, md: 5 }}
          sx={{ height: "100%", alignItems: "center" }}
        >
          <Grid
            size={{ xs: 12, md: 6, lg: 6 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              pt: { xs: 0, lg: 0 },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: 30, md: 48, lg: 60 },
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
                fontSize: { xs: 16, lg: 20 },
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
                fontSize: { xs: 16, lg: 20 },
                fontFamily: adelle.style.fontFamily,
                fontWeight: 400,
                lineHeight: "32px",
                color: COLORS.PRIMARY_BLUE,
                textDecoration: "none",
                display: "block",
                mb: { xs: 2, lg: 8 },
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
            size={{ xs: 12, md: 6, lg: 6 }}
            sx={{
              height: "100%",
              display: { xs: "none", md: "flex", lg: "flex" },
              alignItems: { xs: "center", md: "flex-end", lg: "flex-end" },
              justifyContent: "center",
              position: "relative",
              minHeight: { xs: 300, md: "auto", lg: "auto" },
            }}
          >
            {heroImg && (
              <Box
                sx={{
                  position: "relative",
                  width: { xs: "100%", md: "140%", lg: "140%" },
                  height: { xs: 400, md: 650, lg: 650 },
                  right: { xs: "0", md: "-10%", lg: "-10%" },
                }}
              >
                <Image
                  src={heroImg}
                  alt={data?.professionals_Details_HeroSection?.name || ""}
                  fill
                  style={{
                    objectFit: phone ? "contain" : "contain", 
                    objectPosition: usingMobileImageStyles(phone),
                  }}
                  priority
                  onLoad={onImageLoad}
                  onError={onImageLoad}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const usingMobileImageStyles = (isPhone: boolean) => {
  return isPhone ? "center" : "bottom";
};

export default ProfessionalsDetailsHeroSection;
