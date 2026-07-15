"use client";
import { PageControllers } from "@/api/pageControllers";
import { useLoading } from "@/components/providers/LoadingProvider";
import LeaderCard from "@/components/widgets/LeaderCard";
import { WEBSITE_DATA } from "@/public/data/website-data";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, georgia, tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Typography } from "@mui/material";
import type { Metadata } from "next";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const metadata: Metadata = {
  title: "Slater Matsil | Firm Leadership",
  description:
    "Meet the experienced leadership team and partners guiding our boutique intellectual property law practice.",
};

const FirmLeadership = () => {
  const { details, setDetails } = usePageData();
  const { startLoading, stopLoading } = useLoading();
  const pathname = usePathname();

  useEffect(() => {
    const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/pages') || pathname.startsWith('/manage-');
    if (isAdminRoute) return;

    let isMounted = true;
    const fetchFirmLeadershipData = async () => {
      try {
        startLoading();

        let pageData = null;
        try {
          const res = await PageControllers.getPublicPageById(6).catch(e => ({ data: { data: null } }));
          pageData = res.data?.data?.data || res.data?.data;
        } catch (e) {
          console.error("Failed to fetch public page by ID 6", e);
        }
        
        if (pageData && isMounted) {
          const updatedFirmLeadershipPage = require("@/utils/pageDataMapper").mapBackendToFirmLeadershipState(pageData, WEBSITE_DATA.firm_leadership);
          const mergedWebsiteData = { ...WEBSITE_DATA, firm_leadership: updatedFirmLeadershipPage };
          setDetails(mergedWebsiteData as any);
        }
      } catch (error) {
        console.error("Error fetching firm leadership data", error);
      } finally {
        stopLoading();
      }
    };
    
    fetchFirmLeadershipData();

    return () => {
      if (isMounted) stopLoading();
      isMounted = false;
    };
  }, [setDetails, startLoading, stopLoading, pathname]);

  const data = details?.firm_leadership || WEBSITE_DATA.firm_leadership;
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
            {data.heroTitle || "firm leadership"}
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
            {data.missionIntro || ""}
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
            {data.missionQuote?.line1}
            <br />
            {data.missionQuote?.line2}
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
            {(data.partners || []).map((leader: any, index: number) => {
              const { key: _key, ...leaderProps } = leader;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <LeaderCard {...leaderProps} img={leaderProps.imageDownloadUrl || leaderProps.img || leaderProps.imageUrl} />
                </Grid>
              );
            })}
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
            {(data.patentAgents || []).map((leader: any, index: number) => {
              const { key: _key, ...leaderProps } = leader;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 6 }} key={index}>
                  <LeaderCard {...leaderProps} img={leaderProps.imageDownloadUrl || leaderProps.img || leaderProps.imageUrl} />
                </Grid>
              );
            })}
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
            {(data.administration || []).map((staff: any, index: number) => {
              const { key: _key, ...staffProps } = staff;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <LeaderCard {...staffProps} isAdmin={true} img={staffProps.imageDownloadUrl || staffProps.img || staffProps.imageUrl} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default FirmLeadership;
