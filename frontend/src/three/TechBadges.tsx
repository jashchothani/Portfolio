import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// ─────────────────────────────────────────────────────────────────────────────
// High-Res Circular Holographic Badge Textures (512x512)
// Pure circular medallions with transparent backgrounds — NO SQUARE BOXES!
// ─────────────────────────────────────────────────────────────────────────────

function drawCircularTechCanvas(type: 'typescript' | 'python' | 'code'): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, 512, 512);

  const cx = 256;
  const cy = 256;
  const r = 210;

  function drawBaseCircle(rimColor: string, grad1: string, grad2: string) {
    ctx.save();
    // Circular clip path
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.closePath();

    // Subtle drop glow
    ctx.shadowColor = rimColor;
    ctx.shadowBlur = 32;

    // Glass gradient fill
    const grad = ctx.createRadialGradient(cx, cy - 50, 20, cx, cy, r);
    grad.addColorStop(0, grad1);
    grad.addColorStop(1, grad2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Specular border ring
    ctx.shadowColor = 'transparent';
    ctx.lineWidth = 8;
    ctx.strokeStyle = rimColor;
    ctx.stroke();

    // Top crescent glass glare
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r - 4, 0, Math.PI * 2);
    ctx.clip();
    const glare = ctx.createLinearGradient(cx, cy - r, cx, cy + 40);
    glare.addColorStop(0, 'rgba(255, 255, 255, 0.75)');
    glare.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
    glare.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = glare;
    ctx.beginPath();
    ctx.ellipse(cx, cy - 70, r - 20, 95, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }

  if (type === 'typescript') {
    // ── TypeScript Circular 3D Medallion ──
    drawBaseCircle('#38BDF8', 'rgba(37, 99, 235, 0.95)', 'rgba(30, 58, 138, 0.95)');

    ctx.save();
    ctx.shadowColor = 'rgba(56, 189, 248, 0.85)';
    ctx.shadowBlur = 24;
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 200px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('TS', cx, cy + 10);

    // Subtle inner cyan highlight dot
    ctx.fillStyle = '#38BDF8';
    ctx.beginPath();
    ctx.arc(cx + 100, cy - 100, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  } else if (type === 'python') {
    // ── Python Circular 3D Medallion ──
    drawBaseCircle('#FACC15', 'rgba(15, 23, 42, 0.92)', 'rgba(2, 6, 23, 0.95)');

    ctx.save();
    ctx.translate(cx, cy);

    // Blue snake (top)
    ctx.save();
    ctx.shadowColor = 'rgba(56, 189, 248, 0.85)';
    ctx.shadowBlur = 22;
    const blueGrad = ctx.createLinearGradient(-70, -100, 70, 30);
    blueGrad.addColorStop(0, '#38BDF8');
    blueGrad.addColorStop(1, '#0284C7');
    ctx.fillStyle = blueGrad;
    ctx.beginPath();
    ctx.arc(-24, -38, 60, Math.PI * 0.72, Math.PI * 1.8);
    ctx.lineTo(32, -102);
    ctx.arc(32, -38, 60, Math.PI * 1.5, Math.PI * 0.28);
    ctx.closePath();
    ctx.fill();

    // Eye
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'transparent';
    ctx.beginPath();
    ctx.arc(-24, -70, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Gold snake (bottom)
    ctx.save();
    ctx.shadowColor = 'rgba(250, 204, 21, 0.85)';
    ctx.shadowBlur = 22;
    const goldGrad = ctx.createLinearGradient(-70, -30, 70, 100);
    goldGrad.addColorStop(0, '#FACC15');
    goldGrad.addColorStop(1, '#CA8A04');
    ctx.fillStyle = goldGrad;
    ctx.beginPath();
    ctx.arc(24, 38, 60, Math.PI * 1.72, Math.PI * 0.8);
    ctx.lineTo(-32, 102);
    ctx.arc(-32, 38, 60, Math.PI * 0.5, Math.PI * 1.28);
    ctx.closePath();
    ctx.fill();

    // Eye
    ctx.fillStyle = '#0F172A';
    ctx.shadowColor = 'transparent';
    ctx.beginPath();
    ctx.arc(24, 70, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  } else if (type === 'code') {
    // ── Code </> Circular 3D Medallion ──
    drawBaseCircle('#38BDF8', 'rgba(15, 23, 42, 0.94)', 'rgba(3, 105, 161, 0.9)');

    ctx.save();
    ctx.shadowColor = 'rgba(56, 189, 248, 0.95)';
    ctx.shadowBlur = 28;
    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 160px "Fira Code", "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('</>', cx, cy + 10);
    ctx.restore();
  }

  return canvas;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. React 3D Atom: The Spinning Centerpiece Beside His Name
// ─────────────────────────────────────────────────────────────────────────────

interface ReactAtom3DProps {
  position: [number, number, number];
  scale?: number;
  speed?: number;
}

export function ReactAtom3D({ position, scale = 1, speed = 1 }: ReactAtom3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const electron1Ref = useRef<THREE.Mesh>(null);
  const electron2Ref = useRef<THREE.Mesh>(null);
  const electron3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.55;
      groupRef.current.rotation.x = Math.sin(t * 0.35) * 0.18;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.7;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -t * 0.65;
    if (ring3Ref.current) ring3Ref.current.rotation.x = t * 0.75;

    // Glowing core pulse
    if (coreRef.current) {
      const s = 1 + Math.sin(t * 3.8) * 0.12;
      coreRef.current.scale.set(s, s, s);
    }

    // 3 live orbiting electron particles
    if (electron1Ref.current) {
      const a = t * 3.4;
      electron1Ref.current.position.x = Math.cos(a) * 0.95;
      electron1Ref.current.position.y = Math.sin(a) * 0.48;
      electron1Ref.current.position.z = Math.sin(a) * 0.82;
    }
    if (electron2Ref.current) {
      const a = -t * 3.0 + 1.8;
      electron2Ref.current.position.x = Math.cos(a) * 0.48;
      electron2Ref.current.position.y = Math.sin(a) * 0.95;
      electron2Ref.current.position.z = Math.cos(a) * 0.82;
    }
    if (electron3Ref.current) {
      const a = t * 2.8 + 3.2;
      electron3Ref.current.position.x = Math.sin(a) * 0.82;
      electron3Ref.current.position.y = Math.cos(a) * 0.82;
      electron3Ref.current.position.z = Math.sin(a) * 0.48;
    }
  });

  return (
    <Float speed={2.5 * speed} rotationIntensity={0.35} floatIntensity={0.7}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Ring 1 (60 deg tilt) */}
        <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.95, 0.034, 24, 128]} />
          <meshStandardMaterial
            color="#00D8FF"
            emissive="#00D8FF"
            emissiveIntensity={2.4}
            roughness={0.08}
            metalness={0.9}
          />
        </mesh>

        {/* Ring 2 (-60 deg tilt) */}
        <mesh ref={ring2Ref} rotation={[-Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.95, 0.034, 24, 128]} />
          <meshStandardMaterial
            color="#00D8FF"
            emissive="#00D8FF"
            emissiveIntensity={2.4}
            roughness={0.08}
            metalness={0.9}
          />
        </mesh>

        {/* Ring 3 (Vertical tilt) */}
        <mesh ref={ring3Ref} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.95, 0.034, 24, 128]} />
          <meshStandardMaterial
            color="#00D8FF"
            emissive="#00D8FF"
            emissiveIntensity={2.4}
            roughness={0.08}
            metalness={0.9}
          />
        </mesh>

        {/* Glowing Central Nucleus */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#00D8FF"
            emissiveIntensity={3.2}
            roughness={0.05}
            metalness={0.8}
          />
        </mesh>

        {/* 3 Live Orbiting Electrons */}
        <mesh ref={electron1Ref}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#00D8FF" emissiveIntensity={3.5} />
        </mesh>
        <mesh ref={electron2Ref}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#38BDF8" emissiveIntensity={3.5} />
        </mesh>
        <mesh ref={electron3Ref}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#60A5FA" emissiveIntensity={3.5} />
        </mesh>
      </group>
    </Float>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Direct 3D Circular Tech Medallions (TypeScript, Python, Code)
// Circular 3D cylinder with metallic bezel ring — NO SQUARES!
// ─────────────────────────────────────────────────────────────────────────────

interface CircularMedallion3DProps {
  type: 'typescript' | 'python' | 'code';
  position: [number, number, number];
  scale?: number;
  speed?: number;
  initialTiltY?: number;
  initialTiltX?: number;
}

export function CircularMedallion3D({
  type,
  position,
  scale = 1,
  speed = 1,
  initialTiltY = 0,
  initialTiltX = 0,
}: CircularMedallion3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  const texture = useMemo(() => {
    const canvas = drawCircularTechCanvas(type);
    const tex = new THREE.CanvasTexture(canvas);
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    return tex;
  }, [type]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime() * speed;
    groupRef.current.rotation.y = initialTiltY + Math.sin(t * 0.45) * 0.22;
    groupRef.current.rotation.x = initialTiltX + Math.cos(t * 0.35) * 0.14;
    groupRef.current.rotation.z = Math.sin(t * 0.25) * 0.08;
  });

  const rimColor = type === 'python' ? '#FACC15' : '#38BDF8';
  const emissiveColor = type === 'python' ? '#CA8A04' : '#0284C7';

  return (
    <Float speed={1.8 * speed} rotationIntensity={0.25} floatIntensity={0.6}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Outer 3D Metallic Bezel Ring */}
        <mesh>
          <torusGeometry args={[0.6, 0.038, 20, 64]} />
          <meshStandardMaterial
            color={rimColor}
            emissive={emissiveColor}
            emissiveIntensity={1.2}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Front Face Holographic Disc */}
        <mesh position={[0, 0, 0.018]}>
          <circleGeometry args={[0.59, 64]} />
          <meshStandardMaterial
            map={texture}
            transparent
            roughness={0.1}
            metalness={0.1}
            opacity={0.98}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Back Face Holographic Disc */}
        <mesh position={[0, 0, -0.018]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.59, 64]} />
          <meshStandardMaterial
            map={texture}
            transparent
            roughness={0.1}
            metalness={0.1}
            opacity={0.98}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. User Custom 3D Shield (Replaces Green Shield with Red/Black Chemical Emblem)
// ─────────────────────────────────────────────────────────────────────────────

interface CustomShield3DProps {
  position: [number, number, number];
  scale?: number;
  speed?: number;
  initialTiltY?: number;
}

export function CustomShield3D({
  position,
  scale = 1,
  speed = 1,
  initialTiltY = 0,
}: CustomShield3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    const tex = new THREE.CanvasTexture(canvas);

    const img = new Image();
    img.src = "/custom-shield.png";
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ctx.clearRect(0, 0, 512, 512);
      ctx.drawImage(img, 20, 20, 472, 472);

      // Make outer white background pixels 100% transparent
      const imgData = ctx.getImageData(0, 0, 512, 512);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] > 230 && data[i + 1] > 230 && data[i + 2] > 230) {
          data[i + 3] = 0;
        }
      }
      ctx.putImageData(imgData, 0, 0);
      tex.needsUpdate = true;
    };
    return tex;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    if (groupRef.current) {
      groupRef.current.rotation.y = initialTiltY + Math.sin(t * 0.4) * 0.2;
      groupRef.current.rotation.x = Math.cos(t * 0.3) * 0.12;
      groupRef.current.rotation.z = Math.sin(t * 0.25) * 0.05;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.9;
      ringRef.current.rotation.x = Math.sin(t * 0.4) * 0.3;
    }
  });

  return (
    <Float speed={2.2 * speed} rotationIntensity={0.28} floatIntensity={0.65}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Outer Orbiting Crimson Laser Energy Ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 2.2, 0, 0]}>
          <torusGeometry args={[0.82, 0.022, 16, 80]} />
          <meshStandardMaterial
            color="#EF4444"
            emissive="#DC2626"
            emissiveIntensity={2.8}
            metalness={0.9}
            roughness={0.08}
          />
        </mesh>

        {/* 3D Metallic Dark Charcoal / Crimson Bezel Outer Ring */}
        <mesh>
          <torusGeometry args={[0.63, 0.036, 20, 80]} />
          <meshStandardMaterial
            color="#991B1B"
            emissive="#7F1D1D"
            emissiveIntensity={1.0}
            metalness={0.94}
            roughness={0.1}
          />
        </mesh>

        {/* Solid Dark Gunmetal Core Rim (gives coin real 3D thickness) */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.62, 0.62, 0.04, 64]} />
          <meshStandardMaterial
            color="#18181B"
            metalness={0.95}
            roughness={0.18}
          />
        </mesh>

        {/* Front Face: Transparent Custom Shield Emblem */}
        <mesh position={[0, 0, 0.022]}>
          <circleGeometry args={[0.61, 64]} />
          <meshStandardMaterial
            map={texture}
            transparent
            roughness={0.06}
            metalness={0.25}
            opacity={0.99}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Back Face: Custom Shield Emblem */}
        <mesh position={[0, 0, -0.022]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.61, 64]} />
          <meshStandardMaterial
            map={texture}
            transparent
            roughness={0.06}
            metalness={0.25}
            opacity={0.99}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Direct 3D AI Neural Polyhedron Crystal (NO SQUARES!)
// ─────────────────────────────────────────────────────────────────────────────

interface NeuralCore3DProps {
  position: [number, number, number];
  scale?: number;
  speed?: number;
  initialTiltY?: number;
}

export function NeuralCore3D({
  position,
  scale = 1,
  speed = 1,
  initialTiltY = 0,
}: NeuralCore3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const outerCageRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const node1Ref = useRef<THREE.Mesh>(null);
  const node2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    if (groupRef.current) {
      groupRef.current.rotation.y = initialTiltY + t * 0.4;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.15;
    }
    if (outerCageRef.current) {
      outerCageRef.current.rotation.y = -t * 0.7;
      outerCageRef.current.rotation.z = t * 0.5;
    }
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y = t * 0.6;
      const s = 1 + Math.sin(t * 3.0) * 0.08;
      innerCoreRef.current.scale.set(s, s, s);
    }
    if (node1Ref.current) {
      const a = t * 2.2;
      node1Ref.current.position.x = Math.cos(a) * 0.78;
      node1Ref.current.position.y = Math.sin(a) * 0.45;
      node1Ref.current.position.z = Math.sin(a) * 0.78;
    }
    if (node2Ref.current) {
      const a = -t * 1.9 + 2.0;
      node2Ref.current.position.x = Math.cos(a) * 0.45;
      node2Ref.current.position.y = Math.sin(a) * 0.78;
      node2Ref.current.position.z = Math.cos(a) * 0.78;
    }
  });

  return (
    <Float speed={2.0 * speed} rotationIntensity={0.3} floatIntensity={0.65}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Inner Glowing AI Octahedron */}
        <mesh ref={innerCoreRef}>
          <octahedronGeometry args={[0.46, 0]} />
          <meshPhysicalMaterial
            color="#A855F7"
            emissive="#C084FC"
            emissiveIntensity={1.8}
            roughness={0.08}
            metalness={0.4}
            transmission={0.8}
            thickness={0.3}
            clearcoat={1.0}
          />
        </mesh>

        {/* Outer Counter-Rotating Wireframe Lattice Cage */}
        <mesh ref={outerCageRef}>
          <icosahedronGeometry args={[0.62, 0]} />
          <meshStandardMaterial
            color="#EC4899"
            emissive="#A855F7"
            emissiveIntensity={2.2}
            wireframe
            wireframeLinewidth={2}
          />
        </mesh>

        {/* Orbiting Neural Satellite Nodes */}
        <mesh ref={node1Ref}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#C084FC" emissiveIntensity={3.0} />
        </mesh>
        <mesh ref={node2Ref}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#EC4899" emissiveIntensity={3.0} />
        </mesh>
      </group>
    </Float>
  );
}
