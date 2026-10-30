import React, { useState } from 'react';
import { 
  Box, Button, Typography, Grid, IconButton,
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Stack, CircularProgress
} from "@mui/material";
import { Add, Delete, Close, Upload } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { MediaControllers } from "@/api/mediaControllers";
import { useNotification } from "@/components/providers/NotificationProvider";
import { generateSlug } from "@/utils/mappers/servicesMapper";

export const ServiceAreasEditor = ({ data, onChange, onDeleteMedia }: { data: any, onChange: (newData: any) => void, onDeleteMedia?: any }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    slug: "",
    img: "",
    detailsData: [] as any[],
    imageUrl: "",
    imageDownloadUrl: "",
    heroImg: "",
    heroImageUrl: "",
    heroImageDownloadUrl: "",
  });
  
  const [pendingHeroFile, setPendingHeroFile] = useState<File | null>(null);
  const [pendingIconFile, setPendingIconFile] = useState<File | null>(null);
  const [heroPreviewUrl, setHeroPreviewUrl] = useState<string>("");
  const [iconPreviewUrl, setIconPreviewUrl] = useState<string>("");
  const [isSavingService, setIsSavingService] = useState(false);
  const { showNotification } = useNotification();

  const handleIconFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPendingIconFile(file);
    const localUrl = URL.createObjectURL(file);
    setIconPreviewUrl(localUrl);
    setFormData((prev) => ({
      ...prev,
      imageDownloadUrl: localUrl,
      img: localUrl,
    }));
  };

  const handleHeroFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPendingHeroFile(file);
    const localUrl = URL.createObjectURL(file);
    setHeroPreviewUrl(localUrl);
    setFormData((prev) => ({
      ...prev,
      heroImageDownloadUrl: localUrl,
      heroImg: localUrl,
    }));
  };

  const handleOpenNew = () => {
    setPendingHeroFile(null);
    setPendingIconFile(null);
    setHeroPreviewUrl("");
    setIconPreviewUrl("");
    setFormData({
      title: "",
      description: "",
      slug: "",
      img: "",
      detailsData: [],
      imageUrl: "",
      imageDownloadUrl: "",
      heroImg: "",
      heroImageUrl: "",
      heroImageDownloadUrl: "",
    });
    setEditingIdx(null);
    setDialogOpen(true);
  };

  const handleEdit = (item: any, idx: number) => {
    setPendingHeroFile(null);
    setPendingIconFile(null);
    setHeroPreviewUrl("");
    setIconPreviewUrl("");
    setFormData({ 
      title: item.title || "", 
      description: item.description || "",
      slug: item.slug || "",
      img: item.img || "",
      imageUrl: item.imageUrl || item.key || "",
      imageDownloadUrl: item.imageDownloadUrl || item.img || "",
      heroImg: item.heroImg || item.detailsHeroImg || "",
      heroImageUrl: item.heroImageUrl || item.detailsHeroUrl || item.heroKey || "",
      heroImageDownloadUrl: item.heroImageDownloadUrl || item.detailsHeroDownloadUrl || item.heroImg || "",
      detailsData: item.detailsData ? JSON.parse(JSON.stringify(item.detailsData)) : []
    });
    setEditingIdx(idx);
    setDialogOpen(true);
  };

  const handleDelete = (idx: number) => {
    const newSectionData = [...(data.section_Data || [])];
    newSectionData.splice(idx, 1);
    
    // Re-assign serial numbers sequentially
    const updatedData = newSectionData.map((item, i) => ({
      ...item,
      serialNumber: `0${i + 1}`.slice(-2)
    }));

    onChange({ ...data, section_Data: updatedData });
  };

  const handleSave = async () => {
    setIsSavingService(true);
    try {
      let finalHeroImageUrl = formData.heroImageUrl;
      let finalHeroImageDownloadUrl = formData.heroImageDownloadUrl;
      let finalHeroImg = formData.heroImg;

      if (pendingHeroFile) {
        const formDataUpload = new FormData();
        formDataUpload.append("image", pendingHeroFile);
        const res = await MediaControllers.uploadMedia(formDataUpload);
        const responseData = res.data?.data?.data || res.data?.data;
        const uploadedUrl = responseData?.imgUrl || responseData?.videoUrl || responseData?.url || responseData?.imageDownloadUrl;
        const uploadedKey = responseData?.key || uploadedUrl;
        if (uploadedUrl) {
          finalHeroImageUrl = uploadedKey;
          finalHeroImageDownloadUrl = uploadedUrl;
          finalHeroImg = uploadedUrl;
        }
      }

      let finalImageUrl = formData.imageUrl;
      let finalImageDownloadUrl = formData.imageDownloadUrl;
      let finalImg = formData.img;

      if (pendingIconFile) {
        const formDataUpload = new FormData();
        formDataUpload.append("image", pendingIconFile);
        const res = await MediaControllers.uploadMedia(formDataUpload);
        const responseData = res.data?.data?.data || res.data?.data;
        const uploadedUrl = responseData?.imgUrl || responseData?.videoUrl || responseData?.url || responseData?.imageDownloadUrl;
        const uploadedKey = responseData?.key || uploadedUrl;
        if (uploadedUrl) {
          finalImageUrl = uploadedKey;
          finalImageDownloadUrl = uploadedUrl;
          finalImg = uploadedUrl;
        }
      }

      let newSectionData = [...(data.section_Data || [])];
      const finalSlug = (formData.slug && formData.slug.trim()) ? formData.slug.trim() : generateSlug(formData.title);

      const updatedItem = {
        title: formData.title,
        description: formData.description,
        slug: finalSlug,
        detailsData: formData.detailsData,
        img: finalImageDownloadUrl || finalImg || "",
        imageUrl: finalImageUrl || "",
        imageDownloadUrl: finalImageDownloadUrl || "",
        heroImg: finalHeroImageDownloadUrl || finalHeroImg || "",
        heroImageUrl: finalHeroImageUrl || "",
        heroImageDownloadUrl: finalHeroImageDownloadUrl || "",
      };

      if (editingIdx !== null) {
        newSectionData[editingIdx] = { 
          ...newSectionData[editingIdx], 
          ...updatedItem,
        };
      } else {
        newSectionData.push({
          serialNumber: `0${newSectionData.length + 1}`.slice(-2),
          ...updatedItem,
        });
      }

      onChange({ ...data, section_Data: newSectionData });
      setPendingHeroFile(null);
      setPendingIconFile(null);
      setHeroPreviewUrl("");
      setIconPreviewUrl("");
      setDialogOpen(false);
    } catch (err) {
      console.error("Failed to upload service media", err);
      showNotification("Failed to upload image", "error");
    } finally {
      setIsSavingService(false);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE }}>
          Services List ({data.section_Data?.length || 0})
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={handleOpenNew}
          sx={{ backgroundColor: COLORS.PRIMARY_GREEN }}
        >
          Add Service
        </Button>
      </Box>

      {/* Grid of existing services */}
      {(!data.section_Data || data.section_Data.length === 0) ? (
        <Box sx={{ p: 4, textAlign: 'center', backgroundColor: '#FAFAFA', borderRadius: 2 }}>
          <Typography color="textSecondary">No services added yet.</Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {data.section_Data.map((item: any, idx: number) => (
            <Box 
              key={idx} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                p: 2, 
                border: '1px solid rgba(0,0,0,0.08)', 
                borderRadius: 2,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                  borderColor: COLORS.PRIMARY_BLUE
                }
              }}
            >
              <Typography 
                onClick={() => handleEdit(item, idx)}
                sx={{ 
                  fontFamily: tradeGothic.style.fontFamily, 
                  fontWeight: 700, 
                  fontSize: 16, 
                  color: COLORS.PRIMARY_BLUE,
                  cursor: 'pointer',
                  '&:hover': { color: COLORS.PRIMARY_GREEN }
                }}
              >
                {item.serialNumber}. {item.title}
              </Typography>
              <IconButton color="error" size="small" onClick={() => handleDelete(idx)}>
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      <Dialog 
        open={dialogOpen} 
        onClose={() => !isSavingService && setDialogOpen(false)} 
        maxWidth="md" 
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 4, m: 2 } } }}
      >
        <DialogTitle component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Typography variant="h5" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
            {editingIdx !== null ? "Edit Service" : "Add Service"}
          </Typography>
          <IconButton onClick={() => setDialogOpen(false)} disabled={isSavingService}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Box>
              <TextField 
                fullWidth 
                label="Service Title" 
                value={formData.title} 
                onChange={(e) => {
                  const newTitle = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    title: newTitle,
                    slug: prev.slug ? prev.slug : generateSlug(newTitle),
                  }));
                }}
              />
            </Box>

            <Box>
              <TextField 
                fullWidth 
                label="URL Slug" 
                value={formData.slug} 
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder={generateSlug(formData.title) || "service-slug"}
                helperText={`Website Route: /services/${formData.slug?.trim() || generateSlug(formData.title) || "..."}`}
              />
            </Box>

            <TextField 
              fullWidth 
              label="Short Description (Card preview)" 
              multiline 
              rows={2} 
              value={formData.description} 
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            {/* Service Icon / Image */}
            <Box sx={{ mt: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="subtitle2" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE, mb: 1 }}>
                  Service Icon / Image (Card Preview)
                </Typography>
                <Button component="label" variant="outlined" startIcon={<Upload />} size="small" sx={{ color: COLORS.PRIMARY_BLUE }} disabled={isSavingService}>
                  Upload Image
                  <input type="file" hidden accept="image/*" onChange={handleIconFileSelect} />
                </Button>
              </Box>
              {(iconPreviewUrl || formData.imageDownloadUrl || (formData as any).imageUrl || formData.img) && (
                <Box sx={{ mt: 2, position: "relative", width: 100, height: 100, borderRadius: 2, overflow: "hidden", border: "1px solid rgba(0,0,0,0.12)", bgcolor: "#fafafa" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={iconPreviewUrl || (formData as any).imageDownloadUrl || (typeof formData.img === "string" ? formData.img : (formData.img as any)?.src) || (typeof (formData as any).imageUrl === 'string' ? (formData as any).imageUrl : (formData as any).imageUrl?.src)}
                    alt="Service icon"
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => {
                      if (onDeleteMedia && (formData.imageUrl || (formData as any).key)) {
                        onDeleteMedia(formData.imageUrl || (formData as any).key);
                      }
                      setPendingIconFile(null);
                      setIconPreviewUrl("");
                      setFormData({ ...formData, img: "", imageUrl: "", imageDownloadUrl: "" } as any);
                    }}
                    sx={{ position: "absolute", top: 2, right: 2, backgroundColor: "rgba(255,255,255,0.85)", padding: "2px", "&:hover": { backgroundColor: "white" } }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Box>

            {/* Details Page Hero Image (Square Preview) */}
            <Box sx={{ mt: 1, pt: 2, borderTop: "1px solid rgba(0,0,0,0.08)" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE }}>
                    Hero Image (For Details Page)
                  </Typography>
                  <Typography variant="caption" color="textSecondary" sx={{ display: "block", mt: 0.5 }}>
                    Banner background image displayed on this service's details page (/services/{formData.slug?.trim() || generateSlug(formData.title) || "..."})
                  </Typography>
                </Box>
                <Button component="label" variant="outlined" startIcon={<Upload />} size="small" sx={{ color: COLORS.PRIMARY_BLUE, whiteSpace: "nowrap" }} disabled={isSavingService}>
                  Upload Hero Image
                  <input type="file" hidden accept="image/*" onChange={handleHeroFileSelect} />
                </Button>
              </Box>
              {(heroPreviewUrl || formData.heroImageDownloadUrl || formData.heroImg || formData.heroImageUrl) && (
                <Box 
                  sx={{ 
                    mt: 2, 
                    position: "relative", 
                    width: 120, 
                    height: 120, 
                    borderRadius: 2, 
                    overflow: "hidden", 
                    border: "1px solid rgba(0,0,0,0.15)",
                    bgcolor: "#f9f9f9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={heroPreviewUrl || formData.heroImageDownloadUrl || formData.heroImg || formData.heroImageUrl}
                    alt="Details Hero Banner"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (formData.heroImg && target.src !== formData.heroImg) {
                        target.src = formData.heroImg;
                      }
                    }}
                  />
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => {
                      if (onDeleteMedia && formData.heroImageUrl) {
                        onDeleteMedia(formData.heroImageUrl);
                      }
                      setPendingHeroFile(null);
                      setHeroPreviewUrl("");
                      setFormData({ ...formData, heroImg: "", heroImageUrl: "", heroImageDownloadUrl: "" });
                    }}
                    sx={{ 
                      position: "absolute", 
                      top: 4, 
                      right: 4, 
                      backgroundColor: "rgba(255,255,255,0.85)", 
                      padding: "4px", 
                      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                      "&:hover": { backgroundColor: "white" } 
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Box>
            
            <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
              <Typography variant="h6" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE, mb: 1 }}>
                Detailed Content Sections (For Details Page)
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Add the paragraphs and bullet points that will appear on the full service details page.
              </Typography>
              
              {formData.detailsData.map((detail, dIdx) => (
                <Box key={dIdx} sx={{ mb: 3, p: 2, border: '1px solid rgba(0,0,0,0.1)', borderRadius: 2, backgroundColor: '#FAFAFA' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Paragraph {dIdx + 1}</Typography>
                    <IconButton color="error" size="small" onClick={() => {
                      const newDetails = [...formData.detailsData];
                      newDetails.splice(dIdx, 1);
                      setFormData({ ...formData, detailsData: newDetails });
                    }}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                  <TextField 
                    fullWidth 
                    multiline rows={3} 
                    label="Paragraph Description" 
                    value={detail.description || ""}
                    onChange={(e) => {
                      const newDetails = [...formData.detailsData];
                      newDetails[dIdx].description = e.target.value;
                      setFormData({ ...formData, detailsData: newDetails });
                    }}
                    sx={{ mb: 2, backgroundColor: '#FFFFFF' }}
                  />
                  <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 1 }}>Bullet Points (Optional)</Typography>
                  {detail.dataList?.map((listItem: any, lIdx: number) => (
                    <Box key={lIdx} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                      <TextField 
                        fullWidth size="small" 
                        placeholder="Bullet point text..."
                        value={listItem.label || ""}
                        onChange={(e) => {
                          const newDetails = [...formData.detailsData];
                          newDetails[dIdx].dataList[lIdx].label = e.target.value;
                          setFormData({ ...formData, detailsData: newDetails });
                        }}
                        sx={{ backgroundColor: '#FFFFFF' }}
                      />
                      <IconButton color="error" size="small" onClick={() => {
                        const newDetails = [...formData.detailsData];
                        newDetails[dIdx].dataList.splice(lIdx, 1);
                        setFormData({ ...formData, detailsData: newDetails });
                      }}>
                        <Close fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                  <Button size="small" startIcon={<Add />} onClick={() => {
                    const newDetails = [...formData.detailsData];
                    if (!newDetails[dIdx].dataList) newDetails[dIdx].dataList = [];
                    newDetails[dIdx].dataList.push({ label: "" });
                    setFormData({ ...formData, detailsData: newDetails });
                  }} sx={{ mt: 1 }}>
                    Add Bullet Point
                  </Button>
                </Box>
              ))}
              <Button variant="outlined" startIcon={<Add />} onClick={() => {
                setFormData({ ...formData, detailsData: [...formData.detailsData, { description: "" }] });
              }}>
                Add Paragraph
              </Button>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDialogOpen(false)} color="inherit" disabled={isSavingService}>Cancel</Button>
          <Button 
            onClick={handleSave} 
            variant="contained" 
            disabled={isSavingService}
            sx={{ backgroundColor: COLORS.PRIMARY_BLUE }}
          >
            {isSavingService ? "Saving..." : "Save Service"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
