import { tradeGothic } from "@/utils/fonts";
import { Box, Container, Typography } from "@mui/material";
import React from "react";

const FindUsHere = () => {
  return (
    <div>
      <Container maxWidth="lg">
        <Box>
          <Typography
            sx={{
              fontSize: 50,
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 700,
              lineHeight: "72px",
            }}
          >
            Find Us Here
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default FindUsHere;
