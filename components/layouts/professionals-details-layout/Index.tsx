"use client";
import { Box, Container, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ProfessionalsDetailsHeroSection from "./Professionals-details-Herosection";
import { useProfessionalDetailsData } from "@/store/useProfessionalDetails";
import { useParams, useRouter, notFound } from "next/navigation";
import TabSection from "./Tab-Section";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import Link from "next/link";
import { useLoading } from "@/components/providers/LoadingProvider";
//
const ProfessionalDetailsLayout = () => {
  const { data, setProfessionalDetailsData, clearProfessionalDetailsData } =
    useProfessionalDetailsData();
  const { startLoading, stopLoading } = useLoading();
  const { id } = useParams();
  const router = useRouter();
  const [sortedProfessionals, setSortedProfessionals] = React.useState<any[]>([]);
  const [professional, setProfessional] = React.useState<any>(null);
  
  const decodedId = React.useMemo(() => {
    return typeof id === "string" ? decodeURIComponent(id).toLowerCase().trim() : "";
  }, [id]);

  useEffect(() => {
    import("@/api/professionalControllers").then(({ ProfessionalControllers }) => {
      import("@/utils/mappers/firmProfessionalsMapper").then(({ mapApiUserProfessionalToDetailsProps }) => {
        
        startLoading(); // Start loader immediately when fetching begins
        
        const isNumericId = !isNaN(Number(decodedId)) && decodedId.trim() !== "";
        let idFetched = false;

        // 1. If we have an ID in the URL, fetch it immediately!
        if (isNumericId) {
          ProfessionalControllers.getProfessionalById(Number(decodedId))
            .then((res: any) => {
              let userObj = res.data;
              while (userObj && userObj.data && !userObj.id && !userObj.fullName) {
                userObj = userObj.data;
              }
              if (userObj && userObj.user && !userObj.id && !userObj.fullName) {
                userObj = userObj.user;
              }
              if (userObj && (userObj.id || userObj.fullName)) {
                setProfessional(mapApiUserProfessionalToDetailsProps(userObj));
                idFetched = true;
              }
            })
            .catch((err: any) => console.error("Failed to fetch professional by ID", err));
        }

        // 2. Fetch all for Next/Prev functionality (Runs in parallel)
        ProfessionalControllers.getAllProfessionalProfiles()
          .then((res: any) => {
            let users = res.data?.data?.users || [];
            if (!users.length && res.data?.data?.data?.users) {
              users = res.data.data.data.users;
            }
            processUsers(users);
          })
          .catch((err) => {
            console.error("Failed to fetch professional profiles", err);
            processUsers([]);
          });

        function processUsers(users: any[]) {
          const mappedUsers = users.map((apiItem: any) => mapApiUserProfessionalToDetailsProps(apiItem));

          const sorted = mappedUsers.sort((a: any, b: any) => {
            const nameA = a.professionals_Details_HeroSection?.name || "";
            const nameB = b.professionals_Details_HeroSection?.name || "";
            return nameA.localeCompare(nameB);
          });
          setSortedProfessionals(sorted);

          // If we didn't already fetch the user via ID, set the data from the list
          if (!idFetched) {
            const currentProf = sorted.find((item: any) => 
              (item.id && item.id.toString() === decodedId)
            );
            
            setProfessional(currentProf || null);
          }
        }
      });
    });
  }, [decodedId, startLoading]);

  const currentIndex = sortedProfessionals.findIndex(
    (item) => (item.id && item.id.toString() === decodedId)
  );
  const prevProfessional =
    currentIndex > 0 ? sortedProfessionals[currentIndex - 1] : null;
  const nextProfessional =
    currentIndex !== -1 && currentIndex < sortedProfessionals.length - 1
      ? sortedProfessionals[currentIndex + 1]
      : null;

  useEffect(() => {
    if (professional) {
      setProfessionalDetailsData(professional);
      // Wait for image load event below, or stop if no image
      if (!professional.professionals_Details_HeroSection?.img) {
         stopLoading();
      }
    }
  }, [professional, setProfessionalDetailsData, stopLoading]);

  useEffect(() => {
    return () => {
      clearProfessionalDetailsData();
      stopLoading(); // safety
    };
  }, [clearProfessionalDetailsData, stopLoading]);

  const handleImageLoad = () => {
    stopLoading();
  };

  // Prevent rendering details hero and tabs until data is properly loaded in store
  if (
    !data ||
    (data.id?.toString() !== decodedId)
  ) {
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
      {data?.professionals_Details_HeroSection && (
        <ProfessionalsDetailsHeroSection
          {...data?.professionals_Details_HeroSection}
          onImageLoad={handleImageLoad}
        />
      )}
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
                href={`/firm-professionals/${prevProfessional.id}`}
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
                href={`/firm-professionals/${nextProfessional.id}`}
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

