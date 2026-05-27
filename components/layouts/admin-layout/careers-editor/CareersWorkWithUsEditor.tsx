import React from "react";
import { Box, Stack, TextField, Typography, Divider, Button, IconButton } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";

export function CareersWorkWithUsEditor({ data, onChange }: any) {
  const handleChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
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
    </Stack>
  );
}
