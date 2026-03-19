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
import { useMediaQuery } from "@mui/material";
import MobileNavbar from "@/components/widgets/Mobile-Navbar";
import Modal from "@/components/widgets/Modal";
import AOS from "aos";
import "aos/dist/aos.css";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setDetails } = usePageData();
  const [initialLoading, setInitialLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    AOS.refresh();
  }, [pathname]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
    const timer = setTimeout(() => {
      setDetails(WEBSITE_DATA);
      setInitialLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setDetails]);

  const phone = useMediaQuery("(max-width:600px)");

  return (
    <html lang="en">
      <body>
        <Modal />
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
              src="/images/loading2.json"
              loop
              autoplay
              style={{ width: 250, height: 250 }}
            />
          </div>
        ) : (
          <LoadingProvider>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              {phone ? <MobileNavbar /> : <Navbar />}
              <div style={{ flex: 1 }}>{children}</div>
              <Footer />
            </div>
          </LoadingProvider>
        )}
      </body>
    </html>
  );
}
