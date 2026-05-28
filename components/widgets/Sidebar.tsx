"use client";

import logo from "@/public/images/logo/logo.png";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import {
  Dashboard,
  Pages as PagesIcon,
  People as PeopleIcon,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DRAWER_WIDTH = 280;

interface SidebarProps {
  open?: boolean;
}

export default function Sidebar({ open = true }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { details } = usePageData();
  const [permissions, setPermissions] = useState<string[] | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth && auth !== "true") {
      let subAdmins = details?.subAdmins || [];
      if (subAdmins.length === 0) {
        const stored = localStorage.getItem("subAdmins");
        if (stored) {
          subAdmins = JSON.parse(stored);
        }
      }
      const found = subAdmins.find((a: any) => a.email.toLowerCase() === auth.toLowerCase());
      if (found) {
        let roles = details?.roles || [];
        if (roles.length === 0) {
          const storedRoles = localStorage.getItem("roles");
          if (storedRoles) roles = JSON.parse(storedRoles);
        }
        const userRole = roles.find((r: any) => r.id === found.roleId);
        if (userRole) {
          setPermissions(userRole.permissions);
        } else {
          setPermissions([]);
        }
      }
    } else {
      setPermissions(null);
    }
  }, [details]);

  const hasAccess = (page: string) => {
    if (permissions === null) return true;
    return permissions.includes(page);
  };

  const canSeePages = () => {
    if (permissions === null) return true;
    return permissions.some(p => ["home", "about-us", "services", "practice-groups", "firm-professionals", "firm-leadership", "insights", "blogs", "careers", "contact-us", "who-we-serve", "privacy-policy", "terms-of-use", "disclaimer"].includes(p));
  };

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
          boxSizing: "border-box",
          backgroundColor: COLORS.WHITE,
          color: COLORS.WHITE,
          borderRight: "none",
          transition: "transform 0.3s ease",
        },
      }}
    >
      <Box
        sx={{
          p: 4,
          mb: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          src={logo}
          alt="Slater Matsil logo"
          priority
          style={{
            width: "180px",
            height: "auto",
            objectFit: "contain",
          }}
        />

        <Typography
          variant="caption"
          sx={{
            mt: 1,
            fontFamily: adelle.style.fontFamily,
            color: COLORS.PRIMARY_GREEN,
            letterSpacing: 1,
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
              backgroundColor:
                pathname === "/dashboard"
                  ? "rgba(255,255,255,0.1)"
                  : "transparent",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.15)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color:
                  pathname === "/dashboard"
                    ? COLORS.PRIMARY_GREEN
                      : COLORS.PRIMARY_BLUE,
                minWidth: 40,
              }}
            >
              <Dashboard />
            </ListItemIcon>

            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontFamily: adelle.style.fontFamily,
                    fontWeight: pathname === "/dashboard" ? 700 : 400,
                    color:
                      pathname === "/dashboard"
                        ? COLORS.PRIMARY_GREEN
                      : COLORS.PRIMARY_BLUE,
                  }}
                >
                  Dashboard
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>

        {/* Role Management Link */}
        {permissions === null && (
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton
            onClick={() => router.push("/manage-roles")}
            sx={{
              borderRadius: 2,
              backgroundColor: pathname.includes("/manage-roles")
                ? "rgba(255,255,255,0.05)"
                : "transparent",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.15)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: pathname.includes("/manage-roles")
                      ? COLORS.PRIMARY_GREEN
                      : COLORS.PRIMARY_BLUE,
                minWidth: 40,
              }}
            >
              <PeopleIcon />
            </ListItemIcon>

            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontFamily: adelle.style.fontFamily,
                    fontWeight: pathname.includes("/manage-roles") ? 700 : 400,
                    color: pathname.includes("/manage-roles")
                      ? COLORS.PRIMARY_GREEN
                      : COLORS.PRIMARY_BLUE,
                  }}
                >
                  Role Management
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        )}

        {/* Sub-Admin Management Link */}
        {permissions === null && (
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton
            onClick={() => router.push("/manage-sub-admins")}
            sx={{
              borderRadius: 2,
              backgroundColor: pathname.includes("/manage-sub-admins")
                ? "rgba(255,255,255,0.05)"
                : "transparent",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.15)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: pathname.includes("/manage-sub-admins")
                  ? COLORS.PRIMARY_GREEN
                  : COLORS.PRIMARY_BLUE,
                minWidth: 40,
              }}
            >
              <PeopleIcon />
            </ListItemIcon>

            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontFamily: adelle.style.fontFamily,
                    fontWeight: pathname.includes("/manage-sub-admins") ? 700 : 400,
                    color: pathname.includes("/manage-sub-admins")
                      ? COLORS.PRIMARY_GREEN
                      : COLORS.PRIMARY_BLUE,
                  }}
                >
                  User Management
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        )}

        {/* Pages Link */}
        {canSeePages() && (
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton
            onClick={() => router.push("/pages")}
            sx={{
              borderRadius: 2,
              backgroundColor: pathname.includes("/pages")
                ? "rgba(255,255,255,0.05)"
                : "transparent",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.15)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: pathname.includes("/pages")
                  ? COLORS.PRIMARY_GREEN
                  : COLORS.PRIMARY_BLUE,
                minWidth: 40,
              }}
            >
              <PagesIcon />
            </ListItemIcon>

            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontFamily: adelle.style.fontFamily,
                    fontWeight: pathname.includes("/pages") ? 700 : 400,
                    color: pathname.includes("/pages")
                      ? COLORS.PRIMARY_GREEN
                      : COLORS.PRIMARY_BLUE,
                  }}
                >
                  Pages
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        )}

        {/* Firm Professionals Database Link */}
        {hasAccess("firm-professionals") && (
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton
            onClick={() => router.push("/manage-professionals")}
            sx={{
              borderRadius: 2,
              backgroundColor: pathname.includes("/manage-professionals")
                ? "rgba(255,255,255,0.05)"
                : "transparent",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.15)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: pathname.includes("/manage-professionals")
                  ? COLORS.PRIMARY_GREEN
                      : COLORS.PRIMARY_BLUE,
                minWidth: 40,
              }}
            >
              <PeopleIcon />
            </ListItemIcon>

            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontFamily: adelle.style.fontFamily,
                    fontWeight: pathname.includes("/manage-professionals")
                      ? 700
                      : 400,
                    color: pathname.includes("/manage-professionals")
                      ? COLORS.PRIMARY_GREEN
                      : COLORS.PRIMARY_BLUE,
                  }}
                >
                  Firm Professionals
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        )}

        {/* Insights Database Link */}
        {hasAccess("insights") && (
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton
            onClick={() => router.push("/manage-insights")}
            sx={{
              borderRadius: 2,
              backgroundColor: pathname.includes("/manage-insights")
                ? "rgba(255,255,255,0.05)"
                : "transparent",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.15)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: pathname.includes("/manage-insights")
                  ? COLORS.PRIMARY_GREEN
                      : COLORS.PRIMARY_BLUE,
                minWidth: 40,
              }}
            >
              <PagesIcon />
            </ListItemIcon>

            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontFamily: adelle.style.fontFamily,
                    fontWeight: pathname.includes("/manage-insights")
                      ? 700
                      : 400,
                    color: pathname.includes("/manage-insights")
                      ? COLORS.PRIMARY_GREEN
                      : COLORS.PRIMARY_BLUE,
                  }}
                >
                  Insights
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        )}

        {/* Blogs Database Link */}
        {hasAccess("blogs") && (
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton
            onClick={() => router.push("/manage-blogs")}
            sx={{
              borderRadius: 2,
              backgroundColor: pathname.includes("/manage-blogs")
                ? "rgba(255,255,255,0.05)"
                : "transparent",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.15)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: pathname.includes("/manage-blogs")
                  ? COLORS.PRIMARY_GREEN
                      : COLORS.PRIMARY_BLUE,
                minWidth: 40,
              }}
            >
              <PagesIcon />
            </ListItemIcon>

            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontFamily: adelle.style.fontFamily,
                    fontWeight: pathname.includes("/manage-blogs")
                      ? 700
                      : 400,
                    color: pathname.includes("/manage-blogs")
                      ? COLORS.PRIMARY_GREEN
                      : COLORS.PRIMARY_BLUE,
                  }}
                >
                  Blogs
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        )}
      </List>
    </Drawer>
  );
}