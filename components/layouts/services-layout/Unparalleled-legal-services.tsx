import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
const UnParalleledLegalService = () => {
  const { details } = usePageData();

  const unparalled = details?.servicesPage?.unparalleled_props;

  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            backgroundColor: COLORS.PRIMARY_BLUE_LIGHT,
            borderRadius: "32px",
            height: { lg: "348px", xs: "420px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 5,
          }}
        >
          <Grid container alignItems={"center"}>
            <Grid size={{ lg: 8, xs: 12 }}>
              <Typography
                sx={{
                  fontSize: { lg: 25, xs: 20 },
                  color: COLORS.BLACK,
                  fontWeight: 700,
                  lineHeight: { lg: "35px", xs: "25px" },
                  fontFamily: tradeGothic.style.fontFamily,
                  textAlign: "center",
                }}
              >
                "{unparalled?.title}"
              </Typography>
            </Grid>
            <Grid size={{ lg: 4, xs: 12 }}>
              {unparalled?.img && (
            <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: { lg: "flex-end", xs: "center" },
      }}
    >
      <Image
        src={unparalled?.img}
        alt=""
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "18px",
          transform: "rotateX(4deg) rotateZ(6deg) rotateY(-44deg)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          backgroundColor: "#22c55e",
          color: "#fff",
          px: 2,
          py: "6px",
          borderRadius: "16px",
          fontSize: 13,
          fontWeight: 600,
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        IP Portfolio Development
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          backgroundColor: "#facc15",
          color: "#000",
          px: 2,
          py: "6px",
          borderRadius: "16px",
          fontSize: 13,
          fontWeight: 600,
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        Assertion of your IP
      </Box>
    </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default UnParalleledLegalService;
