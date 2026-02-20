"use client";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import ProfessionalsDetailsHeroSection from "./Professionals-details-Herosection";
import { useProfessionalDetailsData } from "@/store/useProfessionalDetails";
import { useParams } from "next/navigation";
import { PROFESSIONAL_DETAILS_DATA } from "@/public/data/professionals-details-data";
import TabSection from "./Tab-Section";

const ProfessionalDetailsLayout = () => {
  const { setProfessionalDetailsData, clearProfessionalDetailsData } =
    useProfessionalDetailsData();
  const { slug } = useParams();

  useEffect(() => {
    const filteredProfessionalData = PROFESSIONAL_DETAILS_DATA.find(
      (item) => item.slug === slug,
    );

    if (filteredProfessionalData) {
      setProfessionalDetailsData(filteredProfessionalData);
    }
    return () => {
      clearProfessionalDetailsData();
    };
  }, [slug, setProfessionalDetailsData]);

  return (
    <Box>
      <ProfessionalsDetailsHeroSection />
      <TabSection />
    </Box>
  );
};

export default ProfessionalDetailsLayout;
