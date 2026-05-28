"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense, createContext, useContext } from "react";

interface LoadingContextType {
  setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
  setLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

function LoadingProviderContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <LoadingContext.Provider value={{ setLoading }}>
      {loading && (
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
            src="/images/loading2.json"
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
