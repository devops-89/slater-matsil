"use client";

import { useInsightDetails } from "@/store/useInsightDetails";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";

const SectionBlock = ({
  heading,
  content,
}: {
  heading: string;
  content: string;
}) => (
  <Stack spacing={3} sx={{ mb: 8 }}>
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          bgcolor: COLORS.PRIMARY_GREEN,
          flexShrink: 0,
          boxShadow: "0 4px 10px rgba(114, 181, 43, 0.2)",
        }}
      />
      <Typography
        sx={{
          fontFamily: adelle.style.fontFamily,
          fontSize: 14,
          fontWeight: 600,
          color: COLORS.PRIMARY_GREEN,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        {heading}
      </Typography>
    </Stack>
    <Typography
      sx={{
        fontFamily: adelle.style.fontFamily,
        fontWeight: 400,
        fontSize: { xs: 18, md: 22 },
        lineHeight: 1.6,
        color: COLORS.TEXT_PRIMARY_4,
        pl: { md: 6 },
      }}
    >
      {content}
    </Typography>
  </Stack>
);

interface InsightsDetailsContentSectionProps {
  activeTab: number;
}

const InsightsDetailsContentSection = ({
  activeTab,
}: InsightsDetailsContentSectionProps) => {
  const { data } = useInsightDetails();
  const sections = data?.contentSections;
  const hero = data?.hero;

  if (!sections) return null;

  // Lawyer Rankings tab (index 1)
  if (activeTab === 1) {
    return (
      <Box sx={{ py: { xs: 4, md: 8 }, pb: 10 }}>
        <Container maxWidth="lg">
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{ mb: 3 }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "18px",
                bgcolor: COLORS.PRIMARY_GREEN,
                flexShrink: 0,
              }}
            />
            <Typography
              sx={{
                fontFamily: adelle.style.fontFamily,
                fontSize: 16,
                color: COLORS.PRIMARY_GREEN,
                textTransform: "uppercase",
              }}
            >
              Lawyer Rankings
            </Typography>
          </Stack>
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              border: "1px solid #EAEAEA",
              bgcolor: "#FAFAFA",
            }}
          >
            <Typography
              sx={{
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                fontSize: { xs: 22, md: 28 },
                color: COLORS.PRIMARY_BLUE,
                mb: 2,
              }}
            >
              {hero?.name} — {hero?.band}
            </Typography>
            <Typography
              sx={{
                fontFamily: adelle.style.fontFamily,
                fontSize: { xs: 16, md: 18 },
                color: COLORS.TEXT_PRIMARY_4,
                mb: 1,
              }}
            >
              {hero?.guide}
            </Typography>
            <Typography
              sx={{
                fontFamily: adelle.style.fontFamily,
                fontSize: { xs: 16, md: 18 },
                color: COLORS.TEXT_PRIMARY_4,
              }}
            >
              {hero?.yearsRanked}
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  // About tab (index 0)
  return (
    <Box sx={{ py: { xs: 4, md: 8 }, pb: 10 }}>
      <Container maxWidth="lg">
        {/* About and Watermark row */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 8, position: "relative" }}
        >
          <Box sx={{ maxWidth: { xs: "100%", md: "60%" } }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ mb: 2 }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  bgcolor: COLORS.PRIMARY_GREEN,
                  flexShrink: 0,
                  boxShadow: "0 4px 10px rgba(114, 181, 43, 0.2)",
                }}
              />
              <Typography
                sx={{
                  fontFamily: adelle.style.fontFamily,
                  fontSize: 14,
                  fontWeight: 600,
                  color: COLORS.PRIMARY_GREEN,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                About
              </Typography>
            </Stack>
            <Typography
              sx={{
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                fontSize: { xs: 32, md: 52 },
                lineHeight: 1.1,
                color: COLORS.PRIMARY_BLUE,
                textTransform: "capitalize",
              }}
            >
              {sections.aboutProvidedBy}{" "}
              <Box component="span" sx={{ color: COLORS.PRIMARY_GREEN }}>
                {sections.aboutProvidedByName}
              </Box>
            </Typography>
          </Box>

          <Typography
            sx={{
              display: { xs: "none", md: "flex" },
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 700,
              fontSize: { md: 100 },
              textTransform: "lowercase",
              pointerEvents: "none",
              userSelect: "none",
              opacity: 0.1,
              lineHeight: 1,
            }}
          >
            <Box component="span" sx={{ color: COLORS.PRIMARY_BLUE }}>
              slater
            </Box>
            <Box component="span" sx={{ color: COLORS.PRIMARY_GREEN }}>
              matsil
            </Box>
          </Typography>
        </Stack>

        {/* Region (USA) section */}
        <Box sx={{ mb: 10 }}>
          <Typography
            sx={{
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 700,
              fontSize: { xs: 32, md: 48 },
              color: "black",
              textTransform: "uppercase",
              borderBottom: `4px solid ${COLORS.PRIMARY_GREEN}`,
              display: "inline-block",
              lineHeight: 1,
              pb: 0.5,
              mb: 1,
            }}
          >
            {sections.region}
          </Typography>
        </Box>

        {/* Two-column content */}
        <Grid container spacing={{ xs: 6, md: 12 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionBlock
              heading={sections.practiceAreas.heading}
              content={sections.practiceAreas.content}
            />
            <SectionBlock
              heading={sections.professionalMemberships.heading}
              content={sections.professionalMemberships.content}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionBlock
              heading={sections.career.heading}
              content={sections.career.content}
            />
            <SectionBlock
              heading={sections.personal.heading}
              content={sections.personal.content}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default InsightsDetailsContentSection;
