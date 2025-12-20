import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Button, Container, Typography } from "@mui/material";
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

            height: "565px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              color: COLORS.WHITE,
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 700,
              fontSize: 50,
              lineHeight: "72px",
            }}
          >
            Need Strategic IP Guidance?
          </Typography>
          <Typography
            sx={{
              fontSize: 18,
              fontFamily: adelle.style.fontFamily,
              fontWeight: 600,
              color: COLORS.WHITE,
              mt: 2,
            }}
          >
            Our experience team is ready to help protect and maximize the value
            of ypour intellectual property portfolio.
          </Typography>

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
        </Box>
      </Container>
    </Box>
  );
};

export default NeedAssistance;
