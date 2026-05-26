"use client";

import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { Logout, Menu } from "@mui/icons-material";
import { Box, Button, Typography, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title?: string;
  onToggleSidebar?: () => void;
}

export default function Header({ title = "Dashboard", onToggleSidebar }: HeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin");
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

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography 
          sx={{ 
            fontFamily: adelle.style.fontFamily,
            color: COLORS.TEXT_PRIMARY,
            fontSize: 14
          }}
        >
          admin@slatermatsil.com
        </Typography>
        <Button 
          variant="outlined" 
          size="small"
          onClick={handleLogout}
          endIcon={<Logout fontSize="small" />}
          sx={{ 
            color: COLORS.TEXT_PRIMARY,
            borderColor: "rgba(0,0,0,0.1)",
            fontFamily: adelle.style.fontFamily,
            textTransform: "none",
            "&:hover": {
              borderColor: COLORS.PRIMARY_BLUE,
              color: COLORS.PRIMARY_BLUE
            }
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}
