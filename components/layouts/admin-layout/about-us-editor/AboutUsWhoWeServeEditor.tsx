import React from 'react';
import { Box, Button, Card, Stack, TextField, Typography, Grid, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ExpandMore, Delete, Save } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";


export const AboutUsWhoWeServeEditor = ({ data, onChange }: any) => {
  const flatList = data.section_data?.[0]?.dataList || [];

  return (
    <Stack spacing={4}>
      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>Who We Serve Settings</Typography>
      <TextField fullWidth label="Heading 1" value={data.heading1 || ""} onChange={(e) => onChange({ ...data, heading1: e.target.value })} />
      <TextField fullWidth label="Heading 2" value={data.heading2 || ""} onChange={(e) => onChange({ ...data, heading2: e.target.value })} />
      <TextField fullWidth label="Description" multiline rows={3} value={data.description || ""} onChange={(e) => onChange({ ...data, description: e.target.value })} />

      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700, mt: 4 }}>
        Client Categories
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
                  onChange({ ...data, section_data: [{ dataList: newList }] });
                }}
              />
              <Button 
                color="error" variant="text" size="small" sx={{ minWidth: "auto" }}
                onClick={() => {
                  const newList = flatList.filter((_: any, i: number) => i !== idx);
                  onChange({ ...data, section_data: [{ dataList: newList }] });
                }}
              >
                X
              </Button>
            </Stack>
          </Grid>
        ))}
      </Grid>
      
      <Box>
        <Button 
          variant="contained" size="small"
          onClick={() => {
            const newList = [...flatList, { label: "" }];
            onChange({ ...data, section_data: [{ dataList: newList }] });
          }}
          sx={{ backgroundColor: COLORS.PRIMARY_BLUE, color: COLORS.WHITE }}
        >
          + Add Input
        </Button>
      </Box>
    </Stack>
  );
};

