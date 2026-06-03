import React, { useState } from "react";
import { Box, Button, Card, Divider, IconButton, Stack, TextField, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { Add, Delete, ExpandMore } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";

export const PracticeGroupsTabsEditor = ({ data, onChange, onDeleteMedia }: { data: any, onChange: (newData: any) => void, onDeleteMedia?: (key: string) => void }) => {
  const tabs = data?.tabData || [];
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const updateTab = (tabIdx: number, updates: any) => {
    const newTabs = [...tabs];
    newTabs[tabIdx] = { ...newTabs[tabIdx], ...updates };
    onChange({ ...data, tabData: newTabs });
  };

  const handleAddPractitioner = (tabIdx: number) => {
    const practitioners = tabs[tabIdx].data || [];
    updateTab(tabIdx, { data: [...practitioners, { primary: "", secondary: "", isHeader: false }] });
  };

  const handleUpdatePractitioner = (tabIdx: number, pIdx: number, updates: any) => {
    const practitioners = [...(tabs[tabIdx].data || [])];
    practitioners[pIdx] = { ...practitioners[pIdx], ...updates };
    updateTab(tabIdx, { data: practitioners });
  };

  const handleDeletePractitioner = (tabIdx: number, pIdx: number) => {
    const practitioners = [...(tabs[tabIdx].data || [])];
    practitioners.splice(pIdx, 1);
    updateTab(tabIdx, { data: practitioners });
  };

  return (
    <Stack spacing={4}>
      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
        Practice Group Tabs Settings
      </Typography>

      <Box>
        {tabs.map((tab: any, tIdx: number) => (
          <Accordion 
            key={tIdx} 
            expanded={expanded === `panel${tIdx}`} 
            onChange={handleAccordionChange(`panel${tIdx}`)}
            sx={{ mb: 2, border: "1px solid rgba(0,0,0,0.1)", borderRadius: "16px !important", '&:before': { display: 'none' }, boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}
          >
            <AccordionSummary expandIcon={<ExpandMore />} sx={{ px: 3, py: 1 }}>
              <Typography sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700, fontSize: 18 }}>
                {tab.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
              <Stack spacing={3}>
                <TextField fullWidth label="Tab Title / Heading" value={tab.title || ""} onChange={(e) => updateTab(tIdx, { title: e.target.value })} />
                <TextField fullWidth label="Group Number" value={tab.groupNumber || ""} onChange={(e) => updateTab(tIdx, { groupNumber: e.target.value })} />
                <TextField fullWidth label="Description 1" multiline rows={4} value={tab.description1 || ""} onChange={(e) => updateTab(tIdx, { description1: e.target.value })} />
                <TextField fullWidth label="Description 2 (Green Star Quote)" multiline rows={4} value={tab.description2 || ""} onChange={(e) => updateTab(tIdx, { description2: e.target.value })} />

                <Divider sx={{ my: 2 }} />

                <Box>
                  <Typography sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700, mb: 2 }}>
                    Meet Our Practitioners
                  </Typography>
                  
                  <Stack spacing={3}>
                    {(tab.data || []).map((practitioner: any, pIdx: number) => (
                      <Box key={pIdx} sx={{ p: 3, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 3, backgroundColor: "#F9FAFB" }}>
                        <Stack direction="row" spacing={3} alignItems="flex-start">
                          <Stack spacing={3} sx={{ flexGrow: 1 }}>
                            <Typography sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
                              Practitioner {pIdx + 1}
                            </Typography>
                            <TextField fullWidth multiline rows={3} label="Practitioner Name (Primary)" value={practitioner.primary || ""} onChange={(e) => handleUpdatePractitioner(tIdx, pIdx, { primary: e.target.value })} />
                            <TextField fullWidth multiline rows={3} label="Title (Secondary)" value={practitioner.secondary || ""} onChange={(e) => handleUpdatePractitioner(tIdx, pIdx, { secondary: e.target.value })} />
                          </Stack>
                          <IconButton color="error" onClick={() => handleDeletePractitioner(tIdx, pIdx)}>
                            <Delete />
                          </IconButton>
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                  
                  <Button size="medium" variant="contained" startIcon={<Add />} onClick={() => handleAddPractitioner(tIdx)} sx={{ mt: 3, backgroundColor: COLORS.PRIMARY_GREEN, borderRadius: "50px", '&:hover': { backgroundColor: COLORS.PRIMARY_BLUE } }}>
                    Add Row
                  </Button>
                </Box>
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Stack>
  );
};
