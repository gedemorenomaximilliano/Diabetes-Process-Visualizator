import React from 'react';
import { Box, Layers } from 'lucide-react';
import { useDiabetesStore } from '../../store/useDiabetesStore';

export default function PhaseToggle() {
  const isExploded = useDiabetesStore((state) => state.isExploded);
  const setExploded = useDiabetesStore((state) => state.setExploded);
  const isIntroAnimationDone = useDiabetesStore((state) => state.isIntroAnimationDone);

  // Only show after initial load
  if (!isIntroAnimationDone) return null;

  return (
    <div className="fixed top-3 left-3 sm:top-5 sm:left-5 z-20 pointer-events-auto font-poppins">
      <div className="glass-panel rounded-full p-1 border border-white/15 bg-[#18222d]/92 backdrop-blur-2xl flex items-center shadow-2xl">
        {/* Unexploded / Assembled Phase */}
        <button
          onClick={() => setExploded(false)}
          className={`h-7.5 sm:h-8 px-2.5 sm:px-3.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 whitespace-nowrap ${
            !isExploded
              ? 'bg-sky-500 text-white shadow-md ring-1 ring-sky-300/40'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
          title="Tampilan Anatomi Utuh (Organ Tersusun Bersama)"
        >
          <Box size={13} className="shrink-0" />
          <span>Utuh</span>
        </button>

        {/* Exploded Phase */}
        <button
          onClick={() => setExploded(true)}
          className={`h-7.5 sm:h-8 px-2.5 sm:px-3.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 whitespace-nowrap ${
            isExploded
              ? 'bg-sky-500 text-white shadow-md ring-1 ring-sky-300/40'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
          title="Tampilan Fase Terurai (Exploded View - Organ Terpisah)"
        >
          <Layers size={13} className="shrink-0" />
          <span>Terurai</span>
          <span className="hidden sm:inline">(Exploded)</span>
        </button>
      </div>
    </div>
  );
}
