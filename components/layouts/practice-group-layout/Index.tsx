"use client";
import MeetPractitioners from "./Meet-Practitioners";
import PracticeGroupSection from "./Practice-Group-Section";
import PracticeGroupsHeroSection from "./Practice-groups-heroSection";

const PracticeGroupsLayout = () => {
  return (
    <div>
      <PracticeGroupsHeroSection />
      <PracticeGroupSection />
      <MeetPractitioners />
    </div>
  );
};

export default PracticeGroupsLayout;
