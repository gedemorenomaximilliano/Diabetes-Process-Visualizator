import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useDiabetesStore } from '../../store/useDiabetesStore';

export default function MetabolicParticles() {
  const pointsRef = useRef();
  const activePointId = useDiabetesStore((state) => state.activePointId);
  const count = 100;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const gold = new THREE.Color('#fbbf24'); // Glucose
    const cyan = new THREE.Color('#38bdf8'); // Insulin
    const purple = new THREE.Color('#c084fc'); // Receptor

    for (let i = 0; i < count; i++) {
      // Flow along torso vascular / digestive axis
      const y = Math.random() * 3.4 - 1.5;
      const angle = Math.random() * Math.PI * 2;
      const r = 0.05 + Math.random() * 0.12;

      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * r + 0.1;

      const c = i % 3 === 0 ? cyan : i % 5 === 0 ? purple : gold;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] -= delta * 0.45;
      if (pos[i * 3 + 1] < -1.6) {
        pos[i * 3 + 1] = 1.8;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
