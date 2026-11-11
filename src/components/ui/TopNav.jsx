import React from 'react';
import { RotateCcw, Compass, Activity, Eye } from 'lucide-react';
import { useDiabetesStore } from '../../store/useDiabetesStore';
import { REFERENCE_POINTS } from '../../data/organsData';

export default function TopNav() {
  const activePointId = useDiabetesStore((state) => state.activePointId);
  const selectPoint = useDiabetesStore((state) => state.selectPoint);
  const resetView = useDiabetesStore((state) => state.resetView);
  const startTour = useDiabetesStore((state) => state.startTour);
  const isTourActive = useDiabetesStore((state) => state.isTourActive);

  return (
    <header className="fixed top-3 left-4 right-4 z-20 pointer-events-auto">
      <div className="glass-panel rounded-2xl px-4 sm:px-6 py-3 shadow-2xl border border-white/10 backdrop-blur-xl flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
            <Activity size={20} />
          </div>
          <div className="min-w-0">
            <h1 className="text-xs sm:text-base font-extrabold tracking-tight text-white flex items-center gap-2">
              <span className="truncate">Diabetes Process Visualizator</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hidden md:inline-flex shrink-0">
                Visualisasi Medis Interaktif
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block truncate">
              Simulasi 3D Cara Kerja & Anatomi Penyerapan Glukosa pada Diabetes Tipe 2
            </p>
          </div>
        </div>

        {/* Organ Quick Selector Badges (Desktop) */}
        <div className="hidden lg:flex items-center gap-1.5">
          {REFERENCE_POINTS.map((pt) => {
            const isSelected = activePointId === pt.id;
            return (
              <button
                key={pt.id}
                onClick={() => selectPoint(pt.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-slate-900 text-white border-cyan-400 shadow-md shadow-cyan-500/20 scale-105'
                    : 'bg-slate-900/40 text-slate-300 hover:text-white hover:bg-slate-800/60 border-white/5'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: pt.color }}
                />
                <span>{pt.name}</span>
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={startTour}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-md ${
              isTourActive
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-cyan-500/40'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white'
            }`}
          >
            <Compass size={14} />
            <span className="hidden sm:inline">Tur Terpandu</span>
          </button>

          <button
            onClick={resetView}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white text-xs font-medium border border-white/10 transition flex items-center gap-1.5"
            title="Reset Sudut Pandang Kamera"
          >
            <RotateCcw size={14} />
            <span className="hidden sm:inline">Reset Kamera</span>
          </button>
        </div>
      </div>
    </header>
  );
}
