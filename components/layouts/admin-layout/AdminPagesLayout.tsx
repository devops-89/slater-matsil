"use client";

import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Card, CardActionArea, CardContent, Container, Grid, Typography } from "@mui/material";
import { Home, Info, Build, Group, Article, Person, Star, Work, ContactPhone, Public, Policy, Gavel, Warning, LibraryBooks } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { usePageData } from "@/store/usePageData";

const PAGE_ITEMS = [
  { text: "Home Page", icon: <Home fontSize="large" />, path: "/pages/home", desc: "Manage Hero, About, Metrics, and Services sections." },
  { text: "About Us", icon: <Info fontSize="large" />, path: "/pages/about-us", desc: "Update Firm History and Mission Statements." },
  { text: "Services", icon: <Build fontSize="large" />, path: "/pages/services", desc: "Manage the list of services and details." },
  { text: "Practice Groups", icon: <Group fontSize="large" />, path: "/pages/practice-groups", desc: "Update Practice Group directories." },
  { text: "Firm Professionals", icon: <Person fontSize="large" />, path: "/pages/professionals", desc: "Manage Team Member profiles and bios." },
  { text: "Firm Leadership", icon: <Star fontSize="large" />, path: "/pages/leadership", desc: "Update Leadership profiles and information." },
  { text: "Insights", icon: <Article fontSize="large" />, path: "/pages/insights", desc: "Edit Blog Posts and News articles." },
  { text: "Blogs", icon: <LibraryBooks fontSize="large" />, path: "/pages/blogs", desc: "Edit the Blogs page hero section." },
  { text: "Careers", icon: <Work fontSize="large" />, path: "/pages/careers", desc: "Update job postings and career information." },
  { text: "Contact Us", icon: <ContactPhone fontSize="large" />, path: "/pages/contact", desc: "Update contact information and forms." },
  { text: "Who We Serve", icon: <Public fontSize="large" />, path: "/pages/who-we-serve", desc: "Manage information for different client sectors." },
  { text: "Privacy Policy", icon: <Policy fontSize="large" />, path: "/pages/privacy-policy", desc: "Update the site Privacy Policy." },
  { text: "Terms of Use", icon: <Gavel fontSize="large" />, path: "/pages/terms-of-use", desc: "Update the site Terms of Use." },
  { text: "Disclaimer", icon: <Warning fontSize="large" />, path: "/pages/disclaimer", desc: "Update legal Disclaimers." },
];

export default function AdminPagesLayout() {
  const router = useRouter();
  const { details } = usePageData();
  const [permissions, setPermissions] = useState<string[] | null>(null);

  useEffect(() => {
    const isSuperAdmin = localStorage.getItem("isSuperAdmin");
    
    if (isSuperAdmin === "true") {
      setPermissions(null); // Super admin gets access to all
    } else if (isSuperAdmin === "false") {
      const storedPerms = localStorage.getItem("userPermissions");
      if (storedPerms) {
        try {
          setPermissions(JSON.parse(storedPerms));
        } catch (e) {
          setPermissions([]);
        }
      } else {
        setPermissions([]);
      }
    } else {
      // Fallback if not set
      setPermissions(null);
    }
  }, []);

  const filteredPageItems = PAGE_ITEMS.filter(item => {
    if (permissions === null) return true; // Super admin
    
    // item.path is like "/pages/home", permission is like "pages/home"
    const permissionName = item.path.substring(1); 
    return permissions.includes(permissionName);
  });

  return (
    <AdminLayout title="Manage Pages">
      <Container maxWidth="xl" sx={{ mt: { xs: 1, md: 4 }, px: { xs: 0, sm: 2 } }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontFamily: tradeGothic.style.fontFamily, 
            color: COLORS.PRIMARY_BLUE,
            fontWeight: 700,
            mb: 1
          }}
        >
          Website Pages
        </Typography>
        <Typography 
          sx={{ 
            fontFamily: adelle.style.fontFamily, 
            color: COLORS.TEXT_PRIMARY,
            mb: { xs: 3, md: 6 }
          }}
        >
          Select a page below to edit its content and view live section previews.
        </Typography>

        <Grid container spacing={{ xs: 2, md: 4 }}>
          {filteredPageItems.map((item, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
              <Card 
                sx={{ 
                  borderRadius: 4,
                  boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 30px 0 rgba(0,0,0,0.1)",
                  }
                }}
              >
                <CardActionArea onClick={() => router.push(item.path)} sx={{ p: { xs: 2.5, md: 4 }, minHeight: { xs: 180, md: 220 }, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center" }}>
                  <Box sx={{ color: COLORS.PRIMARY_GREEN, mb: 2 }}>
                    {item.icon}
                  </Box>
                  <CardContent sx={{ p: 0 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontFamily: tradeGothic.style.fontFamily, 
                        color: COLORS.PRIMARY_BLUE,
                        fontWeight: 700,
                        mb: 1
                      }}
                    >
                      {item.text}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontFamily: adelle.style.fontFamily, 
                        color: COLORS.TEXT_PRIMARY,
                        lineHeight: 1.6
                      }}
                    >
                      {item.desc}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </AdminLayout>
  );
}
