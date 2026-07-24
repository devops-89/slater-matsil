"use client";

import logo from "@/public/images/logo/logo.png";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import {
  Dashboard,
  Pages as PagesIcon,
  People as PeopleIcon,
  ContactSupport as ContactSupportIcon,
  Work as WorkIcon,
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

import { usePermissions } from "@/hooks/usePermissions";

const DRAWER_WIDTH = 280;

interface SidebarProps {
  open?: boolean;
  temporary?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ open = true, temporary = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { details } = usePageData();
  const { hasAccess, hasPagesAccess, isSuperAdmin, isLoadingPermissions } = usePermissions();

  const navigateTo = (path: string) => {
    router.push(path);
    if (temporary) {
      onClose?.();
    }
  };

  return (
    <Drawer
      variant={temporary ? "temporary" : "persistent"}
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: temporary ? 0 : open ? DRAWER_WIDTH : 0,
        flexShrink: 0,
        transition: "width 0.3s ease",
        [`& .MuiDrawer-paper`]: {
          width: { xs: "min(82vw, 280px)", sm: DRAWER_WIDTH },
          boxSizing: "border-box",
          backgroundColor: COLORS.WHITE,
          color: COLORS.TEXT_PRIMARY,
          borderRight: "1px solid rgba(0,0,0,0.05)",
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
        {isSuperAdmin && (
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton
            onClick={() => navigateTo("/dashboard")}
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
        )}

        {/* Role Management Link */}
        {isSuperAdmin && (
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton
            onClick={() => navigateTo("/manage-roles")}
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
        {isSuperAdmin && (
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton
            onClick={() => navigateTo("/manage-sub-admins")}
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

        {/* Support Inquiries Link */}
        {isSuperAdmin && (
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton
            onClick={() => navigateTo("/manage-contact-support")}
            sx={{
              borderRadius: 2,
              backgroundColor: pathname.includes("/manage-contact-support")
                ? "rgba(255,255,255,0.05)"
                : "transparent",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.15)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: pathname.includes("/manage-contact-support")
                  ? COLORS.PRIMARY_GREEN
                  : COLORS.PRIMARY_BLUE,
                minWidth: 40,
              }}
            >
              <ContactSupportIcon />
            </ListItemIcon>

            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontFamily: adelle.style.fontFamily,
                    fontWeight: pathname.includes("/manage-contact-support") ? 700 : 400,
                    color: pathname.includes("/manage-contact-support")
                      ? COLORS.PRIMARY_GREEN
                      : COLORS.PRIMARY_BLUE,
                  }}
                >
                  Support Inquiries
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        )}

        {/* Careers Applications Link */}
        {isSuperAdmin && (
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton
            onClick={() => navigateTo("/manage-careers")}
            sx={{
              borderRadius: 2,
              backgroundColor: pathname.includes("/manage-careers")
                ? "rgba(255,255,255,0.05)"
                : "transparent",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.15)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: pathname.includes("/manage-careers")
                  ? COLORS.PRIMARY_GREEN
                  : COLORS.PRIMARY_BLUE,
                minWidth: 40,
              }}
            >
              <WorkIcon />
            </ListItemIcon>

            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontFamily: adelle.style.fontFamily,
                    fontWeight: pathname.includes("/manage-careers") ? 700 : 400,
                    color: pathname.includes("/manage-careers")
                      ? COLORS.PRIMARY_GREEN
                      : COLORS.PRIMARY_BLUE,
                  }}
                >
                  Careers Applications
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        )}

        {/* Pages Link */}
        {hasPagesAccess() && (
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton
            onClick={() => navigateTo("/pages")}
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
        {hasAccess("manage-professionals") && (
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton
            onClick={() => navigateTo("/manage-professionals")}
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
                  Firm Professionals Database
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        )}

        {/* Insights Database Link */}
        {hasAccess("manage-insights") && (
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton
            onClick={() => navigateTo("/manage-insights")}
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
                  Insights Database
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        )}

        {/* Blog Database Link */}
        {hasAccess("manage-blogs") && (
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton
            onClick={() => navigateTo("/manage-blogs")}
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
                  Blog Database
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
