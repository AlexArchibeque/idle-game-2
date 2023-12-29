import { StateCreator } from "zustand";
import { DEFAULT_TOWN, type TownStats } from "../data/defaultStats";
import { type CharacterSlice } from "./character";

export interface TownSlice {
  townStats: TownStats;
  townHeal: () => void;
  townRestore: () => void;
}

export const createTownSlice: StateCreator<
  TownSlice & CharacterSlice,
  [["zustand/devtools", never], ["zustand/immer", never]],
  [],
  TownSlice
> = (set, get) => ({
  townStats: DEFAULT_TOWN,
  townHeal: () => {
    set((state) => {
      state.playerStats.health[0] = state.playerStats.health[1];
      state.gold -= 100;
    });
  },
  townRestore: () => {
    set((state) => {
      state.playerStats.mana[0] = state.playerStats.mana[1];
      state.gold -= 100;
    });
  },
});
