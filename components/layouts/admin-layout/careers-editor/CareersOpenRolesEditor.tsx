import React, { useState } from "react";
import { Box, Stack, TextField, Typography, Divider, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";

export function CareersOpenRolesEditor({ data, onChange }: any) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<{ tabKey: string, index: number } | null>(null);

  const handleChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleTabContentChange = (tabKey: string, index: number, field: string, value: string) => {
    const tabContentData = data?.tabSectionData?.tabContentData || {};
    const list = [...(tabContentData[tabKey] || [])];
    list[index] = { ...list[index], [field]: value };

    onChange({
      ...data,
      tabSectionData: {
        ...data?.tabSectionData,
        tabContentData: {
          ...tabContentData,
          [tabKey]: list
        }
      }
    });
  };

  const openEditModal = (tabKey: string, index: number) => {
    setEditingRole({ tabKey, index });
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditingRole(null);
  };

  const renderRoleList = (title: string, tabKey: string) => {
    return (
      <Box 
        onClick={() => openEditModal(tabKey, 0)}
        sx={{ 
          mb: 2,
          p: 2, 
          border: '1px solid #eee', 
          borderRadius: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          cursor: 'pointer',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          '&:hover': { backgroundColor: '#f9f9f9' }
        }}
      >
        <Typography sx={{ fontFamily: adelle.style.fontFamily, fontWeight: 700, fontSize: '1.1rem', color: COLORS.PRIMARY_BLUE }}>
          {title}
        </Typography>
        <Box>
          <IconButton color="primary" size="small">
            <Edit />
          </IconButton>
        </Box>
      </Box>
    );
  };

  return (
    <Stack spacing={3}>
      <TextField
        fullWidth
        label="Title"
        value={data?.title || ""}
        onChange={(e) => handleChange("title", e.target.value)}
      />
      <TextField
        fullWidth
        multiline
        rows={2}
        label="Short Description"
        value={data?.shortDescription || ""}
        onChange={(e) => handleChange("shortDescription", e.target.value)}
      />
      <TextField
        fullWidth
        multiline
        rows={3}
        label="Description"
        value={data?.description || ""}
        onChange={(e) => handleChange("description", e.target.value)}
      />

      <Divider sx={{ my: 1 }} />
      
      <Box>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>Role Tabs</Typography>
        {renderRoleList("Attorneys", "tab_attorney_content_Data")}
        {renderRoleList("Technical Advisors/Patent Agent", "tab_technical_advisor")}
      </Box>

      <Dialog open={editModalOpen} onClose={closeEditModal} maxWidth="md" fullWidth>
        <DialogTitle>Edit Role</DialogTitle>
        <DialogContent dividers>
          {editingRole && (
            <Stack spacing={3} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="Role Title"
                value={data?.tabSectionData?.tabContentData?.[editingRole.tabKey]?.[editingRole.index]?.title || ""}
                onChange={(e) => handleTabContentChange(editingRole.tabKey, editingRole.index, "title", e.target.value)}
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description 1"
                value={data?.tabSectionData?.tabContentData?.[editingRole.tabKey]?.[editingRole.index]?.description1 || ""}
                onChange={(e) => handleTabContentChange(editingRole.tabKey, editingRole.index, "description1", e.target.value)}
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description 2"
                value={data?.tabSectionData?.tabContentData?.[editingRole.tabKey]?.[editingRole.index]?.description2 || ""}
                onChange={(e) => handleTabContentChange(editingRole.tabKey, editingRole.index, "description2", e.target.value)}
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description 3"
                value={data?.tabSectionData?.tabContentData?.[editingRole.tabKey]?.[editingRole.index]?.description3 || ""}
                onChange={(e) => handleTabContentChange(editingRole.tabKey, editingRole.index, "description3", e.target.value)}
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description 4"
                value={data?.tabSectionData?.tabContentData?.[editingRole.tabKey]?.[editingRole.index]?.description4 || ""}
                onChange={(e) => handleTabContentChange(editingRole.tabKey, editingRole.index, "description4", e.target.value)}
              />
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditModal} variant="contained" sx={{ backgroundColor: COLORS.PRIMARY_GREEN, '&:hover': { backgroundColor: COLORS.PRIMARY_BLUE } }}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
