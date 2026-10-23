import React, { useState } from 'react';
import { Box, Button, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import { Delete, Upload, Add } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";

import { MediaControllers } from "@/api/mediaControllers";
import { useNotification } from "@/components/providers/NotificationProvider";

export const InsightsQuickLinksEditor = ({ data, onChange, onDeleteMedia }: { data: any, onChange: (newData: any) => void, onDeleteMedia?: any }) => {
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const { showNotification } = useNotification();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploadingIndex(index);
      const formData = new FormData();
      formData.append("image", file);
      
      const res = await MediaControllers.uploadMedia(formData);
      const responseData = res.data?.data?.data || res.data?.data;
      const uploadedUrl = responseData?.imgUrl || responseData?.videoUrl || responseData?.url;
      const uploadedKey = responseData?.key || uploadedUrl;
      
      if (uploadedUrl) {
        handleMultiChange(index, {
          img: uploadedUrl,
          imageUrl: uploadedKey,
          imageDownloadUrl: uploadedUrl,
          key: uploadedKey
        });
        showNotification("Image uploaded successfully", "success");
      }
    } catch (error) {
      console.error("Failed to upload image", error);
      showNotification("Failed to upload image", "error");
    } finally {
      setUploadingIndex(null);
    }
  };

  const links = data?.data || [];

  const handleItemChange = (index: number, field: string, value: any) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    onChange({ ...data, data: newLinks });
  };

  const handleMultiChange = (index: number, updates: any) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], ...updates };
    onChange({ ...data, data: newLinks });
  };

  const handleAddItem = () => {
    onChange({
      ...data,
      data: [...links, { img: "", title: "", href: "" }]
    });
  };

  const handleDeleteItem = (index: number) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    onChange({ ...data, data: newLinks });
  };

  const handleDeleteImage = (index: number) => {
    const link = links[index];
    if (onDeleteMedia && (link.key || link.imageUrl)) {
      onDeleteMedia(link.key || link.imageUrl);
    }
    handleMultiChange(index, { img: "", imageUrl: "", imageDownloadUrl: "", key: "" });
    showNotification("Image removed from preview. Don't forget to save changes.", "info");
  };

  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700, mb: 2 }}>
          Quick Links Settings
        </Typography>
        <TextField 
          fullWidth 
          label="Section Title" 
          value={data?.title || ""} 
          onChange={(e) => onChange({ ...data, title: e.target.value })} 
        />
      </Box>

      <Divider />

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="subtitle1" sx={{ fontFamily: adelle.style.fontFamily, fontWeight: 700 }}>
          Links List
        </Typography>
        <Button startIcon={<Add />} variant="contained" size="small" onClick={handleAddItem} sx={{ backgroundColor: COLORS.PRIMARY_BLUE }}>
          Add Link
        </Button>
      </Box>

      {links.map((link: any, index: number) => (
        <Box key={index} sx={{ border: "1px solid #eee", p: 2, borderRadius: 2, position: "relative", backgroundColor: "#fff" }}>
          <IconButton 
            color="error" 
            onClick={() => handleDeleteItem(index)}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <Delete />
          </IconButton>
          
          <Stack spacing={2} sx={{ mt: 1, pr: 4 }}>
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Icon/Image
                </Typography>
                <Button component="label" variant="outlined" startIcon={<Upload />} size="small" sx={{ color: COLORS.PRIMARY_BLUE }} disabled={uploadingIndex === index}>
                  {uploadingIndex === index ? "Uploading..." : "Upload Image"}
                  <input type="file" hidden accept="image/*" onChange={(e) => handleImageUpload(e, index)} />
                </Button>
              </Box>
              {link.img && (
                <Box sx={{ mt: 2, position: "relative", width: 64, height: 64, borderRadius: 1, overflow: "hidden", border: "1px solid #ddd", backgroundColor: "#ECF8F8" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={typeof link.img === 'string' ? link.img : (link.img?.src || link.img)} alt="link icon" style={{ width: "100%", height: "100%", objectFit: "contain", padding: "8px" }} />
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDeleteImage(index)}
                    sx={{ position: "absolute", top: 2, right: 2, backgroundColor: "rgba(255,255,255,0.8)", padding: "2px", "&:hover": { backgroundColor: "white" } }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Box>
            
            <TextField 
              fullWidth 
              label="Title" 
              value={link.title || ""} 
              onChange={(e) => handleItemChange(index, "title", e.target.value)} 
            />
            <TextField 
              fullWidth 
              label="URL" 
              value={link.href || ""} 
              onChange={(e) => handleItemChange(index, "href", e.target.value)} 
            />
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};
