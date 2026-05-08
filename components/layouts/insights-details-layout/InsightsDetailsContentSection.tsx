"use client";

import HeadingStar from "@/components/widgets/Heading-star";
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
}) => {
  if (!content || !heading) return null;
  return (
    <Stack spacing={3} sx={{ mb: 8 }}>
      <HeadingStar title={heading} />
      <Typography
        sx={{
          fontFamily: adelle.style.fontFamily,
          fontWeight: 400,
          fontSize: { xs: 18, md: 22 },
          lineHeight: 1.6,
          color: COLORS.TEXT_PRIMARY_4,
          textAlign: "left",
          letterSpacing:1.5
        }}
      >
        {content}
      </Typography>
    </Stack>
  );
};

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
          <Box sx={{ mb: 3 }}>
            <HeadingStar title="Rankings" />
          </Box>
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

          <Typography
            sx={{
              display: { xs: "none", md: "flex" },
              mx:20,
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 700,
              fontSize: { md: 140 },
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
        <Grid container spacing={{ xs: 6, md: 12 }} sx={{ mb: 10 }}>
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

        {/* New full-width sections */}
        {sections.chambersReview && (
          <SectionBlock
            heading={sections.chambersReview.heading}
            content={sections.chambersReview.content}
          />
        )}
        {sections.strengths && (
          <SectionBlock
            heading={sections.strengths.heading}
            content={sections.strengths.content}
          />
        )}
      </Container>
    </Box>
  );
};

export default InsightsDetailsContentSection;
