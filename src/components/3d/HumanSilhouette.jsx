import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useDiabetesStore } from '../../store/useDiabetesStore';

const HUMAN_MODEL_PATH = `${import.meta.env.BASE_URL}models/human_body.glb`;

export default function HumanSilhouette() {
  const isExploded = useDiabetesStore((state) => state.isExploded);
  const groupRef = useRef();
  const opacityRef = useRef(0);
  const materialsRef = useRef([]);

  const { scene } = useGLTF(HUMAN_MODEL_PATH);

  // Apply transparent material directly to scene meshes
  useEffect(() => {
    const mats = [];
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.raycast = () => null; // Let clicks & hovers pass straight through to organ pins
        obj.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#38bdf8'),
          transparent: true,
          opacity: 0,
          roughness: 0.35,
          metalness: 0.05,
          depthWrite: false,
          side: THREE.FrontSide,
        });
        obj.castShadow = false;
        obj.receiveShadow = false;
        obj.renderOrder = -1;
        mats.push(obj.material);
      }
    });
    materialsRef.current = mats;
  }, [scene]);

  // Fade transition: transparent in Utuh, disappears in Terurai (Exploded)
  useFrame((state, delta) => {
    const target = isExploded ? 0 : 0.28;
    opacityRef.current = THREE.MathUtils.lerp(
      opacityRef.current,
      target,
      Math.min(delta * 4.5, 1)
    );

    const cur = opacityRef.current;

    if (groupRef.current) {
      groupRef.current.visible = cur > 0.003;
    }

    materialsRef.current.forEach((mat) => {
      mat.opacity = cur;
    });
  });

  // Mathematically calibrated to wrap digestive organs:
  // - Mouth & Jaw (Point 1, Y=1.15) sits inside the human head/mouth
  // - Stomach & Liver (Y=-0.15 to -0.25) sits in the upper abdomen under ribcage
  // - Intestines (Y=-0.85) sits in the umbilical/lower abdomen
  // - Large Intestine bottom (Y=-1.65) terminates at the pelvic floor / crotch
  return (
    <group ref={groupRef}>
      <group
        rotation={[0, 0, 0]}
        scale={[1.52, 1.60, 1.52]}
        position={[-0.25, -5.30, 0.02]}
      >
        <primitive object={scene} />
      </group>
    </group>
  );
}

useGLTF.preload(HUMAN_MODEL_PATH);
