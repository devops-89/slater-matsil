"use client";

import LoadingProvider from "@/components/providers/LoadingProvider";
import { NotificationProvider } from "@/components/providers/NotificationProvider";
import CookieConsent from "@/components/widgets/CookieConsent";
import Footer from "@/components/widgets/Footer";
import MobileNavbar from "@/components/widgets/Mobile-Navbar";
import Modal from "@/components/widgets/Modal";
import Navbar from "@/components/widgets/navbar";
import { WEBSITE_DATA } from "@/public/data/website-data";
import loadingData from "@/public/images/loading2.json";
import { usePageData } from "@/store/usePageData";
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
    let isMounted = true;
    
    const initializeData = async () => {
      try {
        setInitialLoading(true);
        // Add artificial delay for AOS + loader as originally implemented
        await new Promise(resolve => setTimeout(resolve, 100));
        
        AOS.init({
          duration: 800,
          once: true,
        });
        AOS.refresh();

        // Skip fetching homepage data if we are on an admin/dashboard route
        const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/pages') || pathname.startsWith('/manage-');

        if (!isAdminRoute) {
          if (isMounted) setDetails(WEBSITE_DATA as any);
        } else {
          setDetails(WEBSITE_DATA as any);
        }
      } catch (error) {
        console.error("Failed to initialize layout", error);
        setDetails(WEBSITE_DATA as any);
      } finally {
        if (isMounted) {
          setInitialLoading(false);
        }
      }
    };

    initializeData();

    return () => {
      isMounted = false;
    };
  }, [setDetails]);

  // Live Preview listener for Admin Panel iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Allow messages from localhost
      if (event.origin.startsWith("http://localhost")) {
        if (event.data && event.data.type === "UPDATE_PREVIEW") {
          setDetails(event.data.payload);
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [setDetails]);

  const phone = useMediaQuery("(max-width:600px)");

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Modal />
        <LoadingProvider>
          <NotificationProvider>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              {!(pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/pages') || pathname.startsWith('/manage-')) && (phone ? <MobileNavbar /> : <Navbar />)}
              <div style={{ flex: 1 }}>{children}</div>
              {!(pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/pages') || pathname.startsWith('/manage-')) && <Footer />}
              {!(pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/pages') || pathname.startsWith('/manage-')) && <CookieConsent />}
            </div>
          </NotificationProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
