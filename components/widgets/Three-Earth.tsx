"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import {
  OrbitControls,
  Stage,
  useGLTF,
  Html,
  useProgress,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useRef, useState, useCallback, useMemo } from "react";
import * as THREE from "three";
import { Public } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { useInView } from "react-intersection-observer";
import { clientLocations } from "../../public/data/client-locations";

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

// Accurately maps geographic latitude (-90 to +90) and longitude (-180 to +180)
// to 3D Cartesian coordinates on the earth model.
const latLongToVector3 = (lat: number, lng: number, radius: number) => {
  const latRad = lat * (Math.PI / 180);
  const theta = (lng + 90) * (Math.PI / 180);

  const x = radius * Math.cos(latRad) * Math.sin(theta);
  const y = radius * Math.sin(latRad);
  const z = radius * Math.cos(latRad) * Math.cos(theta);

  return new THREE.Vector3(x, y, z);
};

const Pin = ({
  position,
  pinSize,
  city,
  onHoverChange,
}: {
  position: THREE.Vector3;
  pinSize: number;
  city: string;
  onHoverChange?: (hovered: boolean) => void;
}) => {
  const [hovered, setHovered] = useState(false);

  React.useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setHovered(true);
    onHoverChange?.(true);
  };

  const handlePointerOut = (e: any) => {
    e.stopPropagation();
    setHovered(false);
    onHoverChange?.(false);
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    setHovered((prev) => {
      const next = !prev;
      onHoverChange?.(next);
      return next;
    });
  };

  return (
    <group position={position}>
      {/* Invisible enlarged hit target for easy hover on laptop and tapping on mobile */}
      <mesh
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <sphereGeometry args={[pinSize * 3, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Visual pin sphere */}
      <mesh
        scale={hovered ? [1.4, 1.4, 1.4] : [1, 1, 1]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[pinSize, 16, 16]} />
        <meshBasicMaterial color={hovered ? "#ff80ab" : "#ff4081"} />
      </mesh>

      {/* Subtle glowing halo when hovered */}
      {hovered && (
        <mesh>
          <sphereGeometry args={[pinSize * 1.8, 16, 16]} />
          <meshBasicMaterial color="#ff4081" transparent opacity={0.35} />
        </mesh>
      )}

      {/* Location Tooltip popup on hover */}
      {hovered && (
        <Html zIndexRange={[100, 0]} style={{ pointerEvents: "none" }}>
          <div
            style={{
              background: "rgba(10, 25, 47, 0.94)",
              color: "#ffffff",
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "var(--font-trade-gothic), sans-serif",
              letterSpacing: "0.2px",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.4)",
              border: "1px solid rgba(0, 177, 176, 0.6)",
              transform: "translate3d(-50%, -140%, 0)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#00b1b0",
                display: "inline-block",
                boxShadow: "0 0 6px #00b1b0",
              }}
            />
            {city}
          </div>
        </Html>
      )}
    </group>
  );
};

const CanvasLoader = () => {
  const { progress } = useProgress();
  const roundedProgress = Math.min(100, Math.max(0, Math.round(progress || 0)));

  return (
    <Html center zIndexRange={[100, 0]}>
      <style>{`
        @keyframes globe-pulse {
          0% { transform: scale(0.92); opacity: 0.75; }
          50% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(0.92); opacity: 0.75; }
        }
      `}</style>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          background: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(12px)",
          padding: "24px 36px",
          borderRadius: "24px",
          boxShadow: "0px 16px 40px rgba(0, 32, 64, 0.12)",
          border: "1.5px solid rgba(0, 177, 176, 0.25)",
          textAlign: "center",
          minWidth: "220px",
          whiteSpace: "nowrap",
          userSelect: "none",
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
            <Public
              sx={{
                color: COLORS.PRIMARY_BLUE,
                fontSize: 28,
                animation: "globe-pulse 2s ease-in-out infinite",
              }}
            />
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 700,
              fontSize: 16,
              color: COLORS.PRIMARY_BLUE,
              letterSpacing: "0.2px",
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

export type GlobeFocusRegion = "texas" | "uk";

export const GLOBE_FOCUS_ROTATIONS: Record<GlobeFocusRegion, [number, number, number]> = {
  // Centers Texas (Dallas / Houston / Austin, ~97° W, 32° N) directly in front of the viewer
  // Texas is Slater Matsil's home hub and has the most pins by far (20 pins in Texas, 48 total in US).
  texas: [0.22, 0.12, 0],
  // Centers UK & Western Europe (~0° W, 51.5° N) directly in front of the viewer
  uk: [0.22, -1.57, 0],
};

const EarthModel = ({
  initialFocus = "texas",
  inView = true,
}: {
  initialFocus?: GlobeFocusRegion;
  inView?: boolean;
}) => {
  const { scene } = useGLTF("/images/home/earth/earth_ultra_pbr.glb");
  const earthRef = useRef<THREE.Group>(null);
  const [hoveredCount, setHoveredCount] = useState(0);

  // Calculate bounding box and radius dynamically based on the actual earth model scale
  const { radius, pinSize } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const r = Math.max(size.x, size.y, size.z) / 2;
    return { radius: r, pinSize: r * 0.016 };
  }, [scene]);

  const startRotation = useMemo(
    () => GLOBE_FOCUS_ROTATIONS[initialFocus] || GLOBE_FOCUS_ROTATIONS.texas,
    [initialFocus]
  );

  // Gentle, smooth rotation speed
  // Pauses automatically when user is hovering or inspecting any pin,
  // and only rotates when visible in the viewport so it doesn't spin away off-screen.
  useFrame((state, delta) => {
    if (earthRef.current && hoveredCount === 0 && inView) {
      earthRef.current.rotation.y += delta * 0.035;
    }
  });

  const handleHoverChange = useCallback((isHovered: boolean) => {
    setHoveredCount((prev) => (isHovered ? prev + 1 : Math.max(0, prev - 1)));
  }, []);

  return (
    <group ref={earthRef} rotation={startRotation}>
      <primitive object={scene} />
      {clientLocations.map((loc, i) => {
        const position = latLongToVector3(loc.lat, loc.lng, radius * 1.01);
        return (
          <Pin
            key={i}
            position={position}
            pinSize={pinSize}
            city={loc.name}
            onHoverChange={handleHoverChange}
          />
        );
      })}
    </group>
  );
};

export interface ThreeEarthProps {
  height?: any;
  initialFocus?: GlobeFocusRegion;
}

const ThreeEarth = ({
  height = "500px",
  initialFocus = "texas",
}: ThreeEarthProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  return (
    <Box
      ref={ref}
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
              <EarthModel initialFocus={initialFocus} inView={inView} />
            </Stage>
            <OrbitControls enableZoom={false} makeDefault />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </Box>
  );
};

useGLTF.preload("/images/home/earth/earth_ultra_pbr.glb");

export default ThreeEarth;
