import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODES: [number, number, number][] = [
  [-3.2, 1.85, -1.2], // React Atom
  [-1.3, 2.25, -1.4], // TypeScript
  [-2.1, 0.85, -1.3], // Mid-upper junction
  [-3.4, -0.4, -1.2], // Python
  [-1.9, -0.6, -1.1], // Mid-lower junction
  [-0.85, -1.65, -1.0], // Custom Shield
  [-2.8, -1.9, -1.3], // Neural Core
  [-1.5, -2.4, -1.5], // Code
];

const EDGES: [number, number][] = [
  [0, 1], // React to TS
  [0, 2], // React to mid-upper
  [1, 2], // TS to mid-upper
  [2, 3], // mid-upper to Python
  [2, 4], // mid-upper to mid-lower
  [3, 4], // Python to mid-lower
  [3, 6], // Python to Neural Core
  [4, 5], // mid-lower to Custom Shield
  [4, 6], // mid-lower to Neural Core
  [5, 7], // Custom Shield to Code
  [6, 7], // Neural Core to Code
];

export function NeuralLinks() {
  const materialRef = useRef<THREE.LineBasicMaterial>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(EDGES.length * 2 * 3);
    EDGES.forEach(([a, b], i) => {
      const [ax, ay, az] = NODES[a];
      const [bx, by, bz] = NODES[b];
      arr.set([ax, ay, az, bx, by, bz], i * 6);
    });
    return arr;
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.opacity =
        0.12 + Math.sin(state.clock.getElapsedTime() * 0.6) * 0.06;
    }
  });

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial ref={materialRef} color="#2563EB" transparent opacity={0.16} />
    </lineSegments>
  );
}
