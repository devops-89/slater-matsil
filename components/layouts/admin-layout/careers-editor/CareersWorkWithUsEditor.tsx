import React from "react";
import { Box, Stack, TextField, Typography, Divider, Button, IconButton } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";

export function CareersWorkWithUsEditor({ data, onChange, onDeleteMedia }: any) {
  const { showNotification } = require("@/components/providers/NotificationProvider").useNotification();
  const [isUploading, setIsUploading] = React.useState(false);

  const handleChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const { MediaControllers } = require("@/api/mediaControllers");
        const formData = new FormData();
        formData.append("image", file);
        const res = await MediaControllers.uploadMedia(formData);
        const responseData = res.data?.data?.data || res.data?.data;
        const uploadedUrl = responseData?.imgUrl || responseData?.videoUrl || responseData?.url;
        const uploadedKey = responseData?.key || uploadedUrl;
        
        if (uploadedUrl) {
          onChange({
            ...data,
            section_img: uploadedUrl,
            section_imageUrl: uploadedKey,
            section_imageDownloadUrl: uploadedUrl,
            section_imageKey: uploadedKey
          });
          showNotification("Image uploaded successfully", "success");
        }
      } catch (error) {
        showNotification("Failed to upload image", "error");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleListChange = (index: number, value: string) => {
    const newList = [...(data?.work_list_data || [])];
    newList[index] = { ...newList[index], title: value };
    onChange({ ...data, work_list_data: newList });
  };

  const addListItem = () => {
    const newList = [...(data?.work_list_data || []), { title: "" }];
    onChange({ ...data, work_list_data: newList });
  };

  const removeListItem = (index: number) => {
    const newList = [...(data?.work_list_data || [])];
    newList.splice(index, 1);
    onChange({ ...data, work_list_data: newList });
  };

  return (
    <Stack spacing={3}>
      <TextField
        fullWidth
        label="First Title"
        value={data?.firstTitle || ""}
        onChange={(e) => handleChange("firstTitle", e.target.value)}
      />
      <TextField
        fullWidth
        label="Second Title"
        value={data?.secondTitle || ""}
        onChange={(e) => handleChange("secondTitle", e.target.value)}
      />
      <TextField
        fullWidth
        multiline
        rows={3}
        label="Short Description"
        value={data?.shortDescription || ""}
        onChange={(e) => handleChange("shortDescription", e.target.value)}
      />

      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle2" color="text.secondary">Work List Data</Typography>
        <Button startIcon={<Add />} onClick={addListItem} size="small" sx={{ color: COLORS.PRIMARY_BLUE }}>
          Add Item
        </Button>
      </Box>

      {data?.work_list_data?.map((item: any, index: number) => (
        <Stack direction="row" spacing={2} key={index} alignItems="center">
          <TextField
            fullWidth
            size="small"
            multiline
            rows={2}
            label={`Item ${index + 1}`}
            value={item.title || ""}
            onChange={(e) => handleListChange(index, e.target.value)}
          />
          <IconButton onClick={() => removeListItem(index)} color="error" size="small">
            <Delete />
          </IconButton>
        </Stack>
      ))}

      <Divider sx={{ my: 2 }} />
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>Section Image</Typography>
        <Button component="label" variant="outlined" size="small" sx={{ color: COLORS.PRIMARY_BLUE }} disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload Image"}
          <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
        </Button>
        {data?.section_img && (
          <Box sx={{ mt: 2, position: "relative", width: 120, height: 120, borderRadius: 2, overflow: "hidden", border: "1px solid rgba(0,0,0,0.1)" }}>
            <img src={typeof data.section_img === 'string' ? data.section_img : data.section_img?.src} alt="Section" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <IconButton
              size="small"
              color="error"
              sx={{ position: 'absolute', top: 2, right: 2, backgroundColor: 'rgba(255,255,255,0.8)', padding: "2px", '&:hover': { backgroundColor: 'white' } }}
              onClick={() => {
                const key = data.section_imageKey || data.section_imageUrl;
                if (key && onDeleteMedia) {
                  onDeleteMedia(key);
                }
                onChange({ ...data, section_img: "", section_imageUrl: "", section_imageDownloadUrl: "", section_imageKey: "" });
                showNotification("Image removed from preview. Click Save Changes to delete it.", "info");
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>
    </Stack>
  );
}
