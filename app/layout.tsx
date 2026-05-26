"use client";

import LoadingProvider from "@/components/providers/LoadingProvider";
import { NotificationProvider } from "@/components/providers/NotificationProvider";
import CookieConsent from "@/components/widgets/CookieConsent";
import Footer from "@/components/widgets/Footer";
import MobileNavbar from "@/components/widgets/Mobile-Navbar";
import Modal from "@/components/widgets/Modal";
import Navbar from "@/components/widgets/navbar";
import { WEBSITE_DATA } from "@/public/data/website-data";
import { usePageData } from "@/store/usePageData";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useMediaQuery } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "swiper/css";
import "./globals.css";

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
    setDetails(WEBSITE_DATA);
    setInitialLoading(false);
  }, [setDetails]);

  const phone = useMediaQuery("(max-width:600px)");

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
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
            <NotificationProvider>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                  }}
                >
                  {!(pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/pages')) && (phone ? <MobileNavbar /> : <Navbar />)}
                  <div style={{ flex: 1 }}>{children}</div>
                  {!(pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/pages')) && <Footer />}
                  {!(pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/pages')) && <CookieConsent />}
                </div>
            </NotificationProvider>
          </LoadingProvider>
        )}
      </body>
    </html>
  );
}
