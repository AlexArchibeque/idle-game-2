import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, devtools } from "zustand/middleware";
import { CharacterSlice, createCharacterSlice } from "./character";
import { EnemySlice, createEnemySlice } from "./enemies";
import { SkillSlice, createSkillSlice } from "./skills";

interface SharedSlice {
  addBoth: () => void;
  getBoth: () => void;
}

const createSharedSlice: StateCreator<
  EnemySlice & CharacterSlice & SkillSlice,
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

type GameState = CharacterSlice & EnemySlice & SharedSlice & SkillSlice;

export const useGameStore = create<GameState>()(
  devtools(
    persist(
      immer<GameState>((...a) => ({
        ...createCharacterSlice(...a),
        ...createEnemySlice(...a),
        ...createSkillSlice(...a),
        ...createSharedSlice(...a),
      })),
      { name: "game-settings" }
    ),
    { name: "devTools Zustand" }
  )
);
