"use client";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "@/components/widgets/Sidebar";
import Header from "@/components/widgets/Header";
import { COLORS } from "@/utils/enum";
import { ReactNode, useEffect, useState } from "react";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const DRAWER_WIDTH = 280;

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", width: "100%", backgroundColor: COLORS.OFF_WHITE }}>
      <Sidebar open={sidebarOpen} temporary={isMobile} onClose={() => setSidebarOpen(false)} />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          width: { xs: "100%", md: sidebarOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%" },
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          transition: "width 0.3s ease",
        }}
      >
        <Header title={title} onToggleSidebar={toggleSidebar} />
        <Box 
          sx={{ 
            p: { xs: 2, sm: 3, md: 6 },
            flexGrow: 1,
            overflow: "auto",
            minWidth: 0
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
