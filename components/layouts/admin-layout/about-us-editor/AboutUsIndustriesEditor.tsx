import React from 'react';
import { Box, Button, Grid, IconButton, Stack, TextField, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";


export const AboutUsIndustriesEditor = ({ data, onChange }: any) => {
  // Helper to extract flat list
  const getFlatList = () => {
    let list: any[] = [];
    data.section_data?.forEach((col: any) => {
      if (col.dataList) list = [...list, ...col.dataList];
    });
    return list;
  };

  // Split sequentially into 3 columns (frontend expects 3 columns for Industries)
  const saveFlatList = (list: any[]) => {
    const numCols = 3;
    const newSectionData = [];
    const baseSize = Math.floor(list.length / numCols);
    let remainder = list.length % numCols;
    
    let startIndex = 0;
    for (let i = 0; i < numCols; i++) {
      const colSize = baseSize + (remainder > 0 ? 1 : 0);
      remainder--;
      const colData = list.slice(startIndex, startIndex + colSize);
      if (colData.length > 0) {
        newSectionData.push({ dataList: colData });
      }
      startIndex += colSize;
    }
    
    onChange({ ...data, section_data: newSectionData });
  };

  const flatList = getFlatList();

  return (
    <Stack spacing={4}>
      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>Industries We Serve Settings</Typography>
      <TextField fullWidth label="Heading 1" value={data.heading1 || ""} onChange={(e) => onChange({ ...data, heading1: e.target.value })} />
      <TextField fullWidth label="Heading 2" value={data.heading2 || ""} onChange={(e) => onChange({ ...data, heading2: e.target.value })} />
      <TextField fullWidth label="Description" multiline rows={3} value={data.description || ""} onChange={(e) => onChange({ ...data, description: e.target.value })} />

      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700, mt: 4 }}>
        Industry Categories
      </Typography>
      
      <Grid container spacing={2}>
        {flatList.map((item: any, idx: number) => (
          <Grid size={12} key={idx}>
            <Stack direction="row" spacing={1} alignItems="center">
              <TextField 
                fullWidth size="small" label={`Input ${idx + 1}`} value={item.label || ""}
                onChange={(e) => {
                  const newList = [...flatList];
                  newList[idx] = { ...newList[idx], label: e.target.value };
                  saveFlatList(newList);
                }}
              />
              <IconButton
                color="error"
                size="small"
                onClick={() => {
                  const newList = flatList.filter((_: any, i: number) => i !== idx);
                  saveFlatList(newList);
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Stack>
          </Grid>
        ))}
      </Grid>
      
      <Box>
        <Button 
          variant="contained" size="small"
          onClick={() => saveFlatList([...flatList, { label: "" }])}
          sx={{ backgroundColor: COLORS.PRIMARY_BLUE, color: COLORS.WHITE }}
        >
          + Add Input
        </Button>
      </Box>
    </Stack>
  );
};

// Real Website Components
import Navbar from "@/components/widgets/navbar";
import Footer from "@/components/widgets/Footer";
import AboutHerosection from "@/components/layouts/about-layout/About-Herosection";
import DrivingInnovation from "@/components/layouts/about-layout/Driving-innovation";
import RedefiningPatent from "@/components/widgets/Redefining-Patent";
import InsightsInnovation from "@/components/layouts/about-layout/Insights-innovation";
import Award from "@/components/layouts/about-layout/Award";
import WhoweServe from "@/components/layouts/about-layout/Who-we-serve";
import IndustriesWeServe from "@/components/layouts/about-layout/Industries-We-Serve";
import InsightsSection from "@/components/widgets/Insights-section";

