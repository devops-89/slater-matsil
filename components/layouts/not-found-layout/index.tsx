"use client";

import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const NotFoundLayout = () => {
  return (
    <Box
      sx={{
        backgroundColor: COLORS.OFF_WHITE,
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Orbs to match the theme */}
      <Box
        sx={{
          position: "absolute",
          left: -100,
          top: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(13, 95, 110, 0.05)",
          filter: "blur(100px)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          right: -50,
          bottom: -50,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(114, 181, 43, 0.1)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="md" sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            sx={{
              fontFamily: tradeGothic.style.fontFamily,
              fontSize: { xs: 150, sm: 200, md: 240 },
              fontWeight: 800,
              color: COLORS.PRIMARY_BLUE,
              lineHeight: 1,
              letterSpacing: "-5px",
              mb: 2,
              textShadow: "4px 4px 0px rgba(114, 181, 43, 0.15)",
            }}
          >
            404
          </Typography>
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography
            sx={{
              fontFamily: adelle.style.fontFamily,
              fontSize: { xs: 24, sm: 32, md: 40 },
              fontWeight: 600,
              color: COLORS.TEXT_TERTIARY,
              mb: 3,
            }}
          >
            Page Not Found
          </Typography>
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Typography
            sx={{
              fontFamily: adelle.style.fontFamily,
              fontSize: { xs: 16, md: 18 },
              color: COLORS.TEXT_PRIMARY,
              mb: 6,
              maxWidth: 500,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back.
          </Typography>
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href="/" passHref style={{ textDecoration: "none" }}>
            <Button
              sx={{
                backgroundColor: COLORS.PRIMARY_BLUE,
                color: COLORS.WHITE,
                borderRadius: "40px",
                fontFamily: adelle.style.fontFamily,
                fontSize: 16,
                fontWeight: 400,
                lineHeight: "26px",
                padding: "15px 30px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: COLORS.PRIMARY_GREEN,
                },
              }}
              endIcon={<ArrowForward />}
            >
              Back to Home
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFoundLayout;
