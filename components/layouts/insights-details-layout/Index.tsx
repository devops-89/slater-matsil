"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useInsightDetails } from "@/store/useInsightDetails";
import InsightsDetailsHeroSection from "./InsightsDetailsHeroSection";
import InsightsDetailsTabBar from "./InsightsDetailsTabBar";
import InsightsDetailsContentSection from "./InsightsDetailsContentSection";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { InsightControllers } from "@/api/insightControllers";

const InsightsDetailsLayout = () => {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState(0); // 0 = About, 1 = Lawyer Rankings
  const { setInsightDetailsData, clearInsightDetailsData, data } =
    useInsightDetails();

  const [navigation, setNavigation] = useState<{
    prev: { slug: string; name: string } | null;
    next: { slug: string; name: string } | null;
  }>({ prev: null, next: null });

  useEffect(() => {
    const fetchInsight = async () => {
      if (!isNaN(Number(slug))) {
        try {
          const res = await InsightControllers.getInsightById(Number(slug));
          const apiInsight = res.data?.data?.data || res.data?.data;
          
          if (apiInsight) {
            const secMap: any = {
              aboutProvidedBy: apiInsight.aboutProvidedBy || "Provided by",
              aboutProvidedByName: apiInsight.aboutProvidedByName || "Slater Matsil, LLP",
              region: apiInsight.region || "USA",
            };
            
            apiInsight.sections?.forEach((sec: any) => {
              if (sec.sectionType === "PRACTICE_AREAS") secMap.practiceAreas = { heading: sec.heading, content: sec.content };
              if (sec.sectionType === "PROFESSIONAL_MEMBERSHIPS") secMap.professionalMemberships = { heading: sec.heading, content: sec.content };
              if (sec.sectionType === "CAREER") secMap.career = { heading: sec.heading, content: sec.content };
              if (sec.sectionType === "PERSONAL") secMap.personal = { heading: sec.heading, content: sec.content };
              if (sec.sectionType === "CHAMBERS_REVIEW") secMap.ChamberssReview = { heading: sec.heading, content: sec.content };
              if (sec.sectionType === "STRENGTHS") secMap.strengths = { heading: sec.heading, content: sec.content };
              if (sec.sectionType === "ADDITIONAL_CONTENT" || sec.sectionType === "ADDITIONAL_INFORMATION") secMap.additionalInformation = { heading: sec.heading, content: sec.content };
              if (sec.sectionType === "MAIN_CONTENT" || sec.sectionType === "CLOSING_STATEMENT") secMap.closingStatement = { heading: sec.heading, content: sec.content };
              if (sec.sectionType === "MISC_AND_RESOURCES" || sec.sectionType === "RESOURCE") secMap.resource = { heading: sec.heading, content: sec.content, link: sec.link || "" };
            });

            const mappedInsight = {
              slug: String(apiInsight.id),
              hero: {
                name: apiInsight.personName || "",
                band: apiInsight.bandRole || "",
                guide: apiInsight.guideOrganization || "",
                yearsRanked: apiInsight.yearsRankedDate || "",
                profileImage: apiInsight.imageDownloadUrl || apiInsight.imageUrl || "",
              },
              contact: apiInsight.contact || {
                firm: "SlaterMatsil, LLP",
                firmUrl: "www.slatermatsil.com",
                email: "info@slatermatsil.com",
                phone: "972 732 1001",
                shareLabel: "Share",
              },
              contentSections: secMap,
            };

            setInsightDetailsData(mappedInsight as any);
            setNavigation({
              prev: null, // Next/prev for API could be implemented via another API call if needed
              next: null,
            });
            return;
          }
        } catch (e) {
          console.error("Failed to fetch API insight", e);
        }
      }

      notFound();
    };

    fetchInsight();

    return () => {
      clearInsightDetailsData();
    };
  }, [slug, setInsightDetailsData, clearInsightDetailsData]);

  if (!data) return null;

  return (
    <Box sx={{ bgcolor: "white", minHeight: "100vh" }}>
      <InsightsDetailsHeroSection />
      <InsightsDetailsTabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <InsightsDetailsContentSection activeTab={activeTab} />

      {/* Navigation Buttons */}
      <Container maxWidth="lg" sx={{ mt: 8, mb: 10 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            py: 4,
            borderTop: `1px solid ${COLORS.PRIMARY_BLUE}20`,
            borderBottom: `1px solid ${COLORS.PRIMARY_BLUE}20`,
          }}
        >
          <Box sx={{ minWidth: "250px" }}>
            {navigation.prev && (
              <Link
                href={`/insights/${navigation.prev.slug}`}
                style={{ textDecoration: "none" }}
              >
                <Stack direction="column" spacing={1}>
                  <Typography
                    sx={{
                      color: COLORS.PRIMARY_BLUE,
                      fontSize: 14,
                      fontFamily: tradeGothic.style.fontFamily,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      opacity: 0.7,
                    }}
                  >
                    ← Previous Insight
                  </Typography>
                  <Typography
                    sx={{
                      color: COLORS.PRIMARY_BLUE,
                      fontSize: 18,
                      fontFamily: adelle.style.fontFamily,
                      fontWeight: 700,
                      maxWidth: "400px",
                      "&:hover": { color: COLORS.PRIMARY_GREEN },
                      transition: "color 3.3s ease",
                    }}
                  >
                    {navigation.prev.name}
                  </Typography>
                </Stack>
              </Link>
            )}
          </Box>
          <Box sx={{ minWidth: "250px", textAlign: "right" }}>
            {navigation.next && (
              <Link
                href={`/insights/${navigation.next.slug}`}
                style={{ textDecoration: "none" }}
              >
                <Stack direction="column" spacing={1} alignItems="flex-end">
                  <Typography
                    sx={{
                      color: COLORS.PRIMARY_BLUE,
                      fontSize: 14,
                      fontFamily: tradeGothic.style.fontFamily,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      opacity: 0.7,
                    }}
                  >
                    Next Insight →
                  </Typography>
                  <Typography
                    sx={{
                      color: COLORS.PRIMARY_BLUE,
                      fontSize: 18,
                      fontFamily: adelle.style.fontFamily,
                      fontWeight: 700,
                      maxWidth: "400px",
                      "&:hover": { color: COLORS.PRIMARY_GREEN },
                      transition: "color 0.3s ease",
                    }}
                  >
                    {navigation.next.name}
                  </Typography>
                </Stack>
              </Link>
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default InsightsDetailsLayout;
