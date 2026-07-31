import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import QuickLinksCard from "../../widgets/common/Quick-Links-Card";

const QuickLinks = () => {
  const { details } = usePageData();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const data = mounted ? details?.insightsPage?.quickLinks?.data : undefined;

  return (
    <Box sx={{ backgroundColor: COLORS.WHITE, pt: 3, pb: 3 }}>
      <Box>
        <Typography
          sx={{
            fontSize: { lg: 50, xs: 30 },
            fontWeight: 700,
            fontFamily: tradeGothic.style.fontFamily,
            lineHeight: { lg: "72px", xs: "30px" },
            color: COLORS.PRIMARY_BLUE,
            textAlign: "center",
            position: "relative",
            zIndex: 1,
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: "10px",
              left: "-4px",
              right: "-8px",
              height: { lg: "20px", xs: "15px" },
              backgroundColor: COLORS.PRIMARY_GREEN,
              opacity: 0.4,
              zIndex: -1,
              transform: "rotate(-3deg)",
              width: { lg: 350, xs: 250 },
              borderRadius: 8,
              margin: "auto",
            },
          }}
        >
          {details?.insightsPage?.quickLinks?.title}
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {data?.map((val, i) => (
              <Grid size={{ lg: 3, md: 6, xs: 12 }} key={i}>
                <QuickLinksCard
                  title={val.title}
                  img={val.img}
                  href={val.href}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default QuickLinks;
