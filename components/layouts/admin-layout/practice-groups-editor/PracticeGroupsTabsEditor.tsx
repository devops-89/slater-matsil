import React, { useState } from 'react';
import { Box, Button, Stack, TextField, Typography, Card, IconButton, MenuItem, Select, FormControl, InputLabel, Checkbox, FormControlLabel } from "@mui/material";
import { Close, Add } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";

export const PracticeGroupsTabsEditor = ({ data, onChange }: { data: any, onChange: (newData: any) => void }) => {
  const tabs = data?.tabData || [];
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  const activeTab = tabs[activeTabIdx];

  const updateActiveTab = (updates: any) => {
    const newTabs = [...tabs];
    newTabs[activeTabIdx] = { ...newTabs[activeTabIdx], ...updates };
    onChange({ ...data, tabData: newTabs });
  };

  const handleAddPractitioner = () => {
    const practitioners = activeTab.data || [];
    updateActiveTab({ data: [...practitioners, { primary: "", secondary: "", isHeader: false }] });
  };

  const handleUpdatePractitioner = (idx: number, updates: any) => {
    const practitioners = [...(activeTab.data || [])];
    practitioners[idx] = { ...practitioners[idx], ...updates };
    updateActiveTab({ data: practitioners });
  };

  const handleDeletePractitioner = (idx: number) => {
    const practitioners = [...(activeTab.data || [])];
    practitioners.splice(idx, 1);
    updateActiveTab({ data: practitioners });
  };

  return (
    <Stack spacing={4}>
      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
        Practice Group Tabs Settings
      </Typography>

      <FormControl fullWidth>
        <InputLabel>Select Tab to Edit</InputLabel>
        <Select
          value={activeTabIdx}
          label="Select Tab to Edit"
          onChange={(e) => setActiveTabIdx(Number(e.target.value))}
        >
          {tabs.map((t: any, i: number) => (
            <MenuItem key={i} value={i}>{t.title}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {activeTab && (
        <Card sx={{ p: 3, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 4, boxShadow: "0 2px 10px rgba(0,0,0,0.02)", backgroundColor: "#FFFFFF" }}>
          <Stack spacing={3}>
            <Typography sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
              Editing: {activeTab.title}
            </Typography>
            <TextField fullWidth label="Group Number" value={activeTab.groupNumber || ""} onChange={(e) => updateActiveTab({ groupNumber: e.target.value })} />
            <TextField fullWidth label="Description 1" multiline rows={4} value={activeTab.description1 || ""} onChange={(e) => updateActiveTab({ description1: e.target.value })} />
            <TextField fullWidth label="Description 2 (Green Star Quote)" multiline rows={4} value={activeTab.description2 || ""} onChange={(e) => updateActiveTab({ description2: e.target.value })} />

            <Divider sx={{ my: 2 }} />

            <Box>
              <Typography sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700, mb: 2 }}>
                Meet Our Practitioners
              </Typography>
              
              <Stack spacing={3}>
                {(activeTab.data || []).map((practitioner: any, pIdx: number) => (
                  <Box key={pIdx} sx={{ p: 3, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 3, backgroundColor: "#F9FAFB" }}>
                    <Stack direction="row" spacing={3} alignItems="flex-start">
                      <Stack spacing={3} sx={{ flexGrow: 1 }}>
                        <Typography sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
                          Practitioner {pIdx + 1}
                        </Typography>
                        <TextField fullWidth multiline rows={3} label="Practitioner Name (Primary)" value={practitioner.primary || ""} onChange={(e) => handleUpdatePractitioner(pIdx, { primary: e.target.value })} />
                        <TextField fullWidth multiline rows={3} label="Title (Secondary)" value={practitioner.secondary || ""} onChange={(e) => handleUpdatePractitioner(pIdx, { secondary: e.target.value })} />
                      </Stack>
                      <IconButton color="error" onClick={() => handleDeletePractitioner(pIdx)}>
                        <Close />
                      </IconButton>
                    </Stack>
                  </Box>
                ))}
              </Stack>
              
              <Button size="medium" variant="contained" startIcon={<Add />} onClick={handleAddPractitioner} sx={{ mt: 3, backgroundColor: COLORS.PRIMARY_GREEN, borderRadius: "50px", '&:hover': { backgroundColor: COLORS.PRIMARY_BLUE } }}>
                Add Row
              </Button>
            </Box>

          </Stack>
        </Card>
      )}
    </Stack>
  );
};
import { Divider } from '@mui/material';
