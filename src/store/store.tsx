import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, devtools } from "zustand/middleware";
import { CharacterSlice, createCharacterSlice } from "./character";
import { BearSlice, createBearSlice } from "./enemies";

interface SharedSlice {
  addBoth: () => void;
  getBoth: () => void;
}

const createSharedSlice: StateCreator<
  BearSlice & CharacterSlice,
  [],
  [],
  SharedSlice
> = (set, get) => ({
  addBoth: () => {
    // you can reuse previous methods
    get().addBear();
    // or do them from scratch
    // set((state) => ({ bears: state.bears + 1, fishes: state.fishes + 1 })
  },
  getBoth: () => get().bears,
});

export type GameState = CharacterSlice & BearSlice & SharedSlice;

export const useGameStore = create<GameState>()(
  devtools(
    persist(
      immer<GameState>((...a) => ({
        ...createCharacterSlice(...a),
        ...createBearSlice(...a),
        ...createSharedSlice(...a),
      })),
      { name: "game-settings" }
    )
  )
);
