"use client";

import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { COLORS } from "@/utils/enum";
import { tradeGothic, adelle } from "@/utils/fonts";
import { Dashboard, Pages as PagesIcon } from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";

const DRAWER_WIDTH = 280;

interface SidebarProps {
  open?: boolean;
}

export default function Sidebar({ open = true }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: open ? DRAWER_WIDTH : 0,
        flexShrink: 0,
        transition: "width 0.3s ease",
        [`& .MuiDrawer-paper`]: { 
          width: DRAWER_WIDTH, 
          boxSizing: 'border-box',
          backgroundColor: COLORS.PRIMARY_BLUE,
          color: COLORS.WHITE,
          borderRight: "none",
          transition: "transform 0.3s ease",
        },
      }}
    >
      <Box sx={{ p: 4, mb: 2 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontFamily: tradeGothic.style.fontFamily, 
            fontWeight: 700,
            color: COLORS.WHITE
          }}
        >
          Slater Matsil
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            fontFamily: adelle.style.fontFamily, 
            color: COLORS.PRIMARY_GREEN,
            letterSpacing: 1
          }}
        >
          ADMIN PANEL
        </Typography>
      </Box>

      <List sx={{ px: 2 }}>
        {/* Dashboard Link */}
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton
            onClick={() => router.push("/dashboard")}
            sx={{
              borderRadius: 2,
              backgroundColor: pathname === "/dashboard" ? "rgba(255,255,255,0.1)" : "transparent",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" }
            }}
          >
            <ListItemIcon sx={{ color: pathname === "/dashboard" ? COLORS.PRIMARY_GREEN : COLORS.WHITE, minWidth: 40 }}>
              <Dashboard />
            </ListItemIcon>
            <ListItemText 
              primary={
                <Typography sx={{ fontFamily: adelle.style.fontFamily, fontWeight: pathname === "/dashboard" ? 700 : 400, color: pathname === "/dashboard" ? COLORS.WHITE : "rgba(255,255,255,0.7)" }}>
                  Dashboard
                </Typography>
              } 
            />
          </ListItemButton>
        </ListItem>

        {/* Pages Link */}
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton
            onClick={() => router.push("/pages")}
            sx={{
              borderRadius: 2,
              backgroundColor: pathname.includes("/pages") ? "rgba(255,255,255,0.05)" : "transparent",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" }
            }}
          >
            <ListItemIcon sx={{ color: pathname.includes("/pages") ? COLORS.PRIMARY_GREEN : COLORS.WHITE, minWidth: 40 }}>
              <PagesIcon />
            </ListItemIcon>
            <ListItemText 
              primary={
                <Typography sx={{ fontFamily: adelle.style.fontFamily, fontWeight: pathname.includes("/pages") ? 700 : 400, color: pathname.includes("/pages") ? COLORS.WHITE : "rgba(255,255,255,0.7)" }}>
                  Pages
                </Typography>
              } 
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
