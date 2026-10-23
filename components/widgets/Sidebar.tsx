"use client";

import logo from "@/public/images/logo/logo.png";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import {
  ContactSupport as ContactSupportIcon,
  Dashboard,
  Pages as PagesIcon,
  People as PeopleIcon,
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

import { usePermissions } from "@/hooks/usePermissions";

const DRAWER_WIDTH = 280;

interface SidebarProps {
  open?: boolean;
  temporary?: boolean;
  onClose?: () => void;
}

export default function Sidebar({
  open = true,
  temporary = false,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { details } = usePageData();
  const { hasAccess, hasPagesAccess, isSuperAdmin, isLoadingPermissions } =
    usePermissions();

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

      <List sx={{ pr: 1.5, pl: 0 }}>
        {[
          {
            label: "Dashboard",
            path: "/dashboard",
            icon: Dashboard,
            show: isSuperAdmin,
          },
          {
            label: "Role Management",
            path: "/manage-roles",
            icon: PeopleIcon,
            show: isSuperAdmin,
          },
          {
            label: "User Management",
            path: "/manage-sub-admins",
            icon: PeopleIcon,
            show: isSuperAdmin,
          },
          {
            label: "Support Inquiries",
            path: "/manage-contact-support",
            icon: ContactSupportIcon,
            show: isSuperAdmin,
          },
          {
            label: "Careers Applications",
            path: "/manage-careers",
            icon: WorkIcon,
            show: isSuperAdmin,
          },
          {
            label: "Pages",
            path: "/pages",
            icon: PagesIcon,
            show: hasPagesAccess(),
          },
          {
            label: "Firm Professionals Database",
            path: "/manage-professionals",
            icon: PeopleIcon,
            show: hasAccess("manage-professionals"),
          },
          {
            label: "Insights Database",
            path: "/manage-insights",
            icon: PagesIcon,
            show: hasAccess("manage-insights"),
          },
          {
            label: "Blog Database",
            path: "/manage-blogs",
            icon: PagesIcon,
            show: hasAccess("manage-blogs"),
          },
        ]
          .filter((item) => item.show)
          .map((item) => {
            const isActive =
              pathname === item.path ||
              (item.path !== "/dashboard" && pathname.startsWith(item.path));
            const IconComp = item.icon;

            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => navigateTo(item.path)}
                  sx={{
                    py: 1.2,
                    px: 2,
                    borderRadius: "0 10px 10px 0",
                    borderLeft: `4px solid ${isActive ? COLORS.PRIMARY_GREEN : "transparent"}`,
                    backgroundColor: isActive ? "#F0F6F6" : "transparent",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: isActive
                        ? "#E8F2F3"
                        : "rgba(6, 50, 50, 0.04)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive
                        ? COLORS.PRIMARY_GREEN
                        : COLORS.PRIMARY_BLUE,
                      minWidth: 36,
                    }}
                  >
                    <IconComp fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontFamily: adelle.style.fontFamily,
                          fontWeight: isActive ? 700 : 500,
                          fontSize: "14px",
                          lineHeight: 1.3,
                          color: isActive
                            ? COLORS.PRIMARY_GREEN
                            : COLORS.PRIMARY_BLUE,
                        }}
                      >
                        {item.label}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    </Drawer>
  );
}
