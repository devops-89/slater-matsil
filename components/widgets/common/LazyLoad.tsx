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
  const { ref, inView, entry } = useInView({
    threshold: 0,
    triggerOnce,
    // Using 0px margin ensures it strictly waits for the user to scroll before loading, 
    // freeing up the main thread on initial load to prevent black screen & blocked LCP.
    rootMargin: "0px 0px 0px 0px", 
  });

  React.useEffect(() => {
    const targetNode = entry?.target as HTMLElement | undefined;
    if (!inView || !targetNode) return;
    
    // Function to add animation class to newly loaded elements
    const animateElements = () => {
      if (targetNode) {
        const elements = targetNode.querySelectorAll('[data-aos]:not(.aos-animate)');
        elements.forEach((el) => {
          // Small delay to allow CSS to register initial state before transitioning
          setTimeout(() => el.classList.add('aos-animate'), 50);
        });
      }
    };
    
    // Try once immediately in case they are already rendered
    animateElements();
    
    // Set up observer for dynamically loaded Next.js chunks
    const observer = new MutationObserver(animateElements);
    observer.observe(targetNode, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, [inView, entry]);

  return (
    <Box ref={ref} sx={{ minHeight, width: "100%" }}>
      {inView ? children : null}
    </Box>
  );
};

export default LazyLoad;
