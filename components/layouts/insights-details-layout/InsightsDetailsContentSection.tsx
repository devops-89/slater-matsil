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
  <Stack spacing={2.5} sx={{ mb: 6 }}>
    <Stack direction="row" alignItems="center" spacing={1.5}>
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
          letterSpacing: "0.02em",
        }}
      >
        {heading}
      </Typography>
    </Stack>
    <Typography
      sx={{
        fontFamily: adelle.style.fontFamily,
        fontWeight: 600,
        fontSize: { xs: 18, md: 24 },
        lineHeight: 1.5,
        color: COLORS.TEXT_PRIMARY_4,
      }}
    >
      {content}
    </Typography>
  </Stack>
);

interface InsightsDetailsContentSectionProps {
  activeTab: number;
}

const InsightsDetailsContentSection = ({ activeTab }: InsightsDetailsContentSectionProps) => {
  const { data } = useInsightDetails();
  const sections = data?.contentSections;
  const hero = data?.hero;

  if (!sections) return null;

  // Lawyer Rankings tab (index 1)
  if (activeTab === 1) {
    return (
      <Box sx={{ py: { xs: 4, md: 8 }, pb: 10 }}>
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
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
        {/* About / Provided by row */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
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
                About
              </Typography>
            </Stack>
            <Typography
              sx={{
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                fontSize: { xs: 28, md: 42 },
                color: COLORS.PRIMARY_BLUE,
                textTransform: "capitalize",
              }}
            >
              {sections.aboutProvidedBy}{" "}
              <Box
                component="span"
                sx={{ color: COLORS.PRIMARY_GREEN }}
              >
                {sections.aboutProvidedByName}
              </Box>
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }} sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                fontSize: { xs: 28, md: 42 },
                color: "black",
                textTransform: "capitalize",
                borderBottom: `3px solid ${COLORS.PRIMARY_GREEN}`,
                display: "inline-block",
                pb: 0.5,
              }}
            >
              {sections.region}
            </Typography>
          </Grid>
        </Grid>

        {/* Two-column content */}
        <Grid container spacing={{ xs: 0, md: 6 }}>
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
