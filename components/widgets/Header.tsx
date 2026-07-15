"use client";

import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { Logout, Menu, AdminPanelSettings, ManageAccounts } from "@mui/icons-material";
import { Box, Typography, IconButton, Avatar, Menu as MuiMenu, MenuItem, ListItemIcon } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useNotification } from "@/components/providers/NotificationProvider";
import { usePermissions } from "@/hooks/usePermissions";

interface HeaderProps {
  title?: string;
  onToggleSidebar?: () => void;
}

export default function Header({ title = "Dashboard", onToggleSidebar }: HeaderProps) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { showNotification } = useNotification();
  const { isSuperAdmin } = usePermissions();
  const [storedName, setStoredName] = useState("");

  useEffect(() => {
    const updateName = () => {
      const name = localStorage.getItem("userName");
      if (name) {
        setStoredName(name);
      }
    };
    
    // Initial check
    updateName();
    
    // Listen for hydration updates
    window.addEventListener("userNameUpdated", updateName);
    return () => window.removeEventListener("userNameUpdated", updateName);
  }, []);

  const displayName = isSuperAdmin ? "Admin" : (storedName || "User");
  const displayInitial = displayName.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("isSuperAdmin");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("adminUserId");
    localStorage.removeItem("userName");
    
    // Clear the role cookie
    document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    showNotification("Logged out successfully", "success");
    router.replace("/admin");
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box 
      sx={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        minHeight: { xs: 64, md: 80 },
        px: { xs: 2, sm: 3, md: 6 },
        gap: 2,
        backgroundColor: COLORS.WHITE,
        borderBottom: `1px solid rgba(0,0,0,0.05)`,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 }, minWidth: 0 }}>
        {onToggleSidebar && (
          <IconButton onClick={onToggleSidebar} edge="start" sx={{ color: COLORS.PRIMARY_BLUE }}>
            <Menu />
          </IconButton>
        )}
        <Typography 
          variant="h5" 
          sx={{ 
            fontFamily: adelle.style.fontFamily,
            fontWeight: 700,
            color: COLORS.PRIMARY_BLUE,
            fontSize: { xs: 18, sm: 22, md: 24 },
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {title}
        </Typography>
      </Box>

      <Box 
        sx={{ display: "flex", alignItems: "center", gap: 2 }}
        onMouseLeave={handleMenuClose}
      >
        <IconButton 
          onClick={handleMenuOpen} 
          onMouseEnter={handleMenuOpen}
          sx={{ p: 0 }}
        >
          <Avatar sx={{ bgcolor: COLORS.PRIMARY_BLUE }}>
            {displayInitial}
          </Avatar>
        </IconButton>
        
        <MuiMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          MenuListProps={{
            onMouseLeave: handleMenuClose,
          }}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
              mt: 1.5,
              minWidth: 200,
              fontFamily: adelle.style.fontFamily,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem disabled sx={{ opacity: "1 !important" }}>
            <ListItemIcon>
              <AdminPanelSettings fontSize="small" sx={{ color: COLORS.PRIMARY_BLUE }} />
            </ListItemIcon>
            <Typography variant="body2" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.TEXT_PRIMARY, fontWeight: 700 }}>
              {displayName}
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" color="error" />
            </ListItemIcon>
            <Typography variant="body2" sx={{ fontFamily: adelle.style.fontFamily, color: "error.main" }}>
              Logout
            </Typography>
          </MenuItem>
        </MuiMenu>
      </Box>
    </Box>
  );
}
