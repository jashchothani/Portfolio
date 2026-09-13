import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

type Geometry = "icosahedron" | "torus" | "sphere" | "octahedron";

interface FloatingGlassProps {
  position: [number, number, number];
  geometry: Geometry;
  scale?: number;
  color: string;
  speed?: number;
  glass?: boolean;
  rotationFactor?: number;
}

export function FloatingGlass({
  position,
  geometry,
  scale = 1,
  color,
  speed = 1,
  glass = true,
  rotationFactor = 1,
}: FloatingGlassProps) {
  const ref = useRef<THREE.Mesh>(null);
  const offset = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed + offset.current;
    ref.current.position.y = position[1] + Math.sin(t) * 0.35;
    ref.current.rotation.x = t * 0.15 * rotationFactor;
    ref.current.rotation.y = t * 0.22 * rotationFactor;
  });

  const geo =
    geometry === "icosahedron" ? (
      <icosahedronGeometry args={[1, 1]} />
    ) : geometry === "torus" ? (
      <torusGeometry args={[0.85, 0.32, 24, 96]} />
    ) : geometry === "octahedron" ? (
      <octahedronGeometry args={[1, 0]} />
    ) : (
      <sphereGeometry args={[1, 48, 48]} />
    );

  return (
    <mesh ref={ref} position={position} scale={scale} castShadow receiveShadow>
      {geo}
      {glass ? (
        <MeshTransmissionMaterial
          color={color}
          thickness={0.6}
          roughness={0.06}
          transmission={1}
          ior={1.3}
          chromaticAberration={0.04}
          anisotropy={0.2}
          distortion={0.15}
          distortionScale={0.2}
          temporalDistortion={0.1}
          clearcoat={1}
          attenuationDistance={1.5}
          attenuationColor={color}
        />
      ) : (
        <MeshDistortMaterial
          color={color}
          roughness={0.15}
          metalness={0.1}
          distort={0.25}
          speed={1.2}
          transparent
          opacity={0.9}
        />
      )}
    </mesh>
  );
}
