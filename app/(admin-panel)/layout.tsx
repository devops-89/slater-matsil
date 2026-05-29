"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Box } from "@mui/material";
import { COLORS } from "@/utils/enum";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import loadingData from "@/public/images/loading2.json";

export default function DashboardProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (!auth && pathname !== "/admin") {
      router.replace("/admin");
    } else if (auth && pathname === "/admin") {
      router.replace("/dashboard");
    } else {
      setIsAuthenticated(true);
    }
  }, [router, pathname]);

  if (!isAuthenticated) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          zIndex: 9999,
        }}
      >
        <DotLottieReact
          data={loadingData}
          loop
          autoplay
          style={{ width: 250, height: 250 }}
        />
      </div>
    );
  }

  return <>{children}</>;
}
