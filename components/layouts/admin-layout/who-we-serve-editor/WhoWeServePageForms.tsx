import React, { useState } from "react";
import { Box, Stack, TextField, Typography, Divider, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Upload, Edit } from "@mui/icons-material";
import { adelle } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";

const handleFileUpload = (field: string, data: any, onChange: any, event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange({ ...data, [field]: reader.result });
    };
    reader.readAsDataURL(file);
  }
};

const WhoWeServeHeroEditor = ({ data, onChange }: any) => {
  const handleChange = (field: string, value: string) => onChange({ ...data, [field]: value });
  return (
    <Stack spacing={3}>
      <TextField fullWidth label="Title (Tagline)" value={data?.title || ""} onChange={(e) => handleChange("title", e.target.value)} />
      <TextField fullWidth label="Heading 1" value={data?.heading1 || ""} onChange={(e) => handleChange("heading1", e.target.value)} />
      <TextField fullWidth label="Span Heading 1" value={data?.spanHeading1 || ""} onChange={(e) => handleChange("spanHeading1", e.target.value)} />
      <TextField fullWidth label="Span Heading 2" value={data?.spanHeading2 || ""} onChange={(e) => handleChange("spanHeading2", e.target.value)} />
      
      <Box>
        <Typography variant="caption" display="block" gutterBottom>Hero Image</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-start' }}>
          {(data?.img) && (
            <Box sx={{ width: 120, height: 80, borderRadius: 1, overflow: 'hidden', border: '1px solid #ddd', position: 'relative' }}>
              <img src={typeof data.img === 'string' ? data.img : data.img.src} alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
          )}
          <Button component="label" variant="outlined" startIcon={<Upload />} size="small">
            Upload New
            <input type="file" hidden accept="image/*" onChange={(e) => handleFileUpload("img", data, onChange, e)} />
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

const WhoWeServeAboutEditor = ({ data, onChange }: any) => {
  const handleChange = (field: string, value: string) => onChange({ ...data, [field]: value });
  
  const handleQuoteChange = (field: string, value: string) => {
    onChange({
      ...data,
      quoteCardData: {
        ...data?.quoteCardData,
        [field]: value
      }
    });
  };

  return (
    <Stack spacing={3}>
      <TextField fullWidth multiline rows={3} label="Left Side Description" value={data?.leftSideDescription || ""} onChange={(e) => handleChange("leftSideDescription", e.target.value)} />
      <TextField fullWidth multiline rows={4} label="Right Side Description" value={data?.rightSideDescription || ""} onChange={(e) => handleChange("rightSideDescription", e.target.value)} />
      
      <Divider sx={{ my: 1 }} />
      <Typography variant="subtitle2" color="text.secondary">Quote Block</Typography>
      <TextField fullWidth multiline rows={3} label="Quote Text" value={data?.quoteCardData?.quote || ""} onChange={(e) => handleQuoteChange("quote", e.target.value)} />
      <TextField fullWidth label="Quote Author" value={data?.quoteCardData?.author || ""} onChange={(e) => handleQuoteChange("author", e.target.value)} />

      <Box>
        <Typography variant="caption" display="block" gutterBottom>Logo Image</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-start' }}>
          {(data?.img) && (
            <Box sx={{ width: 120, height: 80, borderRadius: 1, overflow: 'hidden', border: '1px solid #ddd', position: 'relative', backgroundColor: '#f0f0f0' }}>
              <img src={typeof data.img === 'string' ? data.img : data.img.src} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </Box>
          )}
          <Button component="label" variant="outlined" startIcon={<Upload />} size="small">
            Upload New
            <input type="file" hidden accept="image/*" onChange={(e) => handleFileUpload("img", data, onChange, e)} />
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

const WhoWeServeTabsEditor = ({ data, onChange }: any) => {
  const tabs = data;
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0);

  const openEditModal = (index: number) => {
    setActiveTab(index);
    setEditModalOpen(true);
  };

  const handleTabChange = (field: string, value: string) => {
    const newTabs = [...(tabs || [])];
    if(newTabs[activeTab]) {
      newTabs[activeTab] = { ...newTabs[activeTab], [field]: value };
      onChange(newTabs);
    }
  };

  const handleDataDescChange = (index: number, value: string) => {
    const newTabs = [...(tabs || [])];
    if(newTabs[activeTab]) {
      const newData = [...(newTabs[activeTab].data || [])];
      newData[index] = { ...newData[index], description: value };
      newTabs[activeTab] = { ...newTabs[activeTab], data: newData };
      onChange(newTabs);
    }
  };

  const handleQuoteCardChange = (field: string, value: string) => {
    const newTabs = [...(tabs || [])];
    if(newTabs[activeTab]) {
      const newQuoteCardData = { ...(newTabs[activeTab].quoteCardData || {}), [field]: value };
      newTabs[activeTab] = { ...newTabs[activeTab], quoteCardData: newQuoteCardData };
      onChange(newTabs);
    }
  };

  return (
    <Box>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>Serve Tabs</Typography>
      {tabs?.map((tab: any, i: number) => (
        <Box 
          key={i}
          onClick={() => openEditModal(i)}
          sx={{ 
            mb: 2, p: 2, border: '1px solid #eee', borderRadius: 2, 
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            cursor: 'pointer', backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
            '&:hover': { backgroundColor: '#f9f9f9' }
          }}
        >
          <Typography sx={{ fontFamily: adelle.style.fontFamily, fontWeight: 700, fontSize: '1.1rem', color: COLORS.PRIMARY_BLUE }}>
            {tab.title}
          </Typography>
          <IconButton color="primary" size="small"><Edit /></IconButton>
        </Box>
      ))}

      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Tab: {tabs?.[activeTab]?.title}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField fullWidth multiline rows={4} label="Big Description" value={tabs?.[activeTab]?.bigDescription || ""} onChange={(e) => handleTabChange("bigDescription", e.target.value)} />
            <TextField fullWidth multiline rows={2} label="Sub Quote" value={tabs?.[activeTab]?.quote || ""} onChange={(e) => handleTabChange("quote", e.target.value)} />
            
            <Divider />
            <Typography variant="subtitle2">Tab Details</Typography>
            {tabs?.[activeTab]?.data?.map((item: any, j: number) => (
              <TextField key={j} fullWidth multiline rows={2} label={`Detail ${j+1}`} value={item.description || ""} onChange={(e) => handleDataDescChange(j, e.target.value)} />
            ))}

            <Divider />
            <Typography variant="subtitle2">Quote Card Section</Typography>
            <TextField fullWidth multiline rows={2} label="Quote Card Text" value={tabs?.[activeTab]?.quoteCardData?.quote || ""} onChange={(e) => handleQuoteCardChange("quote", e.target.value)} />
            <TextField fullWidth label="Quote Card Author" value={tabs?.[activeTab]?.quoteCardData?.author || ""} onChange={(e) => handleQuoteCardChange("author", e.target.value)} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)} variant="contained" color="primary">Done</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export const WhoWeServePageForms = ({ activeSection, websiteData, updateWhoWeServePage }: any) => {
  switch (activeSection) {
    case 0:
      return <WhoWeServeHeroEditor data={websiteData?.whoWeServePage?.whoWeServepageHeroSection} onChange={(newData: any) => updateWhoWeServePage('whoWeServepageHeroSection', newData)} />;
    case 1:
      return <WhoWeServeAboutEditor data={websiteData?.whoWeServePage?.whoWeServeAboutSection} onChange={(newData: any) => updateWhoWeServePage('whoWeServeAboutSection', newData)} />;
    case 2:
      return <WhoWeServeTabsEditor data={websiteData?.whoWeServePage?.whoWeServeTabsSection} onChange={(newData: any) => updateWhoWeServePage('whoWeServeTabsSection', newData)} />;
    default:
      return <Typography sx={{ fontFamily: adelle.style.fontFamily }}>Select a section to edit.</Typography>;
  }
};
