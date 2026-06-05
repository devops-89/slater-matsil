"use client";

import { useLoading } from "@/components/providers/LoadingProvider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { RoleControllers } from "@/api/roleControllers";
import { UserControllers } from "@/api/userControllers";
import { usePermissionStore } from "@/store/usePermissionStore";

export default function DashboardProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  const { startLoading, stopLoading } = useLoading();
  const { setPermissions, setLoading, permissions, isSuperAdmin, isLoadingPermissions } = usePermissionStore();
  const [debugData, setDebugData] = useState<any>({});

  useEffect(() => {
    let isMounted = true;
    
    const hydrateAndCheckAuth = async () => {
      startLoading();
      setIsVerifying(true);
      const auth = localStorage.getItem("adminAuth");
      
      if (!auth && pathname !== "/admin") {
        router.replace("/admin");
        return;
      } else if (auth && pathname === "/admin") {
        router.replace("/dashboard");
        return;
      }

      if (auth && pathname !== "/admin") {
        try {
          if (isLoadingPermissions) {
            let roleId = null;
            let freshIsSuperAdmin = true;
            let freshPermissions: string[] = [];

            if (auth) {
              const usersRes = await UserControllers.getAllUsers();
              const subAdmins = usersRes.data?.data?.data?.users || usersRes.data?.data?.users || [];
              
              const foundUser = subAdmins.find((a: any) => a.email.toLowerCase() === auth.toLowerCase());
              
              if (foundUser) {
                roleId = foundUser.roleId || foundUser.permissionRole?.id || foundUser.role?.id;
                const fullName = foundUser.fullName || (foundUser.firstName ? `${foundUser.firstName} ${foundUser.lastName || ""}`.trim() : "");
                if (fullName) {
                  localStorage.setItem("userName", fullName);
                  // Trigger a custom event so the Header can pick up the change immediately without a full reload
                  window.dispatchEvent(new Event("userNameUpdated"));
                }
              }
            }

            if (roleId) {
              freshIsSuperAdmin = false;
              const roleRes = await RoleControllers.getRoleById(roleId);
              // Handle deep nesting from the backend (e.g. data.data.data)
              const rawData = roleRes.data?.data?.data || roleRes.data?.data || roleRes.data || {};
              const userRole = rawData.id ? rawData : (rawData.role || rawData);
              
              freshPermissions = userRole?.permissions?.map((p: any) => p.module) || [];
              
              localStorage.setItem("userPermissions", JSON.stringify(freshPermissions));
              localStorage.setItem("isSuperAdmin", "false");
            } else {
              localStorage.setItem("isSuperAdmin", "true");
              localStorage.setItem("userPermissions", "[]");
            }

            if (isMounted) {
              setPermissions(freshPermissions, freshIsSuperAdmin);
            }
            
            var currentIsSuperAdmin = freshIsSuperAdmin;
            var currentPermissions = freshPermissions;
          } else {
            var currentIsSuperAdmin = isSuperAdmin;
            var currentPermissions = permissions;
          }

          const getDefaultRedirectPath = (perms: string[]) => {
            const hasPagesAccess = perms.some((p: string) => p.startsWith("pages/"));
            if (hasPagesAccess) return "/pages";
            if (perms.length > 0) return `/${perms[0]}`;
            return "/";
          };

          if (currentIsSuperAdmin) {
            if (isMounted) setIsAuthenticated(true);
          } else {
            if (pathname.startsWith("/manage-roles") || pathname.startsWith("/manage-sub-admins") || pathname === "/dashboard") {
              router.replace(getDefaultRedirectPath(currentPermissions));
              return;
            }

            // Block exact /pages route if they have no pages permissions
            if (pathname === "/pages") {
              const hasPagesAccess = currentPermissions.some((p: string) => p.startsWith("pages/"));
              if (!hasPagesAccess) {
                router.replace(getDefaultRedirectPath(currentPermissions));
                return;
              }
            }

            let requiredPermission = "";
            if (pathname.startsWith("/pages/")) {
              requiredPermission = pathname.substring(1); 
            } else if (pathname.startsWith("/manage-")) {
              requiredPermission = pathname.substring(1);
            }

            if (requiredPermission && !currentPermissions.includes(requiredPermission)) {
              router.replace(getDefaultRedirectPath(currentPermissions));
              return;
            }

            if (isMounted) setIsAuthenticated(true);
          }
        } catch (error: any) {
          console.error("Failed to verify RBAC access", error);
          router.replace("/admin");
        } finally {
          if (isMounted) {
            setIsVerifying(false);
            stopLoading();
          }
        }
      } else {
        if (isMounted) {
          setIsVerifying(false);
          stopLoading();
        }
      }
    };
    
    hydrateAndCheckAuth();
    
    return () => {
      isMounted = false;
    };
  }, [router, pathname, startLoading, stopLoading, isLoadingPermissions, setPermissions, isSuperAdmin, permissions]);

  if (isVerifying || (!isAuthenticated && pathname !== "/admin")) {
    return null;
  }

  return <>{children}</>;
}
