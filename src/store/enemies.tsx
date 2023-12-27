import { create, StateCreator } from "zustand";
import { CharacterSlice } from "./character";

export interface EnemySlice {
  bears: number;
  addBear: () => void;
}

export const createEnemySlice: StateCreator<
  EnemySlice & CharacterSlice,
  [],
  [],
  EnemySlice
> = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
});
