import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ParticleField } from "./ParticleField";
import { useMouseParallax } from "../hooks/useMouseParallax";

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useMouseParallax();

  useFrame((state) => {
    if (!group.current) return;
    const targetY = pointer.current.x * 0.14;
    const targetX = -pointer.current.y * 0.08;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetY,
      0.035
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetX,
      0.035
    );
    // Smooth breathing bob
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      Math.sin(state.clock.getElapsedTime() * 0.3) * 0.04,
      0.02
    );
  });

  return <group ref={group}>{children}</group>;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

export function HeroScene() {
  const isMobile = useIsMobile();

  return (
    <Canvas
      dpr={[1, isMobile ? 1.3 : 2]}
      camera={{
        position: [0, 0, isMobile ? 8.0 : 7.0],
        fov: isMobile ? 48 : 42,
      }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={1.2} />

      <Suspense fallback={null}>
        <Rig>
          <ParticleField count={isMobile ? 70 : 160} />
        </Rig>
      </Suspense>
    </Canvas>
  );
}
