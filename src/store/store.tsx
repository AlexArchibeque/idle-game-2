import { create, StateCreator } from "zustand";
import { FishSlice, createFishSlice } from "./character";
import { BearSlice, createBearSlice } from "./enemies";

interface SharedSlice {
  addBoth: () => void;
  getBoth: () => void;
}

const createSharedSlice: StateCreator<
  BearSlice & FishSlice,
  [],
  [],
  SharedSlice
> = (set, get) => ({
  addBoth: () => {
    // you can reuse previous methods
    get().addBear();
    get().addFish();
    // or do them from scratch
    // set((state) => ({ bears: state.bears + 1, fishes: state.fishes + 1 })
  },
  getBoth: () => get().bears + get().fishes,
});

export const useGameStore = create<FishSlice & BearSlice>()((...set) => ({
  ...createFishSlice(...set),
  ...createBearSlice(...set),
  ...createSharedSlice(...set),
}));
