import React from 'react';
import { Box, Button, Card, IconButton, Stack, TextField, Typography, CircularProgress } from "@mui/material";
import { Delete, Upload } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { MediaControllers } from "@/api/mediaControllers";
import { useState } from "react";
import { useNotification } from "@/components/providers/NotificationProvider";

export const WhoWeServeEditor = ({ data, onChange }: { data: any, onChange: (newData: any) => void }) => {
  const [isUploading, setIsUploading] = useState(false);
  const { showNotification } = useNotification();
  return (
    <Stack spacing={4}>
      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
        Who We Serve Settings
      </Typography>
      
      <Card sx={{ p: 3, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 4, boxShadow: "0 2px 10px rgba(0,0,0,0.02)", backgroundColor: "#FFFFFF" }}>
        <Typography sx={{ fontFamily: tradeGothic.style.fontFamily, fontWeight: 700, color: COLORS.PRIMARY_GREEN, mb: 3 }}>
          Left Section Settings
        </Typography>
        <Stack spacing={3}>
          <TextField 
            fullWidth label="Starting Year Text" value={data.leftSection?.startingYear || ""}
            onChange={(e) => onChange({ ...data, leftSection: { ...data.leftSection, startingYear: e.target.value } })}
          />
          <TextField 
            fullWidth label="Services Label" value={data.leftSection?.servicesLabel || ""}
            onChange={(e) => onChange({ ...data, leftSection: { ...data.leftSection, servicesLabel: e.target.value } })}
          />
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="subtitle2" color="text.secondary">Who We Serve Image</Typography>
              <Button component="label" variant="outlined" startIcon={isUploading ? <CircularProgress size={16} /> : <Upload />} size="small" sx={{ color: COLORS.PRIMARY_BLUE, borderColor: COLORS.PRIMARY_BLUE, whiteSpace: "nowrap" }} disabled={isUploading}>
                {isUploading ? "Uploading..." : "Upload Image"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      try {
                        setIsUploading(true);
                        const formData = new FormData();
                        formData.append("image", file);
                        
                        const res = await MediaControllers.uploadMedia(formData);
                        const responseData = res.data?.data?.data || res.data?.data;
                        const uploadedUrl = responseData?.imgUrl || responseData?.videoUrl || responseData?.url;
                        const uploadedKey = responseData?.key || uploadedUrl;
                        if (uploadedUrl) {
                          onChange({ ...data, leftSection: { ...data.leftSection, heroImage: uploadedUrl, imageDownloadUrl: uploadedUrl, imageUrl: uploadedKey } });
                          showNotification("Image uploaded successfully", "success");
                        }
                      } catch (error) {
                        console.error("Failed to upload who we serve image", error);
                        showNotification("Failed to upload image", "error");
                      } finally {
                        setIsUploading(false);
                      }
                    }
                  }}
                />
              </Button>
            </Box>
            {(data.leftSection?.imageDownloadUrl || data.leftSection?.heroImage) ? (
              <Box sx={{ mt: 2, position: "relative", width: "100%", borderRadius: 1, overflow: "hidden", border: "1px solid #ddd" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.leftSection?.imageDownloadUrl || data.leftSection?.heroImage} alt="preview" style={{ width: "100%", maxHeight: "150px", objectFit: "cover" }} />
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => onChange({ ...data, leftSection: { ...data.leftSection, heroImage: "", imageDownloadUrl: "", imageUrl: "" } })}
                  sx={{ position: "absolute", top: 2, right: 2, backgroundColor: "rgba(255,255,255,0.8)", padding: "2px", "&:hover": { backgroundColor: "white" } }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            ) : null}
          </Box>
        </Stack>
      </Card>

      <Card sx={{ p: 3, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 4, boxShadow: "0 2px 10px rgba(0,0,0,0.02)", backgroundColor: "#FFFFFF" }}>
        <Typography sx={{ fontFamily: tradeGothic.style.fontFamily, fontWeight: 700, color: COLORS.PRIMARY_GREEN, mb: 3 }}>
          Right Section Settings
        </Typography>
        <Stack spacing={3}>
          <TextField 
            fullWidth label="Heading" value={data.rightSection?.heading || ""}
            onChange={(e) => onChange({ ...data, rightSection: { ...data.rightSection, heading: e.target.value } })}
          />
          <TextField 
            fullWidth label="Description" multiline rows={3} value={data.rightSection?.description || ""}
            onChange={(e) => onChange({ ...data, rightSection: { ...data.rightSection, description: e.target.value } })}
          />
          <TextField 
            fullWidth label="Endline Quote" value={data.rightSection?.endline || ""}
            onChange={(e) => onChange({ ...data, rightSection: { ...data.rightSection, endline: e.target.value } })}
          />
          <TextField 
            fullWidth label="CTA Button Text" value={data.rightSection?.ctaButton?.text || ""}
            onChange={(e) => onChange({ ...data, rightSection: { ...data.rightSection, ctaButton: { ...data.rightSection.ctaButton, text: e.target.value } } })}
          />
        </Stack>
      </Card>

      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700, mt: 4 }}>
        Client Categories (Bullet Points)
      </Typography>

      {data.rightSection?.section_data?.map((item: any, idx: number) => (
        <Card key={idx} sx={{ p: 3, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 4, boxShadow: "0 2px 10px rgba(0,0,0,0.02)", backgroundColor: "#FFFFFF" }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField 
              fullWidth label={`Bullet Point ${idx + 1}`} value={item.label || ""}
              onChange={(e) => {
                const newSectionData = [...data.rightSection.section_data];
                newSectionData[idx] = { ...newSectionData[idx], label: e.target.value };
                onChange({ ...data, rightSection: { ...data.rightSection, section_data: newSectionData } });
              }}
            />
            <IconButton
              color="error"
              onClick={() => {
                const newSectionData = data.rightSection.section_data.filter((_: any, i: number) => i !== idx);
                onChange({ ...data, rightSection: { ...data.rightSection, section_data: newSectionData } });
              }}
            >
              <Delete />
            </IconButton>
          </Stack>
        </Card>
      ))}

      <Button 
        variant="contained" 
        onClick={() => {
          const newSectionData = [...(data.rightSection?.section_data || []), { label: "New Bullet Point" }];
          onChange({ ...data, rightSection: { ...data.rightSection, section_data: newSectionData } });
        }}
        sx={{ backgroundColor: COLORS.PRIMARY_BLUE, color: COLORS.WHITE }}
      >
        + Add Bullet Point
      </Button>
    </Stack>
  );
};

