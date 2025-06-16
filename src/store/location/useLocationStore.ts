import { BuskingSpot } from '@entities/location/model/spot';
import { create } from 'zustand';

interface UseLocationStore {
  editLocation: BuskingSpot | undefined;
  setEditLocation: (targetEditData?: BuskingSpot) => void;
  isInfoModalOpen: boolean;
  setIsInfoModalOpen: (isOpen: boolean) => void;
  infoData: any;
  setInfoData: (data: any) => void;
}

export const useLocationStore = create<UseLocationStore>((set) => ({
  editLocation: undefined,
  setEditLocation: (editData?: BuskingSpot) => set({ editLocation: editData }),
  isInfoModalOpen: false,
  setIsInfoModalOpen: (isOpen: boolean) => set({ isInfoModalOpen: isOpen }),
  infoData: undefined, // 장소 상세정보 데이터
  setInfoData: (data) => set({ infoData: data }),
}));
