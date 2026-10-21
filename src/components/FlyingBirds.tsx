import React, { useRef, useEffect, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";

interface BirdProps {
  url: string;
  startPosition: [number, number, number];
  speed: number;
  scale: number;
  offset: number;
  timeOffset: number;
  direction: number;
}

function Bird({ url, startPosition, speed, scale, offset, timeOffset, direction }: BirdProps) {
  const { scene, animations } = useGLTF(url) as unknown as {
    scene: THREE.Group;
    animations: THREE.AnimationClip[];
  };
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  const { actions } = useAnimations(animations, clone);
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    if (animations && animations.length > 0 && actions) {
      const actionName = animations[0].name;
      const action = actions[actionName];
      if (action) {
        action.play();
        action.time = timeOffset;
        action.setEffectiveTimeScale(speed);
      }
    }
  }, [actions, animations, speed, timeOffset]);

  useFrame((state, delta) => {
    if (group.current) {
      // Move along X axis based on direction (1 or -1)
      group.current.position.x += delta * 30 * speed * direction;
      // Slight bobbing on Y axis
      group.current.position.y += Math.sin(state.clock.elapsedTime * 3 + offset) * delta * 2;

      // Loop bounds
      if (direction > 0 && group.current.position.x > 150) {
        group.current.position.x = -150;
        group.current.position.y = (Math.random() - 0.5) * 80;
        group.current.position.z = (Math.random() - 0.5) * 50 - 50;
      } else if (direction < 0 && group.current.position.x < -150) {
        group.current.position.x = 150;
        group.current.position.y = (Math.random() - 0.5) * 80;
        group.current.position.z = (Math.random() - 0.5) * 50 - 50;
      }
    }
  });

  const rotationY = direction > 0 ? Math.PI / 2 : -Math.PI / 2;
  const rotationX = 0;
  const rotationZ = direction > 0 ? -0.1 : 0.1;

  return (
    <group
      ref={group}
      position={startPosition}
      scale={scale}
      rotation={[rotationX, rotationY, rotationZ]}
    >
      <primitive object={clone} />
    </group>
  );
}

const BIRD_URLS = [
  "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/Stork.glb",
  "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/Parrot.glb",
  "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/Flamingo.glb",
];

BIRD_URLS.forEach((url) => useGLTF.preload(url));

export function FlyingBirds() {
  const birds = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const startX = (Math.random() - 0.5) * 300;
      const startY = (Math.random() - 0.5) * 80;
      const startZ = (Math.random() - 0.5) * 50 - 50;

      const typeIdx = Math.floor(Math.random() * BIRD_URLS.length);
      const url = BIRD_URLS[typeIdx];
      const baseScale = url.includes("Parrot") ? 0.3 : 0.15;

      return {
        id: i,
        url,
        direction,
        startPosition: [startX, startY, startZ] as [number, number, number],
        speed: 0.8 + Math.random() * 0.7,
        scale: baseScale * (0.8 + Math.random() * 0.4),
        offset: Math.random() * 100,
        timeOffset: Math.random() * 10,
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-[1] opacity-70 mix-blend-multiply">
      <Canvas camera={{ position: [0, 0, 50], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 20, 10]} intensity={2.5} castShadow />
        <directionalLight position={[-10, -10, -10]} intensity={1} color="#a1c4fd" />

        <Suspense fallback={null}>
          {birds.map((b) => (
            <Bird key={b.id} {...b} />
          ))}
        </Suspense>

        <fog attach="fog" args={["#ffffff", 30, 120]} />
      </Canvas>
    </div>
  );
}
