import { Box } from "@mui/material";
import ProfessionalHeroSection from "./ProfessionalHeroSection";
import ProfessionalList from "./Professionals-list";
import RedefiningPatent from "@/components/widgets/Redefining-Patent";

const ProfessionalLayoutSection = () => {
  return (
    <Box>
      <ProfessionalHeroSection />
      <ProfessionalList />
      <Box sx={{ pt: 20 }}>
        <RedefiningPatent />
      </Box>
    </Box>
  );
};

export default ProfessionalLayoutSection;
