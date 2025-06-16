import { BuskingSpot } from '@entities/location/model/spot';
import { create } from 'zustand';

interface UseLocationStore {
  editLocation: BuskingSpot | undefined;
  setEditLocation: (targetEditData?: BuskingSpot) => void;
}

export const useLocationStore = create<UseLocationStore>((set) => ({
  editLocation: undefined,
  setEditLocation: (editData?: BuskingSpot) => set({ editLocation: editData }),
}));
