import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMouseParallax } from "../hooks/useMouseParallax";

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

function FloatingUniverse({ isMobile }: { isMobile: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useMouseParallax();
  const count = isMobile ? 90 : 220;

  // Track scroll position smoothly
  const scrollRef = useRef(0);
  useEffect(() => {
    function onScroll() {
      scrollRef.current = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const palette = [
      new THREE.Color("#8B5CF6"), // Electric violet
      new THREE.Color("#38BDF8"), // Sky blue
      new THREE.Color("#2DD4BF"), // Teal
      new THREE.Color("#6366F1"), // Indigo
      new THREE.Color("#A855F7"), // Purple
    ];

    for (let i = 0; i < count; i++) {
      // Wide dispersion across full viewport depth
      const r = 9 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      pos[i * 3 + 2] = r * Math.cos(phi) * 0.8 - 1.5;

      const chosenColor = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Mouse interaction parallax
      const targetY = pointer.current.x * 0.25;
      const targetX = -pointer.current.y * 0.15;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetY + time * 0.015,
        0.04
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetX + (scrollRef.current - 0.5) * 0.4,
        0.04
      );

      // Scroll-reactive elevation drift
      const targetPosY = (scrollRef.current - 0.5) * -2.5 + Math.sin(time * 0.4) * 0.08;
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetPosY,
        0.03
      );
    }

    if (pointsRef.current) {
      // Gentle counter-rotation
      pointsRef.current.rotation.z = time * 0.008;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.038 : 0.045}
          vertexColors
          transparent
          opacity={0.52}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export function GlobalParticles() {
  const isMobile = useIsMobile();

  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden">
      <Canvas
        dpr={[1, isMobile ? 1.2 : 1.8]}
        camera={{
          position: [0, 0, isMobile ? 8.5 : 7.5],
          fov: isMobile ? 50 : 45,
        }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ pointerEvents: "none", width: "100vw", height: "100vh" }}
      >
        <ambientLight intensity={1.0} />
        <Suspense fallback={null}>
          <FloatingUniverse isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
