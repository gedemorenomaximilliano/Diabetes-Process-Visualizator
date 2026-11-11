import React from 'react';

export default function MedicalBackgroundAnimation() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. Base Continuous Animated Flowing Gradient */}
      <div className="absolute inset-0 animated-gradient-bg" />

      {/* 2. Fluid Organic Medical Aurora Blobs (Looping infinite movement) */}
      {/* Deep Teal / Cyan Pulse (Top-Left) */}
      <div className="medical-orb-1 absolute -top-24 -left-24 w-[750px] h-[750px] rounded-full bg-radial from-cyan-500/25 via-teal-600/15 to-transparent blur-[110px]" />

      {/* Deep Oceanic Indigo / Blue (Bottom-Right) */}
      <div className="medical-orb-2 absolute -bottom-36 -right-36 w-[850px] h-[850px] rounded-full bg-radial from-blue-600/30 via-indigo-700/15 to-transparent blur-[120px]" />

      {/* Clinical Sky Cyan Flare (Center-Right) */}
      <div className="medical-orb-3 absolute top-1/3 -right-20 w-[600px] h-[600px] rounded-full bg-radial from-sky-500/20 via-cyan-800/10 to-transparent blur-[90px]" />

      {/* Deep Navy / Emerald Drift (Bottom-Left) */}
      <div className="medical-orb-4 absolute bottom-10 left-1/4 w-[650px] h-[650px] rounded-full bg-radial from-teal-500/18 via-blue-900/15 to-transparent blur-[100px]" />

      {/* 3. Subtle Vignette to keep focus centered on the 3D anatomical model */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-transparent to-black/60 pointer-events-none" />
    </div>
  );
}
