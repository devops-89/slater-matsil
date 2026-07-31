"use client";

import loadingData from "@/public/images/loading2.json";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { usePathname, useSearchParams } from "next/navigation";
import { createContext, Suspense, useCallback, useContext, useEffect, useState } from "react";

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
  }, [pathname, searchParams, startLoading, stopLoading, isMounted]);

  return null;
}

export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loadingCount, setLoadingCount] = useState(1);

  const startLoading = useCallback(() => {
    setLoadingCount((c) => c + 1);
  }, []);
  
  const stopLoading = useCallback(() => {
    setLoadingCount((c) => Math.max(0, c - 1));
  }, []);

  // Handle initial page load
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      stopLoading();
    }, 1000);
    return () => clearTimeout(initialTimer);
  }, [stopLoading]);

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
