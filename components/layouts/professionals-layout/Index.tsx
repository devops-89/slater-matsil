import { Box } from "@mui/material";
import ProfessionalsTabs from "./components/Professional-Tabs-Section";

const ProfessionalsLayout = ({ apiData }: { apiData?: any }) => {
  return (
    <Box>
      <ProfessionalsTabs />
    </Box>
  );
};

export default ProfessionalsLayout;
