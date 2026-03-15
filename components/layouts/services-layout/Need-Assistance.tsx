import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const NeedAssistance = () => {
  return (
    <Box sx={{ pb: 10 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            background:
              " linear-gradient(98deg, #0D5F6E 24.37%, #24735F 34.73%, #73B72B 70.21%)",
            borderRadius: "32px",

            height: { lg: "565px", xs: "420px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            px: { lg: 0, xs: 5 },
          }}
        >
          <Typography
            sx={{
              color: COLORS.WHITE,
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 700,
              fontSize: { lg: 50, xs: 30 },
              lineHeight: { lg: "72px", xs: "50px" },
            }}
          >
            Need Strategic IP Guidance?
          </Typography>
          <Typography
            sx={{
              fontSize: { lg: 18, xs: 16 },
              fontFamily: adelle.style.fontFamily,
              fontWeight: 600,
              color: COLORS.WHITE,
              mt: 2,
            }}
          >
            Our experienced team is ready to protect and maximize the value of
            your intellectual property portfolio.
          </Typography>

          <Link href="/contact-us">
            <Button
              sx={{
                backgroundColor: COLORS.WHITE,
                borderRadius: "8px",
                color: COLORS.PRIMARY_BLUE,
                mt: 5,
                width: 310,
                height: 62,
                fontFamily: adelle.style.fontFamily,
                fontWeight: 600,
                fontSize: 20,
                textTransform: "capitalize",
              }}
            >
              Contact Our Team
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default NeedAssistance;
