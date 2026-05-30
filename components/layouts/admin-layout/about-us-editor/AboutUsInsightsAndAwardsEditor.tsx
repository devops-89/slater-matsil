import React from 'react';
import { Box, Button, Card, Stack, TextField, Typography, Grid, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ExpandMore, Delete, Save } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";


import { MediaControllers } from "@/api/mediaControllers";
import { useState } from "react";
import { useNotification } from "@/components/providers/NotificationProvider";

export const AboutUsInsightsAndAwardsEditor = ({ insightsData, awardsData, updateAboutPage }: any) => {
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [isAddingLogo, setIsAddingLogo] = useState(false);
  const { showNotification } = useNotification();

  const handleAddLogo = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsAddingLogo(true);
      const formData = new FormData();
      formData.append("image", file);
      const response = await MediaControllers.uploadMedia(formData);
      const responseData = response.data?.data?.data || response.data?.data;
      const uploadedUrl = responseData?.imgUrl || responseData?.videoUrl || responseData?.url;
      if (response.data?.success && uploadedUrl) {
        const currentLogos = awardsData.awards_img || [];
        updateAboutPage('AWARDSPROPS', { ...awardsData, awards_img: [...currentLogos, { img: uploadedUrl }] });
        showNotification("Logo added successfully", "success");
      }
    } catch (error) {
      showNotification("Failed to add logo", "error");
    } finally {
      setIsAddingLogo(false);
    }
  };

  const handleEditLogo = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploadingIndex(index);
      const formData = new FormData();
      formData.append("image", file);
      const response = await MediaControllers.uploadMedia(formData);
      const responseData = response.data?.data?.data || response.data?.data;
      const uploadedUrl = responseData?.imgUrl || responseData?.videoUrl || responseData?.url;
      if (response.data?.success && uploadedUrl) {
        const newLogos = [...(awardsData.awards_img || [])];
        newLogos[index] = { img: uploadedUrl };
        updateAboutPage('AWARDSPROPS', { ...awardsData, awards_img: newLogos });
        showNotification("Logo updated successfully", "success");
      }
    } catch (error) {
      showNotification("Failed to update logo", "error");
    } finally {
      setUploadingIndex(null);
    }
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
                <Button component="label" variant="outlined" size="small" disabled={uploadingIndex === i}>
                  {uploadingIndex === i ? "..." : "Edit"}
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
          <Button component="label" variant="contained" disabled={isAddingLogo} sx={{ backgroundColor: COLORS.PRIMARY_BLUE, color: COLORS.WHITE, "&:hover": { backgroundColor: COLORS.PRIMARY_BLUE, opacity: 0.9 } }}>
            {isAddingLogo ? "Adding..." : "Add Logo"}
            <input type="file" hidden accept="image/*" onChange={handleAddLogo} />
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

