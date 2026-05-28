import React from 'react';
import { Box, Button, Card, Stack, TextField, Typography, Grid, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ExpandMore, Delete, Save } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";


export const AboutUsInsightsAndAwardsEditor = ({ insightsData, awardsData, updateAboutPage }: any) => {
  const handleAddLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const currentLogos = awardsData.awards_img || [];
      updateAboutPage('AWARDSPROPS', { ...awardsData, awards_img: [...currentLogos, { img: reader.result as string }] });
    };
    reader.readAsDataURL(file);
  };

  const handleEditLogo = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const newLogos = [...(awardsData.awards_img || [])];
      newLogos[index] = { img: reader.result as string };
      updateAboutPage('AWARDSPROPS', { ...awardsData, awards_img: newLogos });
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteLogo = (index: number) => {
    const newLogos = [...(awardsData.awards_img || [])];
    newLogos.splice(index, 1);
    updateAboutPage('AWARDSPROPS', { ...awardsData, awards_img: newLogos });
  };

  return (
    <Stack spacing={6}>
      <Box>
        <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700, mb: 3 }}>Innovation Insights Settings</Typography>
        <TextField fullWidth label="Heading" value={insightsData.heading || ""} onChange={(e) => updateAboutPage('innovationInsights', { ...insightsData, heading: e.target.value })} />
      </Box>
      <Box>
        <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700, mb: 3 }}>Awards Settings</Typography>
        <Stack spacing={4}>
          <TextField fullWidth label="Heading 1" value={awardsData.heading1 || ""} onChange={(e) => updateAboutPage('AWARDSPROPS', { ...awardsData, heading1: e.target.value })} />
          <TextField fullWidth label="Heading 2" value={awardsData.heading2 || ""} onChange={(e) => updateAboutPage('AWARDSPROPS', { ...awardsData, heading2: e.target.value })} />
        </Stack>

        <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700, mt: 4, mb: 2 }}>Logos</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>

          {(awardsData.awards_img || []).map((award: any, i: number) => (
            <Card key={i} sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, width: 200 }}>
              <img src={typeof award.img === 'string' ? award.img : award.img?.src} alt={`Logo ${i+1}`} style={{ height: "60px", objectFit: "contain" }} />
              <Stack direction="row" spacing={1}>
                <Button component="label" variant="outlined" size="small">
                  Edit
                  <input type="file" hidden accept="image/*" onChange={(e) => handleEditLogo(i, e)} />
                </Button>
                <Button color="error" variant="outlined" size="small" onClick={() => handleDeleteLogo(i)}>
                  <Delete fontSize="small" />
                </Button>
              </Stack>
            </Card>
          ))}
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button component="label" variant="contained" sx={{ backgroundColor: COLORS.PRIMARY_BLUE, color: COLORS.WHITE, "&:hover": { backgroundColor: COLORS.PRIMARY_BLUE, opacity: 0.9 } }}>
            Add Logo
            <input type="file" hidden accept="image/*" onChange={handleAddLogo} />
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

