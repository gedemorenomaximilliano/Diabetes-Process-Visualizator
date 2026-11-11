import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useDiabetesStore } from '../../store/useDiabetesStore';
import { REFERENCE_POINTS } from '../../data/organsData';

// Default camera overview framed comfortably
const DEFAULT_CAMERA_POS = new THREE.Vector3(0, 0.15, 5.4);
const DEFAULT_TARGET_POS = new THREE.Vector3(0, 0.15, 0);

export default function CameraController() {
  const controlsRef = useRef();
  const { camera, size } = useThree();
  const activePointId = useDiabetesStore((state) => state.activePointId);
  const isAutoRotate = useDiabetesStore((state) => state.isAutoRotate);
  const isExploded = useDiabetesStore((state) => state.isExploded);

  // Dynamic overview framing:
  // - On mobile portrait Utuh: center precisely on organs & silhouette (X = -0.25, Y = -0.25) at Z = 5.8
  // - On mobile portrait Terurai (Exploded): organs explode with Liver on left (-1.15) and Colon on right (+0.87).
  //   Exact mathematical midpoint is X = -0.14, Y = -0.24.
  //   At Z = 7.4, this leaves equal ~56px margins on both left & right, perfectly centered on any phone!
  // - On desktop widescreen: (0, 0.15, 5.4)
  const isMobilePortrait = size.width < 768 && size.height > size.width;
  const overviewPos = isMobilePortrait
    ? isExploded
      ? new THREE.Vector3(-0.14, -0.24, 7.4)
      : new THREE.Vector3(-0.25, -0.25, 5.8)
    : new THREE.Vector3(0, 0.15, 5.4);
  const overviewTarget = isMobilePortrait
    ? isExploded
      ? new THREE.Vector3(-0.14, -0.24, 0)
      : new THREE.Vector3(-0.25, -0.25, 0)
    : new THREE.Vector3(0, 0.15, 0);

  const desiredPos = useRef(overviewPos.clone());
  const desiredTarget = useRef(overviewTarget.clone());
  const isTransitioning = useRef(false);
  const isUserInteracting = useRef(false);

  // When active point changes or exploded phase toggles, smoothly lerp camera to target
  useEffect(() => {
    if (activePointId) {
      const pt = REFERENCE_POINTS.find((p) => p.id === activePointId);
      if (pt) {
        let camPos = isExploded
          ? [...pt.cameraPosition]
          : [...(pt.unexplodedCameraPosition || pt.cameraPosition)];
        let lookPos = isExploded
          ? [...pt.cameraLookAt]
          : [...(pt.unexplodedCameraLookAt || pt.cameraLookAt)];

        // On mobile portrait, shift camera Y down by 0.22 units so the organ floats
        // comfortably in the open upper viewport and is never obstructed by bottom cards
        if (isMobilePortrait) {
          camPos[1] -= 0.22;
          lookPos[1] -= 0.22;
        }

        desiredPos.current.set(...camPos);
        desiredTarget.current.set(...lookPos);
        isTransitioning.current = true;
      }
    } else {
      desiredPos.current.copy(overviewPos);
      desiredTarget.current.copy(overviewTarget);
      isTransitioning.current = true;
    }
  }, [activePointId, isExploded, isMobilePortrait]);

  // Hook into OrbitControls events to release lerp immediately if user interacts
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const handleStart = () => {
      isUserInteracting.current = true;
      // User took over, cancel automatic lerp immediately so 360-degree drag is 100% free
      isTransitioning.current = false;
    };

    const handleEnd = () => {
      isUserInteracting.current = false;
    };

    controls.addEventListener('start', handleStart);
    controls.addEventListener('end', handleEnd);

    return () => {
      controls.removeEventListener('start', handleStart);
      controls.removeEventListener('end', handleEnd);
    };
  }, []);

  useFrame((state, delta) => {
    // Only interpolate camera when an automatic transition is in progress
    if (isTransitioning.current && !isUserInteracting.current) {
      const lerpFactor = Math.min(delta * 3.5, 1);
      camera.position.lerp(desiredPos.current, lerpFactor);

      if (controlsRef.current) {
        controlsRef.current.target.lerp(desiredTarget.current, lerpFactor);
      }

      // Check if camera has arrived at desired position and target
      const distCam = camera.position.distanceTo(desiredPos.current);
      const distTarget = controlsRef.current
        ? controlsRef.current.target.distanceTo(desiredTarget.current)
        : 0;

      if (distCam < 0.02 && distTarget < 0.02) {
        // Complete transition: hand over 100% control to OrbitControls for free 360° rotation!
        isTransitioning.current = false;
      }
    }

    if (controlsRef.current) {
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      minDistance={0.8}
      maxDistance={10.0}
      autoRotate={isAutoRotate}
      autoRotateSpeed={1.8}
      minPolarAngle={0.05}
      maxPolarAngle={Math.PI - 0.05}
    />
  );
}
