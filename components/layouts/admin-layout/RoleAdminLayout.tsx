"use client";
import React, { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import { Add, Close, Delete, Edit, Security } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { usePageData } from "@/store/usePageData";
import { useLoading } from "@/components/providers/LoadingProvider";
import { useNotification } from "@/components/providers/NotificationProvider";
import { RoleControllers } from "@/api/roleControllers";
import * as yup from "yup";

const ALL_PERMISSIONS = [
  { id: "pages/home", label: "Pages: Home" },
  { id: "pages/about-us", label: "Pages: About Us" },
  { id: "pages/services", label: "Pages: Services" },
  { id: "pages/practice-groups", label: "Pages: Practice Groups" },
  { id: "pages/firm-professionals", label: "Pages: Firm Professionals" },
  { id: "pages/firm-leadership", label: "Pages: Firm Leadership" },
  { id: "pages/insights", label: "Pages: Insights" },
  { id: "pages/blogs", label: "Pages: Blogs" },
  { id: "pages/careers", label: "Pages: Careers" },
  { id: "pages/contact-us", label: "Pages: Contact Us" },
  { id: "pages/who-we-serve", label: "Pages: Who We Serve" },
  { id: "pages/privacy-policy", label: "Pages: Privacy Policy" },
  { id: "pages/terms-of-use", label: "Pages: Terms of Use" },
  { id: "pages/disclaimer", label: "Pages: Disclaimer" },
  { id: "manage-professionals", label: "Database: Firm Professionals" },
  { id: "manage-insights", label: "Database: Insights" },
  { id: "manage-blogs", label: "Database: Blogs" },
];

const roleSchema = yup.object().shape({
  name: yup.string().required("Role Name is required"),
});

export default function RoleAdminLayout() {
  const { startLoading, stopLoading } = useLoading();
  const { showNotification } = useNotification();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [roles, setRoles] = useState<any[]>([]);
  const [allFetchedRoles, setAllFetchedRoles] = useState<any[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<string | number | null>(null);
  const [formData, setFormData] = useState<any>({
    id: "",
    name: "",
    permissions: [],
  });

  const fetchRoles = async (showLoader = true) => {
    try {
      if (showLoader) startLoading();
      const res = await RoleControllers.getAllRoles();
      const fetchedRoles = res.data?.data?.data || res.data?.data || [];
      
      setAllFetchedRoles(fetchedRoles);
      // Filter out soft-deleted roles for UI display
      setRoles(fetchedRoles.filter((r: any) => r.isActive !== false));
    } catch (e: any) {
      console.error(e);
      showNotification(e?.message || "Failed to fetch roles", "error");
    } finally {
      if (showLoader) stopLoading();
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleOpenNew = () => {
    setFormData({ id: "", name: "", permissions: [] });
    setErrors({});
    setDialogOpen(true);
  };

  const handleEdit = (role: any) => {
    const permIds = role.permissions?.map((p: any) => p.module) || [];
    setFormData({
      id: role.id,
      name: role.name || "",
      permissions: permIds,
    });
    setErrors({});
    setDialogOpen(true);
  };

  const openDeleteModal = (id: string | number) => {
    setRoleToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!roleToDelete) return;
    try {
      await RoleControllers.deleteRole(roleToDelete);
      showNotification("Role deleted successfully", "success");
      fetchRoles(false);
    } catch (e: any) {
      console.error(e);
      showNotification("Failed to delete role", "error");
    } finally {
      setDeleteModalOpen(false);
      setRoleToDelete(null);
    }
  };

  const handleTogglePermission = (permId: string) => {
    const current = formData.permissions;
    if (current.includes(permId)) {
      setFormData({ ...formData, permissions: current.filter((p: string) => p !== permId) });
    } else {
      setFormData({ ...formData, permissions: [...current, permId] });
    }
  };

  const handleSave = async () => {
    try {
      await roleSchema.validate(formData, { abortEarly: false });
      setErrors({});
    } catch (err: any) {
      const validationErrors: any = {};
      err.inner.forEach((error: any) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      return;
    }
    const payload = {
      name: formData.name,
      isActive: true,
      permissions: formData.permissions.map((p: string) => ({
        module: p,
        canRead: true,
        canWrite: true
      }))
    };

    try {
      if (formData.id) {
        await RoleControllers.updateRole(formData.id, payload);
        showNotification("Role updated successfully", "success");
      } else {
        await RoleControllers.createRole(payload);
        showNotification("Role created successfully", "success");
      }
      setDialogOpen(false);
      fetchRoles(false);
    } catch (e: any) {
      console.error(e);
      if (e?.response?.status === 409) {
        showNotification(e?.response?.data?.message || "A role with this name already exists.", "error");
      } else {
        showNotification("Failed to save role", "error");
      }
    }
  };

  return (
    <AdminLayout title="Role Management">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: { xs: 'stretch', sm: 'flex-end' }, alignItems: 'center' }}>
        <Button variant="contained" startIcon={<Add />} onClick={handleOpenNew} sx={{ backgroundColor: COLORS.PRIMARY_GREEN, borderRadius: "50px", width: { xs: '100%', sm: 'auto' } }}>
          Create New Role
        </Button>
      </Box>

      {roles.length === 0 ? (
        <Box sx={{ py: 8, textAlign: "center", border: `1px solid rgba(0,0,0,0.1)`, borderRadius: 4, backgroundColor: COLORS.OFF_WHITE }}>
          <Typography variant="h6" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE }}>
            No roles found.
          </Typography>
          <Typography variant="body2" sx={{ color: COLORS.TEXT_PRIMARY, mt: 1 }}>
            Click "Create New Role" to get started.
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 4, border: `1px solid rgba(0,0,0,0.1)`, boxShadow: "none", overflowX: "auto" }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: COLORS.OFF_WHITE }}>
              <TableRow>
                <TableCell sx={{ fontFamily: tradeGothic.style.fontFamily, fontWeight: 700, color: COLORS.PRIMARY_BLUE }}>Role Name</TableCell>
                <TableCell sx={{ fontFamily: tradeGothic.style.fontFamily, fontWeight: 700, color: COLORS.PRIMARY_BLUE }}>Permissions</TableCell>
                <TableCell align="right" sx={{ fontFamily: tradeGothic.style.fontFamily, fontWeight: 700, color: COLORS.PRIMARY_BLUE }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <Typography sx={{ fontFamily: tradeGothic.style.fontFamily, fontWeight: 700, fontSize: 16, color: COLORS.PRIMARY_BLUE }}>
                      {role.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {role.permissions?.map((permObj: any) => {
                        const permId = permObj.module;
                        const label = ALL_PERMISSIONS.find(p => p.id === permId)?.label || permId;
                        return (
                          <Chip key={permId} label={label} size="small" sx={{ backgroundColor: "rgba(0,0,0,0.05)" }} />
                        );
                      })}
                      {(!role.permissions || role.permissions.length === 0) && <Typography variant="caption" color="textSecondary">No permissions</Typography>}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" size="small" onClick={() => handleEdit(role)}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton color="error" size="small" onClick={() => openDeleteModal(role.id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
        maxWidth="sm" 
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 4, m: 2 } } }}
      >
        <DialogTitle component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Typography variant="h5" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
            {formData.id ? "Edit Role" : "Create Role"}
          </Typography>
          <IconButton onClick={() => setDialogOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField 
              fullWidth 
              label="Role Name (e.g. Content Editor)" 
              value={formData.name} 
              onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setErrors({ ...errors, name: undefined }); }}
              error={!!errors.name}
              helperText={errors.name}
            />
            
            <Box>
              <Typography variant="subtitle2" color="primary" sx={{ mb: 1 }}>Select Page Access Permissions</Typography>
              <FormGroup>
                {ALL_PERMISSIONS.map(perm => (
                  <FormControlLabel 
                    key={perm.id} 
                    control={
                      <Checkbox 
                        checked={formData.permissions.includes(perm.id)} 
                        onChange={() => handleTogglePermission(perm.id)}
                        sx={{ color: COLORS.PRIMARY_BLUE, '&.Mui-checked': { color: COLORS.PRIMARY_GREEN } }}
                      />
                    } 
                    label={perm.label} 
                  />
                ))}
              </FormGroup>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDialogOpen(false)} color="inherit">Cancel</Button>
          <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: COLORS.PRIMARY_BLUE }}>
            Save Role
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog 
        open={deleteModalOpen} 
        onClose={() => setDeleteModalOpen(false)}
        slotProps={{ paper: { sx: { borderRadius: 4, p: 2 } } }}
      >
        <DialogTitle sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this role?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModalOpen(false)} color="inherit">No, Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Yes, Delete</Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
}
