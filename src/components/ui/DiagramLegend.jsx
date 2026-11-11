import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp, MousePointerClick, Video } from 'lucide-react';
import { useDiabetesStore } from '../../store/useDiabetesStore';
import { REFERENCE_POINTS } from '../../data/organsData';

export default function DiagramLegend() {
  const [collapsed, setCollapsed] = useState(false);
  const selectPoint = useDiabetesStore((state) => state.selectPoint);
  const activePointId = useDiabetesStore((state) => state.activePointId);

  return (
    <div className="fixed top-20 left-4 z-20 pointer-events-auto w-64 hidden md:block">
      <div className="glass-panel rounded-2xl p-4 shadow-xl border border-white/10 backdrop-blur-xl transition-all">
        {/* Header */}
        <div
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-between cursor-pointer select-none pb-2 border-b border-white/10"
        >
          <div className="flex items-center gap-2">
            <Info size={16} className="text-cyan-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Panduan Interaktif
            </h2>
          </div>
          <button className="text-slate-400 hover:text-white">
            {collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>

        {/* Content */}
        {!collapsed && (
          <div className="pt-3 space-y-3">
            <div className="space-y-1.5 text-[11px] text-slate-300">
              <div className="flex items-center gap-2 text-slate-400">
                <MousePointerClick size={14} className="text-cyan-400 shrink-0" />
                <span>Klik pin angka atau organ 3D untuk zoom otomatis.</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Video size={14} className="text-amber-400 shrink-0" />
                <span>Wadah video edukasi akan muncul di sisi layar.</span>
              </div>
            </div>

            {/* Quick list of steps */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Titik Proses Anatomi:
              </p>
              {REFERENCE_POINTS.map((pt) => {
                const isSelected = activePointId === pt.id;
                return (
                  <button
                    key={pt.id}
                    onClick={() => selectPoint(pt.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium transition flex items-center justify-between border ${
                      isSelected
                        ? 'bg-slate-900 text-white border-cyan-400 shadow-md'
                        : 'bg-slate-900/40 text-slate-300 hover:bg-slate-800/80 hover:text-white border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className="w-4 h-4 rounded-full text-[10px] font-bold text-white flex items-center justify-center shrink-0"
                        style={{ backgroundColor: pt.color }}
                      >
                        {pt.stepNumber || '•'}
                      </span>
                      <span className="truncate">{pt.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Biochemical Legend */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Glukosa</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Insulin</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span>Reseptor</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
