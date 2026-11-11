import React, { useState, useRef } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useDiabetesStore } from '../../store/useDiabetesStore';

export default function InteractivePin({ point }) {
  const [hovered, setHovered] = useState(false);
  const activePointId = useDiabetesStore((state) => state.activePointId);
  const selectPoint = useDiabetesStore((state) => state.selectPoint);
  const isIntroAnimationDone = useDiabetesStore((state) => state.isIntroAnimationDone);
  const isExploded = useDiabetesStore((state) => state.isExploded);
  const explosionProgress = useDiabetesStore((state) => state.explosionProgress);

  const tooltipRef = useRef(null);
  const pinPosVec = useRef(new THREE.Vector3());
  const scaleRef = useRef(1.0);

  // Dynamic zoom distance tracking:
  // When in overview (camDist >= 4.6), scale = 1.0 (clear, comfortable, readable badge)
  // When zooming in close (camDist <= 1.4), scale smoothly shrinks down to 0.55 (compact micro-label)
  useFrame(({ camera }) => {
    const unex = point.unexplodedPinPosition || point.pinPosition;
    const exp = point.pinPosition;
    const px = unex[0] + (exp[0] - unex[0]) * explosionProgress;
    const py = unex[1] + (exp[1] - unex[1]) * explosionProgress;
    const pz = unex[2] + (exp[2] - unex[2]) * explosionProgress;

    pinPosVec.current.set(px, py, pz);
    const camDist = camera.position.distanceTo(pinPosVec.current);
    const norm = Math.min(Math.max((camDist - 1.4) / (4.6 - 1.4), 0), 1);
    const smoothT = norm * norm * (3 - 2 * norm);
    const currentScale = 0.55 + 0.45 * smoothT;
    scaleRef.current = currentScale;

    if (tooltipRef.current) {
      tooltipRef.current.style.transform = `translateX(-50%) scale(${currentScale.toFixed(3)})`;
    }
  });

  // Hide completely while the intro animation is playing
  if (!isIntroAnimationDone) {
    return null;
  }

  const isAnyZoomed = !!activePointId;
  const isActive = activePointId === point.id;

  // Smooth dynamic 3D pin position following the organ explosion/assembly
  const unexploded = point.unexplodedPinPosition || point.pinPosition;
  const exploded = point.pinPosition;
  const currentPos = [
    unexploded[0] + (exploded[0] - unexploded[0]) * explosionProgress,
    unexploded[1] + (exploded[1] - unexploded[1]) * explosionProgress,
    unexploded[2] + (exploded[2] - unexploded[2]) * explosionProgress
  ];

  // Pin beacon sizing:
  // In overview: prominent, crisp 26px button (w-6.5 h-6.5) with bold readable number
  // On hover: scales up to 28-30px (w-7.5 h-7.5) with glowing shadow
  // When an organ is focused: active pin highlighted with ring, other pins subtly dimmed
  const pinSizeClass = isActive
    ? 'w-7 h-7 text-xs text-white border-2 border-white shadow-xl ring-2 ring-sky-400 scale-100'
    : hovered
    ? 'w-7.5 h-7.5 text-xs text-white border-2 border-white shadow-2xl scale-110'
    : isAnyZoomed
    ? 'w-5.5 h-5.5 text-[10px] text-white border-[1.5px] border-white/80'
    : 'w-6.5 h-6.5 text-xs text-white border-2 border-white/95 shadow-lg';

  // Smart directional tooltip positioning:
  // In Utuh mode: Point 1, 3, 4 pop downward, Point 2 & 5 pop upward
  // In Exploded mode: Point 3 pops downward, others pop upward
  const isTooltipBelow = isExploded
    ? point.id === 'step3_pancreas'
    : point.id === 'step1_mouth' || point.id === 'step3_pancreas' || point.id === 'step4_large_intestine' || point.id === 'step4_insulin_resistance';

  return (
    <group position={currentPos}>
      <Html
        center
        zIndexRange={hovered ? [99999, 99000] : [100, 0]}
        style={{
          pointerEvents: 'auto',
          zIndex: hovered ? 99999 : 1
        }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            setHovered(false);
            selectPoint(point.id);
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`relative cursor-pointer select-none group p-2 -m-2 transition-all duration-300 ${
            isAnyZoomed && !isActive ? 'opacity-40 hover:opacity-100' : 'opacity-100'
          }`}
          style={{ zIndex: hovered ? 99999 : 1 }}
        >
          {/* Micro Pin Beacon */}
          <div className="relative flex items-center justify-center">
            <div
              className={`relative flex items-center justify-center rounded-full font-bold shadow-md transition-all duration-300 ${pinSizeClass}`}
              style={{
                backgroundColor: point.color,
                boxShadow: `0 0 10px ${point.color}99`
              }}
            >
              {point.stepNumber || '•'}
            </div>
          </div>

          {/* Hover Tooltip (Comfortable & readable in overview, smoothly shrinks when zooming in) */}
          {hovered && (
            <div
              ref={tooltipRef}
              className={`absolute left-1/2 ${
                isTooltipBelow ? 'top-full mt-2.5' : 'bottom-full mb-2.5'
              } px-3.5 py-1.5 rounded-xl text-xs sm:text-[13px] font-semibold tracking-wide whitespace-nowrap pointer-events-none flex items-center gap-2 shadow-2xl border border-white/25 bg-[#121c26]/95 text-slate-100 backdrop-blur-xl transition-[opacity,box-shadow] z-50`}
              style={{
                transform: `translateX(-50%) scale(${scaleRef.current.toFixed(3)})`,
                transformOrigin: isTooltipBelow ? 'top center' : 'bottom center'
              }}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0 shadow-sm"
                style={{ backgroundColor: point.color }}
              />
              <span className="font-bold">{point.name}</span>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}
