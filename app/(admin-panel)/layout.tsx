"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Box } from "@mui/material";
import { COLORS } from "@/utils/enum";
import { useLoading } from "@/components/providers/LoadingProvider";

export default function DashboardProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading();
    const auth = localStorage.getItem("adminAuth");
    if (!auth && pathname !== "/admin") {
      router.replace("/admin");
    } else if (auth && pathname === "/admin") {
      router.replace("/dashboard");
    } else {
      setIsAuthenticated(true);
      stopLoading();
    }
  }, [router, pathname, startLoading, stopLoading]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
