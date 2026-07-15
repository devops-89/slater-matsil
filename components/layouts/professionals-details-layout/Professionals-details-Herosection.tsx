"use client";
import contact from "@/icons/contact-card.svg";
import print from "@/icons/print.svg";
import { ProfessionalControllers } from "@/api/professionalControllers";
import { useProfessionalDetailsData } from "@/store/useProfessionalDetails";
import { useLoading } from "@/components/providers/LoadingProvider";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Close, Download } from "@mui/icons-material";
import Image from "next/image";
import { useState } from "react";

const ProfessionalsDetailsHeroSection = ({ onImageLoad }: { onImageLoad?: () => void }) => {
  const phone = useMediaQuery("(max-width:600px)");
  const { data } = useProfessionalDetailsData();
  const { startLoading, stopLoading } = useLoading();
  const heroImg = data?.professionals_Details_HeroSection?.img;
  
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);

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

  const handlePrint = async () => {
    if (data?.id) {
      startLoading();
      setIsLoadingPdf(true);
      try {
        const res = await ProfessionalControllers.downloadProfessionalPdf(data.id);
        const blob = new Blob([res.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        setPdfUrl(url);
        setPdfModalOpen(true);
      } catch (error) {
        console.error("Failed to load PDF", error);
        alert("Failed to load PDF. Falling back to browser print.");
        window.print();
      } finally {
        stopLoading();
        setIsLoadingPdf(false);
      }
    } else {
      window.print();
    }
  };

  const handleDownloadPdf = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      const fileName = data?.professionals_Details_HeroSection?.name 
        ? `${data.professionals_Details_HeroSection.name.replace(/\s+/g, '_')}_Profile.pdf` 
        : "Professional_Profile.pdf";
      link.download = fileName;
      link.click();
    }
  };

  const handleClosePdfModal = () => {
    setPdfModalOpen(false);
    setTimeout(() => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
        setPdfUrl("");
      }
    }, 500);
  };

  return (
    <>
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

      <Dialog 
        open={pdfModalOpen} 
        onClose={handleClosePdfModal}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: { 
            height: '90vh', 
            borderRadius: 3, 
            overflow: 'hidden',
            boxShadow: '0 24px 48px rgba(0,0,0,0.2)' 
          }
        }}
      >
        <DialogTitle component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, backgroundColor: COLORS.PRIMARY_BLUE, color: COLORS.WHITE }}>
          <Typography variant="h6" component="span" sx={{ fontFamily: tradeGothic.style.fontFamily, fontWeight: 700, letterSpacing: '0.5px' }}>
            {data?.professionals_Details_HeroSection?.name || "Professional"} Profile Preview
          </Typography>
          <IconButton onClick={handleClosePdfModal} sx={{ color: COLORS.WHITE, '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0, overflow: 'hidden', backgroundColor: '#525659' }}>
          {pdfUrl ? (
            <iframe 
              src={pdfUrl} 
              width="100%" 
              height="100%" 
              style={{ border: 'none', display: 'block' }}
              title="PDF Preview"
            />
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress sx={{ color: COLORS.WHITE }} />
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, backgroundColor: '#f8f9fa', borderTop: '1px solid #e0e0e0' }}>
          <Button 
            onClick={handleClosePdfModal} 
            color="inherit" 
            variant="outlined"
            sx={{ 
              borderRadius: 2, 
              textTransform: 'none', 
              fontWeight: 600, 
              px: 3,
              borderColor: '#ccc'
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDownloadPdf} 
            variant="contained" 
            startIcon={<Download />}
            sx={{ 
              backgroundColor: COLORS.PRIMARY_BLUE, 
              borderRadius: 2, 
              textTransform: 'none', 
              fontWeight: 600, 
              px: 3,
              boxShadow: 'none',
              '&:hover': { 
                backgroundColor: '#0a365c', // slightly darker shade of primary
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)' 
              } 
            }}
          >
            Download PDF
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const usingMobileImageStyles = (isPhone: boolean) => {
  return isPhone ? "center" : "bottom";
};

export default ProfessionalsDetailsHeroSection;
