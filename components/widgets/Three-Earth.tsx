"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stage, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Box } from "@mui/material";

const EarthModel = () => {
  // Use the verified PBR-converted model
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
      <Canvas shadows camera={{ position: [0, 0, 6], fov: 45 }}>
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
    </Box>
  );
};

useGLTF.preload("/images/home/earth/earth_ultra_pbr.glb");

export default ThreeEarth;
