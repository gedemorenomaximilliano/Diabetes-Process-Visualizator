import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useDiabetesStore } from '../../store/useDiabetesStore';

export default function GlucoseFlowParticles() {
  const pointsRef = useRef();
  const conditionMode = useDiabetesStore((state) => state.conditionMode);
  const count = 120;

  // Particle positions and velocities along bloodstream
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const gold = new THREE.Color('#fbbf24'); // Glucose
    const cyan = new THREE.Color('#38bdf8'); // Insulin

    for (let i = 0; i < count; i++) {
      // Stream line along aorta / vena cava
      const t = Math.random() * 3.0 - 1.5;
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.04 + Math.random() * 0.08;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = t;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      // Color alternating between glucose and insulin (except T1D where insulin is missing)
      const isInsulin = conditionMode === 'type1' ? false : i % 3 === 0;
      const chosenColor = isInsulin ? cyan : gold;

      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }
    return [pos, col];
  }, [conditionMode]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      // Flow downwards through vessel
      pos[i * 3 + 1] -= delta * 0.6;
      if (pos[i * 3 + 1] < -1.5) {
        pos[i * 3 + 1] = 1.5;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
