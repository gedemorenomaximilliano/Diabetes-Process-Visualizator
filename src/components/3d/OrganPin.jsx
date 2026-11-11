import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { useDiabetesStore } from '../../store/useDiabetesStore';

export default function OrganPin({ organ }) {
  const [hovered, setHovered] = useState(false);
  const activeOrganId = useDiabetesStore((state) => state.activeOrganId);
  const selectOrgan = useDiabetesStore((state) => state.selectOrgan);
  
  const isActive = activeOrganId === organ.id;

  return (
    <group position={organ.pinPosition}>
      <Html
        center
        distanceFactor={10}
        zIndexRange={[100, 0]}
        style={{ pointerEvents: 'auto' }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            selectOrgan(organ.id);
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative cursor-pointer select-none group transition-all duration-300"
        >
          {/* Pulsing beacon */}
          <div className="relative flex items-center justify-center">
            <span
              className={`absolute inline-flex h-8 w-8 rounded-full opacity-75 ${
                isActive ? 'animate-ping bg-blue-400' : 'pin-pulse bg-cyan-400'
              }`}
            />
            <div
              className={`relative flex items-center justify-center w-6 h-6 rounded-full border-2 transition-transform duration-200 ${
                isActive
                  ? 'bg-blue-600 border-white scale-125 shadow-lg shadow-blue-500/50'
                  : hovered
                  ? 'bg-cyan-500 border-cyan-200 scale-110 shadow-md shadow-cyan-500/40'
                  : 'bg-slate-900/90 border-cyan-400/80 shadow-md shadow-black/40'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  isActive ? 'bg-white' : 'bg-cyan-300'
                }`}
              />
            </div>
          </div>

          {/* Floating Pill Label */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 bottom-8 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-300 pointer-events-none flex items-center gap-1.5 ${
              isActive
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 scale-105 border border-blue-400'
                : hovered
                ? 'bg-slate-900/95 text-cyan-300 border border-cyan-400/50 shadow-md scale-100'
                : 'bg-slate-950/80 text-slate-300 border border-slate-700/60 shadow-sm opacity-85 scale-95'
            }`}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: organ.color }}
            />
            <span>{organ.name}</span>
          </div>
        </div>
      </Html>
    </group>
  );
}
