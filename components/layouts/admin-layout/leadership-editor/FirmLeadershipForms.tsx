import React, { useState } from 'react';
import Image from "next/image";
import { Stack, TextField, Typography, Box, Button, IconButton, Paper, CircularProgress } from "@mui/material";
import { Delete, KeyboardArrowUp, KeyboardArrowDown, Add, Close } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { MediaControllers } from "@/api/mediaControllers";
import { useNotification } from "@/components/providers/NotificationProvider";

export default function FirmLeadershipForms({ activeSection, websiteData, updateFirmLeadershipPage, onDeleteMedia }: any) {
  const data = websiteData?.firm_leadership || {};

  const handleHeroChange = (field: string, value: string) => {
    updateFirmLeadershipPage(field, value);
  };

  const handleQuoteChange = (field: string, value: string) => {
    updateFirmLeadershipPage("missionQuote", { ...data.missionQuote, [field]: value });
  };

  const ArrayEditor = ({ arrayKey, title }: { arrayKey: string, title: string }) => {
    const items = data[arrayKey] || [];
    const { showNotification } = useNotification();
    const [uploadingStates, setUploadingStates] = useState<{ [key: number]: boolean }>({});

    const handleUpdate = (index: number, field: string, value: any) => {
      const newItems = [...items];
      newItems[index] = { ...newItems[index], [field]: value };
      updateFirmLeadershipPage(arrayKey, newItems);
    };

    const handleMultiUpdate = (index: number, updates: any) => {
      const newItems = [...items];
      newItems[index] = { ...newItems[index], ...updates };
      updateFirmLeadershipPage(arrayKey, newItems);
    };

    const handleAdd = () => {
      const newItems = [...items, { img: "", name: "New Name", designation: "New Designation", email: "", slug: "", isAdmin: arrayKey === "administration" }];
      updateFirmLeadershipPage(arrayKey, newItems);
    };

    const handleRemove = (index: number) => {
      const newItems = items.filter((_: any, i: number) => i !== index);
      updateFirmLeadershipPage(arrayKey, newItems);
    };

    const handleMove = (index: number, direction: 'up' | 'down') => {
      if (direction === 'up' && index === 0) return;
      if (direction === 'down' && index === items.length - 1) return;
      const newItems = [...items];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
      updateFirmLeadershipPage(arrayKey, newItems);
    };

    return (
      <Stack spacing={4}>
        <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
          {title} Settings
        </Typography>
        
        {items.map((item: any, index: number) => (
          <Paper key={index} elevation={0} sx={{ p: 3, border: '1px solid rgba(0,0,0,0.1)', borderRadius: 2, position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 0.5 }}>
              <IconButton size="small" onClick={() => handleMove(index, 'up')} disabled={index === 0}>
                <KeyboardArrowUp fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={() => handleMove(index, 'down')} disabled={index === items.length - 1}>
                <KeyboardArrowDown fontSize="small" />
              </IconButton>
              <IconButton size="small" color="error" onClick={() => handleRemove(index)}>
                <Delete fontSize="small" />
              </IconButton>
            </Box>
            
            <Stack spacing={3} mt={2}>
              <TextField 
                fullWidth label="Name" size="small"
                value={item.name || ""} 
                onChange={(e) => handleUpdate(index, "name", e.target.value)} 
              />
              <TextField 
                fullWidth label="Designation" size="small"
                value={item.designation || ""} 
                onChange={(e) => handleUpdate(index, "designation", e.target.value)} 
              />
              <Box>
                <Typography variant="caption" color="textSecondary" sx={{ mb: 1, display: 'block' }}>
                  Image File
                </Typography>
                <Button variant="outlined" component="label" size="small" disabled={uploadingStates[index]}>
                  {uploadingStates[index] ? <CircularProgress size={20} /> : "Upload Image"}
                  <input 
                    type="file" 
                    hidden 
                    accept="image/*" 
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        try {
                          setUploadingStates(prev => ({ ...prev, [index]: true }));
                          const formData = new FormData();
                          formData.append("image", file);
                          const res = await MediaControllers.uploadMedia(formData);
                          const responseData = res.data?.data?.data || res.data?.data;
                          const uploadedUrl = responseData?.imgUrl || responseData?.videoUrl || responseData?.url;
                          const uploadedKey = responseData?.key || uploadedUrl;
                          
                          if (uploadedUrl) {
                            handleMultiUpdate(index, {
                              img: uploadedUrl,
                              imageUrl: uploadedKey,
                              imageDownloadUrl: uploadedUrl,
                              key: uploadedKey
                            });
                            showNotification("Image uploaded successfully", "success");
                          }
                        } catch (error) {
                          showNotification("Failed to upload image", "error");
                        } finally {
                          setUploadingStates(prev => ({ ...prev, [index]: false }));
                        }
                      }
                    }} 
                  />
                </Button>
                {(item.imageDownloadUrl || item.img) && (typeof (item.imageDownloadUrl || item.img) === 'string' || item.img?.src) && (
                  <Box sx={{ mt: 2, position: "relative", width: 96, height: 96, borderRadius: 2, overflow: "hidden", border: "1px solid rgba(0,0,0,0.1)" }}>
                    <Image src={item.imageDownloadUrl || (typeof item.img === 'string' ? item.img : item.img?.src)} alt="preview" fill sizes="96px" style={{ objectFit: "cover" }} />
                    <IconButton
                      size="small"
                      color="error"
                      sx={{ position: 'absolute', top: 2, right: 2, backgroundColor: 'rgba(255,255,255,0.8)', padding: "2px", '&:hover': { backgroundColor: 'white' } }}
                      onClick={() => {
                        if (item.key && onDeleteMedia) {
                          onDeleteMedia(item.key);
                        }
                        handleMultiUpdate(index, { img: "", imageUrl: "", imageDownloadUrl: "", key: "" });
                      }}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Box>
              {arrayKey === "administration" && (
                <TextField 
                  fullWidth label="Email" size="small"
                  value={item.email || ""} 
                  onChange={(e) => handleUpdate(index, "email", e.target.value)} 
                />
              )}
            </Stack>
          </Paper>
        ))}

        <Button 
          variant="outlined" 
          startIcon={<Add />} 
          onClick={handleAdd}
          sx={{ borderColor: COLORS.PRIMARY_GREEN, color: COLORS.PRIMARY_GREEN }}
        >
          Add {title}
        </Button>
      </Stack>
    );
  };

  return (
    <Box>
      {activeSection === 0 && (
        <Stack spacing={4}>
          <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
            Hero Section Settings
          </Typography>
          <TextField 
            fullWidth 
            label="Hero Title" 
            value={data.heroTitle || ""} 
            onChange={(e) => handleHeroChange("heroTitle", e.target.value)} 
          />
        </Stack>
      )}

      {activeSection === 1 && (
        <Stack spacing={4}>
          <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
            Firm Mission Settings
          </Typography>
          <TextField 
            fullWidth 
            label="Mission Intro Text" 
            multiline 
            rows={4} 
            value={data.missionIntro || ""} 
            onChange={(e) => handleHeroChange("missionIntro", e.target.value)} 
          />
          <TextField 
            fullWidth 
            label="Mission Quote Line 1" 
            value={data.missionQuote?.line1 || ""} 
            onChange={(e) => handleQuoteChange("line1", e.target.value)} 
          />
          <TextField 
            fullWidth 
            label="Mission Quote Line 2" 
            value={data.missionQuote?.line2 || ""} 
            onChange={(e) => handleQuoteChange("line2", e.target.value)} 
          />
        </Stack>
      )}

      {activeSection === 2 && <ArrayEditor arrayKey="partners" title="Partner" />}
      {activeSection === 3 && <ArrayEditor arrayKey="patentAgents" title="Patent Agent" />}
      {activeSection === 4 && <ArrayEditor arrayKey="administration" title="Administrator" />}
    </Box>
  );
}
