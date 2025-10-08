
import { create } from 'zustand';
import { Plot, User } from '@prisma/client';

export type ModalType = "create" | "edit";

interface UsePlotModalStore {
  type: ModalType | null;
  data: Plot | null;
  users: User[];
  isOpen: boolean;
  onOpen: (type: ModalType, data?: Plot, users?: User[]) => void;
  onClose: () => void;
}

export const usePlotModal = create<UsePlotModalStore>((set) => ({
  type: null,
  data: null,
  users: [],
  isOpen: false,
  onOpen: (type, data = null, users = []) => set({ isOpen: true, type, data, users }),
  onClose: () => set({ type: null, isOpen: false, data: null, users: [] }),
}));
