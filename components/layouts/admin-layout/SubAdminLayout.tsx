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
  Avatar,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import { Add, Close, Delete, Edit, AdminPanelSettings } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { usePageData } from "@/store/usePageData";
import { SUB_ADMIN_PROPS } from "@/utils/types";
import * as yup from "yup";

const subAdminSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  roleId: yup.string().required("Role is required"),
});

export default function SubAdminLayout() {
  const { details, setDetails } = usePageData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState<SUB_ADMIN_PROPS>({
    id: "",
    name: "",
    email: "",
    password: "",
    roleId: "",
  });

  useEffect(() => {
    if (details && (!details.subAdmins || details.subAdmins.length === 0)) {
      const stored = localStorage.getItem("subAdmins");
      if (stored) {
        setDetails({
          ...details,
          subAdmins: JSON.parse(stored),
        });
      }
    }
  }, []);

  const subAdmins = details?.subAdmins || [];
  const roles = details?.roles || [];
  
  // Also check local storage for roles if empty in details initially
  const getRoles = () => {
    if (roles.length > 0) return roles;
    const storedRoles = localStorage.getItem("roles");
    if (storedRoles) return JSON.parse(storedRoles);
    return [];
  };

  const currentRoles = getRoles();

  const handleOpenNew = () => {
    setFormData({ id: "", name: "", email: "", password: "", roleId: "" });
    setErrors({});
    setDialogOpen(true);
  };

  const handleEdit = (admin: SUB_ADMIN_PROPS) => {
    setFormData(admin);
    setErrors({});
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const newAdmins = subAdmins.filter(a => a.id !== id);
    setDetails({ ...details!, subAdmins: newAdmins });
    localStorage.setItem("subAdmins", JSON.stringify(newAdmins));
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

    let newAdmins = [...subAdmins];
    
    if (formData.id) {
      newAdmins = newAdmins.map(a => a.id === formData.id ? formData : a);
    } else {
      newAdmins.push({ ...formData, id: Date.now().toString() });
    }

    setDetails({ ...details!, subAdmins: newAdmins });
    localStorage.setItem("subAdmins", JSON.stringify(newAdmins));
    setDialogOpen(false);
  };

  return (
    <AdminLayout title="User Management">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Button variant="contained" startIcon={<Add />} onClick={handleOpenNew} sx={{ backgroundColor: COLORS.PRIMARY_GREEN, borderRadius: "50px" }}>
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
            <TableContainer component={Paper} sx={{ borderRadius: 4, border: `1px solid rgba(0,0,0,0.1)`, boxShadow: "none" }}>
              <Table>
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
                    const role = currentRoles.find((r: any) => r.id === admin.roleId);
                    return (
                      <TableRow key={admin.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>
                          <Typography sx={{ fontFamily: tradeGothic.style.fontFamily, fontWeight: 700, fontSize: 16, color: COLORS.PRIMARY_BLUE }}>
                            {admin.name}
                          </Typography>
                        </TableCell>
                        <TableCell>{admin.email}</TableCell>
                        <TableCell>
                          <Chip label={role ? role.name : "Unknown"} size="small" sx={{ backgroundColor: "rgba(0,0,0,0.05)" }} />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton color="primary" size="small" onClick={() => handleEdit(admin)}>
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton color="error" size="small" onClick={() => handleDelete(admin.id)}>
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
        PaperProps={{ sx: { borderRadius: 4, m: 2 } }}
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
              label="Password" 
              type="password"
              value={formData.password || ""} 
              onChange={(e) => { setFormData({ ...formData, password: e.target.value }); setErrors({ ...errors, password: undefined }); }}
              error={!!errors.password}
              helperText={errors.password || "Minimum 6 characters"}
            />
            
            <FormControl fullWidth error={!!errors.roleId}>
              <InputLabel id="role-select-label">Assign Role</InputLabel>
              <Select
                labelId="role-select-label"
                value={formData.roleId}
                label="Assign Role"
                onChange={(e) => { setFormData({ ...formData, roleId: e.target.value }); setErrors({ ...errors, roleId: undefined }); }}
              >
                {currentRoles.length === 0 && (
                  <MenuItem disabled value="">
                    <em>No roles found. Please create a role first.</em>
                  </MenuItem>
                )}
                {currentRoles.map((role: any) => (
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
            Save User
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
}
