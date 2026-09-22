"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import { OrbitControls, Stage, useGLTF, Html, useProgress } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import { Public } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";

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

import { clientLocations } from "../../public/data/client-locations";

const latLongToVector3 = (lat: number, lng: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
};

const Pin = ({ position, pinSize, city }: { position: THREE.Vector3, pinSize: number, city: string }) => {
  const [hovered, setHovered] = useState(false);
  
  React.useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    return () => { document.body.style.cursor = 'auto'; }
  }, [hovered]);

  return (
    <mesh 
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
    >
      <sphereGeometry args={[pinSize, 16, 16]} />
      <meshBasicMaterial color={hovered ? "#ff80ab" : "#ff4081"} />
      {hovered && (
        <Html zIndexRange={[100, 0]} style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '14px',
            whiteSpace: 'nowrap',
            transform: 'translate3d(-50%, -150%, 0)'
          }}>
            {city}
          </div>
        </Html>
      )}
    </mesh>
  );
};

const CanvasLoader = () => {
  const { progress } = useProgress();
  const roundedProgress = Math.min(100, Math.max(0, Math.round(progress || 0)));

  return (
    <Html center zIndexRange={[100, 0]}>
      <style>{`
        @keyframes globe-pulse {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }
      `}</style>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          padding: "24px 36px",
          borderRadius: "24px",
          boxShadow: "0px 16px 40px rgba(0, 32, 64, 0.12)",
          border: "1.5px solid rgba(0, 177, 176, 0.25)",
          textAlign: "center",
          minWidth: "230px",
          whiteSpace: "nowrap",
        }}
      >
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            variant={roundedProgress > 0 ? "determinate" : "indeterminate"}
            value={roundedProgress > 0 ? roundedProgress : 25}
            size={64}
            thickness={4}
            sx={{ color: COLORS.PRIMARY_GREEN }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Public sx={{ color: COLORS.PRIMARY_BLUE, fontSize: 28, animation: "globe-pulse 2s ease-in-out infinite" }} />
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 700,
              fontSize: 16,
              color: COLORS.PRIMARY_BLUE,
            }}
          >
            Loading Globe
          </Typography>
          <Typography
            sx={{
              fontFamily: adelle.style.fontFamily,
              fontWeight: 700,
              fontSize: 14,
              color: COLORS.PRIMARY_GREEN,
              mt: 0.5,
            }}
          >
            {roundedProgress}%
          </Typography>
        </Box>
      </Box>
    </Html>
  );
};

const EarthModel = () => {
  const { scene } = useGLTF("/images/home/earth/earth_ultra_pbr.glb");
  const earthRef = useRef<THREE.Group>(null);
  
  // Calculate bounding box and radius dynamically based on the actual earth model scale
  const { radius, pinSize } = React.useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    // Since the earth is a sphere, the max dimension / 2 is the radius
    const r = Math.max(size.x, size.y, size.z) / 2;
    // Scale the pins proportionally to the earth's radius (you can adjust 0.015 if they are too small/large)
    return { radius: r, pinSize: r * 0.015 };
  }, [scene]);

  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={earthRef}>
      <primitive object={scene} />
      {clientLocations.map((loc, i) => {
        const position = latLongToVector3(loc.lat, loc.lng, radius * 1.01); // Multiply by 1.01 to ensure pins sit just above the surface
        return (
          <Pin key={i} position={position} pinSize={pinSize} city={loc.name} />
        );
      })}
    </group>
  );
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
          <Suspense fallback={<CanvasLoader />}>
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

export default ThreeEarth;
