import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Container, Typography } from "@mui/material";
import React from "react";

const Map = () => {
  const { details } = usePageData();
  return (
    <Box sx={{ color: COLORS.PRIMARY_BLUE_LIGHT, py: { lg: 10, xs: 5 } }}>
      <Container maxWidth="lg">
        <Typography
          sx={{
            fontSize: { lg: 50, xs: 25 },
            fontWeight: 700,
            fontFamily: tradeGothic.style.fontFamily,
            lineHeight: { lg: "72px", xs: "25px" },
            color: COLORS.PRIMARY_BLUE,
            textAlign: "center",
            position: "relative",
            zIndex: 1,
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: "2px",
              left: "-4px",
              right: "-8px",
              height: { lg: "20px", xs: "15px" },
              backgroundColor: COLORS.PRIMARY_GREEN,
              opacity: 0.4,
              zIndex: -1,
              transform: "rotate(-2deg)",
              width: { lg: 450, xs: 200 },
              borderRadius: 8,
              margin: "auto",
            },
          }}
        >
          {details?.contactPage?.map_props?.title}
        </Typography>
        <Typography
          sx={{
            color: COLORS.TEXT_PRIMARY_4,
            textAlign: "center",
            width: { lg: "850px", xs: "100%" },
            mx: "auto",
            fontWeight: 400,
            lineHeight: { lg: "36px", xs: "24px" },
            fontSize: { lg: 20, xs: 16 },
            fontFamily: adelle.style.fontFamily,
            mt: 3,
          }}
        >
          {details?.contactPage?.map_props?.description}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <iframe
            src={details?.contactPage?.map_props?.locationLink}
            width="600"
            height="450"
            style={{ border: 0, width: "100%", borderRadius: "20px" }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box>
      </Container>
    </Box>
  );
};

export default Map;
