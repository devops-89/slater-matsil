"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import loadingData from "@/public/images/loading2.json";
import { createContext, useContext, useCallback } from "react";

export const LoadingContext = createContext({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

function LoadingProviderContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loadingCount, setLoadingCount] = useState(0);

  const startLoading = useCallback(() => setLoadingCount((c) => c + 1), []);
  const stopLoading = useCallback(
    () => setLoadingCount((c) => Math.max(0, c - 1)),
    [],
  );

  useEffect(() => {
    let isCancelled = false;
    startLoading();

    const timer = setTimeout(() => {
      if (!isCancelled) stopLoading();
    }, 500);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
      stopLoading();
    };
  }, [pathname, searchParams, startLoading, stopLoading]);

  const isLoading = loadingCount > 0;

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
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
      {children}
    </LoadingContext.Provider>
  );
}

export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <LoadingProviderContent>{children}</LoadingProviderContent>
    </Suspense>
  );
}
