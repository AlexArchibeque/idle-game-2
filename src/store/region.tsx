import { StateCreator } from "zustand";
import { DEFAULT_REGION, type Region } from "../data/defaultStats";
import {
  type RegionTypes,
  type RegionArea,
  type FightArea,
} from "../data/defaultStats";

export interface RegionSlice {
  currentRegion: Region;
  setCurrentRegion: (
    type: RegionTypes,
    fightArea: FightArea | null,
    regionArea: RegionArea | null,
    numberOfEnemies: number
  ) => void;
}

export const createRegionSlice: StateCreator<
  RegionSlice,
  [["zustand/devtools", never], ["zustand/immer", never]],
  [],
  RegionSlice
> = (set, get) => ({
  currentRegion: DEFAULT_REGION,
  setCurrentRegion: (
    type: RegionTypes,
    fightArea: FightArea | null,
    regionArea: RegionArea | null,
    numberOfEnemies = 1
  ) => {
    set((state) => {
      state.currentRegion.type = type;
      state.currentRegion.fightArea = fightArea;
      state.currentRegion.maxEnemies = numberOfEnemies;
      state.currentRegion.regionArea = regionArea;
    });
  },
});
