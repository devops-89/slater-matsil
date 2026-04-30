"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Slide, Paper, Container, Stack } from "@mui/material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Small delay to ensure smooth entry after page load
    const timer = setTimeout(() => {
      const consent = localStorage.getItem("cookie-consent");
      if (!consent) {
        setShowBanner(true);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  return (
    <Slide direction="up" in={showBanner} mountOnEnter unmountOnExit>
      <Paper
        elevation={0}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          py: { xs: 3, md: 4 },
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderTop: `1px solid ${COLORS.PRIMARY_BLUE}20`,
          boxShadow: "0px -10px 30px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Container maxWidth="lg">
          <Stack 
            direction={{ xs: "column", md: "row" }} 
            alignItems={{ xs: "flex-start", md: "center" }} 
            justifyContent="space-between" 
            spacing={3}
          >
            <Box flex={1}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontFamily: adelle.style.fontFamily,
                  color: COLORS.PRIMARY_BLUE,
                  fontWeight: 700,
                  mb: 1,
                  fontSize: { xs: "1.1rem", md: "1.25rem" }
                }}
              >
                We value your privacy
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontFamily: tradeGothic.style.fontFamily,
                  color: COLORS.TEXT_PRIMARY,
                  lineHeight: 1.6,
                  maxWidth: "900px"
                }}
              >
                Slater Matsil uses cookies and similar technologies to enhance your website experience, analyze site usage, and support our marketing efforts. By clicking "Accept All," you agree to the storing of cookies on your device to enhance site navigation and analyze site usage. View our <a href="/privacy-policy" style={{ color: COLORS.PRIMARY_BLUE, textDecoration: "underline" }}>Privacy Policy</a> for more information.
              </Typography>
            </Box>
            
            <Stack direction="row" spacing={2} sx={{ width: { xs: "100%", md: "auto" } }}>
              <Button 
                variant="outlined" 
                fullWidth={false}
                onClick={handleDecline}
                sx={{ 
                  borderRadius: "0", 
                  px: 4, 
                  py: 1,
                  borderColor: COLORS.PRIMARY_BLUE,
                  color: COLORS.PRIMARY_BLUE,
                  fontFamily: tradeGothic.style.fontFamily,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  "&:hover": {
                    borderColor: COLORS.PRIMARY_BLUE,
                    backgroundColor: `${COLORS.PRIMARY_BLUE}10`,
                  }
                }}
              >
                Reject
              </Button>
              <Button 
                variant="contained" 
                fullWidth={false}
                onClick={handleAccept}
                sx={{ 
                  borderRadius: "0", 
                  px: 4, 
                  py: 1,
                  bgcolor: COLORS.PRIMARY_BLUE,
                  color: COLORS.WHITE,
                  fontFamily: tradeGothic.style.fontFamily,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  "&:hover": {
                    bgcolor: "#0a4b57", // Darker shade of primary blue
                  }
                }}
              >
                Accept All
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Paper>
    </Slide>
  );
};

export default CookieConsent;
