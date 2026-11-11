import { create } from 'zustand';
import { REFERENCE_POINTS, DIABETES_STAGES } from '../data/organsData';

export const useDiabetesStore = create((set, get) => ({
  activePointId: null,
  activeStageId: 'stage_insulin_resistance',
  isVideoOpen: false,
  isTourActive: false,
  tourIndex: 0,
  
  // 360 Degree Continuous Rotation
  isAutoRotate: false,
  toggleAutoRotate: () => set((state) => ({ isAutoRotate: !state.isAutoRotate })),
  setAutoRotate: (val) => set({ isAutoRotate: val }),

  // Exploded vs Unexploded Phase
  isExploded: true,
  toggleExploded: () => set((state) => ({ isExploded: !state.isExploded })),
  setExploded: (val) => set({ isExploded: val }),
  explosionProgress: 1.0, // 0 = unexploded, 1 = fully exploded
  setExplosionProgress: (val) => set({ explosionProgress: val }),
  
  // Real 3D model readiness tracking
  isModelLoaded: false,
  setModelLoaded: (loaded) => set({ isModelLoaded: loaded }),

  // Controls whether the initial 3D animation has completed
  isIntroAnimationDone: false,

  // Custom video storage
  customVideos: {},

  setIntroAnimationDone: (done) => set({ isIntroAnimationDone: done }),

  selectPoint: (pointId) => {
    const { activePointId } = get();

    // Toggle: if already zoomed in on this organ, clicking it again zooms out
    if (activePointId === pointId) {
      set({
        activePointId: null,
        isVideoOpen: false,
        isTourActive: false
      });
      return;
    }

    const resolvedId = pointId === 'step4_insulin_resistance' ? 'step4_large_intestine' : pointId;
    const pt = REFERENCE_POINTS.find((p) => p.id === resolvedId);
    if (!pt) return;
    set({
      activePointId: resolvedId,
      isVideoOpen: true,
      isIntroAnimationDone: true
    });
  },

  closeVideo: () => set({ isVideoOpen: false }),
  openVideo: () => set({ isVideoOpen: true }),

  resetView: () => set({
    activePointId: null,
    isVideoOpen: false,
    isTourActive: false
  }),

  setStage: (stageId) => set({ activeStageId: stageId }),

  setCustomVideo: (pointId, url) => set((state) => ({
    customVideos: {
      ...state.customVideos,
      [pointId]: url
    }
  })),

  startTour: () => {
    const first = REFERENCE_POINTS[0];
    set({
      isTourActive: true,
      tourIndex: 0,
      activePointId: first.id,
      isVideoOpen: true,
      isIntroAnimationDone: true
    });
  },

  nextTour: () => {
    const { tourIndex } = get();
    const nextIdx = (tourIndex + 1) % REFERENCE_POINTS.length;
    const nextPoint = REFERENCE_POINTS[nextIdx];
    set({
      tourIndex: nextIdx,
      activePointId: nextPoint.id,
      isVideoOpen: true
    });
  },

  prevTour: () => {
    const { tourIndex } = get();
    const prevIdx = (tourIndex - 1 + REFERENCE_POINTS.length) % REFERENCE_POINTS.length;
    const prevPoint = REFERENCE_POINTS[prevIdx];
    set({
      tourIndex: prevIdx,
      activePointId: prevPoint.id,
      isVideoOpen: true
    });
  },

  stopTour: () => set({ isTourActive: false })
}));
