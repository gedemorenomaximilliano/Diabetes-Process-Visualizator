import React, { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';
import { useDiabetesStore } from '../../store/useDiabetesStore';

export default function LoadingScreen() {
  const { active, progress } = useProgress();
  const isModelLoaded = useDiabetesStore((state) => state.isModelLoaded);
  const [visible, setVisible] = useState(true);

  // Accurate completion: Only dismiss when the model is actually mounted AND progress is complete
  useEffect(() => {
    if (isModelLoaded && !active) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isModelLoaded, active]);

  if (!visible) return null;

  // Real percent or simulated smooth ramp if waiting on model mount
  const currentPercent = isModelLoaded ? 100 : Math.min(Math.round(progress || 10), 99);
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentPercent / 100) * circumference;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#070d18] transition-opacity duration-700 select-none ${
        isModelLoaded && !active ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Minimal Circular Progress Bar */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
            {/* Background Track */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              stroke="#1e293b"
              strokeWidth="5"
              fill="none"
            />
            {/* Animated Progress Ring */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              stroke="#38bdf8"
              strokeWidth="5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
              className="transition-all duration-300 ease-out"
            />
          </svg>

          {/* Percentage Inside Circle */}
          <span className="absolute text-sm font-bold text-white tracking-tight">
            {currentPercent}%
          </span>
        </div>

        {/* Minimal Text */}
        <p className="text-xs font-semibold text-slate-300 tracking-wider">
          Model is loading...
        </p>
      </div>
    </div>
  );
}
