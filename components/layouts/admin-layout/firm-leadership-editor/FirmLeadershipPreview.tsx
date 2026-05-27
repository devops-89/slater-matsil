import LeaderCard from "@/components/widgets/LeaderCard";
import { COLORS } from "@/utils/enum";
import { adelle, georgia, tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Typography } from "@mui/material";

export default function FirmLeadershipPreview({ activeSection, websiteData }: any) {
  const data = websiteData?.firm_leadership;

  return (
    <Box sx={{ pb: 10, backgroundColor: "#fff" }}>
      {/* Hero Section */}
      <Box
        id="preview-section-0"
        sx={{
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          px: { lg: 10, xs: 4 },
          background: `linear-gradient(rgba(202, 234, 237, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(202, 234, 237, 0.5) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
          backgroundColor: "#f9fdfe",
          mb: 6,
        }}
      >
        <Box
          sx={{
            border: `1px solid ${COLORS.PRIMARY_LIGHT_GREEN}`,
            backgroundColor: COLORS.WHITE,
            px: 4,
            py: 2,
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: 40, xs: 24 },
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 400,
              color: COLORS.PRIMARY_BLUE,
              textTransform: "lowercase",
            }}
          >
            {data?.heroTitle || "firm leadership"}
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="lg">
        {/* Firm Mission Intro */}
        <Box id="preview-section-1" sx={{ mb: 8, textAlign: "left" }}>
          <Typography
            sx={{
              fontSize: 20,
              fontFamily: adelle.style.fontFamily,
              color: COLORS.TEXT_PRIMARY,
              lineHeight: 1.6,
            }}
          >
            {data?.missionIntro}
          </Typography>
        </Box>

        {/* Firm Mission Highlight */}
        <Box sx={{ mb: 10, textAlign: "center" }}>
          <Typography
            sx={{
              fontSize: 18,
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 700,
              color: COLORS.PRIMARY_BLUE,
              mb: 1,
            }}
          >
            Firm Mission
          </Typography>
          <Typography
            sx={{
              fontSize: 24,
              fontFamily: georgia.style.fontFamily,
              fontStyle: "italic",
              color: COLORS.PRIMARY_BLUE,
              fontWeight: 500,
            }}
          >
            {data?.missionQuote?.line1}
            <br />
            {data?.missionQuote?.line2}
          </Typography>
        </Box>

        {/* Partners Section */}
        <Box id="preview-section-2" sx={{ mb: 8 }}>
          <Typography
            align="center"
            sx={{
              fontSize: 18,
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 700,
              color: COLORS.PRIMARY_BLUE,
              mb: 4,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            PARTNERS
          </Typography>
          <Grid container spacing={4}>
            {data?.partners?.map((leader: any, index: number) => (
              <Grid size={{xs:12,sm:6,md:4}} key={index}>
                <LeaderCard {...leader} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Patent Agents Section */}
        <Box id="preview-section-3" sx={{ mb: 8 }}>
          <Typography
            align="center"
            sx={{
              fontSize: 18,
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 700,
              color: COLORS.PRIMARY_BLUE,
              mb: 4,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            DISTINGUISHED PATENT AGENT
          </Typography>
          <Grid
            container
            spacing={4}
            justifyContent="center"
            sx={{ px: { lg: 10, xs: 0 } }}
          >
            {data?.patentAgents?.map((leader: any, index: number) => (
              <Grid size={{xs:12,sm:6,md:6}} key={index}>
                <LeaderCard {...leader} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Administration Section */}
        <Box id="preview-section-4" sx={{ mb: 8 }}>
          <Typography
            align="center"
            sx={{
              fontSize: 18,
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 700,
              color: COLORS.PRIMARY_BLUE,
              mb: 4,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            ADMINISTRATION
          </Typography>
          <Grid container spacing={4}>
            {data?.administration?.map((staff: any, index: number) => (
              <Grid size={{xs:12,sm:6,md:4}} key={index}>
                <LeaderCard {...staff} isAdmin={true} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
