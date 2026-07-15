import { usePermissionStore } from "@/store/usePermissionStore";

export const usePermissions = () => {
  const { permissions, isSuperAdmin, isLoadingPermissions } = usePermissionStore();

  const hasAccess = (module: string) => {
    if (isSuperAdmin) return true;
    return permissions.includes(module);
  };

  const hasPagesAccess = () => {
    if (isSuperAdmin) return true;
    return permissions.some((p) => p.startsWith("pages/"));
  };

  return { hasAccess, hasPagesAccess, isSuperAdmin, isLoadingPermissions, permissions };
};
