import React from 'react';
import AnatomyScene from './components/3d/AnatomyScene';
import MainBottomNav from './components/ui/MainBottomNav';
import OrganVideoModal from './components/ui/OrganVideoModal';
import MedicalBackgroundAnimation from './components/ui/MedicalBackgroundAnimation';
import LoadingScreen from './components/ui/LoadingScreen';
import PhaseToggle from './components/ui/PhaseToggle';

export default function App() {
  return (
    <div className="fixed inset-0 w-full h-full h-dvh overflow-hidden bg-[#070d18] font-sans select-none text-slate-100">
      {/* 3D Model Loading Screen (Tied directly to model mount) */}
      <LoadingScreen />

      {/* Darker Animated Medical Gradient Background */}
      <MedicalBackgroundAnimation />

      {/* Phase Toggle (Anatomi Utuh vs Fase Terurai / Exploded View) */}
      <PhaseToggle />

      {/* 3D Anatomy Viewport */}
      <main className="w-full h-full absolute inset-0 z-10">
        <AnatomyScene />
      </main>

      {/* Pop-up Video Container (shows up when an organ or point is selected) */}
      <OrganVideoModal />

      {/* Clean Symmetrical Main Bottom Navigation Bar */}
      <MainBottomNav />
    </div>
  );
}
