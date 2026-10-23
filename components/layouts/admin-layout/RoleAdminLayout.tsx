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
  TablePagination,
} from "@mui/material";
import { Add, Close, Delete, Edit, Security } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
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
  { id: "pages/professionals", label: "Pages: Firm Professionals" },
  { id: "pages/leadership", label: "Pages: Firm Leadership" },
  { id: "pages/insights", label: "Pages: Insights" },
  { id: "pages/blogs", label: "Pages: Blog" },
  { id: "pages/careers", label: "Pages: Careers" },
  { id: "pages/contact", label: "Pages: Contact Us" },
  { id: "pages/who-we-serve", label: "Pages: Who We Serve" },
  { id: "pages/privacy-policy", label: "Pages: Privacy Policy" },
  { id: "pages/terms-of-use", label: "Pages: Terms of Use" },
  { id: "pages/disclaimer", label: "Pages: Disclaimer" },
  { id: "manage-professionals", label: "Database: Firm Professionals" },
  { id: "manage-insights", label: "Database: Insights" },
  { id: "manage-blogs", label: "Database: Blog" },
];

const roleSchema = yup.object().shape({
  name: yup.string().required("Role Name is required"),
});

export default function RoleAdminLayout() {
  const { startLoading, stopLoading } = useLoading();
  const { showNotification } = useNotification();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [roles, setRoles] = useState<Record<string, any>[]>([]);
  const [allFetchedRoles, setAllFetchedRoles] = useState<Record<string, any>[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<string | number | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRolesCount, setTotalRolesCount] = useState(0);
  const [formData, setFormData] = useState<{ id: string | number; name: string; permissions: string[] }>({
    id: "",
    name: "",
    permissions: [],
  });

  const fetchRoles = async (showLoader = true, p = page, r = rowsPerPage) => {
    try {
      if (showLoader) startLoading();
      const res = await RoleControllers.getAllRoles({ page: p + 1, limit: r });
      const fetchedRoles = res.data?.data?.data || res.data?.data || [];
      const total = res.data?.data?.total || res.data?.total || fetchedRoles.length;
      
      setAllFetchedRoles(fetchedRoles);
      // Filter out soft-deleted roles for UI display
      const activeRoles = fetchedRoles.filter((role: Record<string, any>) => role.isActive !== false);
      setRoles(activeRoles);
      setTotalRolesCount(total);
    } catch (e: unknown) {
      console.error(e);
      const apiErr = e as { message?: string };
      showNotification(apiErr.message || "Failed to fetch roles", "error");
    } finally {
      if (showLoader) stopLoading();
    }
  };

  useEffect(() => {
    fetchRoles(true, page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenNew = () => {
    setFormData({ id: "", name: "", permissions: [] });
    setErrors({});
    setDialogOpen(true);
  };

  const handleEdit = (role: Record<string, any>) => {
    const permIds = role.permissions?.map((p: { module: string }) => p.module) || [];
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
    } catch (e: unknown) {
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
    } catch (err: unknown) {
      if (err instanceof yup.ValidationError) {
        const validationErrors: Record<string, string | undefined> = {};
        err.inner.forEach((error) => {
          if (error.path) validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      }
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
    } catch (e: unknown) {
      console.error(e);
      const apiErr = e as { response?: { status?: number; data?: { message?: string } } };
      if (apiErr.response?.status === 409) {
        showNotification(apiErr.response.data?.message || "A role with this name already exists.", "error");
      } else {
        showNotification("Failed to save role", "error");
      }
    }
  };

  return (
    <AdminLayout title="Role Management">
      <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'center' }, gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
            Role Management
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.TEXT_PRIMARY, opacity: 0.8, mt: 0.5 }}>
            Configure custom roles and permission levels for admin panel users.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={handleOpenNew} sx={{ backgroundColor: COLORS.PRIMARY_GREEN, borderRadius: "50px" }}>
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
              {(roles.length > rowsPerPage ? roles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : roles).map((role) => (
                <TableRow key={role.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <Typography sx={{ fontFamily: tradeGothic.style.fontFamily, fontWeight: 700, fontSize: 16, color: COLORS.PRIMARY_BLUE }}>
                      {role.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {role.permissions?.map((permObj: { module: string }) => {
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={totalRolesCount || roles.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
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
