import { BuskingSpot } from '@entities/location/model/spot';
import { create } from 'zustand';

interface UseLocationStore {
  isInfoModalOpen: boolean;
  setIsInfoModalOpen: (isOpen: boolean) => void;
  targetLocation: BuskingSpot | undefined;
  setTargetLocation: (data: BuskingSpot | undefined) => void;
}

export const useLocationStore = create<UseLocationStore>((set) => ({
  isInfoModalOpen: false,
  setIsInfoModalOpen: (isOpen: boolean) =>
    set({ isInfoModalOpen: isOpen, targetLocation: undefined }),
  targetLocation: undefined, // 장소 상세정보 데이터
  setTargetLocation: (data) => set({ targetLocation: data }),
}));
