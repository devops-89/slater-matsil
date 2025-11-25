"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";
import { OrbitControls } from "three-stdlib";

export default function Globe3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 4);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Glow Effect
    const glowGeometry = new THREE.SphereGeometry(1.55, 64, 64);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x4fd4ff,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
    });
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);

    // Load GLB Model
    let model: THREE.Group | null = null;
    const loader = new GLTFLoader();
    loader.load("/common/globe.glb", (gltf) => {
      model = gltf.scene;
      model.scale.set(1.4, 1.4, 1.4);
      scene.add(model);
    });

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 1.0));
    const directional = new THREE.DirectionalLight(0xffffff, 1);
    directional.position.set(5, 5, 5);
    scene.add(directional);

    // Mouse Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 3;
    controls.maxDistance = 6;

    let animationId: number;
    const loop = () => {
      if (model) {
        model.rotation.y += 0.003;
      }
      controls.update();
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(loop);
    };
    loop();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      controls.dispose();
      renderer.dispose();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "500px" }} />;
}
