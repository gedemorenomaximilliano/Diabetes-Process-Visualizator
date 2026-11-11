import React from 'react';
import { TrendingUp, ShieldAlert, Activity, Droplet, ArrowRight } from 'lucide-react';
import { useDiabetesStore } from '../../store/useDiabetesStore';
import { DIABETES_STAGES } from '../../data/organsData';

const ICONS = {
  TrendingUp,
  ShieldAlert,
  Activity,
  Droplet
};

export default function ProgressionTimeline() {
  const activeStageId = useDiabetesStore((state) => state.activeStageId);
  const setStage = useDiabetesStore((state) => state.setStage);
  const selectPoint = useDiabetesStore((state) => state.selectPoint);

  const handleStageClick = (stage) => {
    setStage(stage.id);
    if (stage.id === 'stage_glucose_rise') {
      selectPoint('step2_stomach_intestine');
    } else if (stage.id === 'stage_insulin_resistance') {
      selectPoint('step4_large_intestine');
    } else if (stage.id === 'stage_prediabetes') {
      selectPoint('step3_pancreas');
    } else if (stage.id === 'stage_type2_diabetes') {
      selectPoint('step4_large_intestine');
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-auto w-[95vw] max-w-4xl">
      <div className="glass-panel rounded-2xl px-4 py-2.5 shadow-2xl border border-white/10 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Alur Perkembangan Diabetes:
          </span>
        </div>

        {/* Timeline Pills */}
        <div className="flex items-center flex-wrap sm:flex-nowrap justify-center gap-1.5 sm:gap-2 w-full md:w-auto">
          {DIABETES_STAGES.map((stage, idx) => {
            const Icon = ICONS[stage.icon] || Activity;
            const isSelected = activeStageId === stage.id;

            return (
              <React.Fragment key={stage.id}>
                <button
                  onClick={() => handleStageClick(stage)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-lg scale-105 border-cyan-400'
                      : 'bg-slate-900/50 text-slate-300 hover:text-white hover:bg-slate-800/80 border-white/5'
                  }`}
                  style={{
                    borderColor: isSelected ? stage.color : undefined,
                    boxShadow: isSelected ? `0 0 14px ${stage.color}40` : undefined
                  }}
                  title={stage.description}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${stage.color}25`, color: stage.color }}
                  >
                    <Icon size={12} />
                  </div>
                  <span className="whitespace-nowrap">{stage.title}</span>
                </button>

                {idx < DIABETES_STAGES.length - 1 && (
                  <ArrowRight size={13} className="text-slate-500 shrink-0 hidden sm:block" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
