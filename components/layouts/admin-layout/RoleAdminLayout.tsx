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
import { ROLE_PROPS } from "@/utils/types";
import * as yup from "yup";

const ALL_PERMISSIONS = [
  { id: "home", label: "Home Page" },
  { id: "about-us", label: "About Us" },
  { id: "services", label: "Services Page" },
  { id: "practice-groups", label: "Practice Groups" },
  { id: "firm-professionals", label: "Firm Professionals" },
  { id: "firm-leadership", label: "Firm Leadership" },
  { id: "insights", label: "Insights" },
  { id: "blogs", label: "Blogs" },
  { id: "careers", label: "Careers" },
  { id: "contact-us", label: "Contact Us" },
  { id: "who-we-serve", label: "Who We Serve" },
  { id: "privacy-policy", label: "Privacy Policy" },
  { id: "terms-of-use", label: "Terms of Use" },
  { id: "disclaimer", label: "Disclaimer" },
];

const roleSchema = yup.object().shape({
  name: yup.string().required("Role Name is required"),
});

export default function RoleAdminLayout() {
  const { details, setDetails } = usePageData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState<ROLE_PROPS>({
    id: "",
    name: "",
    permissions: [],
  });

  useEffect(() => {
    if (details && (!details.roles || details.roles.length === 0)) {
      const stored = localStorage.getItem("roles");
      if (stored) {
        setDetails({
          ...details,
          roles: JSON.parse(stored),
        });
      }
    }
  }, []);

  const roles = details?.roles || [];

  const handleOpenNew = () => {
    setFormData({ id: "", name: "", permissions: [] });
    setErrors({});
    setDialogOpen(true);
  };

  const handleEdit = (role: ROLE_PROPS) => {
    setFormData(role);
    setErrors({});
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const newRoles = roles.filter(r => r.id !== id);
    setDetails({ ...details!, roles: newRoles });
    localStorage.setItem("roles", JSON.stringify(newRoles));
  };

  const handleTogglePermission = (permId: string) => {
    const current = formData.permissions;
    if (current.includes(permId)) {
      setFormData({ ...formData, permissions: current.filter(p => p !== permId) });
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

    let newRoles = [...roles];
    
    if (formData.id) {
      newRoles = newRoles.map(r => r.id === formData.id ? formData : r);
    } else {
      newRoles.push({ ...formData, id: Date.now().toString() });
    }

    setDetails({ ...details!, roles: newRoles });
    localStorage.setItem("roles", JSON.stringify(newRoles));
    setDialogOpen(false);
  };

  return (
    <AdminLayout title="Role Management">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
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
        <TableContainer component={Paper} sx={{ borderRadius: 4, border: `1px solid rgba(0,0,0,0.1)`, boxShadow: "none" }}>
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
                      {role.permissions.map(perm => {
                        const label = ALL_PERMISSIONS.find(p => p.id === perm)?.label || perm;
                        return (
                          <Chip key={perm} label={label} size="small" sx={{ backgroundColor: "rgba(0,0,0,0.05)" }} />
                        );
                      })}
                      {role.permissions.length === 0 && <Typography variant="caption" color="textSecondary">No permissions</Typography>}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" size="small" onClick={() => handleEdit(role)}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton color="error" size="small" onClick={() => handleDelete(role.id)}>
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
        PaperProps={{ sx: { borderRadius: 4, m: 2 } }}
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
    </AdminLayout>
  );
}
