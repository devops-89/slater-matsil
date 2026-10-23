"use client";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import HeroSection3 from "./HeroSection3";
import LazyLoad from "../../widgets/common/LazyLoad";

// Wrap dynamic imports with webpack magic comments to completely stop Next.js from preloading their JS chunks over the network
const DynamicAbout = dynamic(() => import(/* webpackPreload: false */ /* webpackPrefetch: false */ "./AboutSection"), { ssr: false });
const DynamicMetrics = dynamic(() => import(/* webpackPreload: false */ /* webpackPrefetch: false */ "./MetricsSection"), { ssr: false });
const DynamicInsights = dynamic(() => import(/* webpackPreload: false */ /* webpackPrefetch: false */ "../../widgets/Insights-section"), { ssr: false });
const DynamicServiceAreas = dynamic(() => import(/* webpackPreload: false */ /* webpackPrefetch: false */ "../../widgets/Service-Areas"), { ssr: false });
const DynamicWhoWeServe = dynamic(() => import(/* webpackPreload: false */ /* webpackPrefetch: false */ "./Who-We-Serve"), { ssr: false });
const DynamicContact = dynamic(() => import(/* webpackPreload: false */ /* webpackPrefetch: false */ "./ContactSection"), { ssr: false });

const HomeLayout = ({ apiData }: { apiData?: any }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <HeroSection3 apiData={apiData} />
      
      {/* Load below fold sections dynamically when scrolled into view */}
      <LazyLoad minHeight="400px">
        <DynamicAbout />
      </LazyLoad>

      <LazyLoad minHeight="400px">
        <DynamicMetrics />
      </LazyLoad>
      
      <LazyLoad minHeight="400px">
        <DynamicServiceAreas limit={6} />
      </LazyLoad>
      
      <LazyLoad minHeight="600px">
        <DynamicWhoWeServe />
      </LazyLoad>
      
      <LazyLoad minHeight="400px">
        <DynamicInsights />
      </LazyLoad>
      
      <LazyLoad minHeight="300px">
        <DynamicContact />
      </LazyLoad>
    </Box>
  );
};

export default HomeLayout;
