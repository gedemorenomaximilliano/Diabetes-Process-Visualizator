import React from 'react';
import { Compass, RotateCw } from 'lucide-react';
import { useDiabetesStore } from '../../store/useDiabetesStore';
import { REFERENCE_POINTS } from '../../data/organsData';

export default function MainBottomNav() {
  const activePointId = useDiabetesStore((state) => state.activePointId);
  const selectPoint = useDiabetesStore((state) => state.selectPoint);
  const startTour = useDiabetesStore((state) => state.startTour);
  const isTourActive = useDiabetesStore((state) => state.isTourActive);
  const isAutoRotate = useDiabetesStore((state) => state.isAutoRotate);
  const toggleAutoRotate = useDiabetesStore((state) => state.toggleAutoRotate);

  return (
    <>
      {/* ====================================================================== */}
      {/* MOBILE OVERVIEW DOCK (< md screens): Fits perfectly in 320-390px,      */}
      {/* zero horizontal scroll, zero cut-off buttons. Yields when organ active  */}
      {/* ====================================================================== */}
      {!activePointId && (
        <nav className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-auto font-poppins">
          <div className="glass-panel rounded-full px-2.5 py-1.5 shadow-2xl border border-white/20 bg-[#16212d]/96 backdrop-blur-2xl flex items-center justify-center gap-1.5">
            {/* 360 Auto Rotate */}
            <button
              onClick={toggleAutoRotate}
              className={`h-8 px-2.5 rounded-full text-[11px] font-semibold border transition-all flex items-center gap-1 shadow-xs active:scale-95 cursor-pointer ${
                isAutoRotate
                  ? 'bg-sky-500/25 text-sky-200 border-sky-400 ring-1 ring-sky-300/40 shadow-sky-500/20'
                  : 'bg-[#222e3c]/90 text-slate-200 border-white/10'
              }`}
              title="Putar 360°"
            >
              <RotateCw
                size={13}
                className={isAutoRotate ? 'text-sky-300 animate-spin' : 'text-slate-300'}
                style={{ animationDuration: isAutoRotate ? '4s' : undefined }}
              />
              <span>360°</span>
            </button>

            <div className="w-[1px] h-4 bg-white/15 mx-0.5" />

            {/* 5 Organ Number Badges (1, 2, 3, 4, 5) - 100% visible, no scrolling */}
            <div className="flex items-center gap-1.5">
              {REFERENCE_POINTS.map((pt) => (
                <button
                  key={pt.id}
                  onClick={() => selectPoint(pt.id)}
                  className="w-7.5 h-7.5 rounded-full text-xs font-bold text-white flex items-center justify-center shadow-md active:scale-90 transition border border-white/80 cursor-pointer"
                  style={{
                    backgroundColor: pt.color,
                    boxShadow: `0 0 8px ${pt.color}88`
                  }}
                  title={pt.name}
                >
                  {pt.stepNumber}
                </button>
              ))}
            </div>

            <div className="w-[1px] h-4 bg-white/15 mx-0.5" />

            {/* Tur Terpandu */}
            <button
              onClick={startTour}
              className={`h-8 px-2.5 rounded-full text-[11px] font-semibold transition-all flex items-center gap-1 shadow-xs active:scale-95 cursor-pointer ${
                isTourActive
                  ? 'bg-sky-500 text-white ring-2 ring-sky-300'
                  : 'bg-gradient-to-r from-sky-600 to-cyan-600 text-white shadow-md shadow-sky-600/30 border border-sky-400/30'
              }`}
              title="Mulai Tur"
            >
              <Compass size={13} />
              <span>Tur</span>
            </button>
          </div>
        </nav>
      )}

      {/* ====================================================================== */}
      {/* DESKTOP NAV (>= md screens): Classic wide pill buttons                 */}
      {/* ====================================================================== */}
      <nav className="hidden md:block fixed bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-auto font-poppins">
        <div className="glass-panel rounded-full px-3.5 py-2 shadow-2xl border border-white/15 bg-[#18222d]/92 backdrop-blur-2xl flex items-center justify-center gap-2">
          {/* Left Wing: 360° Auto-Rotate */}
          <button
            onClick={toggleAutoRotate}
            className={`h-9 px-4 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 shadow-sm active:scale-95 whitespace-nowrap shrink-0 cursor-pointer ${
              isAutoRotate
                ? 'bg-sky-500/25 text-sky-200 border-sky-400 ring-1 ring-sky-300/40 shadow-sky-500/20 shadow-md'
                : 'bg-[#243140]/90 hover:bg-[#2e3e52] text-slate-200 hover:text-white border-white/10'
            }`}
            title="Putar Otomatis Model 3D 360 Derajat"
          >
            <RotateCw
              size={14}
              className={`shrink-0 transition-transform ${
                isAutoRotate ? 'text-sky-300 animate-spin' : 'text-slate-300'
              }`}
              style={{ animationDuration: isAutoRotate ? '4s' : undefined }}
            />
            <span>Putar 360°</span>
          </button>

          <div className="w-[1px] h-5 bg-white/15 mx-0.5 shrink-0" />

          {/* Center: Organ Buttons (1, 2, 3, 4, 5) */}
          <div className="flex items-center gap-1.5 shrink-0">
            {REFERENCE_POINTS.map((pt) => {
              const isSelected = activePointId === pt.id;
              return (
                <button
                  key={pt.id}
                  onClick={() => selectPoint(pt.id)}
                  className={`h-9 flex items-center gap-2 px-3.5 rounded-full text-xs font-semibold transition-all border shrink-0 whitespace-nowrap active:scale-95 cursor-pointer ${
                    isSelected
                      ? 'bg-sky-500/25 text-white shadow-md scale-105 border-sky-400 ring-1 ring-sky-300/50'
                      : 'bg-[#202c38]/80 hover:bg-[#2a3a4a] text-slate-300 hover:text-white border-white/8 shadow-xs'
                  }`}
                >
                  <span
                    className="flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold text-white shrink-0 shadow-xs"
                    style={{ backgroundColor: pt.color }}
                  >
                    {pt.stepNumber || '•'}
                  </span>
                  <span>{pt.name}</span>
                </button>
              );
            })}
          </div>

          <div className="w-[1px] h-5 bg-white/15 mx-0.5 shrink-0" />

          {/* Right Wing: Guided Tour */}
          <button
            onClick={startTour}
            className={`h-9 px-4 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 whitespace-nowrap shrink-0 cursor-pointer ${
              isTourActive
                ? 'bg-sky-500 text-white shadow-inner ring-2 ring-sky-300'
                : 'bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white shadow-md shadow-sky-600/30 border border-sky-400/30'
            }`}
            title="Mulai Tur Terpandu 1 sampai 5"
          >
            <Compass size={15} className="shrink-0" />
            <span>Tur Terpandu</span>
          </button>
        </div>
      </nav>
    </>
  );
}
