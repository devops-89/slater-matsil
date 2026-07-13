import React from "react";
import type { Metadata } from "next";
import { Box, Container, Grid, Typography } from "@mui/material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic, georgia } from "@/utils/fonts";
import { LEADERSHIP_DATA } from "@/public/data/leadership-data";
import LeaderCard from "@/components/widgets/LeaderCard";

export const metadata: Metadata = {
  title: "Slater Matsil | Firm Leadership",
  description:
    "Meet the experienced leadership team and partners guiding our boutique intellectual property law practice.",
};

const FirmLeadership = () => {
  return (
    <Box sx={{ pb: 10 }}>
      <Box
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
            firm leadership
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="lg">
        {/* Firm Mission Intro */}
        <Box sx={{ mb: 8, textAlign: "left" }}>
          <Typography
            sx={{
              fontSize: 20,
              fontFamily: adelle.style.fontFamily,
              color: COLORS.TEXT_PRIMARY,
              lineHeight: 1.6,
            }}
          >
            Effective leadership has contributed to the firm's substantial
            growth since Steven Slater and Ira Matsil founded the firm in 1999.
            The firm's mission statement defines Slater Matsil's core
            competencies and values.
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
            Work with Excellence,
            <br />
            in a Collegial Atmosphere.
          </Typography>
        </Box>

        {/* Partners Section */}
        <Box sx={{ mb: 8 }}>
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
            {LEADERSHIP_DATA.partners.map((leader, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <LeaderCard {...leader} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Patent Agents Section */}
        <Box sx={{ mb: 8 }}>
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
            {LEADERSHIP_DATA.patentAgents.map((leader, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 6 }} key={index}>
                <LeaderCard {...leader} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Administration Section */}
        <Box sx={{ mb: 8 }}>
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
            {LEADERSHIP_DATA.administration.map((staff, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <LeaderCard {...staff} isAdmin={true} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default FirmLeadership;
