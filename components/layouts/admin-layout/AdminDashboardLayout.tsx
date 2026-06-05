"use client";

import AdminLayout from "./AdminLayout";
import { Box, Card, CardContent, Grid, Typography, CircularProgress } from "@mui/material";
import { People, Article, LibraryBooks, AdminPanelSettings, WorkOutline } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { tradeGothic, adelle } from "@/utils/fonts";
import { useEffect, useState } from "react";
import { UserControllers } from "@/api/userControllers";

export default function AdminDashboardLayout() {
  const [stats, setStats] = useState([
    { label: "Total Professionals", value: "0" },
    { label: "Published Insights", value: "0" },
    { label: "Total Blogs", value: "0" },
    { label: "Total Roles", value: "0" },
  ]);
  const [loading, setLoading] = useState(true);

  const getIcon = (index: number) => {
    switch (index) {
      case 0: return <People sx={{ fontSize: 50, color: COLORS.PRIMARY_GREEN, opacity: 0.15, position: 'absolute', right: 20, bottom: 20 }} />;
      case 1: return <Article sx={{ fontSize: 50, color: COLORS.PRIMARY_GREEN, opacity: 0.15, position: 'absolute', right: 20, bottom: 20 }} />;
      case 2: return <LibraryBooks sx={{ fontSize: 50, color: COLORS.PRIMARY_GREEN, opacity: 0.15, position: 'absolute', right: 20, bottom: 20 }} />;
      case 3: return <AdminPanelSettings sx={{ fontSize: 50, color: COLORS.PRIMARY_GREEN, opacity: 0.15, position: 'absolute', right: 20, bottom: 20 }} />;
      default: return null;
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const res = await UserControllers.getDashboardCounts();
        
        if (!isMounted) return;

        const counts = res.data?.data?.data || res.data?.data || {};

        setStats([
          { label: "Total Professionals", value: (counts.totalProfessionals || counts.professionalsCount || 0).toString() },
          { label: "Published Insights", value: (counts.publishedInsights || counts.insightsCount || 0).toString() },
          { label: "Total Blogs", value: (counts.blogsCount || counts.totalBlogs || 0).toString() },
          { label: "Total Roles", value: (counts.rolesCount || counts.totalRoles || 0).toString() },
        ]);
      } catch (e) {
        console.error("Failed to fetch dashboard stats", e);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AdminLayout title="Overview Dashboard">
      <Grid container spacing={4}>
        {stats.map((stat, i) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={i}>
            <Card 
              sx={{ 
                borderRadius: 4, 
                boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
                border: "1px solid rgba(0,0,0,0.05)",
                position: "relative",
                minHeight: 140,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                   transform: "translateY(-5px)",
                   boxShadow: "0 8px 30px 0 rgba(0,0,0,0.1)",
                }
              }}
            >
              <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                <Typography 
                  sx={{ 
                    fontFamily: adelle.style.fontFamily,
                    color: COLORS.TEXT_PRIMARY,
                    fontSize: 15,
                    fontWeight: 600,
                    mb: 2
                  }}
                >
                  {stat.label}
                </Typography>
                {loading ? (
                  <CircularProgress size={24} sx={{ color: COLORS.PRIMARY_GREEN }} />
                ) : (
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontFamily: tradeGothic.style.fontFamily,
                      color: COLORS.PRIMARY_BLUE,
                      fontWeight: 700
                    }}
                  >
                    {stat.value}
                  </Typography>
                )}
                {getIcon(i)}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ 
        mt: { xs: 4, md: 6 }, 
        p: { xs: 4, md: 6 }, 
        backgroundColor: COLORS.WHITE, 
        borderRadius: 4, 
        boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
        border: "1px solid rgba(0,0,0,0.05)",
        background: `linear-gradient(135deg, ${COLORS.WHITE} 0%, rgba(240, 245, 240, 0.5) 100%)`
      }}>
        <Typography variant="h4" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE, mb: 2, fontWeight: 700 }}>
          Welcome to the Admin Panel
        </Typography>
        <Typography sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.TEXT_PRIMARY, fontSize: 16, maxWidth: 800, lineHeight: 1.6 }}>
          Use the navigation menu on the left to manage content across the website. All changes made here will be reflected on the live site instantly upon saving.
        </Typography>
      </Box>
    </AdminLayout>
  );
}
