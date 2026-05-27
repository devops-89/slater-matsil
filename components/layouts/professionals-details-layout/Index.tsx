"use client";
import { Box, Container, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ProfessionalsDetailsHeroSection from "./Professionals-details-Herosection";
import { useProfessionalDetailsData } from "@/store/useProfessionalDetails";
import { useParams, useRouter, notFound } from "next/navigation";
import { PROFESSIONAL_DETAILS_DATA } from "@/public/data/professionals-details-data";
import TabSection from "./Tab-Section";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import Link from "next/link";
//
const ProfessionalDetailsLayout = () => {
  const { data, setProfessionalDetailsData, clearProfessionalDetailsData } =
    useProfessionalDetailsData();
  const { slug } = useParams();
  const router = useRouter();

  const sortedProfessionals = React.useMemo(() => {
    return [...PROFESSIONAL_DETAILS_DATA].sort((a, b) =>
      a.professionals_Details_HeroSection.name.localeCompare(
        b.professionals_Details_HeroSection.name,
      ),
    );
  }, []);

  const decodedSlug = React.useMemo(() => {
    return typeof slug === "string" ? decodeURIComponent(slug).toLowerCase().trim() : "";
  }, [slug]);

  const professional = React.useMemo(() => {
    if (!decodedSlug) return null;
    return (
      PROFESSIONAL_DETAILS_DATA.find(
        (item) => item.slug.toLowerCase().trim() === decodedSlug
      ) || null
    );
  }, [decodedSlug]);

  // If a slug is specified but no professional is found, return 404
  if (slug && !professional) {
    notFound();
  }

  const currentIndex = sortedProfessionals.findIndex(
    (item) => item.slug.toLowerCase().trim() === decodedSlug,
  );
  const prevProfessional =
    currentIndex > 0 ? sortedProfessionals[currentIndex - 1] : null;
  const nextProfessional =
    currentIndex < sortedProfessionals.length - 1
      ? sortedProfessionals[currentIndex + 1]
      : null;

  useEffect(() => {
    if (professional) {
      setProfessionalDetailsData(professional);
    }
    return () => {
      clearProfessionalDetailsData();
    };
  }, [professional, setProfessionalDetailsData, clearProfessionalDetailsData]);

  // Prevent rendering details hero and tabs until data is properly loaded in store
  if (!data || data.slug.toLowerCase().trim() !== decodedSlug) {
    return (
      <Box
        sx={{
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    );
  }

  return (
    <Box>
      <ProfessionalsDetailsHeroSection />
      <TabSection />

      {/* Prev / Next Navigation */}
      <Box sx={{ borderTop: `1px solid rgba(0,0,0,0.08)`, mt: 4 }}>
        <Container maxWidth="lg">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ py: 3 }}
          >
            {/* Previous */}
            {prevProfessional ? (
              <Link
                href={`/firm-professionals/${prevProfessional.slug}`}
                style={{ textDecoration: "none" }}
              >
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover .nav-arrow": { transform: "translateX(-4px)" },
                }}>
                  <Box
                    className="nav-arrow"
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      border: `2px solid ${COLORS.PRIMARY_BLUE}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "transform 0.2s",
                    }}
                  >
                    <ArrowBackIos sx={{ color: COLORS.PRIMARY_BLUE, fontSize: 18, ml: 0.5 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 11, color: COLORS.TEXT_PRIMARY_4, fontFamily: tradeGothic.style.fontFamily, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      Previous
                    </Typography>
                    <Typography sx={{ fontSize: 15, fontWeight: 700, color: COLORS.PRIMARY_BLUE, fontFamily: tradeGothic.style.fontFamily }}>
                      {prevProfessional.professionals_Details_HeroSection.name}
                    </Typography>
                  </Box>
                </Stack>
              </Link>
            ) : (
              <Box />
            )}

            {/* Next */}
            {nextProfessional ? (
              <Link
                href={`/firm-professionals/${nextProfessional.slug}`}
                style={{ textDecoration: "none" }}
              >
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover .nav-arrow": { transform: "translateX(4px)" },
                }}>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography sx={{ fontSize: 11, color: COLORS.TEXT_PRIMARY_4, fontFamily: tradeGothic.style.fontFamily, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      Next
                    </Typography>
                    <Typography sx={{ fontSize: 15, fontWeight: 700, color: COLORS.PRIMARY_BLUE, fontFamily: tradeGothic.style.fontFamily }}>
                      {nextProfessional.professionals_Details_HeroSection.name}
                    </Typography>
                  </Box>
                  <Box
                    className="nav-arrow"
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      border: `2px solid ${COLORS.PRIMARY_BLUE}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "transform 0.2s",
                    }}
                  >
                    <ArrowForwardIos sx={{ color: COLORS.PRIMARY_BLUE, fontSize: 18 }} />
                  </Box>
                </Stack>
              </Link>
            ) : (
              <Box />
            )}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default ProfessionalDetailsLayout;

