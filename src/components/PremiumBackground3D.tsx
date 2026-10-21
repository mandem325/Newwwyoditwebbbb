import { useRef, useMemo, useEffect, Component, ErrorInfo, ReactNode, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class SafeErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("3D Background Error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

function Particles({ count = 120 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();
  const startTime = useRef(performance.now());

  // Generate random coordinates inside a beautiful box space
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 15; // X
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10; // Y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z
    }
    return arr;
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;

    const time = (performance.now() - startTime.current) * 0.001;

    // Smoothly rotate the entire constellation
    pointsRef.current.rotation.y = time * 0.03;
    pointsRef.current.rotation.x = time * 0.015;

    // Gently drift particles based on mouse coordinates to make it responsive
    const targetX = mouse.x * 0.5;
    const targetY = mouse.y * 0.5;

    pointsRef.current.position.x = THREE.MathUtils.lerp(
      pointsRef.current.position.x,
      targetX,
      0.05,
    );
    pointsRef.current.position.y = THREE.MathUtils.lerp(
      pointsRef.current.position.y,
      targetY,
      0.05,
    );
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#c15c3d"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.45}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Interactive floating connections/bridges wave
function ConnectionWave() {
  const meshRef = useRef<THREE.LineSegments>(null);
  const { mouse } = useThree();
  const startTime = useRef(performance.now());

  const [positions, indices] = useMemo(() => {
    const size = 12;
    const segments = 12;
    const vertices = [];
    const idx = [];

    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j <= segments; j++) {
        const x = (i / segments - 0.5) * size;
        const y = (j / segments - 0.5) * size;
        vertices.push(x, y, 0);
      }
    }

    // Connect vertices to form a beautiful web structure
    const cols = segments + 1;
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < segments; j++) {
        const p1 = i * cols + j;
        const p2 = p1 + 1;
        const p3 = (i + 1) * cols + j;

        idx.push(p1, p2);
        idx.push(p1, p3);
      }
    }

    return [new Float32Array(vertices), new Uint16Array(idx)];
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const geom = meshRef.current.geometry;
    const posAttr = geom.attributes.position;
    if (!posAttr) return;

    const time = (performance.now() - startTime.current) * 0.001;
    const len = posAttr.count;

    // Warp the Z positions to create elegant wavy motion
    for (let i = 0; i < len; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);

      // Multi-frequency wave calculation
      const waveValue =
        Math.sin(x * 0.5 + time * 0.4) * 0.4 +
        Math.cos(y * 0.5 + time * 0.3) * 0.3 +
        Math.sin((x + y) * 0.2 + time * 0.2) * 0.2;

      // Add mouse pull effect
      const dx = x - mouse.x * 4;
      const dy = y - mouse.y * 3;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const mouseInfluence = Math.max(0, 1 - dist / 5) * 0.8;

      posAttr.setZ(i, waveValue + mouseInfluence * Math.sin(time * 2));
    }

    posAttr.needsUpdate = true;

    // Slow organic drift of the wave structure
    meshRef.current.rotation.z = time * 0.01;
  });

  return (
    <lineSegments ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="index" args={[indices, 1]} />
      </bufferGeometry>
      <lineBasicMaterial
        color="#ebd5c5"
        transparent
        opacity={0.06}
        linewidth={1}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

export default function PremiumBackground3D() {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setMounted(true);
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  if (!mounted || !hasWebGL) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40 md:opacity-50">
      <SafeErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          gl={{
            alpha: true,
            antialias: false,
            powerPreference: "low-power",
            premultipliedAlpha: false,
            failIfMajorPerformanceCaveat: true,
          }}
          style={{ background: "transparent", pointerEvents: "none" }}
        >
          <ambientLight intensity={0.5} />
          <Particles count={150} />
          <ConnectionWave />
        </Canvas>
      </SafeErrorBoundary>
    </div>
  );
}
