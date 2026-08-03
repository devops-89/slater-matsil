import { Box } from "@mui/material";
import MeetPractitioners from "./Meet-Practitioners";
import PracticeGroupSection from "./Practice-Group-Section";
import PracticeGroupsHeroSection from "./Practice-groups-heroSection";

const PracticeGroupsLayout = ({ apiData }: { apiData?: any }) => {
  return (
    <Box>
      <div data-aos="fade-in">
        <PracticeGroupsHeroSection apiData={apiData} />
      </div>
      <div data-aos="fade-up">
        <PracticeGroupSection />
      </div>
    </Box>
  );
};

export default PracticeGroupsLayout;
