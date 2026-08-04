"use client";

import React, { ReactNode } from "react";
import { useInView } from "react-intersection-observer";
import { Box } from "@mui/material";

interface LazyLoadProps {
  children: ReactNode;
  threshold?: number;
  triggerOnce?: boolean;
  minHeight?: number | string;
}

const LazyLoad: React.FC<LazyLoadProps> = ({
  children,
  threshold = 0,
  triggerOnce = true,
  minHeight = "200px",
}) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce,
    // Using 0px margin ensures it strictly waits for the user to scroll before loading, 
    // freeing up the main thread on initial load to prevent black screen & blocked LCP.
    rootMargin: "0px 0px 0px 0px", 
  });

  return (
    <Box ref={ref} sx={{ minHeight, width: "100%" }}>
      {inView ? children : null}
    </Box>
  );
};

export default LazyLoad;
