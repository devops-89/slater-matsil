"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stage, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Box } from "@mui/material";

// Suppress WebGL-related console errors in sandboxed or headless environments
if (typeof window !== "undefined") {
  const originalError = console.error;
  console.error = (...args) => {
    if (
      args[0] &&
      typeof args[0] === "string" &&
      (args[0].includes("WebGLRenderer") ||
        args[0].includes("WebGL context") ||
        args[0].includes("Could not create a WebGL context") ||
        args[0].includes("Error creating WebGL context"))
    ) {
      return;
    }
    originalError(...args);
  };
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // Suppress logging of WebGL renderer errors to console
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

const EarthModel = () => {
  const { scene } = useGLTF("/images/home/earth/earth_ultra_pbr.glb");
  const earthRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.15;
    }
  });

  return <primitive object={scene} ref={earthRef} />;
};

const ThreeEarth = ({ height = "500px" }: { height?: any }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: height,
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      <ErrorBoundary>
        <Canvas
          shadows={false}
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ antialias: false, powerPreference: "default" }}
        >
          <Suspense fallback={null}>
            <Stage
              environment="city"
              intensity={1.5}
              shadows={false}
              adjustCamera
            >
              <EarthModel />
            </Stage>
            <OrbitControls enableZoom={false} makeDefault />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </Box>
  );
};

// Only preload if in a browser context to avoid SSR errors
if (typeof window !== "undefined") {
  useGLTF.preload("/images/home/earth/earth_ultra_pbr.glb");
}

export default ThreeEarth;
