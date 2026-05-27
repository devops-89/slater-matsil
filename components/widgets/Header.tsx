"use client";

import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { Logout, Menu, AdminPanelSettings, ManageAccounts } from "@mui/icons-material";
import { Box, Button, Typography, IconButton, Avatar, Menu as MuiMenu, MenuItem, ListItemIcon } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface HeaderProps {
  title?: string;
  onToggleSidebar?: () => void;
}

export default function Header({ title = "Dashboard", onToggleSidebar }: HeaderProps) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const authEmail = typeof window !== "undefined" ? localStorage.getItem("adminAuth") : "admin@slatermatsil.com";
  const displayEmail = authEmail && authEmail !== "true" ? authEmail : "admin@slatermatsil.com";

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setAnchorEl(null);
    router.push("/admin");
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
        height: 80,
        px: 6,
        backgroundColor: COLORS.WHITE,
        borderBottom: `1px solid rgba(0,0,0,0.05)`,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
            color: COLORS.PRIMARY_BLUE
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
            A
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
              Admin
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
