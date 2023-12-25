import { create, StateCreator } from "zustand";
import { CharacterSlice } from "./character";

export interface BearSlice {
  bears: number;
  addBear: () => void;
}

export const createBearSlice: StateCreator<
  BearSlice & CharacterSlice,
  [],
  [],
  BearSlice
> = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
});
