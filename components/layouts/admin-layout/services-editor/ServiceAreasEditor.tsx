import React, { useState } from 'react';
import { 
  Box, Button, Typography, Grid, IconButton,
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Stack
} from "@mui/material";
import { Add, Delete, Close } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";

export const ServiceAreasEditor = ({ data, onChange }: { data: any, onChange: (newData: any) => void }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "", slug: "", img: "", detailsData: [] as any[] });

  const handleOpenNew = () => {
    setFormData({ title: "", description: "", slug: "", img: "", detailsData: [] });
    setEditingIdx(null);
    setDialogOpen(true);
  };

  const handleEdit = (item: any, idx: number) => {
    setFormData({ 
      title: item.title || "", 
      description: item.description || "",
      slug: item.slug || "",
      img: item.img || "",
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

  const handleSave = () => {
    let newSectionData = [...(data.section_Data || [])];
    
    if (editingIdx !== null) {
      newSectionData[editingIdx] = { 
        ...newSectionData[editingIdx], 
        title: formData.title, 
        description: formData.description,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
        detailsData: formData.detailsData,
        img: formData.img || newSectionData[editingIdx].img || ""
      };
    } else {
      newSectionData.push({
        serialNumber: `0${newSectionData.length + 1}`.slice(-2),
        title: formData.title,
        description: formData.description,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
        detailsData: formData.detailsData,
        img: formData.img || ""
      });
    }

    onChange({ ...data, section_Data: newSectionData });
    setDialogOpen(false);
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700, mb: 2 }}>
          Section Headers
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField 
              fullWidth label="Section Title" value={data.sectionTitle || ""}
              onChange={(e) => onChange({ ...data, sectionTitle: e.target.value })}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField 
              fullWidth label="Main Heading" value={data.heading || ""}
              onChange={(e) => onChange({ ...data, heading: e.target.value })}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: 4 }}>
        <Typography variant="h6" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
          Services List
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleOpenNew} sx={{ backgroundColor: COLORS.PRIMARY_GREEN, borderRadius: "50px" }}>
          Add Service
        </Button>
      </Box>

      {(!data.section_Data || data.section_Data.length === 0) ? (
        <Box sx={{ py: 6, textAlign: "center", border: `1px solid rgba(0,0,0,0.1)`, borderRadius: 4, backgroundColor: COLORS.OFF_WHITE }}>
          <Typography variant="h6" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE }}>
            No services found.
          </Typography>
          <Typography variant="body2" sx={{ color: COLORS.TEXT_PRIMARY, mt: 1 }}>
            Click "Add Service" to create your first service area.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {data.section_Data.map((item: any, idx: number) => (
            <Box 
              key={idx} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                p: 2,
                border: '1px solid rgba(0,0,0,0.1)',
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
        onClose={() => setDialogOpen(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{ sx: { borderRadius: 4, m: 2 } }}
      >
        <DialogTitle component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Typography variant="h5" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
            {editingIdx !== null ? "Edit Service" : "Add Service"}
          </Typography>
          <IconButton onClick={() => setDialogOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField 
              fullWidth 
              label="Service Title" 
              value={formData.title} 
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <TextField 
              fullWidth 
              label="Slug (Auto-generated or custom)" 
              value={formData.slug} 
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            />
            <TextField 
              fullWidth 
              label="Short Description (Card preview)" 
              multiline 
              rows={2} 
              value={formData.description} 
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            <Box sx={{ mt: 1 }}>
              <Typography variant="subtitle2" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE, mb: 1 }}>
                Service Icon / Image
              </Typography>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setFormData({ ...formData, img: reader.result as string });
                  };
                  reader.readAsDataURL(file);
                }}
                style={{ display: "block", width: "100%", padding: "8px", border: "1px solid rgba(0,0,0,0.2)", borderRadius: "8px" }}
              />
              {formData.img && (
                <Box sx={{ mt: 2, width: 96, height: 96, borderRadius: 2, overflow: "hidden", border: "1px solid rgba(0,0,0,0.1)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={typeof formData.img === "string" ? formData.img : (formData.img as any).src}
                    alt="Service icon"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
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
          <Button onClick={() => setDialogOpen(false)} color="inherit">Cancel</Button>
          <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: COLORS.PRIMARY_BLUE }}>
            Save Service
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
