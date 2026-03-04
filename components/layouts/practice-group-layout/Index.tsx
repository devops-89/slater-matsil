"use client";
import { Box } from "@mui/material";
import MeetPractitioners from "./Meet-Practitioners";
import PracticeGroupSection from "./Practice-Group-Section";
import PracticeGroupsHeroSection from "./Practice-groups-heroSection";

const PracticeGroupsLayout = () => {
  return (
    <Box>
      <div data-aos="fade-in">
        <PracticeGroupsHeroSection />
      </div>
      <div data-aos="fade-up">
        <PracticeGroupSection />
      </div>
    </Box>
  );
};

export default PracticeGroupsLayout;
