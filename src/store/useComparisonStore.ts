import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const MAX_COMPARE = 3;

interface ComparisonState {
  selectedIds: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  clear: () => void;
  isSelected: (id: string) => boolean;
  isFull: () => boolean;
}

export const useComparisonStore = create<ComparisonState>()(
  persist(
    (set, get) => ({
      selectedIds: [],

      add: (id) =>
        set((state) => {
          if (state.selectedIds.includes(id)) return state;
          if (state.selectedIds.length >= MAX_COMPARE) return state;
          return { selectedIds: [...state.selectedIds, id] };
        }),

      remove: (id) =>
        set((state) => ({
          selectedIds: state.selectedIds.filter((x) => x !== id),
        })),

      toggle: (id) => {
        const { selectedIds, add, remove } = get();
        if (selectedIds.includes(id)) remove(id);
        else add(id);
      },

      clear: () => set({ selectedIds: [] }),

      isSelected: (id) => get().selectedIds.includes(id),
      isFull: () => get().selectedIds.length >= MAX_COMPARE,
    }),
    {
      name: 'product-comparison',
      partialize: (state) => ({ selectedIds: state.selectedIds }),
      version: 2,
      migrate: () => ({ selectedIds: [] }),
    }
  )
);
