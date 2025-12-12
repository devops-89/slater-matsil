"use client";

import Navbar from "@/components/widgets/navbar";
import "./globals.css";
import "swiper/css";
import Footer from "@/components/widgets/Footer";
import { usePageData } from "@/store/usePageData";
import { useEffect, useState } from "react";
import { WEBSITE_DATA } from "@/public/data/website-data";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import LoadingProvider from "@/components/providers/LoadingProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setDetails } = usePageData();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDetails(WEBSITE_DATA);
      setInitialLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [setDetails]);

  return (
    <html lang="en">
      <body>
        {initialLoading ? (
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
              src="/images/common/preloader.json"
              loop
              autoplay
              style={{ width: 250, height: 250 }}
            />
          </div>
        ) : (
          <LoadingProvider>
            <div>
              <Navbar />
              {children}
              <Footer />
            </div>
          </LoadingProvider>
        )}
      </body>
    </html>
  );
}
