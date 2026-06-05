"use client";

import { AuthControllers } from "@/api/authControllers";
import { usePermissionStore } from "@/store/usePermissionStore";
import { RoleControllers } from "@/api/roleControllers";
import { UserControllers } from "@/api/userControllers";
import { useNotification } from "@/components/providers/NotificationProvider";
import { useLoading } from "@/components/providers/LoadingProvider";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { EmailOutlined, LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Container, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";

const loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email address").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function AdminLoginLayout() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { details } = usePageData();
  const { showNotification } = useNotification();
  const { startLoading, stopLoading } = useLoading();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setError("");
      startLoading();

      try {
        const response = await AuthControllers.login({ email: values.email, password: values.password });
        if (response.data.success) {
          const user = response.data.data.user;
          const userEmail = user.email;

        // Set tokens BEFORE the await so API calls inside the block can use them!
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);

        let redirectPath = "/dashboard";
        
        try {
          const emailToMatch = userEmail || values.email || "";
          const usersRes = await UserControllers.getAllUsers();
          const subAdmins = usersRes.data?.data?.data?.users || usersRes.data?.data?.users || [];
          const foundUser = subAdmins.find((a: any) => a.email && a.email.toLowerCase() === emailToMatch.toLowerCase());
          const roleId = foundUser?.roleId || foundUser?.permissionRole?.id || foundUser?.role?.id;
          
          if (roleId) {
             // Sub-Admin role detected
             document.cookie = `role=SUBADMIN; path=/; max-age=86400`;
             const roleRes = await RoleControllers.getRoleById(roleId);
             const rawData = roleRes.data?.data?.data || roleRes.data?.data || roleRes.data || {};
             const userRole = rawData.id ? rawData : (rawData.role || rawData);
             const perms = userRole?.permissions?.map((p: any) => p.module) || [];
             
             if (perms.length > 0) {
               const hasPagesAccess = perms.some((p: string) => p.startsWith("pages/"));
               redirectPath = hasPagesAccess ? "/pages" : `/${perms[0]}`;
             } else {
               redirectPath = "/";
             }
          } else {
             // Super Admin detected
             document.cookie = `role=ADMIN; path=/; max-age=86400`;
             redirectPath = "/dashboard";
          }
        } catch (e: any) {
          console.error("Failed to calculate initial path", e);
          setError("Route Calc Error: " + (e?.message || "Unknown API error"));
          stopLoading();
          return;
        }

        // NOW set localStorage so that layout.tsx doesn't prematurely redirect during the await above
        localStorage.setItem("adminAuth", userEmail);

        const fullName = user.fullName || (user.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : "User");
        localStorage.setItem("userName", fullName);
        
        if (user.id) {
          localStorage.setItem("adminUserId", user.id.toString());
        }

        usePermissionStore.getState().clearPermissions();

        showNotification("Login successful!", "success");
        stopLoading();
        router.push(redirectPath);
      } else {
        setError(response.data.message || "Invalid email or password.");
        stopLoading();
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Invalid email or password. You do not have access.");
      stopLoading();
    }
  }});

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", backgroundColor: COLORS.OFF_WHITE }}>
      <Grid container sx={{ flex: 1 }}>
        {/* Left Side - Branding */}
        <Grid size={{xs:12,lg:5}} sx={{ 
            backgroundColor: COLORS.PRIMARY_BLUE, 
            display: "flex", 
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            minHeight: { xs: 280, lg: "100vh" },
            p: { xs: 3, sm: 4, lg: 8 },
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Decorative Elements */}
          <Box 
            sx={{ 
              position: "absolute", 
              top: -100, 
              right: -100, 
              width: 300, 
              height: 300, 
              borderRadius: "50%", 
              backgroundColor: COLORS.PRIMARY_GREEN,
              opacity: 0.1
            }} 
          />
          
          <Typography 
            variant="h2" 
            sx={{ 
              color: COLORS.WHITE, 
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 700,
              fontSize: { xs: 38, sm: 48, lg: 60 },
              mb: 2,
              zIndex: 1
            }}
          >
            Slater Matsil
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: COLORS.PRIMARY_GREEN, 
              fontFamily: adelle.style.fontFamily,
              fontWeight: 400,
              fontSize: { xs: 22, sm: 26 },
              mb: 4,
              zIndex: 1
            }}
          >
            Admin Control Panel
          </Typography>
          <Typography 
            sx={{ 
              color: "rgba(255,255,255,0.7)", 
              fontFamily: adelle.style.fontFamily,
              fontSize: 16,
              maxWidth: 400,
              zIndex: 1
            }}
          >
            Manage your homepage content, service areas, insights, and professional profiles securely from a single centralized dashboard.
          </Typography>
        </Grid>

        {/* Right Side - Form */}
        <Grid size={{xs:12,lg:7}}
          sx={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            p: { xs: 3, sm: 4 },
            backgroundColor: COLORS.WHITE
          }}
        >
          <Container maxWidth="sm">
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: "100%" }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: COLORS.PRIMARY_BLUE, 
                  fontFamily: tradeGothic.style.fontFamily,
                  fontWeight: 700,
                  mb: 1
                }}
              >
                Welcome Back
              </Typography>
              <Typography 
                sx={{ 
                  color: COLORS.TEXT_PRIMARY, 
                  fontFamily: adelle.style.fontFamily,
                  mb: 5
                }}
              >
                Please enter your credentials to access the admin panel.
              </Typography>

              <Stack spacing={4}>
                {error && (
                  <Typography color="error" variant="body2" sx={{ fontFamily: adelle.style.fontFamily, textAlign: "center" }}>
                    {error}
                  </Typography>
                )}
                <TextField 
                  fullWidth 
                  label="Email Address" 
                  variant="outlined"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlined sx={{ color: COLORS.PRIMARY_BLUE }} />
                        </InputAdornment>
                      ),
                    }
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": { borderColor: COLORS.PRIMARY_GREEN },
                    },
                    "& .MuiInputLabel-root.Mui-focused": { color: COLORS.PRIMARY_GREEN },
                  }}
                />
                
                <TextField 
                  fullWidth 
                  label="Password" 
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlined sx={{ color: COLORS.PRIMARY_BLUE }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": { borderColor: COLORS.PRIMARY_GREEN },
                    },
                    "& .MuiInputLabel-root.Mui-focused": { color: COLORS.PRIMARY_GREEN },
                  }}
                />

                <Button 
                  type="submit"
                  fullWidth 
                  variant="contained" 
                  sx={{ 
                    backgroundColor: COLORS.PRIMARY_BLUE,
                    color: COLORS.WHITE,
                    py: 2,
                    fontSize: 16,
                    fontFamily: adelle.style.fontFamily,
                    textTransform: "none",
                    borderRadius: "50px",
                    boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.10)",
                    "&:hover": {
                      backgroundColor: COLORS.PRIMARY_GREEN,
                    }
                  }}
                >
                  Secure Login
                </Button>
              </Stack>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}
