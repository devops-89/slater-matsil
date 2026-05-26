"use client";

import { Box } from "@mui/material";
import Sidebar from "@/components/widgets/Sidebar";
import Header from "@/components/widgets/Header";
import { COLORS } from "@/utils/enum";
import { ReactNode, useState } from "react";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const DRAWER_WIDTH = 280;

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: COLORS.OFF_WHITE }}>
      <Sidebar open={sidebarOpen} />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          width: sidebarOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.3s ease",
        }}
      >
        <Header title={title} onToggleSidebar={toggleSidebar} />
        <Box 
          sx={{ 
            p: 6, 
            flexGrow: 1,
            overflow: "auto"
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
