"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useLoading } from "@/components/providers/LoadingProvider";
import { useProfessionalDetailsData } from "@/store/useProfessionalDetails";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { generateSlug, generateProfessionalSlug } from "@/utils/generateSlug";
import { ProfessionalControllers } from "@/api/professionalControllers";
import { mapApiUserProfessionalToDetailsProps } from "@/utils/mappers/firmProfessionalsMapper";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Box, Container, Stack, Typography, CircularProgress } from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";
import ProfessionalsDetailsHeroSection from "./Professionals-details-Herosection";
import TabSection from "./Tab-Section";

interface ProfessionalDetailsLayoutProps {
  initialRawData?: any;
}

const ProfessionalDetailsLayout = ({
  initialRawData,
}: ProfessionalDetailsLayoutProps = {}) => {
  const { data, setProfessionalDetailsData, clearProfessionalDetailsData } =
    useProfessionalDetailsData();
  const { startLoading, stopLoading } = useLoading();
  const params = useParams();
  const slugOrId = (params?.slug as string) || (params?.id as string) || "";
  const [sortedProfessionals, setSortedProfessionals] = useState<any[]>([]);

  const decodedSlug = useMemo(() => {
    return typeof slugOrId === "string"
      ? decodeURIComponent(slugOrId).toLowerCase().trim()
      : "";
  }, [slugOrId]);

  const initialMapped = useMemo(() => {
    if (initialRawData && (initialRawData.id || initialRawData.fullName)) {
      return mapApiUserProfessionalToDetailsProps(initialRawData);
    }
    return null;
  }, [initialRawData]);

  const [professional, setProfessional] = useState<any>(initialMapped);

  // Sync initial SSR data immediately into store
  useEffect(() => {
    if (initialMapped) {
      setProfessional(initialMapped);
      setProfessionalDetailsData(initialMapped);
      if (!initialMapped.professionals_Details_HeroSection?.img) {
        stopLoading();
      }
    }
  }, [initialMapped, setProfessionalDetailsData, stopLoading]);

  useEffect(() => {
    let isMounted = true;
    let idFetched = Boolean(initialMapped?.id);

    if (!idFetched) {
      startLoading();
    }

    const isNumericId =
      !isNaN(Number(decodedSlug)) && decodedSlug.trim() !== "";

    // 1. If numeric ID and no SSR data, fetch directly by ID
    if (isNumericId && !idFetched) {
      ProfessionalControllers.getProfessionalById(Number(decodedSlug))
        .then((res: any) => {
          if (!isMounted) return;
          let userObj = res.data;
          while (userObj && userObj.data && !userObj.id && !userObj.fullName) {
            userObj = userObj.data;
          }
          if (userObj && userObj.user && !userObj.id && !userObj.fullName) {
            userObj = userObj.user;
          }
          if (userObj && (userObj.id || userObj.fullName)) {
            const mapped = mapApiUserProfessionalToDetailsProps(userObj);
            setProfessional(mapped);
            setProfessionalDetailsData(mapped);
            idFetched = true;
          }
        })
        .catch((err: any) =>
          console.error("Failed to fetch professional by ID", err),
        )
        .finally(() => {
          if (!idFetched && isMounted) stopLoading();
        });
    }

    // 2. Fetch all for Next/Prev navigation & slug resolution
    ProfessionalControllers.getAllProfessionalProfiles(1, 1000)
      .then((res: any) => {
        if (!isMounted) return;
        let users = res.data?.data?.users || [];
        if (!users.length && res.data?.data?.data?.users) {
          users = res.data.data.data.users;
        }

        const mappedUsers = users.map((apiItem: any) =>
          mapApiUserProfessionalToDetailsProps(apiItem),
        );

        const getLastName = (fullName: string) => {
          if (!fullName) return "";
          const cleanName = fullName.split(",")[0].trim();
          const parts = cleanName.split(/\s+/);
          return parts[parts.length - 1].toLowerCase();
        };

        const sorted = mappedUsers.sort((a: any, b: any) => {
          const nameA = a.professionals_Details_HeroSection?.name || "";
          const nameB = b.professionals_Details_HeroSection?.name || "";
          const lastNameComparison = getLastName(nameA).localeCompare(
            getLastName(nameB),
          );
          if (lastNameComparison !== 0) {
            return lastNameComparison;
          }
          return nameA.localeCompare(nameB);
        });

        setSortedProfessionals(sorted);

        // If we didn't already have SSR data, match by slug or ID
        if (!idFetched) {
          const currentProf = sorted.find((item: any) => {
            const profSlug = generateProfessionalSlug(
              item.professionals_Details_HeroSection?.vCardData || item,
            );
            const itemSlug = generateSlug(
              item.professionals_Details_HeroSection?.name || "",
            );
            return (
              (item.id && item.id.toString() === decodedSlug) ||
              profSlug === decodedSlug ||
              itemSlug === decodedSlug ||
              item.slug === decodedSlug
            );
          });

          if (currentProf?.id) {
            ProfessionalControllers.getProfessionalById(Number(currentProf.id))
              .then((res: any) => {
                if (!isMounted) return;
                let userObj = res.data;
                while (
                  userObj &&
                  userObj.data &&
                  !userObj.id &&
                  !userObj.fullName
                ) {
                  userObj = userObj.data;
                }
                if (
                  userObj &&
                  userObj.user &&
                  !userObj.id &&
                  !userObj.fullName
                ) {
                  userObj = userObj.user;
                }
                if (userObj && (userObj.id || userObj.fullName)) {
                  const mapped = mapApiUserProfessionalToDetailsProps(userObj);
                  setProfessional(mapped);
                  setProfessionalDetailsData(mapped);
                } else {
                  setProfessional(currentProf);
                  setProfessionalDetailsData(currentProf);
                }
              })
              .catch(() => {
                if (!isMounted) return;
                setProfessional(currentProf);
                setProfessionalDetailsData(currentProf);
              })
              .finally(() => {
                if (isMounted) stopLoading();
              });
          } else {
            if (isMounted) stopLoading();
          }
        }
      })
      .catch((err) => {
        console.error("Failed to fetch professional profiles", err);
        if (isMounted) stopLoading();
      });

    return () => {
      isMounted = false;
    };
  }, [decodedSlug, initialMapped, setProfessionalDetailsData, startLoading, stopLoading]);

  // Clean up store on unmount
  useEffect(() => {
    return () => {
      clearProfessionalDetailsData();
      stopLoading();
    };
  }, [clearProfessionalDetailsData, stopLoading]);

  const currentIndex = sortedProfessionals.findIndex((item) => {
    const profSlug = generateProfessionalSlug(
      item.professionals_Details_HeroSection?.vCardData || item,
    );
    const itemSlug = generateSlug(
      item.professionals_Details_HeroSection?.name || "",
    );
    return (
      (item.id && item.id.toString() === decodedSlug) ||
      profSlug === decodedSlug ||
      itemSlug === decodedSlug ||
      item.slug === decodedSlug
    );
  });

  const prevProfessional =
    currentIndex > 0 ? sortedProfessionals[currentIndex - 1] : null;
  const nextProfessional =
    currentIndex !== -1 && currentIndex < sortedProfessionals.length - 1
      ? sortedProfessionals[currentIndex + 1]
      : null;

  const handleImageLoad = () => {
    stopLoading();
  };

  const activeData = data?.professionals_Details_HeroSection ? data : professional;

  if (!activeData?.professionals_Details_HeroSection) {
    return (
      <Box
        sx={{
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: COLORS.PRIMARY_GREEN }} />
      </Box>
    );
  }

  return (
    <Box>
      <ProfessionalsDetailsHeroSection
        {...activeData.professionals_Details_HeroSection}
        onImageLoad={handleImageLoad}
      />
      <TabSection />

      {/* Navigation Buttons */}
      <Container maxWidth="lg" sx={{ mt: 10, mb: 6 }}>
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
          {/* Previous */}
          <Box sx={{ minWidth: "200px" }}>
            {prevProfessional && (
              <Link
                href={`/professionals/${generateProfessionalSlug(
                  prevProfessional.professionals_Details_HeroSection?.vCardData ||
                    prevProfessional.professionals_Details_HeroSection?.name ||
                    prevProfessional.id,
                )}`}
                style={{ textDecoration: "none" }}
              >
                <Stack direction="row" alignItems="center" spacing={1.5}>
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
                    <ArrowBackIos
                      sx={{ color: COLORS.PRIMARY_BLUE, fontSize: 18, ml: 0.5 }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 11,
                        color: COLORS.TEXT_PRIMARY_4,
                        fontFamily: tradeGothic.style.fontFamily,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Previous
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: COLORS.PRIMARY_BLUE,
                        fontFamily: tradeGothic.style.fontFamily,
                        "&:hover": { color: COLORS.PRIMARY_GREEN },
                        transition: "color 0.2s",
                      }}
                    >
                      {prevProfessional.professionals_Details_HeroSection.name}
                    </Typography>
                  </Box>
                </Stack>
              </Link>
            )}
          </Box>

          {/* Next */}
          <Box sx={{ minWidth: "200px", textAlign: "right" }}>
            {nextProfessional && (
              <Link
                href={`/professionals/${generateProfessionalSlug(
                  nextProfessional.professionals_Details_HeroSection?.vCardData ||
                    nextProfessional.professionals_Details_HeroSection?.name ||
                    nextProfessional.id,
                )}`}
                style={{ textDecoration: "none" }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={1.5}
                >
                  <Box sx={{ textAlign: "right" }}>
                    <Typography
                      sx={{
                        fontSize: 11,
                        color: COLORS.TEXT_PRIMARY_4,
                        fontFamily: tradeGothic.style.fontFamily,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Next
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: COLORS.PRIMARY_BLUE,
                        fontFamily: tradeGothic.style.fontFamily,
                        "&:hover": { color: COLORS.PRIMARY_GREEN },
                        transition: "color 0.2s",
                      }}
                    >
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
                    <ArrowForwardIos
                      sx={{ color: COLORS.PRIMARY_BLUE, fontSize: 18 }}
                    />
                  </Box>
                </Stack>
              </Link>
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default ProfessionalDetailsLayout;
