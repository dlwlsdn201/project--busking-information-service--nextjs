import { create } from 'zustand';

interface UseConfirmStore {
  opened: boolean;
  id: string;
  contents: string | React.ReactElement;
  openConfirm: ({
    id,
    contents,
    onOk,
  }: {
    id: string;
    contents: string | React.ReactElement;
    onOk: () => void;
  }) => void;
  closeConfirm: () => void;
  resetConfirm: () => void;
  onOk: () => void;
}

export const useConfirmStore = create<UseConfirmStore>((set) => ({
  opened: false,
  id: '',
  contents: '',
  onOk: () => {},
  openConfirm: ({ id, contents, onOk = () => {} }) =>
    set({ opened: true, id, contents, onOk }),
  closeConfirm: () => {
    set({
      opened: false,
    });
  },
  resetConfirm: () => {
    set({
      id: '',
      contents: '',
      onOk: () => {},
    });
  },
}));
