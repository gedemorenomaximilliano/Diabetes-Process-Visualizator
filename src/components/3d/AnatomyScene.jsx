import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import DigestiveModel from './DigestiveModel';
import InteractivePin from './InteractivePin';
import CameraController from './CameraController';
import HumanSilhouette from './HumanSilhouette';
import { REFERENCE_POINTS } from '../../data/organsData';
import { useDiabetesStore } from '../../store/useDiabetesStore';

// Dynamic shadow that sits at the feet in Utuh mode and under organs in Terurai mode
function AdaptiveContactShadow() {
  const isExploded = useDiabetesStore((state) => state.isExploded);
  const groupRef = useRef();
  const currentPos = useRef(
    new THREE.Vector3(-0.25, isExploded ? -2.1 : -5.32, isExploded ? 0 : 0.15)
  );

  useFrame((state, delta) => {
    // Soles of feet are at Y = -5.30, so plane at -5.32 sits cleanly on the ground under feet
    const targetY = isExploded ? -2.1 : -5.32;
    const targetZ = isExploded ? 0.0 : 0.15;

    currentPos.current.y = THREE.MathUtils.lerp(
      currentPos.current.y,
      targetY,
      Math.min(delta * 4, 1)
    );
    currentPos.current.z = THREE.MathUtils.lerp(
      currentPos.current.z,
      targetZ,
      Math.min(delta * 4, 1)
    );

    if (groupRef.current) {
      groupRef.current.position.y = currentPos.current.y;
      groupRef.current.position.z = currentPos.current.z;
    }
  });

  return (
    <group ref={groupRef} position={[-0.25, currentPos.current.y, currentPos.current.z]}>
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.4}
        scale={8.5}
        blur={2.4}
        far={7.5}
        color="#070d18"
      />
    </group>
  );
}

export default function AnatomyScene() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0.15, 5.4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Clean Studio Lighting */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 8, 6]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-5, 3, 4]} intensity={1.2} color="#bae6fd" />
        <directionalLight position={[0, -3, 4]} intensity={0.9} color="#f0f9ff" />
        <pointLight position={[0, 0, 3]} intensity={1.0} color="#ffffff" />

        {/* Environmental Reflection */}
        <Environment preset="city" environmentIntensity={0.6} />

        {/* Suspense with NO fallback sphere */}
        <Suspense fallback={null}>
          {/* Anatomical Human Body Outline & Silhouette (Visible in Utuh mode) */}
          <HumanSilhouette />

          {/* Real 3D Digestive System Model */}
          <DigestiveModel />

          {/* Interactive Reference Pins from diagram (1, 2, 3, 4, 5) */}
          {REFERENCE_POINTS.map((pt) => (
            <InteractivePin key={pt.id} point={pt} />
          ))}

          {/* Smooth Camera Lerp & Orbit Controller */}
          <CameraController />

          {/* Ground Contact Shadow (at feet in Utuh, under organs in Terurai) */}
          <AdaptiveContactShadow />
        </Suspense>
      </Canvas>
    </div>
  );
}
