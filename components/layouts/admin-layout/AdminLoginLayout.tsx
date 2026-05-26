"use client";

import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { EmailOutlined, LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Container, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginLayout() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy authentication - store token and redirect to dashboard
    localStorage.setItem("adminAuth", "true");
    router.push("/dashboard");
  };

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
            p: { xs: 4, lg: 8 },
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
            p: 4,
            backgroundColor: COLORS.WHITE
          }}
        >
          <Container maxWidth="sm">
            <Box component="form" onSubmit={handleLogin} sx={{ width: "100%" }}>
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
                <TextField 
                  fullWidth 
                  label="Email Address" 
                  variant="outlined" 
                  defaultValue="admin@slatermatsil.com"
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
                  defaultValue="********"
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
