import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { useDiabetesStore } from '../../store/useDiabetesStore';

const DIGESTIVE_MODEL_PATH = `${import.meta.env.BASE_URL}models/digestive/digestive_system.glb`;

export default function DigestiveModel() {
  const groupRef = useRef();
  const { scene, animations } = useGLTF(DIGESTIVE_MODEL_PATH);
  const { actions, names, mixer } = useAnimations(animations, groupRef);

  const selectPoint = useDiabetesStore((state) => state.selectPoint);
  const isIntroAnimationDone = useDiabetesStore((state) => state.isIntroAnimationDone);
  const setIntroAnimationDone = useDiabetesStore((state) => state.setIntroAnimationDone);
  const setModelLoaded = useDiabetesStore((state) => state.setModelLoaded);
  const isExploded = useDiabetesStore((state) => state.isExploded);
  const setExplosionProgress = useDiabetesStore((state) => state.setExplosionProgress);

  const animActionRef = useRef(null);

  // Notify store that the 3D model is loaded and mounted
  useEffect(() => {
    if (scene) {
      setModelLoaded(true);
    }
  }, [scene, setModelLoaded]);

  // Initialize animation clip
  useEffect(() => {
    if (!actions) return;

    const animAction = actions['Take 001'] || (names.length > 0 ? actions[names[0]] : null);

    if (animAction) {
      animAction.play();
      animAction.paused = true;
      animAction.time = 0.05;
      animActionRef.current = animAction;
    } else {
      setIntroAnimationDone(true);
    }
  }, [actions, names, setIntroAnimationDone]);

  // Smoothly interpolate animation time between unexploded (0.05s) and exploded (4.8s)
  useFrame((state, delta) => {
    if (!animActionRef.current || !mixer) return;
    const action = animActionRef.current;

    const targetTime = isExploded ? 4.8 : 0.05;
    const curTime = action.time;

    if (Math.abs(curTime - targetTime) > 0.01) {
      const step = delta * 3.4; // brisk ~1.4s smooth transition
      let nextTime;
      if (curTime < targetTime) {
        nextTime = Math.min(targetTime, curTime + step);
      } else {
        nextTime = Math.max(targetTime, curTime - step);
      }
      action.time = nextTime;
      action.paused = true;
      mixer.update(0);

      const prog = Math.max(0, Math.min(1, (nextTime - 0.05) / (4.8 - 0.05)));
      setExplosionProgress(prog);

      if (nextTime >= 4.75 && !isIntroAnimationDone) {
        setIntroAnimationDone(true);
      }
    }
  });

  // Clean materials & suppress any leftover text/line meshes
  useEffect(() => {
    scene.traverse((obj) => {
      const name = (obj.name || '').toLowerCase();

      if (
        name.includes('text') ||
        name.includes('line') ||
        name.includes('wall paint') ||
        name.startsWith('line0') ||
        name.startsWith('text0')
      ) {
        obj.visible = false;
        return;
      }

      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;

        if (obj.material) {
          obj.material.side = THREE.DoubleSide;
          obj.material.roughness = 0.42;
          obj.material.metalness = 0.08;
          if (obj.material.map) {
            obj.material.map.colorSpace = THREE.SRGBColorSpace;
            obj.material.map.needsUpdate = true;
          }
          obj.material.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  // Handle direct organ mesh clicks
  const handleMeshClick = (e) => {
    e.stopPropagation();
    const meshName = (e.object?.name || '').toLowerCase();

    if (meshName.includes('pancreas')) {
      selectPoint('step3_pancreas');
    } else if (
      meshName.includes('large intestine') ||
      meshName.includes('colon')
    ) {
      selectPoint('step4_large_intestine');
    } else if (
      meshName.includes('stomach') ||
      meshName.includes('duodenum') ||
      meshName.includes('small intestine') ||
      meshName.includes('intestine')
    ) {
      selectPoint('step2_stomach_intestine');
    } else if (meshName.includes('liver') || meshName.includes('lobe')) {
      selectPoint('liver');
    } else if (
      meshName.includes('teeth') ||
      meshName.includes('oral') ||
      meshName.includes('tongue') ||
      meshName.includes('mandibula') ||
      meshName.includes('maxilla') ||
      meshName.includes('skull')
    ) {
      selectPoint('step1_mouth');
    } else if (meshName.includes('arter') || meshName.includes('vein')) {
      selectPoint('step4_large_intestine');
    }
  };

  return (
    <group
      ref={groupRef}
      scale={4.0}
      onClick={handleMeshClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
      }}
    >
      <group position={[-0.062, -1.277, 0.076]}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

useGLTF.preload(DIGESTIVE_MODEL_PATH);
