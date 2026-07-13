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
          letterSpacing: 1.5,
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

  // Rankings Tab
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

  // About Tab
  return (
    <Box sx={{ py: { xs: 4, md: 8 }, pb: 10 }}>
      <Container maxWidth="lg">
        {/* About Section */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            mb: 8,
            position: "relative",
            overflow: "hidden",
            minHeight: { md: 220 },
          }}
        >
          <Box
            sx={{
              maxWidth: { xs: "100%", md: "45%" },
              zIndex: 2,
              position: "relative",
            }}
          >
            <Box sx={{ mb: 2 }}>
              <HeadingStar title="About" />
            </Box>
            <Typography
              sx={{
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                fontSize: { xs: 24, md: 36 },
                lineHeight: 1.05,
                color: COLORS.PRIMARY_BLUE,
                textTransform: "capitalize",
              }}
            >
              Provided By{" "}
              <Box
                component="span"
                sx={{
                  color: COLORS.PRIMARY_GREEN,
                }}
              >
                Slater
              </Box>
              <br />
              <Box
                component="span"
                sx={{
                  color: COLORS.PRIMARY_GREEN,
                }}
              >
                Matsil, LLP
              </Box>
            </Typography>
          </Box>
          <Typography
            sx={{
              display: { xs: "none", md: "block" },
              position: "absolute",
              right: "5%",
              top: "20%",
              transform: "translateY(-50%)",
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 700,
              fontSize: "140px",
              textTransform: "lowercase",
              pointerEvents: "none",
              userSelect: "none",
              opacity: 0.08,
              lineHeight: 0.9,
              whiteSpace: "nowrap",
              zIndex: 1,
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

        {/* Main Two Columns */}
        <Grid container spacing={{ xs: 6, md: 12 }} sx={{ mb: 10 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionBlock
              heading={sections.practiceAreas?.heading}
              content={sections.practiceAreas?.content}
            />

            <SectionBlock
              heading={sections.professionalMemberships?.heading}
              content={sections.professionalMemberships?.content}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionBlock
              heading={sections.career?.heading}
              content={sections.career?.content}
            />
            <SectionBlock
              heading={sections.personal?.heading}
              content={sections.personal?.content}
            />
          </Grid>
        </Grid>

        {/* New full-width sections */}
        {sections.ChamberssReview && (
          <SectionBlock
            heading={sections.ChamberssReview.heading}
            content={sections.ChamberssReview.content}
          />
        )}
        {sections.strengths && (
          <SectionBlock
            heading={sections.strengths.heading}
            content={sections.strengths.content}
          />
        )}

        {sections.additionalInformation && (
          <SectionBlock
            heading={sections.additionalInformation.heading}
            content={sections.additionalInformation.content}
          />
        )}
        {sections.closingStatement && (
          <SectionBlock
            heading={sections.closingStatement.heading}
            content={sections.closingStatement.content}
          />
        )}
        {sections.resource && (
          <Box sx={{ mb: 8 }}>
            <SectionBlock
              heading={sections.resource.heading}
              content={sections.resource.content}
            />
            <Typography
              component="a"
              href={sections.resource.link}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontFamily: adelle.style.fontFamily,
                fontSize: 18,
                fontWeight: 600,
                color: COLORS.PRIMARY_GREEN,
                textDecoration: "underline",
                wordBreak: "break-word",
              }}
            >
              View IAM Patent 1000 Profile
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default InsightsDetailsContentSection;
