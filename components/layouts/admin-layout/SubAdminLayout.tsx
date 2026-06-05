"use client";
import { RoleControllers } from "@/api/roleControllers";
import { UserControllers } from "@/api/userControllers";
import { useLoading } from "@/components/providers/LoadingProvider";
import { useNotification } from "@/components/providers/NotificationProvider";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { Add, Close, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import * as yup from "yup";
import AdminLayout from "./AdminLayout";

const subAdminSchema = yup.object().shape({
  id: yup.string().nullable(),
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().test('password-check', 'Password is required (min 6 chars)', function(value) {
    if (!this.parent.id) {
      return !!value && value.length >= 6;
    }
    return true;
  }),
  roleId: yup.string().required("Role is required"),
});

export default function SubAdminLayout() {
  const { startLoading, stopLoading } = useLoading();
  const { showNotification } = useNotification();
  const [subAdmins, setSubAdmins] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | number | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState<any>({
    id: "",
    name: "",
    email: "",
    password: "",
    roleId: "",
  });

  const fetchUsers = async (showLoader = true) => {
    try {
      if (showLoader) startLoading();
      const res = await UserControllers.getAllUsers();
      const fetched = res.data?.data?.data?.users || res.data?.data?.users || [];
      setSubAdmins(fetched);
    } catch (e: any) {
      console.error(e);
      showNotification(e?.message || "Failed to fetch users", "error");
    } finally {
      if (showLoader) stopLoading();
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await RoleControllers.getAllRoles();
      const fetched = res.data?.data?.data || res.data?.data || [];
      // Filter out soft-deleted roles
      setRoles(fetched.filter((r: any) => r.isActive !== false));
    } catch (e: any) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchUsers();
  }, []);

  const handleOpenNew = () => {
    setFormData({ id: "", name: "", email: "", password: "", roleId: "" });
    setErrors({});
    setDialogOpen(true);
  };

  const handleEdit = (admin: any) => {
    setFormData({
      id: admin.id,
      name: admin.fullName || admin.firstName || "",
      email: admin.email || "",
      password: "", // Don't prefill password
      roleId: admin.permissionRole?.id || "",
    });
    setErrors({});
    setDialogOpen(true);
  };

  const openDeleteModal = (id: string | number) => {
    setUserToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    try {
      await UserControllers.deleteUser(userToDelete);
      showNotification("User deleted successfully", "success");
      fetchUsers(false);
    } catch (e: any) {
      console.error(e);
      showNotification("Failed to delete user", "error");
    } finally {
      setDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };

  const handleSave = async () => {
    try {
      await subAdminSchema.validate(formData, { abortEarly: false });
      setErrors({});
    } catch (err: any) {
      const validationErrors: any = {};
      err.inner.forEach((error: any) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      return;
    }

    try {
      // Base payload for both CREATE and EDIT
      const payload: any = {
        fullName: formData.name,
        email: formData.email,
        roleId: formData.roleId
      };
      
      // Only append password if the user typed something
      if (formData.password && formData.password.trim() !== "") {
        payload.password = formData.password;
      }

      if (formData.id) {
        // Edit payload (PATCH)
        await UserControllers.updateUser(formData.id, payload);
        showNotification("User updated successfully", "success");
      } else {
        // Create payload (POST)
        await UserControllers.createUser(payload);
        showNotification("User created successfully", "success");
      }
      
      setDialogOpen(false);
      fetchUsers(false);
    } catch (err: any) {
      console.error(err);
      showNotification("Failed to save user", "error");
    }
  };

  return (
    <AdminLayout title="User Management">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: { xs: 'stretch', sm: 'flex-end' }, alignItems: 'center' }}>
        <Button fullWidth={false} variant="contained" startIcon={<Add />} onClick={handleOpenNew} sx={{ backgroundColor: COLORS.PRIMARY_GREEN, borderRadius: "50px", width: { xs: '100%', sm: 'auto' } }}>
          Add User
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12 }}>
          {subAdmins.length === 0 ? (
            <Box sx={{ py: 8, textAlign: "center", border: `1px solid rgba(0,0,0,0.1)`, borderRadius: 4, backgroundColor: COLORS.OFF_WHITE }}>
              <Typography variant="h6" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE }}>
                No users found.
              </Typography>
              <Typography variant="body2" sx={{ color: COLORS.TEXT_PRIMARY, mt: 1 }}>
                Click "Add User" to create a new team member.
              </Typography>
            </Box>
          ) : (
            <TableContainer component={Paper} sx={{ borderRadius: 4, border: `1px solid rgba(0,0,0,0.1)`, boxShadow: "none", overflowX: "auto" }}>
              <Table sx={{ minWidth: 620 }}>
                <TableHead sx={{ backgroundColor: COLORS.OFF_WHITE }}>
                  <TableRow>
                    <TableCell sx={{ fontFamily: tradeGothic.style.fontFamily, fontWeight: 700, color: COLORS.PRIMARY_BLUE }}>Name</TableCell>
                    <TableCell sx={{ fontFamily: tradeGothic.style.fontFamily, fontWeight: 700, color: COLORS.PRIMARY_BLUE }}>Email</TableCell>
                    <TableCell sx={{ fontFamily: tradeGothic.style.fontFamily, fontWeight: 700, color: COLORS.PRIMARY_BLUE }}>Role</TableCell>
                    <TableCell align="right" sx={{ fontFamily: tradeGothic.style.fontFamily, fontWeight: 700, color: COLORS.PRIMARY_BLUE }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subAdmins.map((admin) => {
                    const roleName = admin.permissionRole?.name || roles.find((r: any) => r.id === admin.permissionRole?.id)?.name || "Unknown";
                    return (
                      <TableRow key={admin.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>
                          <Typography sx={{ fontFamily: tradeGothic.style.fontFamily, fontWeight: 700, fontSize: 16, color: COLORS.PRIMARY_BLUE }}>
                            {admin.fullName || admin.firstName || admin.name}
                          </Typography>
                        </TableCell>
                        <TableCell>{admin.email}</TableCell>
                        <TableCell>
                          <Chip label={roleName} size="small" sx={{ backgroundColor: "rgba(0,0,0,0.05)" }} />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton color="primary" size="small" onClick={() => handleEdit(admin)}>
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton color="error" size="small" onClick={() => openDeleteModal(admin.id)}>
                            <Delete fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>

      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
        maxWidth="sm" 
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 4, m: 2 } } }}
      >
        <DialogTitle component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Typography variant="h5" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
            {formData.id ? "Edit User" : "Add User"}
          </Typography>
          <IconButton onClick={() => setDialogOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField 
              fullWidth 
              label="Full Name" 
              value={formData.name} 
              onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setErrors({ ...errors, name: undefined }); }}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField 
              fullWidth 
              label="Email Address" 
              value={formData.email} 
              onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setErrors({ ...errors, email: undefined }); }}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField 
              fullWidth 
              label={formData.id ? "New Password (Leave blank to keep current)" : "Password"} 
              type="password"
              value={formData.password || ""} 
              onChange={(e) => { setFormData({ ...formData, password: e.target.value }); setErrors({ ...errors, password: undefined }); }}
              error={!!errors.password}
              helperText={errors.password || (formData.id ? "" : "Minimum 6 characters")}
            />
            
            <FormControl fullWidth error={!!errors.roleId}>
              <InputLabel id="role-select-label">Assign Role</InputLabel>
              <Select
                labelId="role-select-label"
                value={formData.roleId}
                label="Assign Role"
                onChange={(e) => { setFormData({ ...formData, roleId: e.target.value }); setErrors({ ...errors, roleId: undefined }); }}
              >
                {roles.length === 0 && (
                  <MenuItem disabled value="">
                    <em>No roles found. Please create a role first.</em>
                  </MenuItem>
                )}
                {roles.map((role: any) => (
                  <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
                ))}
              </Select>
              {errors.roleId && <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>{errors.roleId}</Typography>}
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDialogOpen(false)} color="inherit">Cancel</Button>
          <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: COLORS.PRIMARY_BLUE }}>
            {formData.id ? "Update User" : "Save User"}
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
          <Typography>Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModalOpen(false)} color="inherit">No, Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Yes, Delete</Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
}
