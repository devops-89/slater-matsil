"use client";

import loadingData from "@/public/images/loading2.json";
import { usePathname, useSearchParams } from "next/navigation";
import { createContext, Suspense, useCallback, useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { CircularProgress } from "@mui/material";
import { COLORS } from "@/utils/enum";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false, loading: () => <CircularProgress sx={{ color: COLORS.PRIMARY_BLUE }} /> }
);

export const LoadingContext = createContext({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

function RouteChangeListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startLoading, stopLoading } = useLoading();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return; // Skip initial load since it's handled by provider

    let isCancelled = false;
    startLoading();

    const timer = setTimeout(() => {
      if (!isCancelled) stopLoading();
    }, 250);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
      stopLoading();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  return null;
}

export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loadingCount, setLoadingCount] = useState(0); // Start with 0 so server-rendered content is visible immediately

  const startLoading = useCallback(() => {
    setLoadingCount((c) => c + 1);
  }, []);
  
  const stopLoading = useCallback(() => {
    setLoadingCount((c) => Math.max(0, c - 1));
  }, []);

  // Initial load timer is removed because loadingCount starts at 0

  // Listen to global events
  useEffect(() => {
    const handleShowLoader = () => startLoading();
    const handleHideLoader = () => stopLoading();

    window.addEventListener("showLoader", handleShowLoader);
    window.addEventListener("hideLoader", handleHideLoader);

    return () => {
      window.removeEventListener("showLoader", handleShowLoader);
      window.removeEventListener("hideLoader", handleHideLoader);
    };
  }, [startLoading, stopLoading]);

  const isLoading = loadingCount > 0;

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      <Suspense fallback={null}>
        <RouteChangeListener />
      </Suspense>
      {isLoading && (
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
      )}
      <div style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.3s ease-in-out" }}>
        {children}
      </div>
    </LoadingContext.Provider>
  );
}
