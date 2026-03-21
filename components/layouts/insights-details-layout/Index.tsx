"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import { INSIGHTS_DETAILS_DATA } from "@/public/data/insights-details-data";
import { useInsightDetails } from "@/store/useInsightDetails";
import InsightsDetailsHeroSection from "./InsightsDetailsHeroSection";
import InsightsDetailsTabBar from "./InsightsDetailsTabBar";
import InsightsDetailsContentSection from "./InsightsDetailsContentSection";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";

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
    const currentIndex = INSIGHTS_DETAILS_DATA.findIndex(
      (item) => item.slug === slug,
    );
    if (currentIndex !== -1) {
      const insight = INSIGHTS_DETAILS_DATA[currentIndex];
      setInsightDetailsData(insight);

      const prev =
        currentIndex > 0 ? INSIGHTS_DETAILS_DATA[currentIndex - 1] : null;
      const next =
        currentIndex < INSIGHTS_DETAILS_DATA.length - 1
          ? INSIGHTS_DETAILS_DATA[currentIndex + 1]
          : null;

      setNavigation({
        prev: prev ? { slug: prev.slug, name: prev.hero.name } : null,
        next: next ? { slug: next.slug, name: next.hero.name } : null,
      });
    } else {
      notFound();
    }

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
