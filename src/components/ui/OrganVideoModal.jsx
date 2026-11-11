import React, { useState } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  ChevronUp,
  ChevronDown,
  BookOpen,
  Eye
} from 'lucide-react';
import { useDiabetesStore } from '../../store/useDiabetesStore';
import { REFERENCE_POINTS } from '../../data/organsData';

export default function OrganVideoModal() {
  const activePointId = useDiabetesStore((state) => state.activePointId);
  const isVideoOpen = useDiabetesStore((state) => state.isVideoOpen);
  const closeVideo = useDiabetesStore((state) => state.closeVideo);
  const selectPoint = useDiabetesStore((state) => state.selectPoint);

  // Desktop expand width state
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(false);
  // Mobile drawer expand state (false = compact peek drawer; true = full reading sheet)
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  if (!isVideoOpen || !activePointId) return null;

  const currentPoint = REFERENCE_POINTS.find((p) => p.id === activePointId);
  if (!currentPoint) return null;

  const currentIndex = REFERENCE_POINTS.findIndex((p) => p.id === currentPoint.id);
  const handleNext = (e) => {
    if (e) e.stopPropagation();
    const nextIdx = (currentIndex + 1) % REFERENCE_POINTS.length;
    selectPoint(REFERENCE_POINTS[nextIdx].id);
  };
  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    const prevIdx = (currentIndex - 1 + REFERENCE_POINTS.length) % REFERENCE_POINTS.length;
    selectPoint(REFERENCE_POINTS[prevIdx].id);
  };

  return (
    <>
      {/* ============================================================== */}
      {/* MOBILE VIEW (< md screens): Single Unified Mobile Dock / Sheet */}
      {/* ============================================================== */}
      <div className="md:hidden">
        {!isMobileExpanded ? (
          /* Mobile State A: Compact Unified Dock (Replaces bottom bar smoothly) */
          <div
            className="fixed bottom-3 left-2.5 right-2.5 z-30 pointer-events-auto font-poppins"
          >
            <div className="p-2.5 rounded-2xl shadow-2xl border border-white/20 bg-[#141e2a]/96 backdrop-blur-2xl flex flex-col gap-2">
              {/* Row 1: Step Info & Expand / Close */}
              <div className="flex items-center justify-between gap-2">
                {/* Left: Step Circle + Title & Subtitle */}
                <div
                  onClick={() => setIsMobileExpanded(true)}
                  className="flex items-center gap-2 min-w-0 cursor-pointer flex-1"
                >
                  <span
                    className="flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-xs shadow-md shrink-0"
                    style={{ backgroundColor: currentPoint.color }}
                  >
                    {currentPoint.stepNumber || '•'}
                  </span>
                  <div className="truncate">
                    <h2 className="text-xs font-bold text-white truncate leading-tight">
                      {currentPoint.name}
                    </h2>
                    <p className="text-[10px] text-slate-400 truncate">
                      {currentPoint.badgeText}
                    </p>
                  </div>
                </div>

                {/* Right: Expand Button & Close */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setIsMobileExpanded(true)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-sky-500/25 hover:bg-sky-500/40 text-sky-200 border border-sky-400/30 text-[11px] font-semibold transition active:scale-95 cursor-pointer shadow-sm"
                  >
                    <BookOpen size={12} />
                    <span>Baca Materi</span>
                    <ChevronUp size={13} />
                  </button>
                  <button
                    onClick={closeVideo}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/20 transition cursor-pointer"
                    title="Kembali ke Tampilan Utama"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* Row 2: Direct 5 Organ Buttons + Stepper Navigation (Zero horizontal scroll!) */}
              <div className="flex items-center justify-between pt-1 border-t border-white/10 gap-1.5">
                <button
                  onClick={handlePrev}
                  className="px-2.5 py-1 rounded-lg bg-white/8 hover:bg-white/15 text-slate-200 text-[11px] font-medium transition active:scale-95 cursor-pointer flex items-center gap-0.5"
                >
                  <ChevronLeft size={13} />
                  <span>Prev</span>
                </button>

                {/* 5 Organ Quick Jump Circles */}
                <div className="flex items-center gap-1.5">
                  {REFERENCE_POINTS.map((pt) => {
                    const isCurrent = pt.id === currentPoint.id;
                    return (
                      <button
                        key={pt.id}
                        onClick={() => selectPoint(pt.id)}
                        className={`w-6.5 h-6.5 rounded-full text-[11px] font-bold text-white flex items-center justify-center transition active:scale-90 cursor-pointer ${
                          isCurrent
                            ? 'ring-2 ring-sky-300 scale-110 shadow-md border border-white'
                            : 'opacity-55 hover:opacity-100 border border-white/40'
                        }`}
                        style={{ backgroundColor: pt.color }}
                      >
                        {pt.stepNumber}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={handleNext}
                  className="px-2.5 py-1 rounded-lg text-white text-[11px] font-semibold transition shadow-md active:scale-95 cursor-pointer flex items-center gap-0.5"
                  style={{ backgroundColor: currentPoint.color }}
                >
                  <span>Next</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Mobile State B: Compact Bottom Reading Sheet (Leaves top half of screen open for 3D model) */
          <div className="fixed bottom-3 left-2.5 right-2.5 z-30 pointer-events-auto font-poppins max-h-[52vh] flex flex-col">
            <div className="max-h-[52vh] flex flex-col rounded-2xl shadow-2xl border border-white/20 overflow-hidden bg-[#141e2a]/98 backdrop-blur-2xl">
              {/* Mobile Header */}
              <div className="px-3.5 py-2.5 border-b border-white/10 flex items-center justify-between bg-[#1e2c3b]/90 shrink-0">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-xs shadow-md shrink-0"
                    style={{ backgroundColor: currentPoint.color }}
                  >
                    {currentPoint.stepNumber || '•'}
                  </span>
                  <div className="truncate">
                    <h2 className="text-xs font-bold text-white truncate leading-tight">
                      {currentPoint.name}
                    </h2>
                    <p className="text-[10px] text-slate-400 truncate">
                      {currentPoint.badgeText}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setIsMobileExpanded(false)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-sky-200 bg-sky-500/20 hover:bg-sky-500/30 text-[11px] font-medium transition cursor-pointer"
                    title="Kecilkan ke Mode 3D"
                  >
                    <Eye size={12} />
                    <span>Lihat 3D</span>
                    <ChevronDown size={13} />
                  </button>
                  <button
                    onClick={closeVideo}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/20 transition cursor-pointer"
                    title="Tutup"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* Mobile Body: Word-for-Word Document Explanation (Max 34vh, scrollable) */}
              <div className="flex-1 overflow-y-auto max-h-[34vh] p-3 space-y-2 text-slate-200">
                {/* Paragraph 1: Physiological Mechanism */}
                <div className="text-xs text-slate-200 leading-relaxed bg-[#1b2532]/95 p-3 rounded-xl border border-white/10 shadow-sm font-normal">
                  <p className="text-justify">{currentPoint.mechanism}</p>
                </div>

                {/* Paragraph 2+: Pada diabetes */}
                <div className="space-y-2">
                  {currentPoint.diabetes.map((paragraph, idx) => (
                    <div
                      key={idx}
                      className="text-xs text-amber-100/95 leading-relaxed bg-[#1f2733]/95 p-3 rounded-xl border border-amber-500/20 shadow-sm font-normal"
                    >
                      <p className="text-justify">{paragraph}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Footer */}
              <div className="px-3 py-2 border-t border-white/10 bg-[#1e2c3b]/90 flex items-center justify-between shrink-0">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-white text-[11px] font-medium transition border border-white/10 active:scale-95 cursor-pointer"
                >
                  <ChevronLeft size={13} />
                  <span>Prev</span>
                </button>

                {/* 5 Step Indicator Dots in Reading Sheet */}
                <div className="flex items-center gap-1.5">
                  {REFERENCE_POINTS.map((pt) => {
                    const isCurrent = pt.id === currentPoint.id;
                    return (
                      <button
                        key={pt.id}
                        onClick={() => selectPoint(pt.id)}
                        className={`w-6 h-6 rounded-full text-[10.5px] font-bold text-white flex items-center justify-center transition active:scale-90 cursor-pointer ${
                          isCurrent
                            ? 'ring-2 ring-sky-300 scale-110 shadow-md border border-white'
                            : 'opacity-50 hover:opacity-100 border border-white/30'
                        }`}
                        style={{ backgroundColor: pt.color }}
                      >
                        {pt.stepNumber}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg text-white text-[11px] font-semibold transition shadow-md active:scale-95 cursor-pointer"
                  style={{ backgroundColor: currentPoint.color }}
                >
                  <span>Next</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* DESKTOP VIEW (>= md screens): Classic Side Card / Modal        */}
      {/* ============================================================== */}
      <div
        className={`hidden md:block fixed z-30 transition-all duration-300 pointer-events-auto font-poppins ${
          isDesktopExpanded
            ? 'top-4 bottom-22 left-16 right-16 lg:left-24 lg:right-24'
            : 'top-4 bottom-22 right-6 w-[460px] max-h-[calc(100vh-105px)]'
        }`}
      >
        <div className="h-full flex flex-col rounded-3xl shadow-2xl border border-white/15 overflow-hidden bg-[#16212d]/95 backdrop-blur-2xl">
          {/* Desktop Header */}
          <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between bg-[#1e2c3b]/85 shrink-0">
            <div className="flex items-center gap-3">
              <span
                className="flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-xs shadow-md shrink-0"
                style={{ backgroundColor: currentPoint.color }}
              >
                {currentPoint.stepNumber || '•'}
              </span>
              <div>
                <h2 className="text-sm font-semibold text-white leading-tight">
                  {currentPoint.name}
                </h2>
                <p className="text-[11px] text-slate-400 font-normal mt-0.5">
                  {currentPoint.badgeText}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsDesktopExpanded(!isDesktopExpanded)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                title={isDesktopExpanded ? 'Kecilkan' : 'Perbesar'}
              >
                {isDesktopExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </button>
              <button
                onClick={closeVideo}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/20 transition cursor-pointer"
                title="Tutup"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Desktop Body (Scrollable Explanation Page, Word-for-Word from Document) */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 text-slate-200">
            {/* Paragraph 1: Physiological Mechanism (word-for-word) */}
            <div className="text-xs text-slate-200 leading-relaxed bg-[#1b2532]/90 p-4 rounded-2xl border border-white/10 shadow-sm font-normal">
              <p className="text-justify">{currentPoint.mechanism}</p>
            </div>

            {/* Paragraph 2+: Pada diabetes (word-for-word) */}
            <div className="space-y-2.5">
              {currentPoint.diabetes.map((paragraph, idx) => (
                <div
                  key={idx}
                  className="text-xs text-amber-100/95 leading-relaxed bg-[#1f2733]/90 p-4 rounded-2xl border border-amber-500/20 shadow-sm font-normal"
                >
                  <p className="text-justify">{paragraph}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Footer */}
          <div className="px-5 py-3 border-t border-white/10 bg-[#1e2c3b]/85 flex items-center justify-between shrink-0">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#253547] hover:bg-[#2d4056] text-white text-xs font-medium transition border border-white/10 shadow-2xs active:scale-95 cursor-pointer"
            >
              <ChevronLeft size={14} />
              <span>Sebelumnya</span>
            </button>

            <span className="text-[11px] text-slate-400 font-normal">
              Langkah {currentIndex + 1} dari {REFERENCE_POINTS.length}
            </span>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-white text-xs font-semibold transition shadow-md active:scale-95 cursor-pointer"
              style={{ backgroundColor: currentPoint.color }}
            >
              <span>Berikutnya</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
