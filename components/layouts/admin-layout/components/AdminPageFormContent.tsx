import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";

interface AdminPageFormContentProps {
  sections: string[];
  activeSection: number | false;
  handleAccordionChange: (panelIndex: number) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  renderFormForSection: (index: number) => React.ReactNode;
}

export const AdminPageFormContent = ({
  sections,
  activeSection,
  handleAccordionChange,
  renderFormForSection
}: AdminPageFormContentProps) => {
  return (
    <Box sx={{ flexGrow: 1, overflowY: 'auto', p: { xs: 1.5, sm: 2 }, backgroundColor: "#FAFAFA" }}>
      {sections.map((title, index) => (
        <Accordion 
          key={index} 
          expanded={activeSection === index} 
          onChange={handleAccordionChange(index)}
          disableGutters
          sx={{
            mb: 2,
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: activeSection === index ? '0 4px 16px rgba(0,0,0,0.05)' : 'none',
            '&:before': { display: 'none' },
            borderRadius: '12px !important',
            transition: 'all 0.2s ease',
            '&.Mui-expanded': {
              margin: '0 0 16px 0 !important',
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore sx={{ color: activeSection === index ? COLORS.PRIMARY_GREEN : COLORS.TEXT_PRIMARY }} />}
            sx={{
              backgroundColor: "#FFFFFF",
              borderBottom: activeSection === index ? '1px solid rgba(0,0,0,0.05)' : 'none',
              minHeight: "56px !important",
              '& .MuiAccordionSummary-content': { 
                my: 0,
              },
              '& .MuiAccordionSummary-content.Mui-expanded': { 
                my: 0,
              },
              '&.Mui-expanded': { 
                minHeight: "56px !important",
              }
            }}
          >
            <Typography sx={{ fontFamily: adelle.style.fontFamily, fontWeight: activeSection === index ? 700 : 400, color: activeSection === index ? COLORS.PRIMARY_BLUE : COLORS.TEXT_PRIMARY }}>
              {title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: "#FFFFFF", p: { xs: 2, sm: 3 } }}>
            {renderFormForSection(index)}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};
