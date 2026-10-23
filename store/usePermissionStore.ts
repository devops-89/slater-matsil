import { create } from "zustand";

interface PermissionStoreData {
  permissions: string[];
  isSuperAdmin: boolean;
  isLoadingPermissions: boolean;
  setPermissions: (permissions: string[], isSuperAdmin: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  clearPermissions: () => void;
}

export const usePermissionStore = create<PermissionStoreData>((set) => ({
  permissions: [],
  isSuperAdmin: false,
  isLoadingPermissions: true,
  setPermissions: (permissions, isSuperAdmin) => set({ permissions, isSuperAdmin, isLoadingPermissions: false }),
  setLoading: (isLoadingPermissions) => set({ isLoadingPermissions }),
  clearPermissions: () => set({ permissions: [], isSuperAdmin: false, isLoadingPermissions: true }),
}));
