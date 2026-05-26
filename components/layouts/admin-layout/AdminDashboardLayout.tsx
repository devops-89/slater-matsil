"use client";

import AdminLayout from "./AdminLayout";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { COLORS } from "@/utils/enum";
import { tradeGothic, adelle } from "@/utils/fonts";

const STATS = [
  { label: "Total Professionals", value: "48" },
  { label: "Active Services", value: "12" },
  { label: "Published Insights", value: "156" },
  { label: "Recent Updates", value: "3" },
];

export default function AdminDashboardLayout() {
  return (
    <AdminLayout title="Overview Dashboard">
      <Grid container spacing={4}>
        {STATS.map((stat, i) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={i}>
            <Card 
              sx={{ 
                borderRadius: 4, 
                boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
                border: "none"
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography 
                  sx={{ 
                    fontFamily: adelle.style.fontFamily,
                    color: COLORS.TEXT_PRIMARY,
                    fontSize: 14,
                    mb: 2
                  }}
                >
                  {stat.label}
                </Typography>
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ mt: 6, p: 6, backgroundColor: COLORS.WHITE, borderRadius: 4, boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)" }}>
        <Typography variant="h5" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE, mb: 2 }}>
          Welcome to the Admin Panel
        </Typography>
        <Typography sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.TEXT_PRIMARY }}>
          Use the navigation menu on the left to manage content across the Slater Matsil website. All changes made here will be reflected on the live site once you hit save.
        </Typography>
      </Box>
    </AdminLayout>
  );
}
