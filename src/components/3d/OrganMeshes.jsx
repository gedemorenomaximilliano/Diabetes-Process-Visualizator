import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useDiabetesStore } from '../../store/useDiabetesStore';

export default function OrganMeshes() {
  const activeOrganId = useDiabetesStore((state) => state.activeOrganId);
  const selectOrgan = useDiabetesStore((state) => state.selectOrgan);
  const conditionMode = useDiabetesStore((state) => state.conditionMode);

  const pancreasRef = useRef();
  const liverRef = useRef();
  const stomachRef = useRef();
  const kidneyLeftRef = useRef();
  const kidneyRightRef = useRef();
  const muscleRef = useRef();
  const vesselsRef = useRef();

  // Subtle natural organ idle breathing/pulsing
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (pancreasRef.current) {
      const scale = 1 + (activeOrganId === 'pancreas' ? Math.sin(t * 4) * 0.04 : 0);
      pancreasRef.current.scale.set(scale, scale, scale);
    }
    if (liverRef.current) {
      const scale = 1 + (activeOrganId === 'liver' ? Math.sin(t * 3.5) * 0.03 : 0);
      liverRef.current.scale.set(scale, scale, scale);
    }
    if (stomachRef.current) {
      const scale = 1 + (activeOrganId === 'stomach' ? Math.sin(t * 3.5) * 0.03 : 0);
      stomachRef.current.scale.set(scale, scale, scale);
    }
  });

  const getOpacity = (id) => {
    if (!activeOrganId) return 0.95;
    return activeOrganId === id ? 1.0 : 0.25;
  };

  const getEmissive = (id, baseColor) => {
    if (activeOrganId === id) {
      return '#38bdf8';
    }
    return '#000000';
  };

  return (
    <group position={[0, 0, 0]}>
      {/* Anatomical Translucent Torso Silhouette */}
      <group position={[0, -0.2, 0]}>
        {/* Thoracic / Abdominal Cage Guide */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[1.7, 1.4, 3.2, 32, 1, true]} />
          <meshStandardMaterial
            color="#334155"
            transparent
            opacity={0.12}
            side={THREE.DoubleSide}
            wireframe
          />
        </mesh>
        
        {/* Soft backplate glow */}
        <mesh position={[0, 0, -0.8]}>
          <planeGeometry args={[3.2, 4.0]} />
          <meshBasicMaterial color="#0f172a" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Main Blood Vessels (Aorta & Vena Cava) */}
      <group ref={vesselsRef} position={[0, 0, -0.1]}>
        {/* Aorta (Red oxygenated / glucose carrier) */}
        <mesh position={[-0.1, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 3.2, 16]} />
          <meshStandardMaterial
            color="#ef4444"
            roughness={0.3}
            metalness={0.1}
            emissive="#ef4444"
            emissiveIntensity={activeOrganId ? 0.1 : 0.25}
          />
        </mesh>
        {/* Inferior Vena Cava (Blue) */}
        <mesh position={[0.1, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 3.2, 16]} />
          <meshStandardMaterial
            color="#3b82f6"
            roughness={0.3}
            metalness={0.1}
            emissive="#3b82f6"
            emissiveIntensity={activeOrganId ? 0.1 : 0.2}
          />
        </mesh>
      </group>

      {/* PANCREAS: Cradled in duodenum, elongated glandular organ */}
      <group
        ref={pancreasRef}
        position={[0.1, 0.1, 0.35]}
        rotation={[0.1, 0.2, -0.2]}
        onClick={(e) => {
          e.stopPropagation();
          selectOrgan('pancreas');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        {/* Pancreatic Head */}
        <mesh position={[0.3, -0.05, 0]}>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshStandardMaterial
            color="#f59e0b"
            roughness={0.4}
            metalness={0.1}
            transparent
            opacity={getOpacity('pancreas')}
            emissive={getEmissive('pancreas', '#f59e0b')}
            emissiveIntensity={activeOrganId === 'pancreas' ? 0.6 : 0}
          />
        </mesh>
        {/* Pancreatic Body & Tail (elongated) */}
        <mesh position={[-0.1, 0.05, 0]} rotation={[0, 0, 0.3]}>
          <capsuleGeometry args={[0.14, 0.6, 16, 24]} />
          <meshStandardMaterial
            color="#d97706"
            roughness={0.4}
            metalness={0.1}
            transparent
            opacity={getOpacity('pancreas')}
            emissive={getEmissive('pancreas', '#d97706')}
            emissiveIntensity={activeOrganId === 'pancreas' ? 0.6 : 0}
          />
        </mesh>
      </group>

      {/* LIVER: Large anatomical wedge in right upper quadrant */}
      <group
        ref={liverRef}
        position={[-0.75, 0.5, 0.3]}
        rotation={[-0.1, -0.2, -0.1]}
        onClick={(e) => {
          e.stopPropagation();
          selectOrgan('liver');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        {/* Right Lobe */}
        <mesh position={[-0.1, 0, 0]} scale={[1.3, 0.9, 0.8]}>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshStandardMaterial
            color="#991b1b"
            roughness={0.35}
            metalness={0.15}
            transparent
            opacity={getOpacity('liver')}
            emissive={getEmissive('liver', '#991b1b')}
            emissiveIntensity={activeOrganId === 'liver' ? 0.5 : 0}
          />
        </mesh>
        {/* Left Lobe tapering */}
        <mesh position={[0.4, -0.05, 0.1]} scale={[0.8, 0.6, 0.5]}>
          <sphereGeometry args={[0.4, 24, 24]} />
          <meshStandardMaterial
            color="#7f1d1d"
            roughness={0.35}
            metalness={0.15}
            transparent
            opacity={getOpacity('liver')}
            emissive={getEmissive('liver', '#7f1d1d')}
            emissiveIntensity={activeOrganId === 'liver' ? 0.5 : 0}
          />
        </mesh>
      </group>

      {/* STOMACH: J-shaped digestive reservoir in left upper quadrant */}
      <group
        ref={stomachRef}
        position={[0.65, 0.45, 0.3]}
        rotation={[0.2, 0.3, 0.1]}
        onClick={(e) => {
          e.stopPropagation();
          selectOrgan('stomach');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        {/* Fundus & Body of Stomach */}
        <mesh position={[0, 0.1, 0]} scale={[0.9, 1.2, 0.8]}>
          <sphereGeometry args={[0.42, 28, 28]} />
          <meshStandardMaterial
            color="#e11d48"
            roughness={0.4}
            metalness={0.1}
            transparent
            opacity={getOpacity('stomach')}
            emissive={getEmissive('stomach', '#e11d48')}
            emissiveIntensity={activeOrganId === 'stomach' ? 0.5 : 0}
          />
        </mesh>
        {/* Antrum / Pylorus curving medially towards pancreas */}
        <mesh position={[-0.25, -0.25, 0.05]} rotation={[0, 0, 0.8]} scale={[0.6, 1.0, 0.6]}>
          <capsuleGeometry args={[0.2, 0.3, 16, 24]} />
          <meshStandardMaterial
            color="#be123c"
            roughness={0.4}
            metalness={0.1}
            transparent
            opacity={getOpacity('stomach')}
            emissive={getEmissive('stomach', '#be123c')}
            emissiveIntensity={activeOrganId === 'stomach' ? 0.5 : 0}
          />
        </mesh>
      </group>

      {/* KIDNEYS: Bilateral bean-shaped organs posterior */}
      <group
        position={[-0.45, -0.35, -0.15]}
        onClick={(e) => {
          e.stopPropagation();
          selectOrgan('kidney');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        {/* Right Kidney */}
        <mesh ref={kidneyRightRef} scale={[0.6, 1.1, 0.7]} rotation={[0.1, 0, -0.15]}>
          <sphereGeometry args={[0.26, 24, 24]} />
          <meshStandardMaterial
            color="#7c3aed"
            roughness={0.35}
            metalness={0.15}
            transparent
            opacity={getOpacity('kidney')}
            emissive={getEmissive('kidney', '#7c3aed')}
            emissiveIntensity={activeOrganId === 'kidney' ? 0.6 : 0}
          />
        </mesh>
      </group>

      <group
        position={[0.45, -0.3, -0.15]}
        onClick={(e) => {
          e.stopPropagation();
          selectOrgan('kidney');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        {/* Left Kidney */}
        <mesh ref={kidneyLeftRef} scale={[0.6, 1.1, 0.7]} rotation={[-0.1, 0, 0.15]}>
          <sphereGeometry args={[0.26, 24, 24]} />
          <meshStandardMaterial
            color="#7c3aed"
            roughness={0.35}
            metalness={0.15}
            transparent
            opacity={getOpacity('kidney')}
            emissive={getEmissive('kidney', '#7c3aed')}
            emissiveIntensity={activeOrganId === 'kidney' ? 0.6 : 0}
          />
        </mesh>
      </group>

      {/* SKELETAL MUSCLE & CELLULAR TISSUE: Lower flank representation */}
      <group
        ref={muscleRef}
        position={[0.85, -0.75, 0.25]}
        rotation={[0.2, -0.3, 0.3]}
        onClick={(e) => {
          e.stopPropagation();
          selectOrgan('muscle');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        {/* Striated Muscle Fibers */}
        <mesh position={[0, 0, 0]} scale={[1.1, 1.6, 0.5]}>
          <capsuleGeometry args={[0.22, 0.5, 16, 24]} />
          <meshStandardMaterial
            color="#0284c7"
            roughness={0.4}
            metalness={0.2}
            transparent
            opacity={getOpacity('muscle')}
            emissive={getEmissive('muscle', '#0284c7')}
            emissiveIntensity={activeOrganId === 'muscle' ? 0.6 : 0}
          />
        </mesh>
        {/* Micro-cell nodules (representing GLUT4 cell membranes) */}
        <mesh position={[0.2, 0.2, 0.15]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.3} />
        </mesh>
        <mesh position={[-0.15, -0.2, 0.15]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}
